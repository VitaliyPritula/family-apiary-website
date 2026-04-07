'use client';
import { Heart, Leaf, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "З любов'ю до справи",
    text: "Наша сім'я займається бджільництвом понад 20 років. Це не просто робота — це покликання і традиція, яку ми передаємо з покоління в покоління.",
  },
  {
    icon: Leaf,
    title: "100% натуральний продукт",
    text: "Пасіка розташована далеко від промислових зон. Бджоли збирають нектар з екологічно чистих лугів Полтавщини.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантія якості",
    text: "Кожна партія меду проходить перевірку. Ми не додаємо цукор, воду чи будь-які домішки. Тільки чистий мед.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="bg-[#FAF6F0] text-[#32241b] py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#e69419] font-body text-sm tracking-[0.2em] uppercase">Наша історія</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#32241b] mt-2">
            Про пасіку
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="bg-[#e69419]/[.1] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-[#e69419]" size={48} />
              </div>
              <h3 className="font-display font-semibold text-lg text-[#32241b] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#847062] leading-relaxed text-sm">
                {feature.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
export default AboutSection