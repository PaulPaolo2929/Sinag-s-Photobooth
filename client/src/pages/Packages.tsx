import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Packages() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 container mx-auto max-w-5xl">
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 fade-in">
        <h1 className="text-5xl md:text-6xl font-black mb-4">Transparent Pricing.</h1>
        <h2 className="text-4xl md:text-5xl font-black gradient-text">Priceless Memories.</h2>
        <p className="text-xl text-foreground/70 mt-6 max-w-2xl mx-auto">
          Choose the perfect layout for your memories. No hidden fees, just pure joy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 fade-in">
        {/* Standard Package */}
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover-glow border-2 border-transparent hover:border-secondary/30 transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-secondary/20 transition-colors" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Standard</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black">₱50</span>
              <span className="text-foreground/60 font-medium">/ session</span>
            </div>
            
            <p className="text-foreground/80 mb-8 h-12">The traditional crowd favorite. Perfect for sharing with a friend.</p>
            
            <ul className="space-y-4 mb-10">
              {["Yields 2 identical 1x3 strips", "6 total takes (2 retakes)", "3 minutes shooting time", "90 seconds editing time", "High-quality glossy print", "Basic digital stickers"].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={20} />
                  <span className="font-medium text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/book?layout=strip">
              <Button className="w-full h-14 rounded-xl text-lg bg-white border-2 border-foreground/10 text-foreground hover:bg-foreground hover:text-white transition-colors shadow-none">
                Choose Standard
              </Button>
            </Link>
          </div>
        </div>

        {/* Premium Package */}
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover-glow border-2 border-primary/20 shadow-xl shadow-primary/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors" />
          <div className="absolute top-6 right-8 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
            POPULAR
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2 text-primary">Premium</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-primary">₱100</span>
              <span className="text-foreground/60 font-medium">/ print</span>
            </div>
            
            <p className="text-foreground/80 mb-8 h-12">A full-sized 4x6 print that gives you a large canvas to decorate.</p>
            
            <ul className="space-y-4 mb-10">
              {["1 Large 4-Up Grid (2x2) print", "8 total takes (2 retakes)", "5 minutes shooting time", "3 minutes editing time", "Premium matte or glossy finish", "Premium digital stickers & filters"].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="font-medium text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/book?layout=grid">
              <Button className="w-full h-14 rounded-xl text-lg bg-gradient-to-r from-primary to-secondary text-white hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                Choose Premium
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}