from rest_framework import serializers
from inventory.models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = [
            "id",
            "name",
            "unit",
            "target_stock",
            "current_stock",
            "monthly_consumption",
            "expiration_date",
            "ran_during_period"
        ]