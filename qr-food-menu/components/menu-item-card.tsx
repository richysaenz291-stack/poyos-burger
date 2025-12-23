"use client"

import type { MenuItem } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const isUnavailable = item.isAvailable === false

  return (
    <Card
      className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-border/50 ${isUnavailable ? "opacity-60" : ""}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {isUnavailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              AGOTADO
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-3xl font-bold text-primary">${item.price}</p>
        <p className="text-sm text-muted-foreground">MXN</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button onClick={() => onAddToCart(item)} className="w-full" size="lg" disabled={isUnavailable}>
          <Plus className="h-5 w-5 mr-2" />
          {isUnavailable ? "No Disponible" : "Agregar"}
        </Button>
      </CardFooter>
    </Card>
  )
}
