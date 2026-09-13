import { useState } from "react"

import {
  createIngredient,
  updateIngredient,
} from "../services/api"

import type {
  CreateIngredientData,
  Ingredient,
} from "../types/ingredient"

type IngredientFormProps = {
  ingredientToEdit: Ingredient | null
  onIngredientSaved: () => void
  onCancelEdit: () => void
}

function getInitialFormData(
  ingredient: Ingredient | null,
): CreateIngredientData {
  if (ingredient) {
    return {
      name: ingredient.name,
      unit: ingredient.unit,
      target_stock: ingredient.target_stock,
      current_stock: ingredient.current_stock,
      monthly_consumption: ingredient.monthly_consumption,
      expiration_date: ingredient.expiration_date,
      ran_during_period: ingredient.ran_during_period,
    }
  }

  return {
    name: "",
    unit: "kg",
    target_stock: "",
    current_stock: "",
    monthly_consumption: "",
    expiration_date: "",
    ran_during_period: false,
  }
}

function IngredientForm({
  ingredientToEdit,
  onIngredientSaved,
  onCancelEdit,
}: IngredientFormProps) {
  const [formData, setFormData] = useState<CreateIngredientData>(
    () => getInitialFormData(ingredientToEdit),
  )

  const [error, setError] = useState("")

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    try {
      setError("")

      if (ingredientToEdit) {
        await updateIngredient(
          ingredientToEdit.id,
          formData,
        )
      } else {
        await createIngredient(formData)
      }

      onIngredientSaved()
    } catch {
      setError(
        ingredientToEdit
          ? "Não foi possível atualizar o ingrediente."
          : "Não foi possível cadastrar o ingrediente.",
      )
    }
  }

  return (
    <section>
      <h2>
        {ingredientToEdit
          ? `Editar ${ingredientToEdit.name}`
          : "Cadastrar Ingrediente"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>

          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(event) =>
              setFormData({
                ...formData,
                name: event.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="unit">Unidade</label>

          <select
            id="unit"
            value={formData.unit}
            onChange={(event) =>
              setFormData({
                ...formData,
                unit: event.target.value,
              })
            }
          >
            <option value="kg">Kg</option>
            <option value="l">Litro</option>
            <option value="un">Unidade</option>
          </select>
        </div>

        <div>
          <label htmlFor="target_stock">
            Meta de estoque
          </label>

          <input
            id="target_stock"
            type="number"
            step="0.01"
            min="0"
            value={formData.target_stock}
            onChange={(event) =>
              setFormData({
                ...formData,
                target_stock: event.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="current_stock">
            Estoque atual
          </label>

          <input
            id="current_stock"
            type="number"
            step="0.01"
            min="0"
            value={formData.current_stock}
            onChange={(event) =>
              setFormData({
                ...formData,
                current_stock: event.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="monthly_consumption">
            Consumo do período
          </label>

          <input
            id="monthly_consumption"
            type="number"
            step="0.01"
            min="0"
            value={formData.monthly_consumption}
            onChange={(event) =>
              setFormData({
                ...formData,
                monthly_consumption: event.target.value,
              })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="expiration_date">
            Data de validade
          </label>

          <input
            id="expiration_date"
            type="date"
            value={formData.expiration_date}
            onChange={(event) =>
              setFormData({
                ...formData,
                expiration_date: event.target.value,
              })
            }
            required
          />
        </div>

        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={formData.ran_during_period}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  ran_during_period: event.target.checked,
                })
              }
            />

            <span>Faltou durante o período</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">
            {ingredientToEdit
              ? "Salvar alterações"
              : "Cadastrar"}
          </button>

          {ingredientToEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </section>
  )
}

export default IngredientForm