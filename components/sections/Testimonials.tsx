export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="container max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Trusted by Businesses
        </h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              quote: "DreamTrust handled our complex machinery import with zero delays. Their customs expertise is unmatched.",
              author: "John Okafor",
              role: "CEO, TechBuild Nigeria"
            },
            {
              quote: "Reliable, transparent, and cost-effective. They are our go-to partner for all freight forwarding needs.",
              author: "Sarah Williams",
              role: "Logistics Manager, Global Retail"
            },
            {
              quote: "The tracking system is a game changer. I always know exactly where my goods are.",
              author: "Ahmed Musa",
              role: "Importer"
            }
          ].map((t, i) => (
            <div key={i} className="rounded-xl bg-white p-8 shadow-sm">
              <p className="mb-6 text-slate-600 italic">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-slate-900">{t.author}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
