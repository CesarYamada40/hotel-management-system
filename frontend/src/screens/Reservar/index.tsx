import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useReservation } from '../../hooks/useReservation';
import { styles } from './styles';

export function ReservarScreen() {
  const navigation = useNavigation();
  const { createReservation } = useReservation();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState('1');
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const handleCreateReservation = async () => {
    try {
      await createReservation({
        checkIn,
        checkOut,
        guestsCount: Number(guests),
        roomId: '1', // Temporário, deve vir da seleção de quarto
      });
      navigation.navigate('ReservationSuccess');
    } catch (error) {
      // Tratar erro
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
        <Text style={styles.title}>Reservar</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Onde?"
          value={destination}
          onChangeText={setDestination}
          placeholder="Digite o destino"
        />

        <TouchableOpacity 
          style={styles.inputContainer}
          onPress={() => setShowCheckInPicker(true)}
        >
          <Input
            label="Data Check-In"
            value={checkIn.toLocaleDateString()}
            onChangeText={() => {}}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.inputContainer}
          onPress={() => setShowCheckOutPicker(true)}
        >
          <Input
            label="Data Check-Out"
            value={checkOut.toLocaleDateString()}
            onChangeText={() => {}}
            editable={false}
          />
        </TouchableOpacity>

        <Input
          label="Hóspedes e Quartos"
          value={guests}
          onChangeText={setGuests}
          placeholder="Número de hóspedes"
        />

        <Button 
          title="Personalização"
          onPress={() => {}}
          gradient
        />
      </View>

      {showCheckInPicker && (
        <DateTimePicker
          value={checkIn}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowCheckInPicker(false);
            if (selectedDate) setCheckIn(selectedDate);
          }}
        />
      )}

      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOut}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowCheckOutPicker(false);
            if (selectedDate) setCheckOut(selectedDate);
          }}
        />
      )}

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
          <Ionicons name="calendar-outline" size={24} color="#DAA520" />
          <Text style={styles.navText}>Reservar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Cartoes')}
        >
          <Ionicons name="card-outline" size={24} color="#FFF" />
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
