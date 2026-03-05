import { Link, useLocation } from "wouter";
import { Instagram, Mail, MapPin, Sparkles } from "lucide-react";

export function Footer() {
  const [location] = useLocation();
  if (location === "/book") return null;

  return (
    <footer className="glass-card mt-20 border-t-0 rounded-t-[3rem] px-6 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
              <div className="bg-gradient-to-tr from-primary via-secondary to-accent p-2 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <span className="font-display font-black text-3xl tracking-tighter gradient-text">
                SINAG
              </span>
            </Link>
            <p className="text-lg text-foreground/70 max-w-md leading-relaxed">
              Capturing the light and joy in every celebration. We bring the sunshine to your special moments with our premium photobooth experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4 text-foreground/70 font-medium">
              <li><Link href="/packages" className="hover:text-primary transition-colors">Packages</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6">Connect</h4>
            <ul className="space-y-4 text-foreground/70 font-medium">
              <li className="flex items-center gap-3"><Instagram size={20} className="text-primary" /> @sinag.photobooth</li>
              <li className="flex items-center gap-3"><Mail size={20} className="text-secondary" /> hello@sinagph.com</li>
              <li className="flex items-center gap-3"><MapPin size={20} className="text-accent" /> Makati City, PH</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-foreground/50 font-medium">
          <p>© 2026 SINAG Photobooth. All rights reserved.</p>
          <div className="flex gap-8">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <button className="hover:text-primary transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}