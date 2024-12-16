import { supabase } from '../services/api';

describe('Reservation Flow Tests', () => {
  test('complete reservation flow', async () => {
    // Criar um novo hóspede
    const { data: guest, error: guestError } = await supabase
      .from('guests')
      .insert([
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
        },
      ])
      .select()
      .single();

    expect(guestError).toBeNull();
    expect(guest).toBeDefined();

    // Buscar um quarto disponível
    const { data: availableRooms, error: roomsError } = await supabase
      .from('rooms')
      .select('*')
      .eq('status', 'AVAILABLE');
      
    expect(roomsError).toBeNull();
    expect(availableRooms?.length).toBeGreaterThan(0);

    if (!availableRooms?.[0]) {
      throw new Error('No available rooms');
    }

    // Criar uma reserva
    const { data: reservation, error: reservationError } = await supabase
      .from('reservations')
      .insert([
        {
          guest_id: guest.id,
          room_id: availableRooms[0].id,
          check_in_date: new Date().toISOString(),
          check_out_date: new Date(Date.now() + 86400000).toISOString(),
          status: 'CONFIRMED',
        },
      ])
      .select()
      .single();

    expect(reservationError).toBeNull();
    expect(reservation).toBeDefined();
    expect(reservation.status).toBe('CONFIRMED');
  });
});
