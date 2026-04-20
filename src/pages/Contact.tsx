import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import RevealOnScroll from "@/components/RevealOnScroll";
import SEO from "@/components/SEO";

const WEB3FORMS_ACCESS_KEY = "845422d9-e0cd-4752-b626-3583ba8c359a";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("from_name", "Temple Gateway Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Contact Temple Gateway for custom yatra bookings, pilgrimage planning, and spiritual guidance. Reach out to our expert team for inquiries about our temple tours."
      />
      {/* Hero Section */}
      <section className="h-[350px] flex items-center justify-center bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <span className="text-secondary font-body text-sm uppercase tracking-widest">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Contact <span className="text-primary">Temple Gateway</span>
            </h1>
            <div className="section-divider" />
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about planning your pilgrimage? Want to suggest a
              temple? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <RevealOnScroll>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-card p-8 md:p-10 rounded-2xl shadow-card">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-body">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="font-body"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="font-body"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-body">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-body">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your query..."
                      rows={5}
                      required
                      className="font-body resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 font-display py-6"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col items-center justify-center text-center">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {[
                      {
                        name: "Facebook",
                        icon: Facebook,
                        url: "https://www.facebook.com/templeadvisor/",
                      },
                      { name: "Instagram", icon: Instagram, url: "#" },
                      { name: "Twitter", icon: Twitter, url: "#" },
                      { name: "YouTube", icon: Youtube, url: "#" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.url !== "" ? social.url : "#"}
                        target={social.url !== "#" && social.url !== "" ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="p-3 bg-muted hover:bg-primary text-foreground hover:text-primary-foreground rounded-full transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center group"
                        title={social.name}
                        onClick={(e) => {
                          if (social.url === "#" || social.url === "") {
                            e.preventDefault();
                          }
                        }}
                      >
                        <social.icon size={20} className="transition-colors group-hover:text-primary-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="font-body text-muted-foreground mb-8">
                    Reach out to us through any of the following channels. We
                    typically respond within 24-48 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Our Office",
                      content:
                        "No 2, Sai Vikruthi, 4th Street, Ram Nagar North, Puzhuthivakkam, Chennai, Tamil Nadu, India - 600091",
                    },
                    {
                      icon: Phone,
                      title: "Phone Number",
                      content: "+91 7299341874",
                    },
                    {
                      icon: Mail,
                      title: "Email Address",
                      content: "contact.templegateway@gmail.com",
                    },
                    {
                      icon: Clock,
                      title: "Working Hours",
                      content:
                        "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-6 bg-muted rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-golden flex items-center justify-center flex-shrink-0">
                        <item.icon size={22} className="text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Map Placeholder */}
      {/* Map Placeholder */}
      {/* <section className="h-80 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <RevealOnScroll>
            <div className="text-center space-y-4 max-w-2xl px-4">
              <MapPin size={48} className="mx-auto text-primary" />
              <p className="font-display text-xl text-foreground">
                Visit Our Office
              </p>
              <p className="font-body text-muted-foreground whitespace-pre-wrap">
                No 2, Sai Vikruthi, 4th Street, Ram Nagar North, Puzhuthivakkam, <br />
                Chennai, Tamil Nadu, India - 600091
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section> */}
    </Layout>
  );
};

export default Contact;
