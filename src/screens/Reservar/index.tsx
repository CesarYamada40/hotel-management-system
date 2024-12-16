import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReservarScreen() {
  const navigation = useNavigation();
  const [destino, setDestino] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [hospedes, setHospedes] = useState(1);
  const [quartos, setQuartos] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reservar</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputLabel}>Onde?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowCheckIn(true)}
          >
            <Text style={styles.inputLabel}>Data Check-In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowCheckOut(true)}
          >
            <Text style={styles.inputLabel}>Data Check-Out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputLabel}>Hóspedes e Quartos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputLabel}>Personalização</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Reservar')}>
            <Ionicons name="calendar-outline" size={24} color="white" />
            <Text style={styles.navText}>Reservar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cartoes')}>
            <Ionicons name="card-outline" size={24} color="white" />
            <Text style={styles.navText}>Cartões</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Conta')}>
            <Ionicons name="person-outline" size={24} color="white" />
            <Text style={styles.navText}>Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Menu')}>
            <Ionicons name="menu-outline" size={24} color="white" />
            <Text style={styles.navText}>Menu</Text>
          </TouchableOpacity>
        </View>

        {showCheckIn && (
          <DateTimePicker
            value={checkIn}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowCheckIn(false);
              if (selectedDate) setCheckIn(selectedDate);
            }}
          />
        )}

        {showCheckOut && (
          <DateTimePicker
            value={checkOut}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowCheckOut(false);
              if (selectedDate) setCheckOut(selectedDate);
            }}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  form: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});
