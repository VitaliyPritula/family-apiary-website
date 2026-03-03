// import heroImage from '../../public/hero-apiary.jpg';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
export default function Home() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		// trigger animation after mount
		setMounted(true);
	}, []);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0">
				<div className="relative w-full h-full">
					<Image
						src="/hero-apiary.jpg"
						alt="Apiary"
						fill
						className="object-cover opacity-70"
						priority
					/>
				</div>
			</div>
			{/* Content */}
			<div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in-up">
				<span className="inline-block text-honey-light font-body text-sm tracking-[0.3em] uppercase mb-4">
					Сімейна пасіка
				</span>
				<h1 className={`text-4xl md:text-5xl lg:text-7xl font-display font-bold text-cream leading-tight mb-6 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					Натуральний мед
					<br />
					<span className={`transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>з власної пасіки</span>
				</h1>
				<p className="text-cream/80 text-lg md:text-xl font-light max-w-xl mx-auto mb-10">
					Без домішок, без посередників. Чистий мед від сім&apos;ї, яка займається бджільництвом понад 10 років.
				</p>
				<div className="flex flex-col md:flex-row gap-4 justify-center">
					<Button
						asChild
						size="lg"
						className="bg-golden-gradient text-white mr-15 w-full text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
					>
						<a href="#products">Наша продукція</a>
					</Button>
					<Button
						asChild
						size="lg"
						variant="default"
						className="bg-golden-gradient text-white w-full mr-15 text-sm font-semibold px-9 py-2 rounded-lg hover:opacity-90 transition-opacity"
					>
						<a href="#contacts">Замовити мед</a>
					</Button>
				</div>
			</div>

			{/* Scroll indicator */}
			<a
				href="#products"
				className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 hover:text-cream transition-colors animate-bounce"
			>
				<ArrowDown className="w-6 h-6" />
			</a>
		</section>
	);
}
