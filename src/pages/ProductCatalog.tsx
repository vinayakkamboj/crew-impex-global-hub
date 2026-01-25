import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { productCategories } from "./Products";

import formalShoes1 from "@/assets/Formals1.jpg";
import formalShoes2 from "@/assets/fomal2.jpg";
import formalShoes3 from "@/assets/fomal3.jpg";
import formalShoes4 from "@/assets/fomal4.avif";
import formalShoes5 from "@/assets/fomal5.jpg";
import formalShoes6 from "@/assets/fomal7.jpg";


import Casualshoes1 from "@/assets/Casuals_img1.jpeg";
import Casualshoes2 from "@/assets/Casuals_img2.jpeg";
import Casualshoes3 from "@/assets/Casuals_img3.jpeg";
import Casualshoes4 from "@/assets/Casuals_img4.jpeg";
import Casualshoes5 from "@/assets/Casuals_img5.jpg";
import Casualshoes6 from "@/assets/Casual.jpg";



import BootShoes1 from "@/assets/women_boots_img1.jpg";
import BootShoes2 from "@/assets/women_boots_img2.jpg";
import BootShoes3 from "@/assets/women_boots_img3.jpg";
import BootShoes4 from "@/assets/women_boots_img4.jpg";
import BootShoes5 from "@/assets/women_boots_img5.jpg";
import BootShoes6 from "@/assets/women_boots_img6.jpg";
import BootShoes7 from "@/assets/Boots_img7.jpg";


import SneakersShoes1 from "@/assets/Sneaker_img1.jpeg";
import SneakersShoes2 from "@/assets/Sneaker_img2.jpeg.jpg";
import SneakersShoes3 from "@/assets/Sneaker_img3.jpg";
import SneakersShoes4 from "@/assets/Sneaker_img4.jpg";
import SneakersShoes5 from "@/assets/Sneaker_img5.jpg";
import SneakersShoes6 from "@/assets/Sneakers_img8.jpg";
import SneakersShoes7 from "@/assets/sneakers.jpg";
import SneakersShoes8 from "@/assets/Sneakers_img9.avif";

import SportsShoes1 from "@/assets/Sports_img1.jpg";
import SportsShoes2 from "@/assets/Sports_img2.jpg";
import SportsShoes3 from "@/assets/Sports_img3.jpg";
import SportsShoes4 from "@/assets/Sports_img4.avif";
import SportsShoes5 from "@/assets/Sports_img5.jpg";
import SportsShoes6 from "@/assets/Sports_img6.jpg";
import SportsShoes7 from "@/assets/Sports_img7.jpg";



const catalogItems = {
  formals: [
    { id: 1, name: "Oxford Classic", image: formalShoes1, colors: ["Black", "Brown", "Tan"] },
    { id: 2, name: "Derby Premium", image: formalShoes2, colors: ["Black", "Burgundy"] },
    { id: 3, name: "Monk Strap", image: formalShoes3, colors: ["Brown", "Cognac"] },
    { id: 4, name: "Loafer Executive", image: formalShoes4, colors: ["Black", "Brown"] },
    { id: 5, name: "Brogue Wingtip", image: formalShoes5, colors: ["Tan", "Black", "Burgundy"] },
    { id: 6, name: "Cap Toe Oxford", image: formalShoes6, colors: ["Black", "Brown"] },
  ],
  casuals: [
    { id: 1, name: "Canvas Slip-On", image: Casualshoes1, colors: ["Navy", "White", "Grey"] },
    { id: 2, name: "Leather Loafer", image: Casualshoes2, colors: ["Tan", "Brown"] },
    { id: 3, name: "Boat Shoes", image: Casualshoes3, colors: ["Navy", "Brown"] },
    { id: 4, name: "Espadrilles", image: Casualshoes4, colors: ["Blue", "Beige"] },
    { id: 5, name: "Moccasins", image: Casualshoes5, colors: ["Brown", "Tan", "Burgundy"] },
    { id: 6, name: "Suede Loafer", image: Casualshoes6, colors: ["Navy", "Grey", "Brown"] },

  ],
  boots: [
    { id: 1, name: "Chelsea Boot", image: BootShoes1, colors: ["Black", "Brown"] },
    { id: 2, name: "Work Boot", image: BootShoes2, colors: ["Brown", "Tan"] },
    { id: 3, name: "Hiking Boot", image: BootShoes3, colors: ["Grey", "Brown"] },
    { id: 4, name: "Chukka Boot", image: BootShoes4, colors: ["Suede Brown", "Black"] },
    { id: 5, name: "Combat Boot", image: BootShoes5, colors: ["Black", "Brown"] },
    { id: 6, name: "Desert Boot", image: BootShoes6, colors: ["Sand", "Brown", "Grey"] },
    { id: 7, name: "Lace-Up Boot", image: BootShoes7, colors: ["Black", "Tan"] },
  ],
  sports: [
    { id: 1, name: "Running Pro", image:SportsShoes1, colors: ["Red", "Black", "Blue"] },
    { id: 2, name: "Basketball Elite", image:SportsShoes2 , colors: ["White", "Black"] },
    { id: 3, name: "Tennis Ace", image:SportsShoes3 , colors: ["White", "Green"] },
    { id: 4, name: "Training Max", image:SportsShoes4, colors: ["Black", "Grey"] },
    { id: 5, name: "Football Cleats", image:SportsShoes5, colors: ["Black", "White", "Gold"] },
    { id: 6, name: "Cross Trainer", image: SportsShoes6, colors: ["Navy", "Grey"] },
    { id: 7, name: "Grey Sporty", image: SportsShoes7, colors: ["Navy", "Grey"] },

    
  ],
  sneakers: [
    { id: 1, name: "Urban Street", image: SneakersShoes1, colors: ["White", "Black", "Grey"] },
    { id: 2, name: "Retro Classic", image: SneakersShoes2, colors: ["Red", "Blue", "Green"] },
    { id: 3, name: "High Top", image: SneakersShoes3, colors: ["Black", "White"] },
    { id: 4, name: "Platform Casual", image: SneakersShoes4, colors: ["White", "Pink"] },
    { id: 5, name: "Low Top Canvas", image: SneakersShoes5, colors: ["Navy", "White", "Red"] },
    { id: 6, name: "Chunky Sole", image: SneakersShoes6, colors: ["Black", "White"] },
    { id: 7, name: "Minimalist Knit", image: SneakersShoes7, colors: ["Grey", "Black", "Navy"] },
    { id: 8, name: "Vintage Runner", image: SneakersShoes8, colors: ["Green", "Brown", "White"] },
  ],
  
};

const ProductCatalog = () => {
  const { categoryId } = useParams();
  const category = productCategories.find((c) => c.id === categoryId);
  const items = catalogItems[categoryId as keyof typeof catalogItems] || [];

  if (!category) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">Category Not Found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center text-primary-foreground/70 hover:text-secondary mb-6 gap-2">
            <ArrowLeft size={18} /> Back to Products
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-secondary font-medium tracking-widest uppercase mb-4">{category.name} Collection</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                {category.name}
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {category.features.map((feature) => (
                  <span key={feature} className="flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm">
                    <CheckCircle size={14} className="text-secondary" /> {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Items */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground mb-12 text-center">
            Browse Our <span className="text-secondary">{category.name}</span> Catalog
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-lg overflow-hidden border border-border hover:border-secondary transition-all group">
                <div className="aspect-square overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Colors: {item.colors.join(", ")}
                  </p>
                  <Link to="/contact">
                    <Button size="sm" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                      Inquire Now <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Interested in Our {category.name}?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us for bulk orders, custom designs, and competitive pricing. Our team is ready to assist you.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Contact Us <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ProductCatalog;