from decimal import Decimal
from django.test import TestCase
from inventory.models import Ingredient
from inventory.services.replenishment import calculate_purchase_quantity
from datetime import timedelta
from django.utils import timezone


class ReplenishmentServiceTest(TestCase):
    def test_should_calculate_difference_between_target_and_current_stock(self):
        ingredient = Ingredient(
            name="Farinha",
            unit=Ingredient.Unit.KILOGRAM,
            target_stock=Decimal("20.00"),
            current_stock=Decimal("7.00"),
            monthly_consumption=Decimal("13.00"),
            expiration_date=timezone.localdate() + timedelta(days=30),
            ran_during_period=False,
        )

        result = calculate_purchase_quantity(ingredient)

        self.assertEqual(result, Decimal("13.00"))

    def test_should_return_zero_when_current_stock_equals_target(self):
        ingredient = Ingredient(
            name="Leite",
            unit=Ingredient.Unit.LITER,
            target_stock=Decimal("10.00"),
            current_stock=Decimal("10.00"),
            monthly_consumption=Decimal("0.00"),
            expiration_date=timezone.localdate() + timedelta(days=30),
            ran_during_period=False,
        )

        result = calculate_purchase_quantity(ingredient)

        self.assertEqual(result, Decimal("0"))


    def test_should_return_zero_when_current_stock_is_above_target(self):
        ingredient = Ingredient(
            name="Ovos",
            unit=Ingredient.Unit.UNIT,
            target_stock=Decimal("30.00"),
            current_stock=Decimal("35.00"),
            monthly_consumption=Decimal("0.00"),
            expiration_date=timezone.localdate() + timedelta(days=30),
            ran_during_period=False,
        )   

        result = calculate_purchase_quantity(ingredient)

        self.assertEqual(result, Decimal("0"))

    def test_should_purchase_full_target_when_ingredient_is_expired(self):
        ingredient = Ingredient(
            name="Queijo",
            unit=Ingredient.Unit.KILOGRAM,
            target_stock=Decimal("20.00"),
            current_stock=Decimal("7.00"),
            monthly_consumption=Decimal("13.00"),
            expiration_date=timezone.localdate() - timedelta(days=1),
            ran_during_period=False,
        )

        result = calculate_purchase_quantity(ingredient)

        self.assertEqual(result, Decimal("20.00"))

    def test_should_add_twenty_percent_when_stock_ran_out_during_period(self):
        ingredient = Ingredient(
            name="Leite",
            unit=Ingredient.Unit.LITER,
            target_stock=Decimal("10.00"),
            current_stock=Decimal("0.00"),
            monthly_consumption=Decimal("15.00"),
            expiration_date=timezone.localdate() + timedelta(days=30),
            ran_during_period=True,
        )

        result = calculate_purchase_quantity(ingredient)

        self.assertEqual(result, Decimal("18.0000"))


    def test_expiration_should_have_priority_over_stockout(self):
        ingredient = Ingredient(
            name="Queijo",
            unit=Ingredient.Unit.KILOGRAM,
            target_stock=Decimal("20.00"),
            current_stock=Decimal("0.00"),
            monthly_consumption=Decimal("30.00"),
            expiration_date=timezone.localdate() - timedelta(days=1),
            ran_during_period=True,
        )

        result = calculate_purchase_quantity(ingredient)

        self.assertEqual(result, Decimal("20.00"))