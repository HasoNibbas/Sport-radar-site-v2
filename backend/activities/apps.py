from django.apps import AppConfig
from django.db.models.signals import post_migrate


class ActivitiesConfig(AppConfig):
    name = 'activities'

    def ready(self):
        from .seed import create_demo_data
        
        def run_seed(sender, **kwargs):
            """Auto-seed demo data after migrations if database is empty."""
            from .models import Activity
            if Activity.objects.count() == 0:
                created = create_demo_data()
                if created > 0:
                    print(f"✅ Auto-seeded {created} demo activities")
        
        post_migrate.connect(run_seed, sender=self)
