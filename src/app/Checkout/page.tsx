'use client';
import { useCartStore } from "@/app/store/useCartStore";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Minus, Plus, Send, ShoppingCart, Trash2, } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import emailjs from '@emailjs/browser';

function parsePrice(priceStr: string): number {
  const match = priceStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function Checkout() {
  const router = useRouter();
  // const items = useCartStore((s) => s.items);
  const { toast } = useToast();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    delivery: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0),
    [items]
  );

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";

    let normalized = digits;
    if (normalized.startsWith("0")) {
      normalized = "380" + normalized.slice(1);
    }

    if (!normalized.startsWith("380")) {
      return "+" + normalized.slice(0, 3) + (normalized.length > 3 ? " " + normalized.slice(3, 5) : "");
    }

    const local = normalized.slice(3);
    const part1 = local.slice(0, 2);
    const part2 = local.slice(2, 5);
    const part3 = local.slice(5, 7);
    const part4 = local.slice(7, 9);

    return [
      "+380",
      part1,
      part2 || "",
      part3 || "",
      part4 || "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.name === "phone" ? formatPhone(e.target.value) : e.target.value;
      setForm((prev) => ({ ...prev, [e.target.name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (items.length === 0) return;

      setIsSubmitting(true);

      // Prepare order details
      const orderDetails = {
        name: form.name,
        phone: form.phone,
        city: form.city,
        delivery: form.delivery,
        comment: form.comment,
        items: items.map(item => `${item.title} x${item.quantity} - ${item.price}`).join('\n'),
        total: `${totalPrice} ₴`,
      };

      try {
        // Send email using EmailJS
        await emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          orderDetails,
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );

        console.log("Order submitted:", { items, form, totalPrice });

        setSubmitted(true);
        clearCart();
        toast({
          title: "Замовлення оформлено! 🎉",
          description: "Ми зв'яжемося з вами найближчим часом.",
        });
      } catch (error) {
        console.error("Error sending email:", error);
        toast({
          title: "Помилка відправки",
          description: "Спробуйте ще раз або зв'яжіться з нами.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [items, form, totalPrice, clearCart, toast]
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🐝</div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Дякуємо за замовлення!
          </h1>
          <p className="text-muted-foreground mb-8">
            Ми отримали ваше замовлення і зв&apos;яжемося з вами найближчим часом для підтвердження.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-honey text-primary-foreground hover:opacity-90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            На головну
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#fff]">
      <section className="bg-[#f5f4f2] pt-14">
        <div className="container max-w-6xl mx-auto pt-8 pb-5">
          <div className=""></div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-[#363535] hover:text-[#dd5b0ad6] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 " />
            </button>
            <h2 className="text-2xl flex items-center gap-2 font-bold text-[#363535]">
              <ShoppingCart className="w-5 h-5 text-[#9b5529]" />
              Оформлення замовлення</h2>
          </div>
        </div>
      </section>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 text-[#847062]">🛒</div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Кошик порожній
            </h2>
            <p className="text-muted-foreground mb-6">
              Додайте товари з нашої продукції
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-honey text-primary-foreground hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              До продукції
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Cart items — 3 cols */}
              <div className="lg:col-span-3 space-y-4">
                <h2 className="font-display text-lg font-semibold text-[#363535] mb-2">
                  Ваші товари
                </h2>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-[#f4efe6] rounded-lg border border-1 border-[#e4dbcd]"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-[#32241b]">
                        {item.title}
                      </h3>
                      <p className="text-[#e69419] text-sm font-semibold mt-0.5">
                        {item.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-[#ece7df] flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#32241b]" />
                        </button>
                        <span className="text-sm text-[#32241b] font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-[#ece7df] flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#32241b]" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#32241b]" />
                      </button>
                      <span className="text-sm font-semibold text-[#32241b]">
                        {parsePrice(item.price) * item.quantity} ₴
                      </span>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center p-4 bg-[#f4efe6] rounded-lg border border-[#e4dbcd]">
                  <span className="font-display font-semibold text-[#32241b]">
                    Разом:
                  </span>
                  <span className="font-display text-xl font-semibold text-[#e69419]">
                    {totalPrice} ₴
                  </span>
                </div>
              </div>

              {/* Customer info form — 2 cols */}
              <div className="lg:col-span-2">
                <div className="bg-[#f4efe6] border border-border rounded-lg p-6 space-y-5 sticky top-8">
                  <h2 className="font-display text-lg font-semibold text-[#32241b]">
                    Ваші дані
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="name">Ім&apos;я *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Іван Петренко"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      maxLength={17}
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+380 XX XXX XX XX"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Місто *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Київ"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery">Адреса доставки</Label>
                    <Input
                      id="delivery"
                      name="delivery"
                      value={form.delivery}
                      onChange={handleChange}
                      placeholder="Нова Пошта, відділення №..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Коментар</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      value={form.comment}
                      onChange={handleChange}
                      placeholder="Побажання до замовлення..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#e69419] text-primary-foreground hover:opacity-90 h-12 text-base font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Відправка..." : "Оформити замовлення"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
