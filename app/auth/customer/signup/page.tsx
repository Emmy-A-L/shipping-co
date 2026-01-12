'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MainLoader from "@/components/ui/mainLoader"
import Loader from "@/components/ui/buttonLoader"

export default function SignupForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsButtonLoading(true);
    setError(''); // Clear previous errors

    try {
      // Build address directly from form inputs
      const houseNumber = (document.getElementById('house-number') as HTMLInputElement)?.value || '';
      const street = (document.getElementById('street') as HTMLInputElement)?.value || '';
      const city = (document.getElementById('city') as HTMLInputElement)?.value || '';
      const state = (document.getElementById('state') as HTMLInputElement)?.value || '';
      const zipCode = (document.getElementById('zip-code') as HTMLInputElement)?.value || '';
      const Address = `${houseNumber} ${street} ${city} ${state} ${zipCode}`.trim();

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, otherName, lastName, email, Address, phone, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Sorry, we aren't able to create an account for you at the moment. Please try again later");
        return;
      }

      // Successfully created account, redirect to login
      router.push('/auth/customer/login');

    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsButtonLoading(false);
    }
  }

  return (
    loading ? (<MainLoader />) : (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center bg-slate-50 ocean-bg px-4 py-12">
          <Card className="mx-auto max-w-sm w-full backdrop-blur-sm bg-[#1e90ff]/50">
            <CardHeader>
              <CardTitle className="text-2xl">Create an Account</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <form method="POST" action="/api/auth/signup" className="grid gap-4">
                {/* personal Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Max" required onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="other-name">Other name</Label>
                    <Input id="other-name" placeholder="Philemon" required onChange={(e) => setOtherName(e.target.value)} />
                  </div>
                  <div className="grid col-span-2 gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Robinson" required onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    defaultValue={role}
                    onValueChange={(value) => setRole(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer" className="hover:bg-[#0000cd] cursor-pointer">Customer</SelectItem>
                      {/* <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                {/* Address */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2 col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+234 123 456 789" required onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="grid gap-2 col-span-2">
                    <Label htmlFor="house-number">House Number</Label>
                    <Input id="house-number" placeholder="No 123" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="street">Street</Label>
                    <Input id="street" placeholder="Street" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="State" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip-code">Zip Code</Label>
                    <Input id="zip-code" placeholder="Zip Code" required />
                  </div>
                </div>
                {/* security details */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="**********" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" onClick={handleSubmit} className="w-full bg-[#0000cd] text-white hover:bg-[#0000cd]/80 cursor-pointer">
                  {isButtonLoading ? (
                    <Loader />
                  ) : (
                    "Create an account"
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/customer/login" className="text-white hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  )
}
