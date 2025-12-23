"use client"

import { useState } from "react"
import type { MenuItem } from "@/app/page"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, AlertCircle, CheckCircle, Edit2, Check, X, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdminPanelProps {
  items: MenuItem[]
  unavailableItems: string[]
  isOpen: boolean
  onClose: () => void
  onToggleAvailability: (itemId: string) => void
  onUpdatePrice: (itemId: string, newPrice: number) => void
  onAddNewProduct: (product: Omit<MenuItem, "id">) => void
}

export function AdminPanel({
  items,
  unavailableItems,
  isOpen,
  onClose,
  onToggleAvailability,
  onUpdatePrice,
  onAddNewProduct,
}: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null)
  const [editingPriceValue, setEditingPriceValue] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "hamburguesas",
  })

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, MenuItem[]>,
  )

  const categoryNames: Record<string, string> = {
    paquetes: "Paquetes",
    hamburguesas: "Hamburguesas",
    tacos: "Tacos y Burritos",
    papas: "Papas",
    extras: "Extras",
  }

  const startEditPrice = (itemId: string, currentPrice: number) => {
    setEditingPriceId(itemId)
    setEditingPriceValue(currentPrice.toString())
  }

  const savePrice = (itemId: string) => {
    const newPrice = Number.parseFloat(editingPriceValue)
    if (!isNaN(newPrice) && newPrice > 0) {
      onUpdatePrice(itemId, newPrice)
    }
    setEditingPriceId(null)
    setEditingPriceValue("")
  }

  const cancelEditPrice = () => {
    setEditingPriceId(null)
    setEditingPriceValue("")
  }

  const handleAddProduct = () => {
    const price = Number.parseFloat(newProduct.price)
    if (newProduct.name && !isNaN(price) && price > 0) {
      const productImage = `https://placehold.co/400x300?text=${encodeURIComponent(newProduct.name + " delicioso plato de comida")}`

      onAddNewProduct({
        name: newProduct.name,
        description: newProduct.description,
        price,
        category: newProduct.category,
        image: productImage,
      })

      setNewProduct({ name: "", description: "", price: "", category: "hamburguesas" })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Panel de Administración</SheetTitle>
          <SheetDescription>Gestiona disponibilidad, precios y productos</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Agregar Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                <DialogDescription>Completa los datos del nuevo producto</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Ej: Hamburguesa Especial"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Describe el producto..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (MXN)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paquetes">Paquetes</SelectItem>
                      <SelectItem value="hamburguesas">Hamburguesas</SelectItem>
                      <SelectItem value="tacos">Tacos y Burritos</SelectItem>
                      <SelectItem value="papas">Papas</SelectItem>
                      <SelectItem value="extras">Extras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddProduct} className="w-full">
                  Agregar Producto
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Resumen */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total de productos:</span>
                <Badge variant="secondary">{items.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Productos agotados:</span>
                <Badge variant="destructive">{unavailableItems.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Productos disponibles:</span>
                <Badge variant="default">{items.length - unavailableItems.length}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Lista de productos por categoría */}
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-lg border-b pb-2">{categoryNames[category] || category}</h3>
              <div className="space-y-2">
                {categoryItems.map((item) => {
                  const isUnavailable = unavailableItems.includes(item.id)
                  const isEditingPrice = editingPriceId === item.id

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        {isEditingPrice ? (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm">$</span>
                            <Input
                              type="number"
                              value={editingPriceValue}
                              onChange={(e) => setEditingPriceValue(e.target.value)}
                              className="h-8 w-24"
                              autoFocus
                            />
                            <Button
                              onClick={() => savePrice(item.id)}
                              size="icon"
                              variant="default"
                              className="h-8 w-8"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button onClick={cancelEditPrice} size="icon" variant="ghost" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-muted-foreground">${item.price} MXN</p>
                            <Button
                              onClick={() => startEditPrice(item.id, item.price)}
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => onToggleAvailability(item.id)}
                        variant={isUnavailable ? "destructive" : "default"}
                        size="sm"
                        className="shrink-0"
                      >
                        {isUnavailable ? (
                          <>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Agotado
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Disponible
                          </>
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
