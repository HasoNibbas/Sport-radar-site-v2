# companies/serializers.py (CORRIGÉ - FINAL)
from rest_framework import serializers
from .models import Company


class RemoteSafeImageField(serializers.ImageField):
    def to_representation(self, value):
        if not value:
            return None

        value_name = getattr(value, "name", "") or str(value)
        if value_name.startswith(("http://", "https://")):
            return value_name

        try:
            return super().to_representation(value)
        except ValueError:
            return None


class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer principal pour les entreprises.
    N'inclut PAS la liste des coaches et activités pour éviter l'importation circulaire.
    Utiliser les endpoints dédiés :
    - /api/companies/{id}/coaches/ pour récupérer les coaches
    - /api/companies/{id}/activities/ pour récupérer les activités
    """
    logo = RemoteSafeImageField(required=False, allow_null=True)

    class Meta:
        model = Company
        fields = [
            'id', 'name', 'description', 'logo', 'address', 'city', 'zip_code',
            'phone_number', 'website', 'sport_zen','numero_siret', 'is_verified', 'created_at'
        ]


class SimpleCompanySerializer(serializers.ModelSerializer):
    """
    Serializer simplifié pour afficher une entreprise dans un contexte imbriqué
    (par exemple, la company d'une activité).
    """
    logo = RemoteSafeImageField(read_only=True)

    class Meta:
        model = Company
        fields = [
            'id', 'name', 'description', 'logo', 'phone_number',
            'website', 'sport_zen', 'address', 'city','numero_siret'
        ]
        read_only_fields = fields
