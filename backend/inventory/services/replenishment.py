from decimal import Decimal
from inventory.models import Ingredient
from django.utils import timezone

def calculate_purchase_quantity(ingredient: Ingredient) -> Decimal:
    if ingredient.expiration_date < timezone.localdate():
        return ingredient.target_stock

    if ingredient.ran_during_period:
        return ingredient.monthly_consumption * Decimal("1.20")

    quantity =  ingredient.target_stock - ingredient.current_stock

    return max(quantity, Decimal("0"))