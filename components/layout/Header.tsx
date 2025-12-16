"use client";

import { useState, useEffect } from 'react';
import { Ship, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Dialog } from "@headlessui/react";


export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuIsOpen]);

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 md:p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-1 -m-1.5 p-1.5">
            <span>
              <img src="dreamtrust_logo.svg" alt="DreamTrust Logo Image" className='w-8 h-8' />
            </span>
            <span className="font-bold text-xl te0000cd]">DreamTrust Shipping</span>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMenuIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-8 w-8 hover:text-[#0000cd] transition-colors" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/#services"
            className="font-semibold leading-6 text-gray-900 hover:text-[#0000cd] transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#tracking"
            className="font-semibold leading-6 text-gray-900 hover:text-[#0000cd] transition-colors"
          >
            Track
          </Link>
          <Link
            href="/#about"
            className="font-semibold leading-6 text-gray-900 hover:text-[#0000cd] transition-colors"
          >
            About
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link
            href="/auth/login"
            className="text-sm font-semibold cursor-pointer leading-6 text-[#1e90ff] hover:text-[#0000cd] border border-[#0000cd] rounded-lg transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg bg-[#0000cd] px-4 py-2 cursor-pointer text-sm font-semibold text-white shadow-sm hover:bg-[#1e90ff] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={menuIsOpen}
        onClose={setMenuIsOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="font-bold text-2xl text-[#0000cd]">
                DreamTrust Shipping
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMenuIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/#services"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Services
                </Link>
                <Link
                  href="/#tracking"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Track
                </Link>
                <Link
                  href="/#about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About Us
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/auth/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-[#0000cd] hover:bg-[#1e90ff]"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};