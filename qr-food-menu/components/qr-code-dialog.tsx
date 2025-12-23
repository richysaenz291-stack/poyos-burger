"use client"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Share2, Copy, Check } from "lucide-react"

interface QRCodeDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function QRCodeDialog({ isOpen, onClose }: QRCodeDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [menuUrl, setMenuUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMenuUrl(window.location.href)
    }
  }, [])

  useEffect(() => {
    if (isOpen && canvasRef.current && menuUrl) {
      generateQRCode(menuUrl)
    }
  }, [isOpen, menuUrl])

  const generateQRCode = async (text: string) => {
    if (!canvasRef.current) return

    try {
      const QRCode = (await import("qrcode")).default
      await QRCode.toCanvas(canvasRef.current, text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#2d2d2d",
          light: "#ffffff",
        },
      })
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  const handleDownload = () => {
    if (!canvasRef.current) return

    const url = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "poyos-burger-menu-qr.png"
    link.href = url
    link.click()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copying link:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Poyos Burger - Menú Digital",
          text: "Mira nuestro menú digital",
          url: menuUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Compartir Menú</DialogTitle>
          <DialogDescription className="text-base">
            Escanea el código QR o comparte el enlace del menú digital
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <canvas ref={canvasRef} />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Button onClick={handleDownload} variant="outline" className="w-full bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Descargar QR
            </Button>

            <Button onClick={handleCopyLink} variant="outline" className="w-full bg-transparent">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Enlace
                </>
              )}
            </Button>

            {typeof navigator !== "undefined" && navigator.share && (
              <Button onClick={handleShare} variant="default" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
