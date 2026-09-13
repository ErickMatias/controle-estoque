import type { Ingredient } from "../types/ingredient"

type IngredientTableProps = {
  ingredients: Ingredient[]
  onEdit: (ingredient: Ingredient) => void
  onDelete: (id: number) => void
}

function IngredientTable({
  ingredients,
  onDelete,
  onEdit,
}: IngredientTableProps) {
  return (
    <section>
      <h2>Ingredientes</h2>

      <table>
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Unidade</th>
            <th>Meta</th>
            <th>Estoque atual</th>
            <th>Consumo</th>
            <th>Validade</th>
            <th>Faltou no período?</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.unit}</td>
              <td>{ingredient.target_stock}</td>
              <td>{ingredient.current_stock}</td>
              <td>{ingredient.monthly_consumption}</td>
              <td>{ingredient.expiration_date}</td>
              <td>
                {ingredient.ran_during_period ? "Sim" : "Não"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => onEdit(ingredient)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                type="button"
                onClick={() => onDelete(ingredient.id)}
                >
                   Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default IngredientTable