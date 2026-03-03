'use client';
import { useCartStore } from '@/app/store/useCartStore';
import { Check, ShoppingCart } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import pollen from "../../../../public/pollen.jpg";
import propolis from "../../../../public/propolis.jpg";
import honeyJar from "../../../../public/honey-jar.jpg";

type Category = "all" | "honey" | "supplements";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: StaticImageData | string;
  alt: string;
  category: Category;
}

const products: Product[] = [
  {
    id: "honey-flower",
    title: "Квітковий мед",
    description: "Збір з різнотрав'я — липа, акація, гречка. Ароматний, золотистий, з ніжним смаком.",
    price: "від 250 ₴ / л",
    image: honeyJar,
    alt: "Банка золотистого квіткового меду",
    category: "honey",
  },
  {
    id: "honey-linden",
    title: "Липовий мед",
    description: "Ніжний світлий мед з вираженим ароматом липи. Чудово підходить при застуді.",
    price: "від 280 ₴ / л",
    image: honeyJar,
    alt: "Банка липового меду",
    category: "honey",
  },
  {
    id: "honey-buckwheat",
    title: "Гречаний мед",
    description: "Темний, насичений мед з пікантним смаком. Багатий на залізо та антиоксиданти.",
    price: "від 270 ₴ / л",
    image: honeyJar,
    alt: "Банка гречаного меду",
    category: "honey",
  },
  {
    id: "pollen",
    title: "Бджолиний пилок",
    description: "Натуральний квітковий пилок — джерело вітамінів та амінокислот. Ідеальна добавка.",
    price: "від 180 ₴ / 200г",
    image: pollen,
    alt: "Бджолиний пилок у дерев'яній мисці",
    category: "supplements",
  },
  {
    id: "propolis",
    title: "Прополіс",
    description: "Природний антисептик з вулика. Зміцнює імунітет та покращує загальне здоров'я.",
    price: "від 120 ₴ / 50г",
    image: propolis,
    alt: "Натуральний прополіс",
    category: "supplements",
  },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "Усі" },
  { value: "honey", label: "🍯 Мед" },
  { value: "supplements", label: "🌿 Добавки" },
];

type SortOrder = "default" | "price-asc" | "price-desc";

interface FilterState {
  category: Category;
  sortOrder: SortOrder;
}
type FilterAction =
  | { type: "SET_CATEGORY"; payload: Category }
  | { type: "SET_SORT"; payload: SortOrder }
  | { type: "RESET" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SORT":
      return { ...state, sortOrder: action.payload };
    case "RESET":
      return { category: "all", sortOrder: "default" };
    default:
      return state;
  }
}
// --- початкова ціна ----
function parsePrice(priceStr: string): number {
  const match = priceStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// --- Component ---
const ProductSection = () => {
  const [state, dispatch] = useReducer(filterReducer, {
    category: "all",
    sortOrder: "default",
  });
  const [flying, setFlying] = useState<{
    id: string;
    src: string;
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null>(null);

  const productImagesRef = useRef<Record<string, HTMLDivElement | null>>({});

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const filteredProducts = useMemo(() => {
    let result = state.category === "all"
      ? products
      : products.filter((p) => p.category === state.category);

    if (state.sortOrder === "price-asc") {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (state.sortOrder === "price-desc") {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return result;
  }, [state.category, state.sortOrder]);

  const handleAddToCart = useCallback((product: Product) => {
    const imageEl = productImagesRef.current[product.id];
    const cartBtn = document.getElementById('cart-button');

    if (imageEl) {
      const imageRect = imageEl.getBoundingClientRect();
      let endX = window.innerWidth - 30; // чебраўны размяшчэнне кошыка (верхні права)
      let endY = 30;

      // Если кнопка у кошика найдадзена, выкарыстоўваем яе пазіцыю
      if (cartBtn) {
        const cartRect = cartBtn.getBoundingClientRect();
        endX = cartRect.left + cartRect.width / 2;
        endY = cartRect.top + cartRect.height / 2;
      }

      setFlying({
        id: product.id,
        src: typeof product.image === 'string' ? product.image : product.image.src,
        start: {
          x: imageRect.left + imageRect.width / 2,
          y: imageRect.top + imageRect.height / 2,
        },
        end: {
          x: endX,
          y: endY,
        },
      });

      setTimeout(() => setFlying(null), 800);
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  }, [addItem]);

  const isInCart = useCallback((id: string) => cartItems.some((i) => i.id === id),
    [cartItems]
  );

  return (
    <section id="products" className="py-20 px-4 bg-[#FAF6F0]">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#e69419] font-body text-sm tracking-[0.2em] uppercase">
            Що ми пропонуємо
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#32241b] mt-2">
            Наша продукція
          </h2>
        </div>
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() =>
                  dispatch({ type: "SET_CATEGORY", payload: cat.value })
                }
                className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-200  ${state.category === cat.value
                  ? "bg-golden-gradient text-primary-foreground"
                  : "bg-[#f4efe6] text-[#847062] border-border hover:border-primary/50 hover:text-foreground"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Sort */}
          <select value={state.sortOrder}
            onChange={(e) =>
              dispatch({
                type: "SET_SORT",
                payload: e.target.value as SortOrder,
              })
            }
            className="bg-card border border-[#f4efe6] rounded-lg px-3 py-2 text-sm text-[#32241b] focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="default">За замовчуванням</option>
            <option value="price-asc">За ціною від дешевих</option>
            <option value="price-desc">За ціною від дорогих</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const inCart = isInCart(product.id);
            return (
              <div key={product.id} className="group bg-[#f4efe6] rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  ref={(el) => {
                    if (el) productImagesRef.current[product.id] = el;
                  }}
                  className="aspect-square overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl text-[#32241b] mb-2">
                    {product.title}
                  </h3>
                  <p className="text-[#847062] text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <span className="inline-block bg-[#e694191a] text-[#e69419] font-semibold text-sm px-4 py-1.5 rounded-full">
                      {product.price}
                    </span>
                    <button
                      onClick={() =>
                        inCart ? toggleCart() : handleAddToCart(product)
                      }
                      className="flex items-center gap-1.5 bg-golden-gradient text-primary-foreground text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-90"
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4"  />У кошику
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Додати
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredProducts.length === 0 && (
            <p className='text-center text-foreground mt-8'>Товарів у цій категорії поки немає</p>
          )}
        </div>

        {/* Flying image animation */}
        {flying && (
          <div
            className="fixed pointer-events-none"
            style={{
              left: flying.start.x,
              top: flying.start.y,
              transform: 'translate(-50%, -50%)',
              animation: `flyToCart 0.8s ease-in forwards`,
              '--start-x': `${flying.start.x}px`,
              '--start-y': `${flying.start.y}px`,
              '--end-x': `${flying.end.x}px`,
              '--end-y': `${flying.end.y}px`,
            } as React.CSSProperties & Record<`--${string}`, string>}
          >
            <img
              src={flying.src}
              alt="flying"
              className="w-12 h-12 rounded-lg shadow-lg"
            />
          </div>
        )}

        <style>{`
					@keyframes flyToCart {
						from {
							transform: translate(-50%, -50%) scale(1);
							opacity: 1;
						}
						to {
							transform: translate(calc(-50% + (var(--end-x) - var(--start-x))), calc(-50% + (var(--end-y) - var(--start-y)))) scale(0.1);
							opacity: 0;
						}
					}
				`}</style>
      </div>
    </section>
  );

};

export default ProductSection;