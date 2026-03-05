import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Camera,
  Sparkles,
  Image as ImageIcon,
  Send,
  Smile,
} from "lucide-react";
import heroBg from "@/assets/images/hero-bg.png";
import stripMockup from "@/assets/images/strip-mockup.png";
import gridMockup from "@/assets/images/grid-mockup.png";

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden pt-32 pb-24"
      data-testid="page-home"
    >
      {/* Background Effects */}
      <div className="sun-rays" />
      <div className="hero-glow" />
      <div
        className="absolute inset-0 z-[-3] opacity-30 object-cover"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center max-w-5xl mb-32 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <Sparkles size={18} className="text-secondary" />
          <span className="font-semibold text-sm">
            The Most Joyful Photobooth Experience
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight animate-in slide-in-from-bottom-6 fade-in duration-700 delay-150">
          <span className="block text-foreground">Capture the Light.</span>
          <span className="gradient-text block mt-2">Capture the Joy.</span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-2xl mx-auto font-medium leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
          Step into the sunshine and create memories that radiate happiness.
          Perfect lighting, vibrant layouts, and endless fun.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-500">
          <Link href="/book">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg h-16 px-10 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover-glow shadow-xl shadow-primary/30"
            >
              Start Your Session <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg h-16 px-10 rounded-full glass-card border-2 hover:bg-white/80 font-bold"
            >
              Explore Layouts
            </Button>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">How it Works</h2>
          <p className="text-lg text-foreground/70">
            Five simple steps to perfect memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: LayoutIcon,
              title: "Choose Layout",
              desc: "Select 4-Up Grid or Classic Strip",
            },
            {
              icon: ImageIcon,
              title: "Pick Variety",
              desc: "Border or Borderless style",
            },
            {
              icon: Camera,
              title: "Take Pictures",
              desc: "Strike a pose with live countdown",
            },
            {
              icon: Smile,
              title: "Edit & Decorate",
              desc: "Add stickers, text, and filters",
            },
            {
              icon: Send,
              title: "Print & Enjoy",
              desc: "Get high-quality physical prints",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-3xl text-center hover-glow relative group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <step.icon size={32} />
              </div>
              <div className="absolute top-4 right-4 text-4xl font-black opacity-10 text-primary">
                0{i + 1}
              </div>
              <h3 className="font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Layouts */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Featured Layouts
          </h2>
          <p className="text-lg text-foreground/70">
            Choose the perfect canvas for your smiles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Classic Strip */}
          <div className="glass-card rounded-3xl p-8 hover-glow flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 shrink-0">
              <img
                src={stripMockup}
                alt="Classic Strip"
                className="w-full h-auto drop-shadow-2xl rounded-lg"
              />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-bold mb-4">
                ₱50 / 2 Strips
              </div>
              <h3 className="text-3xl font-black mb-3">Classic Photo Strip</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                The traditional crowd favorite. Get two identical 1x3 strips.
                Perfect for sharing with a friend or keeping one for your
                journal.
              </p>
              <ul className="space-y-2 mb-8 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" /> 6 Total
                  Takes (2 Retakes)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" /> 3 Min
                  Shooting Time
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" /> 90 Sec
                  Editing Time
                </li>
              </ul>
              <Link href="/book?layout=strip">
                <Button className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90 h-12">
                  Select This Layout
                </Button>
              </Link>
            </div>
          </div>

          {/* 4-Up Grid */}
          <div className="glass-card rounded-3xl p-8 hover-glow flex flex-col md:flex-row items-center gap-8 border-primary/30">
            <div className="w-48 shrink-0 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-xl z-0" />
              <img
                src={gridMockup}
                alt="4-Up Grid"
                className="w-full h-auto drop-shadow-2xl rounded-lg relative z-10"
              />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold mb-4">
                ₱100 / Print
              </div>
              <h3 className="text-3xl font-black mb-3 flex items-center gap-2">
                The 4-Up Grid <Sparkles size={20} className="text-primary" />
              </h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                A premium, full-sized 4x6 print. Gives you a large canvas to
                decorate with our custom digital stickers.
              </p>
              <ul className="space-y-2 mb-8 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" /> 8 Total
                  Takes (2 Retakes)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" /> 5 Min
                  Shooting Time
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" /> 3 Min
                  Editing Time
                </li>
              </ul>
              <Link href="/book?layout=grid">
                <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg h-12 font-bold hover:scale-105 transition-transform">
                  Select This Layout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto glass-card rounded-[3rem] p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Ready to shine?
            </h2>
            <p className="text-xl mb-10 text-foreground/80">
              Book your session now and let's create something beautiful
              together.
            </p>
            <Link href="/book">
              <Button
                size="lg"
                className="h-16 px-12 rounded-full text-xl font-bold bg-foreground text-background hover:scale-105 transition-transform shadow-2xl"
              >
                Start Booking
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple Layout icon component
function LayoutIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}
