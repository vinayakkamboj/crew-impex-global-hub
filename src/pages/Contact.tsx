import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Send, CheckCircle, Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import emailjs from '@emailjs/browser';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'Crew Impex';
const CLOUDINARY_CLOUD_NAME = 'dywgmi2ao';

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');
    img.onload = () => {
      const maxSize = 800;
      let { width, height } = img;
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
          resolve(compressedFile);
        } else {
          resolve(file);
        }
      }, 'image/jpeg', 0.7);
    };
    img.src = URL.createObjectURL(file);
  });
};

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isCustomize = searchParams.get("customize") === "true";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "",
    message: "",
    customizationComment: "",
  });
  
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const totalFiles = uploadedImages.length + newFiles.length;
      if (totalFiles > 6) {
        toast({
          title: "Too many images",
          description: "You can upload up to 6 images only.",
          variant: "destructive",
        });
        return;
      }
      
      const compressedFiles: File[] = [];
      const previewPromises: Promise<string>[] = [];
      
      for (const file of newFiles) {
        const compressed = await compressImage(file);
        compressedFiles.push(compressed);
        
        const previewPromise = new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(compressed);
        });
        previewPromises.push(previewPromise);
      }
      
      const previews = await Promise.all(previewPromises);
      setUploadedImages(prev => [...prev, ...compressedFiles]);
      setImagePreviews(prev => [...prev, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formDataUpload
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const imageUrls: string[] = [];
      
      // Upload images to Cloudinary
      if (uploadedImages.length > 0) {
        for (const image of uploadedImages) {
          const url = await uploadImageToCloudinary(image);
          imageUrls.push(url);
        }
      }

      // Generate HTML for clickable image links
      const imageLinksHtml = imageUrls.length > 0 
        ? imageUrls.map((url, i) => `<a href="${url}" target="_blank" style="color: #d4af37; text-decoration: underline;">Image ${i + 1}</a>`).join(' | ')
        : "No images uploaded";

      // Generate HTML for image thumbnails (visible in email)
      const imageThumbnailsHtml = imageUrls.length > 0 
        ? imageUrls.map((url, i) => `<img src="${url}" alt="Reference Image ${i + 1}" style="max-width: 150px; height: auto; margin: 5px; border-radius: 5px; border: 1px solid #ddd; display: inline-block;" />`).join('')
        : "<p style='color: #666;'>No images uploaded</p>";

      const templateParams = {
        name: formData.name,
        email: formData.email,
        company: formData.company || "Not provided",
        phone: formData.phone || "Not provided",
        product: formData.product || "Not specified",
        message: formData.message,
        customizationComment: formData.customizationComment || "None",
        image_count: imageUrls.length.toString(),
        image_links: imageLinksHtml,
        image_thumbnails: imageThumbnailsHtml,
      };

      await emailjs.send('service_dmwibqj', 'template_1wmpses', templateParams, 'tF_tx9hAmTYDSOM3a');

      toast({
        title: "Inquiry Submitted!",
        description: "Thank you for your inquiry. Our team will get back to you within 24 hours.",
      });
      
      setFormData({ name: "", email: "", company: "", phone: "", product: "", message: "", customizationComment: "" });
      setUploadedImages([]);
      setImagePreviews([]);
    } catch (error: any) {
      console.error('Error during form submission:', error);
      toast({
        title: "Error",
        description: `Failed to send inquiry: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "info@crewimpex.com" },
    { icon: Phone, label: "Phone", value: "+91 9915815334 / +91 8755406105 / +91 98999 23754" },
    { icon: MapPin, label: "Address", value: "Wave City, Ghaziabad, Uttar Pradesh, India 201010" },
    { icon: Globe, label: "Website", value: "www.crewimpex.com" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium tracking-widest uppercase mb-4">
              {isCustomize ? "Customize Your Order" : "Contact Us"}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              {isCustomize ? (
                <>Create Your <span className="text-secondary">Custom Design</span></>
              ) : (
                <>Let's Start a <span className="text-secondary">Conversation</span></>
              )}
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              {isCustomize 
                ? "Share your custom design ideas with us. Upload reference images and describe your requirements for personalized footwear."
                : "Have questions about our products or services? Ready to place an order? Our team is here to help you with all your export needs."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                We're always ready to hear from you. Reach out through any of the channels below or fill out the inquiry form.
              </p>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Business Hours</h3>
                <p className="text-muted-foreground text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-muted-foreground text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {isCustomize ? "Customization Request" : "Send Us an Inquiry"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Product Category</label>
                    <Input
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      placeholder="Enter product category (e.g., Formals, Casuals, Boots, Sports, Sneakers...)"
                    />
                  </div>
                  
                  {/* Customization Section */}
                  <div className="border border-border rounded-lg p-6 bg-muted/30">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <ImageIcon size={20} className="text-secondary" />
                      Customization Details (Optional)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Upload Reference Images (Up to 6)
                        </label>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                              id="customization-image"
                            />
                            <label
                              htmlFor="customization-image"
                              className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <Upload size={18} className="text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Choose Images ({uploadedImages.length}/6)
                              </span>
                            </label>
                          </div>
                          {imagePreviews.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-16 h-16 object-cover rounded-lg border border-border"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                                    title="Remove image"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Upload up to 6 reference images for your custom design (JPG, PNG, max 5MB each)
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Customization Requirements
                        </label>
                        <Textarea
                          name="customizationComment"
                          value={formData.customizationComment}
                          onChange={handleChange}
                          placeholder="Describe your customization needs: colors, materials, logo placement, sizes, quantities..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements, order quantity, and any specific needs..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Submit Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Quick Response", description: "Get a reply within 24 hours" },
              { title: "Expert Guidance", description: "Our team helps you choose the right products" },
              { title: "Competitive Pricing", description: "Best rates for bulk orders" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle size={24} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
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
