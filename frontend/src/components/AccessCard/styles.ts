import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guestName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  propertyInfo: {
    marginBottom: 20,
  },
  propertyName: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  location: {
    fontSize: 16,
    color: '#888',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#FFF',
  },
  shareButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  logo: {
    height: 30,
    width: '100%',
    marginTop: 20,
    opacity: 0.5,
  },
});
