import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  signIn(credentials: { email: string; password: string }): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@HotelApp:user');
      const storagedToken = await AsyncStorage.getItem('@HotelApp:token');

      if (storagedUser && storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user: userData } = response.data;

      await AsyncStorage.setItem('@HotelApp:user', JSON.stringify(userData));
      await AsyncStorage.setItem('@HotelApp:token', token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(userData);
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@HotelApp:user');
    await AsyncStorage.removeItem('@HotelApp:token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
