import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Instagram, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 container mx-auto max-w-6xl relative">
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 fade-in">
        <h1 className="text-5xl md:text-6xl font-black mb-4">Say Hello</h1>
        <p className="text-xl text-foreground/70">We'd love to hear from you. Let's make something bright together.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 animate-in slide-in-from-bottom-8 fade-in">
        {/* Contact Form */}
        <div className="glass-card p-8 md:p-10 rounded-[2.5rem]">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Your Name</label>
              <Input placeholder="Juan Dela Cruz" className="h-12 rounded-xl bg-white/50 border-white focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <Input type="email" placeholder="juan@example.com" className="h-12 rounded-xl bg-white/50 border-white focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Message</label>
              <Textarea placeholder="How can we help you?" className="min-h-[150px] rounded-xl bg-white/50 border-white focus-visible:ring-primary resize-none" />
            </div>
            <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg">
              Send Message
            </Button>
          </form>
        </div>

        {/* Info & Map */}
        <div className="space-y-8 flex flex-col">
          <div className="glass-card p-8 rounded-3xl flex items-center gap-6">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Email Us</h3>
              <p className="text-foreground/70">hello@sinagph.com</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl flex items-center gap-6">
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Visit Us</h3>
              <p className="text-foreground/70">Level 2, Sunshine Mall, Makati City</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl flex items-center gap-6">
            <div className="w-14 h-14 bg-accent/20 text-blue-500 rounded-full flex items-center justify-center shrink-0">
              <Instagram size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Follow Us</h3>
              <p className="text-foreground/70">@sinag.photobooth</p>
            </div>
          </div>

          {/* Dummy Map Area */}
          <div className="flex-1 glass-card rounded-[2.5rem] overflow-hidden min-h-[200px] relative flex items-center justify-center bg-gray-100">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />
             <div className="text-center">
               <MapPin size={48} className="mx-auto text-primary mb-2 opacity-50" />
               <p className="font-bold text-foreground/50">Interactive Map Component</p>
             </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50">
        <MessageCircle size={28} />
      </button>
    </div>
  );
}