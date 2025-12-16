"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Hero () {

  const [id, setId] = useState("")

  const trackShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("tracking id", id);
    // Add navigation logic here if needed
  }

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-900 pt-16 text-white">
      <div className="absolute inset-0 z-0 opacity-30">
        {/* Placeholder for a real background image */}
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
      
      <div className="container relative z-10 flex max-w-5xl flex-col items-center text-center">
        <h1 className="mb-6 font-headline text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Global Logistics, <br />
          <span className="text-primary">Simplified.</span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
          Seamless shipping, customs clearance, and freight forwarding solutions tailored for your business needs.
        </p>
        
        <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
          <Button size="lg" className="w-full text-lg bg-linear-to-r from-[#1e90ff] to-[#0000cd] hover:bg-[#0000cd]" asChild>
            <Link href="/auth/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full border-slate-600 bg-transparent text-lg text-white hover:bg-[#1e90ff] hover:text-white" asChild>
            <Link href="#services">Our Services</Link>
          </Button>
        </div>

        <div className="mt-12 w-full max-w-xl rounded-xl bg-white/10 p-2 backdrop-blur-md">
          <form className="flex gap-2" onSubmit={trackShipment}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Tracking ID" 
                className="h-12 w-full rounded-lg border-none bg-white pl-10 text-slate-900 placeholder:text-slate-500 outline-none focus:outline-[#191970] focus:ring-[#191970]"
              />
            </div>
            <Button size="lg" type="submit" className="bg-[#191970]">Track</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
