import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export default function Hero() {
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
          <Button size="lg" className="w-full text-lg" asChild>
            <Link href="/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full border-slate-600 bg-transparent text-lg text-white hover:bg-slate-800 hover:text-white" asChild>
             <Link href="#services">Our Services</Link>
          </Button>
        </div>

        <div className="mt-12 w-full max-w-xl rounded-xl bg-white/10 p-2 backdrop-blur-md">
          <form className="flex gap-2" action="/dashboard/tracking">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                name="id"
                placeholder="Enter Tracking ID" 
                className="h-12 w-full rounded-lg border-none bg-white pl-10 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button size="lg" type="submit">Track</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
