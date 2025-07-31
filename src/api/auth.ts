import apiClient from './config';
import { mockUsers } from './mockData';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: 'student' | 'vendor' | 'driver';
  department?: string;
  studentId?: string;
  businessName?: string;
  businessCategory?: string;
  licenseNumber?: string;
  vehicleType?: string;
}

export interface AuthResponse {
  user: any;
  token: string;
  message: string;
}

// Mock API calls - replace with actual API calls when backend is ready
export const authAPI = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const user = mockUsers.find(u => u.email === data.email);
    if (user && data.password === 'password') {
      const token = `mock-token-${Date.now()}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', user.email);
      
      return {
        user,
        token,
        message: 'Login successful'
      };
    }
    
    throw new Error('Invalid credentials');
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock registration
    const newUser = {
      id: mockUsers.length + 1,
      ...data,
      status: 'active',
      createdAt: new Date().toISOString(),
      verified: false
    };
    
    const token = `mock-token-${Date.now()}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', newUser.email);
    
    return {
      user: newUser,
      token,
      message: 'Registration successful'
    };
  },

  async logout(): Promise<{ message: string }> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    return { message: 'Logout successful' };
  },

  async me(): Promise<any> {
    const email = localStorage.getItem('userEmail');
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
};