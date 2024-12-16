import { seedDatabase } from './setup/seed';

beforeAll(async () => {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
});
