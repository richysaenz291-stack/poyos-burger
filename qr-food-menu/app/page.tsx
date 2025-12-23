"use client"

import { useState, useEffect } from "react"
import { MenuSection } from "@/components/menu-section"
import { CartSheet } from "@/components/cart-sheet"
import { QRCodeDialog } from "@/components/qr-code-dialog"
import { AdminPanel } from "@/components/admin-panel"
import { ShoppingCart, QrCode, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isAvailable?: boolean
}

export type CartItem = MenuItem & {
  quantity: number
  notes?: string
}

const menuItems: MenuItem[] = [
  // Paquetes
  {
    id: "paq1",
    name: "Paquete #1",
    description:
      "1 kilo de carne asada, salsa norteño, pico de gallo, tortillas, guacamole, chiles o cebollas rellenos de queso con tocino, 1 salchicha",
    price: 280,
    image: "https://placehold.co/400x300?text=Paquete+completo+con+carne+asada+tortillas+guacamole+y+complementos",
    category: "paquetes",
  },
  {
    id: "paq2",
    name: "Paquete #2",
    description: "1 kilo de carne asada, salsa, pico de gallo, tortillas, limones, cebolla asada",
    price: 350,
    image: "https://placehold.co/400x300?text=Paquete+premium+carne+asada+con+tortillas+y+complementos+frescos",
    category: "paquetes",
  },
  // Hamburguesas
  {
    id: "h1",
    name: "Hamburguesa Especial",
    description: "Hamburguesa especial de la casa con papas fritas incluidas",
    price: 90,
    image: "https://placehold.co/400x300?text=Hamburguesa+especial+jugosa+con+queso+y+vegetales+frescos",
    category: "hamburguesas",
  },
  {
    id: "h2",
    name: "Hamburguesa Doble",
    description: "Doble carne con todos los ingredientes. Incluye papas fritas",
    price: 130,
    image: "https://placehold.co/400x300?text=Hamburguesa+doble+carne+con+queso+derretido+y+vegetales",
    category: "hamburguesas",
  },
  {
    id: "h3",
    name: "Hamburguesa Triple",
    description: "Triple carne para los más hambrientos. Incluye papas fritas",
    price: 130,
    image: "https://placehold.co/400x300?text=Hamburguesa+triple+carne+torre+de+sabor+con+queso",
    category: "hamburguesas",
  },
  {
    id: "h4",
    name: "Burger de Pollo",
    description: "Pechuga de pollo a la parrilla. Incluye papas fritas",
    price: 130,
    image: "https://placehold.co/400x300?text=Hamburguesa+de+pollo+a+la+parrilla+con+vegetales+frescos",
    category: "hamburguesas",
  },
  {
    id: "h5",
    name: "Salchiburger",
    description: "Hamburguesa con salchicha especial. Incluye papas fritas",
    price: 130,
    image: "https://placehold.co/400x300?text=Hamburguesa+con+salchicha+especial+y+queso+derretido",
    category: "hamburguesas",
  },
  {
    id: "h6",
    name: "Especial de Carne Asada",
    description: "Hamburguesa con carne asada de la casa. Incluye papas fritas",
    price: 130,
    image: "https://placehold.co/400x300?text=Hamburguesa+con+carne+asada+mexicana+y+guacamole",
    category: "hamburguesas",
  },
  {
    id: "h7",
    name: "Hamburguesa Hawaiana",
    description: "Con piña y jamón. Incluye papas fritas",
    price: 110,
    image: "https://placehold.co/400x300?text=Hamburguesa+hawaiana+con+piña+asada+y+jamon",
    category: "hamburguesas",
  },
  {
    id: "h8",
    name: "Hamburguesa Tocino",
    description: "Con tocino crujiente. Incluye papas fritas",
    price: 110,
    image: "https://placehold.co/400x300?text=Hamburguesa+con+tocino+crujiente+y+queso+cheddar",
    category: "hamburguesas",
  },
  {
    id: "h9",
    name: "Hamburguesa Philadelphia",
    description: "Con queso philadelphia cremoso. Incluye papas fritas",
    price: 110,
    image: "https://placehold.co/400x300?text=Hamburguesa+con+queso+philadelphia+cremoso+y+cebolla",
    category: "hamburguesas",
  },
  {
    id: "h10",
    name: "Hamburguesa BBQ",
    description: "Con salsa BBQ de la casa. Incluye papas fritas",
    price: 110,
    image: "https://placehold.co/400x300?text=Hamburguesa+BBQ+con+aros+de+cebolla+y+salsa",
    category: "hamburguesas",
  },
  {
    id: "h11",
    name: "Hamburguesa Champiñones",
    description: "Con champiñones frescos. Incluye papas fritas",
    price: 110,
    image: "https://placehold.co/400x300?text=Hamburguesa+gourmet+con+champinones+salteados+y+queso",
    category: "hamburguesas",
  },
  {
    id: "h12",
    name: "Hamburguesa Polaca",
    description: "Estilo polaco especial. Incluye papas fritas",
    price: 130,
    image: "https://placehold.co/400x300?text=Hamburguesa+polaca+con+ingredientes+especiales+y+salsa",
    category: "hamburguesas",
  },
  {
    id: "h13",
    name: "Hamburguesa Ají",
    description: "Con ají y sabor picante. Incluye papas fritas",
    price: 110,
    image: "https://placehold.co/400x300?text=Hamburguesa+con+aji+picante+y+vegetales+frescos",
    category: "hamburguesas",
  },
  {
    id: "h14",
    name: "Hamburguesa Norteña",
    description: "Estilo norteño con carne y salsa. Incluye papas fritas",
    price: 130,
    image: "https://placehold.co/400x300?text=Hamburguesa+nortena+con+carne+asada+y+salsa+especial",
    category: "hamburguesas",
  },
  {
    id: "h15",
    name: "Hamburguesa Guacamole",
    description: "Con guacamole fresco. Incluye papas fritas",
    price: 110,
    image: "https://placehold.co/400x300?text=Hamburguesa+con+guacamole+fresco+y+pico+de+gallo",
    category: "hamburguesas",
  },
  {
    id: "h16",
    name: "Hamburguesa Tortuga",
    description: "La hamburguesa más grande de la casa. Incluye papas fritas",
    price: 160,
    image: "https://placehold.co/400x300?text=Hamburguesa+tortuga+gigante+con+multiples+ingredientes+premium",
    category: "hamburguesas",
  },
  // Tacos y Platillos
  {
    id: "t1",
    name: "Tacos de Carne Asada",
    description: "Orden de tacos con carne asada de calidad",
    price: 120,
    image: "https://placehold.co/400x300?text=Tacos+de+carne+asada+con+cebolla+cilantro+y+salsa",
    category: "tacos",
  },
  {
    id: "p1",
    name: "Papa Asada",
    description: "Papa asada grande con mantequilla",
    price: 120,
    image: "https://placehold.co/400x300?text=Papa+asada+grande+con+mantequilla+y+complementos",
    category: "papas",
  },
  {
    id: "p2",
    name: "Burrito de Carne Asada",
    description: "Burrito grande relleno de carne asada",
    price: 120,
    image: "https://placehold.co/400x300?text=Burrito+de+carne+asada+con+frijoles+y+queso",
    category: "tacos",
  },
  {
    id: "p3",
    name: "Papas a la Francesa",
    description: "Orden de papas fritas crujientes",
    price: 60,
    image: "https://placehold.co/400x300?text=Papas+a+la+francesa+crujientes+y+doradas",
    category: "papas",
  },
  {
    id: "p4",
    name: "Salchicha Preparada Roja",
    description: "Salchicha preparada estilo roja",
    price: 50,
    image: "https://placehold.co/400x300?text=Salchicha+preparada+roja+con+salsas+y+verduras",
    category: "tacos",
  },
  {
    id: "p5",
    name: "Polaca",
    description: "Salchicha estilo polaco preparada",
    price: 60,
    image: "https://placehold.co/400x300?text=Polaca+con+cebolla+caramelizada+y+salsas",
    category: "tacos",
  },
  // Extras
  {
    id: "e1",
    name: "Tocino Extra",
    description: "Porción adicional de tocino crujiente",
    price: 20,
    image: "https://placehold.co/400x300?text=Tocino+crujiente+dorado",
    category: "extras",
  },
  {
    id: "e2",
    name: "Queso Philadelphia Extra",
    description: "Porción adicional de queso philadelphia",
    price: 20,
    image: "https://placehold.co/400x300?text=Queso+philadelphia+cremoso",
    category: "extras",
  },
  {
    id: "e3",
    name: "BBQ Extra",
    description: "Porción adicional de salsa BBQ",
    price: 10,
    image: "https://placehold.co/400x300?text=Salsa+BBQ+casera",
    category: "extras",
  },
  {
    id: "e4",
    name: "Queso Amarillo Extra",
    description: "Porción adicional de queso amarillo",
    price: 10,
    image: "https://placehold.co/400x300?text=Queso+amarillo+derretido",
    category: "extras",
  },
  {
    id: "e5",
    name: "Queso Blanco Extra",
    description: "Porción adicional de queso blanco",
    price: 20,
    image: "https://placehold.co/400x300?text=Queso+blanco+fresco",
    category: "extras",
  },
  {
    id: "e6",
    name: "Champiñón Extra",
    description: "Porción adicional de champiñones",
    price: 20,
    image: "https://placehold.co/400x300?text=Champinones+salteados+frescos",
    category: "extras",
  },
  {
    id: "e7",
    name: "Orden con Tocino Extra",
    description: "Orden completa con tocino adicional",
    price: 20,
    image: "https://placehold.co/400x300?text=Orden+con+tocino+extra+crujiente",
    category: "extras",
  },
  {
    id: "e8",
    name: "Porción de Guacamole",
    description: "Guacamole fresco de la casa",
    price: 30,
    image: "https://placehold.co/400x300?text=Guacamole+fresco+con+aguacate+y+limon",
    category: "extras",
  },
  {
    id: "e9",
    name: "Piñas Extra",
    description: "Porción adicional de piña",
    price: 20,
    image: "https://placehold.co/400x300?text=Pina+asada+caramelizada",
    category: "extras",
  },
  {
    id: "e10",
    name: "Queso Norteño Extra",
    description: "Porción adicional de queso norteño",
    price: 50,
    image: "https://placehold.co/400x300?text=Queso+norteno+artesanal",
    category: "extras",
  },
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [unavailableItems, setUnavailableItems] = useState<string[]>([])
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({})
  const [customProducts, setCustomProducts] = useState<MenuItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("unavailableItems")
    if (stored) {
      setUnavailableItems(JSON.parse(stored))
    }
    const storedPrices = localStorage.getItem("customPrices")
    if (storedPrices) {
      setCustomPrices(JSON.parse(storedPrices))
    }
    const storedProducts = localStorage.getItem("customProducts")
    if (storedProducts) {
      setCustomProducts(JSON.parse(storedProducts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("unavailableItems", JSON.stringify(unavailableItems))
  }, [unavailableItems])

  useEffect(() => {
    localStorage.setItem("customPrices", JSON.stringify(customPrices))
  }, [customPrices])

  useEffect(() => {
    localStorage.setItem("customProducts", JSON.stringify(customProducts))
  }, [customProducts])

  const toggleAvailability = (itemId: string) => {
    setUnavailableItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId)
      }
      return [...prev, itemId]
    })
  }

  const updatePrice = (itemId: string, newPrice: number) => {
    setCustomPrices((prev) => ({
      ...prev,
      [itemId]: newPrice,
    }))
  }

  const addNewProduct = (product: Omit<MenuItem, "id">) => {
    const newId = `custom-${Date.now()}`
    const newProduct = { ...product, id: newId }
    setCustomProducts((prev) => [...prev, newProduct])
  }

  const allMenuItems = [...menuItems, ...customProducts]

  const getAvailableItems = (category: string) => {
    return allMenuItems
      .filter((item) => item.category === category)
      .map((item) => ({
        ...item,
        price: customPrices[item.id] ?? item.price,
        isAvailable: !unavailableItems.includes(item.id),
      }))
  }

  const addToCart = (item: MenuItem) => {
    if (unavailableItems.includes(item.id)) {
      return
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const updateNotes = (id: string, notes: string) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, notes } : item)))
  }

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Poyos Burger</h1>
              <p className="text-sm md:text-base opacity-90 mt-1">Juarez, Nuevo León</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setIsAdminOpen(true)} size="icon" variant="secondary" title="Administrar menú">
                <Settings className="h-5 w-5" />
              </Button>
              <Button onClick={() => setIsQRDialogOpen(true)} size="lg" variant="secondary" className="hidden md:flex">
                <QrCode className="h-5 w-5 mr-2" />
                Compartir
              </Button>
              <Button onClick={() => setIsQRDialogOpen(true)} size="icon" variant="secondary" className="md:hidden">
                <QrCode className="h-5 w-5" />
              </Button>
              <Button onClick={() => setIsCartOpen(true)} size="lg" variant="secondary" className="relative">
                <ShoppingCart className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Mi Orden</span>
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground font-bold">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Las Mejores Hamburguesas de Juarez</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Hechas con ingredientes frescos y mucho sabor. Ordena ahora y disfruta.
          </p>
          <div className="mt-6 inline-block bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-sm md:text-base font-semibold">Horario: Lunes a Domingo 6:00 PM - 2:00 AM</p>
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <main className="container mx-auto px-4 py-12">
        <MenuSection title="Paquetes" items={getAvailableItems("paquetes")} onAddToCart={addToCart} />
        <MenuSection
          title="Hamburguesas"
          description="Todas las hamburguesas incluyen papas fritas"
          items={getAvailableItems("hamburguesas")}
          onAddToCart={addToCart}
        />
        <MenuSection title="Tacos y Burritos" items={getAvailableItems("tacos")} onAddToCart={addToCart} />
        <MenuSection title="Papas" items={getAvailableItems("papas")} onAddToCart={addToCart} />
        <MenuSection title="Extras" items={getAvailableItems("extras")} onAddToCart={addToCart} />
      </main>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-12 mt-16 border-t">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-bold text-xl mb-2">Poyos Burger</h3>
          <p className="text-sm mb-4">Juarez, Nuevo León, México</p>
          <p className="text-sm font-medium">Horario: Lunes a Domingo 6:00 PM - 2:00 AM</p>
        </div>
      </footer>

      {/* Admin Panel */}
      <AdminPanel
        items={allMenuItems.map((item) => ({
          ...item,
          price: customPrices[item.id] ?? item.price,
        }))}
        unavailableItems={unavailableItems}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onToggleAvailability={toggleAvailability}
        onUpdatePrice={updatePrice}
        onAddNewProduct={addNewProduct}
      />

      {/* Cart Sheet */}
      <CartSheet
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onUpdateNotes={updateNotes}
      />

      <QRCodeDialog isOpen={isQRDialogOpen} onClose={() => setIsQRDialogOpen(false)} />
    </div>
  )
}
