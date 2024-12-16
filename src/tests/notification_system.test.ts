import { NotificationService } from '../services/NotificationService';
import { supabase } from '../services/api';

describe('Notification System Tests', () => {
  const notificationService = new NotificationService();

  test('reservation confirmation notification', async () => {
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

    // Criar uma reserva
    const { data: reservation, error: reservationError } = await supabase
      .from('reservations')
      .insert([
        {
          guest_id: guest.id,
          room_id: 1, // Assumindo que existe um quarto com ID 1
          check_in_date: new Date().toISOString(),
          check_out_date: new Date(Date.now() + 86400000).toISOString(),
          status: 'CONFIRMED',
        },
      ])
      .select()
      .single();

    expect(reservationError).toBeNull();
    expect(reservation).toBeDefined();

    // Enviar notificação de confirmação
    const notificationResult = await notificationService.sendReservationConfirmation(
      reservation.id
    );

    expect(notificationResult.success).toBe(true);
    expect(notificationResult.message).toContain('Confirmação de reserva enviada');

    // 4. Limpar dados de teste
    await supabase
      .from('reservations')
      .delete()
      .eq('id', reservation.id);

    await supabase
      .from('guests')
      .delete()
      .eq('id', guest.id);
  });

  test('check-in reminder notification', async () => {
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

    // Criar uma reserva futura
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const { data: reservation, error: reservationError } = await supabase
      .from('reservations')
      .insert([
        {
          guest_id: guest.id,
          room_id: 1, // Assumindo que existe um quarto com ID 1
          check_in_date: futureDate.toISOString(),
          check_out_date: new Date(futureDate.getTime() + 86400000).toISOString(),
          status: 'CONFIRMED',
        },
      ])
      .select()
      .single();

    expect(reservationError).toBeNull();
    expect(reservation).toBeDefined();

    // Enviar lembrete de check-in
    const reminderResult = await notificationService.sendCheckInReminder(
      reservation.id
    );

    expect(reminderResult.success).toBe(true);
    expect(reminderResult.message).toContain('Lembrete de check-in enviado');

    // 4. Limpar dados de teste
    await supabase
      .from('reservations')
      .delete()
      .eq('id', reservation.id);

    await supabase
      .from('guests')
      .delete()
      .eq('id', guest.id);
  });
});
