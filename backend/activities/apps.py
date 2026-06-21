from django.apps import AppConfig
from django.db.models.signals import post_migrate


class ActivitiesConfig(AppConfig):
    name = 'activities'

    def ready(self):
        from .seed import create_demo_data
        
        def run_seed(sender, **kwargs):
            """Auto-seed demo data after migrations."""
            from .models import Activity
            # Always ensure demo data is present and up-to-date
            create_demo_data()
        
        post_migrate.connect(run_seed, sender=self)
