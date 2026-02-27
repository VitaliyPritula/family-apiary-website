import { useReducer, useMemo, useCallback } from 'react';
import { ShoppingCart, Check } from "lucide-react";
import honeyJar from "@assets/images/honey-jar.png";
import pollen from "@assets/images/pollen.png";
import propolis from "@assets/images/propolis.png";
import { useCartStore } from '@/app/store/useCartStore';

type Category = "all" | "honey" | "supplements";

interface Product { 
	id: string;
	title: string;
	description: string;
	price: string;
	image: string;
	alt: string;
	category: Category;
}

const categories: { value: Category; label: string }[] = [
	{ value: "all", label: "Усі" },
	{ value: "honey", label: "🍯 Мед" },
	{ value: "supplements", label: "🌿 Добавки" },
];

const ProductSection = () => {
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
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
					<div className="flex gap-2 flex-wrap justify-center">
						{categories.map((cat) => {
							
						})}
					</div>
				</div>
				</div>
		</section>
	)
};

export default ProductSection;