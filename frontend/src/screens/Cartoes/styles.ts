import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#DAA520',
  },
  backButton: {
    padding: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '500',
  },
  cardsList: {
    paddingBottom: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
  },
});
