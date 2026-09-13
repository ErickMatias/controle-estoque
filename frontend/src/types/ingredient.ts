export type Ingredient = {
    id: number
    name: string
    unit: string
    target_stock: string
    current_stock: string
    monthly_consumption: string
    expiration_date: string
    ran_during_period: boolean
}

export type CreateIngredientData = {
    name: string
    unit: string
    target_stock: string
    current_stock: string
    monthly_consumption: string
    expiration_date: string
    ran_during_period: boolean
}

export type UpdateIngredientData = Partial<CreateIngredientData>