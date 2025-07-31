// Mock data for development
export const mockUsers = [
  {
    id: 1,
    fullName: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    status: 'active',
    department: 'Computer Science',
    studentId: 'CS123456',
    phoneNumber: '+234 123 456 7890',
    createdAt: '2024-01-15T10:30:00Z',
    verified: true
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    role: 'vendor',
    status: 'active',
    businessName: 'Campus Eats',
    businessCategory: 'Food',
    phoneNumber: '+234 123 456 7891',
    createdAt: '2024-01-20T14:20:00Z',
    verified: false
  }
];

export const mockAnnouncements = [
  {
    id: 1,
    title: 'System Maintenance',
    message: 'The system will undergo maintenance on Sunday.',
    type: 'info',
    date: '2024-01-25',
    urgent: false
  },
  {
    id: 2,
    title: 'Security Alert',
    message: 'Please update your passwords for better security.',
    type: 'warning',
    date: '2024-01-24',
    urgent: true
  }
];

export const mockResults = [
  {
    id: 1,
    studentId: 'CS123456',
    term: '2023/2024 First Semester',
    courses: [
      { code: 'CSC101', title: 'Introduction to Computing', grade: 'A', units: 3 },
      { code: 'MTH101', title: 'General Mathematics', grade: 'B+', units: 3 }
    ],
    gpa: 3.75,
    cgpa: 3.75
  }
];