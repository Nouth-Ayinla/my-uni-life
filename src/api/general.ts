import apiClient from './config';
import { mockAnnouncements } from './mockData';

export const generalAPI = {
  async getAnnouncements(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAnnouncements;
  },

  async sendContact(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<{ message: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Message sent successfully' };
  }
};