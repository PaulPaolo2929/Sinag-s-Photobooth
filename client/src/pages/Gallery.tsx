import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const categories = ["All", "Weddings", "Birthdays", "Corporate", "Casual"];

const mockPhotos = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  url: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=80`,
  category: categories[(i % (categories.length - 1)) + 1],
}));

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPhotos = activeCategory === "All" 
    ? mockPhotos 
    : mockPhotos.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 container mx-auto max-w-6xl">
      <div className="text-center mb-12 animate-in slide-in-from-bottom-4 fade-in">
        <h1 className="text-5xl md:text-6xl font-black mb-4 gradient-text">Moments of Joy</h1>
        <p className="text-xl text-foreground/70">A collection of our favorite smiles.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12 animate-in slide-in-from-bottom-6 fade-in">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            className={`rounded-full px-6 ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'glass-card border-none hover:bg-white/80'}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-8 fade-in">
        {filteredPhotos.map((photo) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <div className="glass-card rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer hover-glow group relative">
                {/* Simulated image using gradients since we don't have real unsplash access guaranteed to be good */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  photo.id % 3 === 0 ? 'from-primary/40 to-secondary/40' :
                  photo.id % 3 === 1 ? 'from-secondary/40 to-accent/40' :
                  'from-accent/40 to-primary/40'
                }`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                  <span className="text-white font-bold tracking-widest text-sm uppercase">VIEW</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
               <div className="bg-white p-4 rounded-xl shadow-2xl">
                 <div className={`w-full aspect-video bg-gradient-to-br ${
                    photo.id % 3 === 0 ? 'from-primary/20 to-secondary/20' :
                    photo.id % 3 === 1 ? 'from-secondary/20 to-accent/20' :
                    'from-accent/20 to-primary/20'
                  } rounded-lg flex items-center justify-center`}>
                    <span className="text-4xl font-black text-foreground/20">SINAG Gallery</span>
                 </div>
               </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}