from datetime import timedelta
from decimal import Decimal

from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APITestCase

from inventory.models import Ingredient


class PurchaseListAPITest(APITestCase):
    def test_should_return_purchase_list(self):
        Ingredient.objects.create(
            name="Farinha",
            unit=Ingredient.Unit.KILOGRAM,
            target_stock=Decimal("20.00"),
            current_stock=Decimal("7.00"),
            monthly_consumption=Decimal("13.00"),
            expiration_date=timezone.localdate() + timedelta(days=30),
            ran_during_period=False,
        )

        response = self.client.get(reverse("purchase-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        self.assertEqual(
            response.data[0]["ingredient"],
            "Farinha",
        )

        self.assertEqual(
            response.data[0]["quantity"],
            13.0,
        )

    def test_should_not_return_ingredient_when_purchase_quantity_is_zero(self):
        Ingredient.objects.create(
            name="Arroz",
            unit=Ingredient.Unit.KILOGRAM,
            target_stock=Decimal("10.00"),
            current_stock=Decimal("10.00"),
            monthly_consumption=Decimal("0.00"),
            expiration_date=timezone.localdate() + timedelta(days=30),
            ran_during_period=False,
        )

        response = self.client.get(reverse("purchase-list"))
    
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)