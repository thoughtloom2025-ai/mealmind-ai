
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:8000";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name?: string;
}

export class AuthService {
  private static tokenKey = 'token';
  private static userKey = 'mealmind_user';

  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      return null;
    }
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  static setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static async login(data: LoginData): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const result = await response.json();
      
      // Handle the access_token field from your backend
      const token = result.access_token;
      const user = result.user || { id: result.user_id || '1', email: data.email };
      
      this.setToken(token);
      this.setUser(user);
      
      toast({
        title: "Login successful!",
        description: "Welcome back to Mealmind AI",
      });

      return { user, token };
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  }

  static async signup(data: SignupData): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Signup failed');
      }

      const result = await response.json();
      
      // Handle the access_token field from your backend
      const token = result.access_token;
      const user = result.user || { id: result.user_id || '1', email: data.email, name: data.name };
      
      this.setToken(token);
      this.setUser(user);
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Mealmind AI",
      });

      return { user, token };
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    }
  }

  static logout(): void {
    this.removeToken();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  }

  static getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
