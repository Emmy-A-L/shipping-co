import { User } from "@/lib/types"

// /services/authService.ts
export class AuthService {
  static async login(email: string, password: string): Promise<User | null> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.user;
  }
}