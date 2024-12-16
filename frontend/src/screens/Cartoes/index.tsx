import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AccessCard } from '../../components/AccessCard';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { styles } from './styles';

interface Reservation {
  id: string;
  guestName: string;
  propertyName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  accessCode: string;
}

export function CartoesScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations/active');
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Cartões de Acesso</Text>
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AccessCard
            guestName={item.guestName}
            propertyName={item.propertyName}
            location={item.location}
            checkIn={item.checkIn}
            checkOut={item.checkOut}
            accessCode={item.accessCode}
          />
        )}
        contentContainerStyle={styles.cardsList}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home-outline" size={24} color="#FFF" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Reservar')}
        >
          <Ionicons name="calendar-outline" size={24} color="#FFF" />
          <Text style={styles.navText}>Reservar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
        >
          <Ionicons name="card-outline" size={24} color="#DAA520" />
          <Text style={styles.navText}>Cartões</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Conta')}
        >
          <Ionicons name="person-outline" size={24} color="#FFF" />
          <Text style={styles.navText}>Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Menu')}
        >
          <Ionicons name="menu-outline" size={24} color="#FFF" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
