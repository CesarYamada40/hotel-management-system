import React from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface AccessCardProps {
  guestName: string;
  propertyName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  accessCode: string;
}

export function AccessCard({
  guestName,
  propertyName,
  location,
  checkIn,
  checkOut,
  accessCode,
}: AccessCardProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Cartão de Acesso para ${propertyName}\nHóspede: ${guestName}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.guestName}>{guestName}</Text>
        
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyName}>{propertyName}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>Check In</Text>
            <Text style={styles.date}>{checkIn}</Text>
          </View>

          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>Check Out</Text>
            <Text style={styles.date}>{checkOut}</Text>
          </View>
        </View>

        <View style={styles.qrContainer}>
          <QRCode
            value={accessCode}
            size={150}
            color="black"
            backgroundColor="white"
          />
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#666" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
