from django.urls import path
from inventory.views import IngredientDetailView, IngredientListCreateView, PurchaseListView

urlpatterns = [
    path("ingredients/", IngredientListCreateView.as_view(), name="ingredient-list-create"),
    path("ingredients/<int:pk>/", IngredientDetailView.as_view(), name="ingredient-detail"),
    path("purchase-list/", PurchaseListView.as_view(), name="purchase-list"),
]