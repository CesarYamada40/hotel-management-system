import { supabase } from '../../services/api';

export async function seedDatabase() {
  // Limpar dados existentes
  await supabase.from('reservations').delete();
  await supabase.from('guests').delete();
  await supabase.from('rooms').delete();

  // Inserir quartos de teste
  const { data: rooms, error: roomsError } = await supabase
    .from('rooms')
    .insert([
      {
        number: '101',
        type: 'STANDARD',
        status: 'AVAILABLE',
        price_per_night: 100.00,
      },
      {
        number: '102',
        type: 'STANDARD',
        status: 'AVAILABLE',
        price_per_night: 100.00,
      },
      {
        number: '201',
        type: 'DELUXE',
        status: 'AVAILABLE',
        price_per_night: 200.00,
      },
    ])
    .select();

  if (roomsError) {
    throw new Error(`Error seeding rooms: ${roomsError.message}`);
  }

  return {
    rooms,
  };
}
