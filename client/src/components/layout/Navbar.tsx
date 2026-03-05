import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  if (location === "/book") return null;

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b-0 rounded-b-2xl mx-auto max-w-[1400px] left-0 right-0 mt-4 px-6 py-4 flex items-center justify-between" data-testid="navbar">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="bg-gradient-to-tr from-primary via-secondary to-accent p-2 rounded-xl text-white shadow-lg shadow-secondary/50 group-hover:scale-110 transition-transform">
          <Sparkles size={24} className="animate-pulse" />
        </div>
        <span className="font-display font-black text-2xl tracking-tighter gradient-text">
          SINAG
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-6 font-medium text-foreground/80">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`hover:text-primary transition-colors ${location === link.href ? "text-primary font-bold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/book">
          <Button className="bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover-glow transition-all">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden p-2 text-foreground"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute top-[120%] left-4 right-4 glass-card rounded-2xl p-4 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top-4 fade-in">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="p-3 text-center font-bold text-lg hover:bg-white/50 rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl py-6 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}