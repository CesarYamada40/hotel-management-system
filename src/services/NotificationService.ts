import { supabase } from './api';

export class NotificationService {
  private isTestEnvironment: boolean;

  constructor() {
    this.isTestEnvironment = process.env.NODE_ENV === 'test';
  }

  async sendReservationConfirmation(reservationId: string) {
    try {
      const { data: reservation, error } = await supabase
        .from('reservations')
        .select('*, guests(*)')
        .eq('id', reservationId)
        .single();

      if (error) throw error;

      if (this.isTestEnvironment) {
        // Em ambiente de teste, simular envio bem-sucedido
        return {
          success: true,
          message: `Confirmação de reserva enviada para ${reservation.guests.email}`,
        };
      }

      // Aqui você implementaria a lógica real de envio de notificação
      // Por exemplo, enviar email, SMS, etc.
      return {
        success: true,
        message: `Confirmação de reserva enviada para ${reservation.guests.email}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao enviar confirmação: ${error.message}`,
      };
    }
  }

  async sendCheckInReminder(reservationId: string) {
    try {
      const { data: reservation, error } = await supabase
        .from('reservations')
        .select('*, guests(*)')
        .eq('id', reservationId)
        .single();

      if (error) throw error;

      if (this.isTestEnvironment) {
        // Em ambiente de teste, simular envio bem-sucedido
        return {
          success: true,
          message: `Lembrete de check-in enviado para ${reservation.guests.email}`,
        };
      }

      // Aqui você implementaria a lógica real de envio de lembrete
      return {
        success: true,
        message: `Lembrete de check-in enviado para ${reservation.guests.email}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao enviar lembrete: ${error.message}`,
      };
    }
  }
}
