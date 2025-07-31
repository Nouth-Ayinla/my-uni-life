import apiClient from './config';
import { mockUsers } from './mockData';

export const adminAPI = {
  async getStudents(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers.filter(user => user.role === 'student');
  },

  async createStudent(data: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newStudent = {
      id: mockUsers.length + 1,
      ...data,
      role: 'student',
      status: 'active',
      createdAt: new Date().toISOString(),
      verified: false
    };
    return newStudent;
  },

  async updateStudent(id: number, data: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
      return mockUsers[userIndex];
    }
    throw new Error('Student not found');
  },

  async deleteStudent(id: number): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Student deleted successfully' };
  },

  async getResults(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  async uploadResults(file: File): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { message: 'Results uploaded successfully' };
  }
};