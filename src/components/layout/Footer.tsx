import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <Link to="/" className="space-y-4 group">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/10 group-hover:border-saffron/50 transition-colors">
                <img src={logo} alt="TG" className="w-full h-full object-contain p-1" />
              </div>
              <span className="font-display font-semibold text-xl text-background group-hover:text-saffron transition-colors">
                Temple Gateway
              </span>
            </div>
            <p className="text-background/70 font-body text-sm leading-relaxed">
              Embark on sacred journeys to India's most revered temples.
              Discover divine heritage and spiritual enlightenment.
            </p>
          </Link>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-saffron">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Temples", path: "/temples" },
                { name: "Pilgrimage", path: "/pilgrimage" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-background/70 hover:text-saffron transition-colors font-body text-sm"
                    >
                      {item.name}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-saffron">Popular Temples</h4>
            <ul className="space-y-3">
              {["Tirupati Balaji", "Vaishno Devi", "Kashi Vishwanath", "Meenakshi Temple"].map((item) => (
                <li key={item}>
                  <Link 
                    to="/temples" 
                    className="text-background/70 hover:text-saffron transition-colors font-body text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-saffron">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-saffron mt-0.5 flex-shrink-0" />
                <a 
                  href="https://maps.google.com/?q=No+2,+Sai+Vikruthi,+4th+Street,+Ram+Nagar+North,+Puzhuthivakkam,+Chennai,+Tamil+Nadu,+India+-+600091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-saffron transition-colors font-body text-sm"
                >
                  No 2, Sai Vikruthi, 4th Street, Ram Nagar North, Puzhuthivakkam, Chennai, Tamil Nadu, India - 600091
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-saffron flex-shrink-0" />
                <a 
                  href="tel:+917299341874"
                  className="text-background/70 hover:text-saffron transition-colors font-body text-sm"
                >
                  +91 7299341874
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-saffron flex-shrink-0" />
                <a 
                  href="mailto:ta.vengat@gmail.com"
                  className="text-background/70 hover:text-saffron transition-colors font-body text-sm"
                >
                  ta.vengat@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 font-body text-sm">
            © {new Date().getFullYear()} Temple Gateway. All rights reserved.
          </p>
          <p className="text-background/60 font-body text-sm">
            Crafted with devotion for spiritual seekers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
