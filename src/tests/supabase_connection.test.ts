import { supabase } from '../services/api';

describe('Supabase Connection Tests', () => {
  test('should connect to Supabase', async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*');
    
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  test('should be able to query rooms table', async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*');
    
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });
});
