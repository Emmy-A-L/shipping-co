import { Button } from "@/components/ui/button";

export default function Tracking() {
  return (
    <section id="tracking" className="py-20 bg-primary text-primary-foreground">
      <div className="container max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Track Your Shipment</h2>
        <p className="mb-8 text-lg opacity-90">
          Real-time visibility into your cargo's journey. Enter your tracking ID below.
        </p>
        
        <form action="/dashboard/tracking" className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
          <input 
            type="text" 
            name="id"
            placeholder="Enter Tracking Number (e.g., DT-123456)" 
            className="flex-1 rounded-lg border-none px-6 py-4 text-slate-900 shadow-lg focus:ring-2 focus:ring-white"
          />
          <Button size="lg" variant="secondary" className="h-auto px-8 py-4 text-lg font-semibold shadow-lg">
            Track Now
          </Button>
        </form>
      </div>
    </section>
  );
}
