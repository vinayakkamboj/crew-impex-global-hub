import Layout from "@/components/layout/Layout";
import { CheckCircle, Target, Eye, Award, Users, Lightbulb, Leaf } from "lucide-react";

const About = () => {
  const values = [
    { icon: Award, title: "Quality First", description: "We never compromise on the quality of the products we deliver." },
    { icon: CheckCircle, title: "Efficiency", description: "Our streamlined processes ensure products reach their destination quickly." },
    { icon: Users, title: "Integrity", description: "Honesty and transparency guide every interaction at Crew Impex." },
    { icon: Target, title: "Client-Centric", description: "Our clients are at the center of everything we do." },
    { icon: Lightbulb, title: "Innovation", description: "We embrace technology to streamline operations and enhance efficiency." },
    { icon: Leaf, title: "Sustainability", description: "Committed to sustainable sourcing and ethical business practices." },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-3">About Us</p>
            <h1 className="text-3xl md:text-4xl font-display text-primary-foreground mb-4">
              Building Trust Through <span className="text-secondary">Consistent Action</span>
            </h1>
            <p className="text-primary-foreground/80 text-base leading-relaxed">
              In the ever-evolving landscape of global trade, one thing remains constant: the need for trust, quality, and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display text-foreground mb-5">Who We Are</h2>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Crew Impex is a trusted export company specializing in high-quality footwear. We deliver premium products including formal shoes, casual wear, boots, sports shoes, and sneakers to businesses worldwide.
              </p>
              <p>
                Our focus is simple: provide exceptional products with reliable service. We work closely with our clients to understand their needs and deliver solutions that meet international quality standards.
              </p>
              <p>
                What sets us apart is our commitment to action over words. Every interaction is an opportunity to demonstrate our dedication to excellence, ensuring that your products reach their destination on time and in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Target size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To deliver top-quality products with efficiency, reliability, and speed. We ensure every product meets stringent quality standards and reaches its destination in the shortest possible time.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Eye size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To be recognized as a reliable partner in global exports—known for the quality of our products, the reliability of our services, and the strength of our client relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-3">Our Values</p>
            <h2 className="text-2xl md:text-3xl font-display text-primary-foreground">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6">
                <value.icon size={24} className="text-secondary mb-3" />
                <h3 className="text-base font-display text-primary-foreground mb-2">{value.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Export */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display text-foreground mb-5">What We Export</h2>
            <p className="text-muted-foreground text-sm mb-8">
              We specialize in exporting a wide range of high-quality footwear designed for global markets.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Formal Shoes", "Casual Footwear", "Boots", "Sports Shoes", "Sneakers"].map((item) => (
                <span key={item} className="px-4 py-2 bg-muted text-foreground text-sm rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;