import { useState, useCallback } from 'react';
import api from '../services/api';

interface Reservation {
  id: string;
  checkIn: Date;
  checkOut: Date;
  roomId: string;
  guestsCount: number;
  status: string;
}

export function useReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/reservations');
      setReservations(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar reservas');
    } finally {
      setLoading(false);
    }
  }, []);

  const createReservation = useCallback(async (data: Omit<Reservation, 'id' | 'status'>) => {
    try {
      setLoading(true);
      const response = await api.post('/reservations', data);
      setReservations(prev => [...prev, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Erro ao criar reserva');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    reservations,
    loading,
    error,
    fetchReservations,
    createReservation,
  };
}
