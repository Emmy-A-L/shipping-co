import { Ship, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-accent">
      <div className="container w-full px-3 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Ship className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-bold text-primary">
                DreamTrust
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in global logistics, customs clearance, and freight forwarding.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Customs Clearance</li>
              <li>Freight Forwarding</li>
              <li>Warehousing</li>
              <li>Consultancy</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#testimonials">Testimonials</Link></li>
              <li><Link href="/login">Client Portal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@dreamtrust.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center mt-12 border-t pt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} DreamTrust Shipping Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
