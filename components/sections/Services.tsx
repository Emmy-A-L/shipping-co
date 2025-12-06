import { Anchor, Plane, FileText, Truck, Briefcase, ShieldCheck, Warehouse } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Customs Clearance",
    description: "Expert preparation and submission of all required documentation, duty payments, and compliance with Nigeria Customs Service."
  },
  {
    icon: Anchor,
    title: "Freight Forwarding",
    description: "Coordination of international and local transport via sea, air, or land, including cargo tracking and rate negotiation."
  },
  {
    icon: FileText,
    title: "Documentation Services",
    description: "Handling Bill of Lading, Form M, PAAR, SONCAP, and other regulatory approvals."
  },
  {
    icon: Truck,
    title: "Port Handling & Delivery",
    description: "Efficient offloading, inspection, and final delivery from ports to your warehouse."
  },
  {
    icon: Briefcase,
    title: "Consultancy & Advisory",
    description: "Professional guidance on import/export procedures, HS codes, and trade regulations."
  },
  {
    icon: ShieldCheck,
    title: "Insurance & Risk",
    description: "Marine cargo insurance arrangement and claims assistance for goods in transit."
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Secure temporary storage, inventory management, and distribution services."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container max-w-7xl px-3">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Our Services</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Comprehensive logistics solutions designed to move your business forward.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="group rounded-xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
