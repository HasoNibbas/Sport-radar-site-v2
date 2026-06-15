from datetime import timedelta

import requests
from django.core.management.base import BaseCommand, CommandError
from django.utils.dateparse import parse_datetime, parse_duration

from activities.models import Activity
from companies.models import Company
from users.models import CustomUser


REMOTE_ACTIVITIES_URL = "https://sportradar-api.onrender.com/api/activities/"


def as_text(value, default=""):
    return default if value is None else str(value)


class Command(BaseCommand):
    help = "Replace local activities with the activities currently available on the deployed API."

    def add_arguments(self, parser):
        parser.add_argument(
            "--url",
            default=REMOTE_ACTIVITIES_URL,
            help="Activities endpoint to import from.",
        )

    def handle(self, *args, **options):
        url = options["url"]

        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
        except requests.RequestException as exc:
            raise CommandError(f"Could not fetch deployed activities: {exc}") from exc

        payload = response.json()
        activities = payload.get("results", payload) if isinstance(payload, dict) else payload
        if not isinstance(activities, list):
            raise CommandError("Unexpected activities response shape.")

        Activity.objects.all().delete()

        imported = 0
        for item in activities:
            company_data = item.get("company") or {}
            company_id = company_data.get("id")
            company_defaults = {
                "name": as_text(company_data.get("name"), "Imported company"),
                "description": as_text(company_data.get("description")),
                "logo": company_data.get("logo") or None,
                "address": as_text(company_data.get("address")),
                "city": as_text(company_data.get("city")),
                "phone_number": as_text(company_data.get("phone_number")),
                "website": as_text(company_data.get("website")),
                "sport_zen": bool(company_data.get("sport_zen", False)),
                "numero_siret": company_data.get("numero_siret") or None,
                "is_verified": True,
            }

            if company_id:
                company, _ = Company.objects.update_or_create(id=company_id, defaults=company_defaults)
            else:
                company, _ = Company.objects.update_or_create(
                    name=company_defaults["name"],
                    defaults=company_defaults,
                )

            instructor = None
            instructor_data = item.get("instructor") or {}
            instructor_id = instructor_data.get("id")
            if instructor_id:
                instructor_defaults = {
                    "email": as_text(instructor_data.get("email"), f"coach-{instructor_id}@example.com"),
                    "username": as_text(instructor_data.get("username"), f"coach-{instructor_id}"),
                    "first_name": as_text(instructor_data.get("first_name")),
                    "last_name": as_text(instructor_data.get("last_name")),
                    "avatar": instructor_data.get("avatar") or None,
                    "type": CustomUser.USER_TYPE_COACH,
                    "company": company,
                    "is_active": True,
                }
                instructor, _ = CustomUser.objects.update_or_create(
                    id=instructor_id,
                    defaults=instructor_defaults,
                )
                instructor.set_unusable_password()
                instructor.save(update_fields=["password"])

            start_time = parse_datetime(as_text(item.get("start_time")))
            duration = parse_duration(as_text(item.get("duration"))) or timedelta(hours=1)
            if start_time is None:
                self.stdout.write(self.style.WARNING(f"Skipping activity without valid start_time: {item.get('name')}"))
                continue

            Activity.objects.update_or_create(
                id=item["id"],
                defaults={
                    "name": as_text(item.get("name"), "Imported activity"),
                    "description": as_text(item.get("description")),
                    "category": as_text(item.get("category")),
                    "image": item.get("image") or None,
                    "location_address": item.get("location_address") or "",
                    "company": company,
                    "instructor": instructor,
                    "start_time": start_time,
                    "duration": duration,
                    "max_participants": int(item.get("max_participants") or 20),
                    "price": item.get("price") or "0.00",
                    "level": item.get("level") or Activity.LevelChoices.ALL,
                    "venue": item.get("venue") or Activity.VenueChoices.INDOOR,
                    "is_public": bool(item.get("is_public", True)),
                    "sport_zen": bool(item.get("sport_zen", False)),
                },
            )
            imported += 1

        CustomUser.objects.filter(email="coach.demo@sportradar.fr").delete()
        Company.objects.filter(name="SportRadar Lyon", activities__isnull=True).delete()

        self.stdout.write(self.style.SUCCESS(f"Imported {imported} deployed activities locally."))
