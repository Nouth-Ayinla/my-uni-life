import apiClient from './config';
import { mockResults } from './mockData';

export const studentAPI = {
  async getResults(term: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockResults.filter(result => result.term === term);
  }
};