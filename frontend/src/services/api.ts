import type { Ingredient, CreateIngredientData, UpdateIngredientData } from "../types/ingredient"
import type { PurchaseItem } from "../types/purchaseItem"

const API_URL = "HTTP://127.0.0.1:8000/api";

export async function getIngredients(): Promise<Ingredient[]> {
  const response = await fetch(`${API_URL}/ingredients/`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os ingredients");
  }

  return response.json();
}

export async function getPurchaseList(): Promise<PurchaseItem[]> {
  const response = await fetch(`${API_URL}/purchase-list/`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar a lista de compras");
  }

  return response.json();
}

export async function createIngredient(
  data: CreateIngredientData,
): Promise<Ingredient> {
  const response = await fetch(`${API_URL}/ingredients/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Não foi possível cadastrar o Ingrediente");
  }

  return response.json();
}

export async function deleteIngredient(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/ingredients/${id}/`, {
        method: "DELETE"
    })

    if (!response.ok) {
        throw new Error("Não foi possível deletar o ingrediente")
    }
}

export async function updateIngredient(id: number, data: UpdateIngredientData): Promise<Ingredient> {
    const response = await fetch(`${API_URL}/ingredients/${id}/`, {
        method: "PATCH",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Não foi possível atualizar o ingrediente")
    }

    return response.json()
}
