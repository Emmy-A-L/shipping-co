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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/buttonLoader"


export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Sorry, we aren't able to log you in at the moment. Please try again later");
      }

      const data = await response.json();
      const router = useRouter();
      router.push('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  const forgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError('Failed to reset password, please try again later');
      }


      const router = useRouter();
      router.push('/auth/reset-password');

    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-12">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          {
            error && (
              <CardDescription className="mx-8 mb-8 flex items-center justify-center px-4 py-4 text-center bg-red-500 text-white rounded-md">
                {error}
              </CardDescription>
            )
          }
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <button type="submit" onClick={forgotPassword} className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="**********" 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  required />
              </div>
              <Button type="button" onClick={handleSubmit} className="w-full bg-[#0000cd] text-white hover:bg-[#0000cd]/80 cursor-pointer">
                {loading ? <Loader /> : 'Login' }
              </Button>
              <Button variant="outline" className="w-full bg-gray-200 hover:text-white hover:bg-[#0000cd] cursor-pointer">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-800">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
