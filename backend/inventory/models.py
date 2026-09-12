from django.db import models
from django.core.validators import MinValueValidator

class Ingredient(models.Model):
    class Unit(models.TextChoices):
        KILOGRAM = "kg", "Kg"
        LITER = "l", "Litro"
        UNIT = "un", "Unidade"

    name = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=2, choices=Unit.choices)
    target_stock = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    current_stock = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    monthly_consumption = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    expiration_date = models.DateField()
    ran_during_period = models.BooleanField(default=True)

    def __str__(self):
        return self.name
