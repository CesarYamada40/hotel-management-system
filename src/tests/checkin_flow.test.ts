import { supabase } from '../services/api';
import { CheckInService } from '../services/CheckInService';

describe('Check-in Flow Tests', () => {
  const checkInService = new CheckInService();

  test('complete check-in flow', async () => {
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

    // Realizar check-in
    const checkInResult = await checkInService.processCheckIn(reservation.id);
    expect(checkInResult.success).toBe(true);

    // Verificar status da reserva após check-in
    const { data: updatedReservation, error: getError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', reservation.id)
      .single();

    expect(getError).toBeNull();
    expect(updatedReservation.status).toBe('CHECKED_IN');
  });

  test('check-in validation', async () => {
    // Criar um novo hóspede
    const { data: guest, error: guestError } = await supabase
      .from('guests')
      .insert([
        {
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '0987654321',
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

    // Criar uma reserva futura
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    const { data: futureReservation, error: reservationError } = await supabase
      .from('reservations')
      .insert([
        {
          guest_id: guest.id,
          room_id: availableRooms[0].id,
          check_in_date: futureDate.toISOString(),
          check_out_date: new Date(futureDate.getTime() + 86400000).toISOString(),
          status: 'CONFIRMED',
        },
      ])
      .select()
      .single();

    expect(reservationError).toBeNull();
    expect(futureReservation).toBeDefined();

    // Tentar fazer check-in antecipado
    const checkInResult = await checkInService.processCheckIn(futureReservation.id);
    expect(checkInResult.success).toBe(false);
    expect(checkInResult.message).toContain('Erro ao realizar check-in');
  });
});
