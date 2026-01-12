'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupForm() {

  const [firstName, setFirstName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [Address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = `${firstName} ${otherName} ${lastName}`;
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, userId, Address, phone, password, role }),
      });

      if (!response.ok) {
        setError("Sorry, we aren't able to create an account for you at the moment. Please try again later");
      }

      const data = await response.json();
      const router = useRouter();
      router.push('/login');

    } catch (error) {
      console.error('Signup error:', error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-slate-50 ocean-bg px-4 py-12">
        <Card className="mx-auto max-w-sm w-full backdrop-blur-sm bg-[#1e90ff]/50">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" required onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="other-name">Other name</Label>
                  <Input id="other-name" placeholder="Max" required onChange={(e) => setOtherName(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" required onChange={(e) => setLastName(e.target.value)}/>
                </div>
              </div>
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
                <Input id="password" type="password" placeholder="**********" required onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <Button type="submit" onClick={handleSubmit} className="w-full bg-[#0000cd] text-white hover:bg-[#0000cd]/80 cursor-pointer">
                Create an account
              </Button>
              <Button variant="outline" className="w-full bg-gray-200 hover:text-white hover:bg-[#0000cd] cursor-pointer">
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-800">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
