import { Ship } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Ship className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold text-primary">
            DreamTrust Shipping
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex md:gap-4">
          <Link href="/#services" className="px-3 py-2 transition-colors hover:text-primary">Services</Link>
          <Link href="/#tracking" className="px-3 py-2 transition-colors hover:text-primary">Track</Link>
          <Link href="/#about" className="px-3 py-2 transition-colors hover:text-primary">About</Link>
          <div className="ml-4 flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
