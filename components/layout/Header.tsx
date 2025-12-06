"use client";

import { useState, useEffect } from 'react';
import { Ship, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut" as const
      }
    })
  };

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#tracking", label: "Track" },
    { href: "/#about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 px-3 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50 relative">
          <Ship className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold text-primary">
            DreamTrust Shipping
          </span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex md:gap-4">
          {navLinks.map(link => (
             <Link key={link.href} href={link.href} className="px-3 py-2 transition-colors hover:text-primary">{link.label}</Link>
          ))}
          <div className="ml-4 flex items-center gap-2">
            <Button variant="ghost" asChild className='text-black hover:text-white hover:bg-[#212121]'>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className='bg-[#212121] text-white hover:bg-black'>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative p-2 text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 bg-[#000080] z-40 flex flex-col items-center justify-center bg-background/98 backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col items-center gap-8 text-lg font-medium">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} custom={i} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className="text-2xl font-bold text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div custom={navLinks.length} variants={linkVariants} className="flex flex-col gap-4 mt-4 w-full min-w-[200px] px-6">
                   <Button variant="outline" asChild className='w-full text-lg h-12 border-primary/20 hover:bg-primary/5'>
                    <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className='w-full text-lg h-12 bg-[#212121] text-white hover:bg-black shadow-lg shadow-primary/20'>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
