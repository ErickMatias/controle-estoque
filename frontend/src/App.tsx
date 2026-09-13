import { useEffect, useState } from "react"

import IngredientForm from "./components/IngredientForm"
import IngredientTable from "./components/IngredientTable"
import PurchaseList from "./components/PurchaseList"

import {
  deleteIngredient,
  getIngredients,
  getPurchaseList,
} from "./services/api"

import type { Ingredient } from "./types/ingredient"
import type { PurchaseItem } from "./types/purchaseItem"

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([])
  const [editingIngredient, setEditingIngredient] =
    useState<Ingredient | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function refreshData() {
    try {
      const [ingredientsData, purchaseListData] =
        await Promise.all([
          getIngredients(),
          getPurchaseList(),
        ])

      setIngredients(ingredientsData)
      setPurchaseItems(purchaseListData)
      setError("")
    } catch {
      setError("Não foi possível carregar os dados.")
    }
  }

  function handleEdit(ingredient: Ingredient) {
    setEditingIngredient(ingredient)
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este ingrediente?",
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteIngredient(id)

      if (editingIngredient?.id === id) {
        setEditingIngredient(null)
      }

      await refreshData()
    } catch {
      setError("Não foi possível excluir o ingrediente.")
    }
  }

  async function handleIngredientSaved() {
    setEditingIngredient(null)
    await refreshData()
  }

  useEffect(() => {
    let cancelled = false

    Promise.all([
      getIngredients(),
      getPurchaseList(),
    ])
      .then(([ingredientsData, purchaseListData]) => {
        if (cancelled) {
          return
        }

        setIngredients(ingredientsData)
        setPurchaseItems(purchaseListData)
        setError("")
      })
      .catch(() => {
        if (!cancelled) {
          setError("Não foi possível carregar os dados.")
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main>
      <h1>Controle de Estoque</h1>

      <IngredientForm
      key={editingIngredient?.id ?? "new"}
      ingredientToEdit={editingIngredient}
      onIngredientSaved={handleIngredientSaved}
      onCancelEdit={() => setEditingIngredient(null)}
      />

      {loading && (
        <p className="loading-message">
        Carregando dados...</p>
      )}

      {error && (
        <p className="error-message">
        {error}</p>
      )}

      {!loading && !error && (
        <>
          <IngredientTable
            ingredients={ingredients}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <PurchaseList items={purchaseItems} />
        </>
      )}
    </main>
  )
}

export default App