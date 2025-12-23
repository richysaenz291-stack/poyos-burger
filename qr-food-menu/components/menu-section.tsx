import type { MenuItem } from "@/app/page"
import { MenuItemCard } from "./menu-item-card"

interface MenuSectionProps {
  title: string
  description?: string
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
}

export function MenuSection({ title, description, items, onAddToCart }: MenuSectionProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2">{title}</h2>
        {description && <p className="text-muted-foreground text-sm mt-2 mb-3">{description}</p>}
        <div className="h-1 w-20 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}
