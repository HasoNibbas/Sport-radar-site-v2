from datetime import timedelta

from django.utils import timezone

from activities.models import Activity
from companies.models import Company
from users.models import CustomUser


def create_demo_data():
    company, _ = Company.objects.update_or_create(
        name="SportRadar Lyon",
        defaults={
            "description": "Salle partenaire SportRadar pour les activites sportives et bien-etre.",
            "address": "12 Rue de la Republique",
            "city": "Lyon",
            "zip_code": "69002",
            "phone_number": "+33 6 14 82 85 84",
            "website": "https://sportradar.fr",
            "sport_zen": True,
            "is_verified": True,
        },
    )

    coach, created = CustomUser.objects.update_or_create(
        email="coach.demo@sportradar.fr",
        defaults={
            "username": "coachdemo",
            "first_name": "Alex",
            "last_name": "Martin",
            "type": CustomUser.USER_TYPE_COACH,
            "company": company,
            "is_active": True,
        },
    )
    if created or not coach.has_usable_password():
        coach.set_password("demo12345")
        coach.save(update_fields=["password"])

    now = timezone.now()
    activities = [
        {
            "name": "Yoga Matinal",
            "description": "Seance douce pour mobilite, respiration et energie.",
            "category": "Yoga",
            "location_address": "Parc de la Tete d'Or, Lyon",
            "start_time": now + timedelta(days=2, hours=9),
            "duration": timedelta(hours=1),
            "max_participants": 18,
            "price": "12.00",
            "level": Activity.LevelChoices.ALL,
            "venue": Activity.VenueChoices.OUTDOOR,
            "sport_zen": True,
        },
        {
            "name": "Pilates Doux",
            "description": "Renforcement profond, posture et controle.",
            "category": "Pilates",
            "location_address": "Studio Zen, Lyon 3",
            "start_time": now + timedelta(days=4, hours=18),
            "duration": timedelta(hours=1, minutes=15),
            "max_participants": 12,
            "price": "15.00",
            "level": Activity.LevelChoices.BEGINNER,
            "venue": Activity.VenueChoices.INDOOR,
            "sport_zen": True,
        },
        {
            "name": "HIIT Energie",
            "description": "Circuit cardio intense pour booster l'endurance.",
            "category": "Fitness",
            "location_address": "Gym Pro, Lyon 7",
            "start_time": now + timedelta(days=5, hours=19),
            "duration": timedelta(minutes=45),
            "max_participants": 20,
            "price": "10.00",
            "level": Activity.LevelChoices.INTERMEDIATE,
            "venue": Activity.VenueChoices.INDOOR,
            "sport_zen": False,
        },
        {
            "name": "Natation Dynamique",
            "description": "Travail technique et cardio en bassin.",
            "category": "Natation",
            "location_address": "Piscine Garibaldi, Lyon",
            "start_time": now + timedelta(days=7, hours=12),
            "duration": timedelta(hours=1),
            "max_participants": 10,
            "price": "14.00",
            "level": Activity.LevelChoices.ALL,
            "venue": Activity.VenueChoices.INDOOR,
            "sport_zen": False,
        },
        {
            "name": "Meditation Guidee",
            "description": "Pause calme pour recuperation et concentration.",
            "category": "Bien-etre",
            "location_address": "Salle SportRadar Lyon",
            "start_time": now + timedelta(days=9, hours=8),
            "duration": timedelta(minutes=50),
            "max_participants": 16,
            "price": "8.00",
            "level": Activity.LevelChoices.ALL,
            "venue": Activity.VenueChoices.INDOOR,
            "sport_zen": True,
        },
        {
            "name": "Boxe Initiation",
            "description": "Bases techniques, coordination et condition physique.",
            "category": "Boxe",
            "location_address": "Dojo Central, Lyon 2",
            "start_time": now + timedelta(days=11, hours=18),
            "duration": timedelta(hours=1, minutes=30),
            "max_participants": 14,
            "price": "16.00",
            "level": Activity.LevelChoices.BEGINNER,
            "venue": Activity.VenueChoices.INDOOR,
            "sport_zen": False,
        },
    ]

    created_count = 0
    for activity in activities:
        _, was_created = Activity.objects.update_or_create(
            name=activity["name"],
            company=company,
            defaults={
                **activity,
                "company": company,
                "instructor": coach,
                "is_public": True,
            },
        )
        created_count += int(was_created)

    return created_count
