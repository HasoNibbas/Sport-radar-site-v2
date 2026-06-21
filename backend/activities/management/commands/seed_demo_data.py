from django.core.management.base import BaseCommand
from activities.seed import create_demo_data


class Command(BaseCommand):
    help = "Create demo companies, coaches, and activities for local development."

    def handle(self, *args, **options):
        created_count = create_demo_data()
        
        from activities.models import Activity
        total = Activity.objects.count()
        
        self.stdout.write(
            self.style.SUCCESS(
                f"✅ Demo data ready: {total} activities available ({created_count} created)."
            )
        )
