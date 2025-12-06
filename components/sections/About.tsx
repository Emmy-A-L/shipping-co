import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container max-w-7xl px-3">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-auto lg:h-[600px]">
             {/* Placeholder for a real image */}
            <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
          </div>
          
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
              About DreamTrust Shipping
            </h2>
            <p className="mb-6 text-lg text-slate-600">
              We are a premier Clearing and Forwarding (C&F) company in Nigeria, dedicated to bridging the gap between global markets and local businesses.
            </p>
            <p className="mb-8 text-slate-600">
              Our mission is to simplify the complexities of international trade. From customs clearance to final delivery, we handle every step with precision, ensuring your goods arrive safely and on time.
            </p>
            
            <div className="space-y-4">
              {[
                "Expert Customs Clearance",
                "Global Freight Network",
                "Secure Warehousing",
                "24/7 Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-medium text-slate-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
