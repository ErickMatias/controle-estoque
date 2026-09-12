from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from inventory.models import Ingredient
from inventory.serializers import IngredientSerializer
from inventory.services.replenishment import calculate_purchase_quantity

class IngredientListCreateView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class PurchaseListView(APIView):
    def get(self, request):
        ingredients = Ingredient.objects.all()

        purchase_list = []

        for ingredient in ingredients:
            quantity = calculate_purchase_quantity(ingredient)

            if quantity <= 0:
                continue

            purchase_list.append(
                {
                    "ingredient": ingredient.name,
                    "quantity": quantity,
                    "unit": ingredient.get_unit_display(),
                    "message": (
                        f"Comprar: {quantity} "
                        f"{ingredient.get_unit_display()} "
                        f"de {ingredient.name}"
                    )
                }
            )
        return Response(purchase_list)