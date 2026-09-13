import type { PurchaseItem } from "../types/purchaseItem";

type PurchaseListProps = {
    items: PurchaseItem[]
}

function PurchaseList({ items }: PurchaseListProps) {
    return (
        <section>
            <h2>Lista de Compras</h2>

            {items.length === 0 ? (
                <p>Nenhum item precisa ser comprado</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.ingredient}>
                            {item.message}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default PurchaseList