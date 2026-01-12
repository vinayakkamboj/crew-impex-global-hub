import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Submitted!",
      description: "Thank you for your inquiry. Our team will get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", phone: "", product: "", message: "" });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "sales@crewimpex.com" },
    { icon: Phone, label: "Phone", value: "+91 9876543210" },
    { icon: MapPin, label: "Address", value: "Ghaziabad, Uttar Pradesh, India 201010" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-secondary text-sm font-medium tracking-widest uppercase mb-3">Contact Us</p>
            <h1 className="text-3xl md:text-4xl font-display text-primary-foreground mb-4">
              Let's Start a <span className="text-secondary">Conversation</span>
            </h1>
            <p className="text-primary-foreground/80 text-base leading-relaxed">
              Have questions about our products or services? Ready to place an order? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-display text-foreground mb-4">Get In Touch</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Reach out through any of the channels below or fill out the inquiry form.
              </p>
              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                      <p className="text-foreground text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-muted rounded-lg">
                <h3 className="font-display text-sm text-foreground mb-2">Business Hours</h3>
                <p className="text-muted-foreground text-xs">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground text-xs">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-muted-foreground text-xs">Sunday: Closed</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h2 className="text-xl font-display text-foreground mb-5">Send Us an Inquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Full Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="h-10 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="h-10 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Company Name</label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="h-10 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="h-10 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Product Interest</label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a product category</option>
                      <option value="formals">Formals</option>
                      <option value="casuals">Casuals</option>
                      <option value="boots">Boots</option>
                      <option value="sports">Sports</option>
                      <option value="sneakers">Sneakers</option>
                      <option value="multiple">Multiple Categories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Your Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      required
                      className="text-sm"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 h-11 text-sm font-medium">
                    <Send size={16} /> Submit Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Quick Response", description: "Get a reply within 24 hours" },
              { title: "Expert Guidance", description: "Our team helps you choose the right products" },
              { title: "Competitive Pricing", description: "Best rates for bulk orders" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-sm text-foreground mb-0.5">{item.title}</h3>
                  <p className="text-muted-foreground text-xs">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;