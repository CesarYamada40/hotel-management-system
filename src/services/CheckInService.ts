import { supabase } from './api';

export class CheckInService {
  async processCheckIn(reservationId: string) {
    try {
      // Verificar se a reserva existe e está confirmada
      const { data: reservation, error: reservationError } = await supabase
        .from('reservations')
        .select('*, rooms(*)')
        .eq('id', reservationId)
        .single();

      if (reservationError) throw reservationError;
      if (!reservation) throw new Error('Reserva não encontrada');

      // Atualizar status da reserva para checked-in
      const { error: updateError } = await supabase
        .from('reservations')
        .update({ status: 'CHECKED_IN' })
        .eq('id', reservationId);

      if (updateError) throw updateError;

      // Atualizar status do quarto para ocupado
      const { error: roomError } = await supabase
        .from('rooms')
        .update({ status: 'OCCUPIED' })
        .eq('id', reservation.room_id);

      if (roomError) throw roomError;

      return {
        success: true,
        message: 'Check-in realizado com sucesso',
        reservation,
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao realizar check-in: ${error.message}`,
      };
    }
  }

  async processCheckOut(reservationId: string) {
    try {
      const { data: reservation, error: reservationError } = await supabase
        .from('reservations')
        .select('*, rooms(*)')
        .eq('id', reservationId)
        .single();

      if (reservationError) throw reservationError;
      if (!reservation) throw new Error('Reserva não encontrada');

      // Atualizar status da reserva para checked-out
      const { error: updateError } = await supabase
        .from('reservations')
        .update({ status: 'CHECKED_OUT' })
        .eq('id', reservationId);

      if (updateError) throw updateError;

      // Atualizar status do quarto para disponível
      const { error: roomError } = await supabase
        .from('rooms')
        .update({ status: 'AVAILABLE' })
        .eq('id', reservation.room_id);

      if (roomError) throw roomError;

      return {
        success: true,
        message: 'Check-out realizado com sucesso',
        reservation,
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao realizar check-out: ${error.message}`,
      };
    }
  }
}
