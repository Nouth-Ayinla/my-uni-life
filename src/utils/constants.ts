export const USER_ROLES = {
  STUDENT: 'student',
  VENDOR: 'vendor',
  DRIVER: 'driver',
  ADMIN: 'admin'
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  BANNED: 'banned'
} as const;

export const BUSINESS_CATEGORIES = [
  'Food & Drinks',
  'Electronics',
  'Books & Stationery',
  'Clothing',
  'Services',
  'Other'
];

export const VEHICLE_TYPES = [
  'Car',
  'Motorcycle',
  'Bicycle',
  'Bus',
  'Tricycle'
];