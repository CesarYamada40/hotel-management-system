import 'react-native-gesture-handler/jestSetup';
import { seedDatabase } from './setup/seed';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock do Expo StatusBar
jest.mock('expo-status-bar');

// Mock das animações do React Native
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock do Supabase
const mockRooms = [
  {
    id: 1,
    number: '101',
    type: 'STANDARD',
    status: 'AVAILABLE',
    price_per_night: 100.00,
  },
  {
    id: 2,
    number: '102',
    type: 'STANDARD',
    status: 'AVAILABLE',
    price_per_night: 100.00,
  },
  {
    id: 3,
    number: '201',
    type: 'DELUXE',
    status: 'AVAILABLE',
    price_per_night: 200.00,
  },
];

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: mockRooms[0], error: null })),
          data: mockRooms,
          error: null,
        })),
        data: mockRooms,
        error: null,
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: mockRooms[0], error: null })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ data: mockRooms[0], error: null })),
          })),
        })),
      })),
      delete: jest.fn(() => Promise.resolve({ error: null })),
    })),
    auth: {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  })),
}));
