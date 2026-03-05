import { Sun, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-4xl text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 animate-in slide-in-from-bottom-4 fade-in">
          We bring the <span className="gradient-text">sunshine.</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed animate-in slide-in-from-bottom-8 fade-in delay-150">
          SINAG (Tagalog for 'ray of light') was born from a simple idea: 
          every smile deserves to be captured in the best possible light.
        </p>
      </section>

      {/* Story & Vision */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-10 rounded-[3rem] space-y-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
              <Sun size={32} />
            </div>
            <h2 className="text-3xl font-black">Our Mission</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              To create a warm, inviting space where people can authentically express themselves, celebrate their connections, and walk away with a tangible piece of joy. We believe that a photo isn't just an image; it's a feeling frozen in time.
            </p>
          </div>

          <div className="glass-card p-10 rounded-[3rem] space-y-6 border-secondary/20">
            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-4">
              <Heart size={32} />
            </div>
            <h2 className="text-3xl font-black">Our Vision</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              To be the brightest spot in every celebration. We're constantly innovating our technology, our layouts, and our experience to ensure that every SINAG moment is as vibrant and unique as the people stepping in front of our lenses.
            </p>
          </div>
        </div>
      </section>

      {/* Stats/Vibe */}
      <section className="container mx-auto px-4 max-w-4xl text-center mt-32">
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-xl shadow-primary/10 mb-8">
          <Sparkles className="text-primary animate-pulse" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-8">Crafted for Joy</h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          From the soft, sunrise-inspired lighting of our booths to the intuitive, playful editing software, every detail of the SINAG experience is designed to make you feel good and look amazing.
        </p>
      </section>
    </div>
  );
}