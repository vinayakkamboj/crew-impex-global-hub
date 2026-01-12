import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-3 animate-fade-in">
            Global Moves, Seamless Reach
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-primary-foreground leading-tight mb-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your Trusted Partner in
            <span className="text-secondary block mt-1">Global Exports</span>
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Delivering high-quality footwear products worldwide with efficiency, reliability, and speed. Building lasting partnerships through consistent action.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/products">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 h-11 text-sm">
                Explore Products <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-11 text-sm">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;