import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Temples", path: "/temples" },
  { name: "Pilgrimage", path: "/pilgrimage" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Book Now", path: "https://forms.gle/1z7cDneyMhPUE97V8", isExternal: true }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/10">
              <img src={logo} alt="TG" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-foreground tracking-wide">
                Temple Gateway
              </span>
              <span className="text-xs text-muted-foreground -mt-0.5">ATHITHI DEVO BHAVA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-body text-sm transition-all duration-300 relative ${isActive(link.path)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-golden rounded-full" />
                  )}
                </Link>
              )
            ))}
            <Button
              asChild
              className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Link to="/temples">Explore Temples</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="font-body text-base py-2 text-muted-foreground"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-body text-base py-2 transition-colors ${isActive(link.path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                      }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Button
                asChild
                className="bg-gradient-hero text-primary-foreground w-full mt-2"
                onClick={() => setIsOpen(false)}
              >
                <Link to="/temples">Explore Temples</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
