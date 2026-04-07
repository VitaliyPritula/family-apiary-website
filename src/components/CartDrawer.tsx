'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/store/sheet";
import { useCartStore } from '@/app/store/useCartStore';
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export default function Cartdrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();
  const total = totalPrice();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#e69419]" />
            Кошик ({totalItems})
          </SheetTitle>
          <SheetDescription>
            Ваші обрані товари з пасіки
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[#847062] text-sm">Кошик порожній</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 mt-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-[#f4efe6] border border-border rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-sm text-[#847062] truncate">{item.title}</h4>
                    <p className="text-sm text-[#e69419]">{item.price} грн</p>
                    <div className="flex items-center gap-2 mt-">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full bg-[#ece7df] flex items-center justify-center hover:bg-secondary transition-colors"
                        aria-label="Зменшити кількіість"
                      >
                        <Minus className="w-3 h-3 text-[#32241b]" />
                      </button>
                      <span className="text-sm font-medium w-6 text-[#32241b] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full bg-[#ece7df] flex items-center justify-center hover:bg-secondary transition-colors"
                        aria-label="Збільшити кількість"
                      >
                        <Plus className="w-3 h-3 text-[#32241b]" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors self-start"
                    aria-label="Видалити"
                  >
                    <Trash2 className="w-4 h-4 text-[#32241b]" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border border-[#e4dbcd] pt-4 space-y-3">              <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#32241b]">Загальна сума:</span>
              <span className="text-lg font-bold text-[#e69419]">{total} ₴</span>
            </div>              <button
              onClick={clearCart}
              className="w-full text-sm text-[#32241b] hover:text-destructive transition-colors"
            >
                Очистити кошик
              </button>
              <a
                href="/Checkout"
                onClick={() => setOpen(false)}
                className="block w-full bg-golden-gradient text-primary-foreground text-sm font-semibold px-5 py-3 rounded-lg text-center hover:opacity-90 transition-opacity"
              >
                Оформити замовлення
              </a>
            </div>
          </>
        )}

      </SheetContent>
    </Sheet>
  )
}
