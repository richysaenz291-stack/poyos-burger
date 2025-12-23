"use client"

import type { CartItem } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface CartSheetProps {
  cart: CartItem[]
  isOpen: boolean
  onClose: () => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onUpdateNotes: (id: string, notes: string) => void
}

export function CartSheet({ cart, isOpen, onClose, onUpdateQuantity, onRemoveItem, onUpdateNotes }: CartSheetProps) {
  const [isSending, setIsSending] = useState(false)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleWhatsAppOrder = async () => {
    setIsSending(true)

    const orderText = cart
      .map((item) => {
        let text = `${item.quantity}x ${item.name} - $${item.price * item.quantity}`
        if (item.notes && item.notes.trim()) {
          text += `\n   📝 Nota: ${item.notes}`
        }
        return text
      })
      .join("\n\n")

    const total = `\n\nTotal: $${subtotal} MXN`
    const message = `Hola! Me gustaría hacer el siguiente pedido:\n\n${orderText}${total}`

    const whatsappUrl = `https://wa.me/5218132371727?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    setIsSending(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Mi Orden</SheetTitle>
          <SheetDescription className="text-base">Revisa tu pedido antes de ordenar</SheetDescription>
        </SheetHeader>

        <div className="flex-1 flex flex-col mt-6 min-h-0">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
              <ShoppingBag className="h-20 w-20 text-muted-foreground/50" />
              <div>
                <p className="text-lg font-semibold text-foreground mb-1">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground">Agrega algunos productos del menú</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 min-h-0">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 p-4 bg-card border border-border rounded-lg shadow-sm"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image || "https://placehold.co/80x80?text=Producto"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{item.name}</h3>
                        <p className="text-sm font-bold text-primary mb-2">${item.price} MXN</p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`notes-${item.id}`} className="text-xs text-muted-foreground">
                        Notas especiales (opcional)
                      </Label>
                      <Textarea
                        id={`notes-${item.id}`}
                        placeholder="Ej: Sin cebolla, sin tomate, sin pepinillos..."
                        value={item.notes || ""}
                        onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                        className="min-h-[60px] text-sm resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4 flex-shrink-0 border-t mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold">${subtotal} MXN</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-2xl text-primary">${subtotal} MXN</span>
                  </div>
                </div>
                <Button onClick={handleWhatsAppOrder} size="lg" className="w-full font-semibold" disabled={isSending}>
                  {isSending ? "Enviando..." : "Ordenar por WhatsApp"}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
