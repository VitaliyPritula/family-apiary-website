import { Phone, MessageCircle, Send, MapPin } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contacts" className="py-20 px-4 bg-gradient-to-b from-[#faf6f0] to-[#f0e7db] text-cream/60">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#32241b] mb-4">
          Зв&apos;яжіться з нами
        </h2>
        <p className="text-[#847062] text-lg mb-12 max-w-xl mx-auto">
          Замовляйте натуральний мед напряму від пасічника. Доставка по всій Україні.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#faf6f0] rounded-lg p-6 shadow-sm border border-border">
            <Phone className="w-8 h-8 text-[#e69419] mx-auto mb-3" />
            <h3 className="font-display font-semibold text-lg mb-1 text-[#32241b]">Телефон</h3>
            <a href="tel:+380990366231" className="hover:text-[#e69419] transition-colors text-[#847062]">
              +380 (99) 036-62-31
            </a>
          </div>

          <div className="bg-[#faf6f0] rounded-lg p-6 shadow-sm border border-border">
            <MapPin className="w-8 h-8 text-[#e69419] mx-auto mb-3" />
            <h3 className="font-display font-semibold text-[#32241b] text-lg mb-1">Місцезнаходження</h3>
            <p className="text-[#847062]">Полтавська область, Україна</p>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[linear-gradient(135deg,_#e69419,_#e0b152)] w-full text-primary-foreground font-semibold text-base px-8 hover:opacity-90 transition-opacity"
          >
            <a href="https://t.me/+380990366231/" target="_blank" rel="noopener noreferrer">
              <Send className="w-5 h-5 mr-2" />
              Telegram
            </a>
          </Button>
          <a
            href="viber://chat?number=%2B380990366231"
            className="flex items-center justify-center w-full border-2 border-[#e0b152] rounded-[18px] bg-[#faf6f0] text-[#32241b] font-semibold text-base px-8 py-2.5 hover:bg-primary/10"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Viber
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
