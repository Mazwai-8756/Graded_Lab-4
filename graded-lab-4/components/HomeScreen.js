import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Local image path


const HomeScreen = ({ navigation }) => {
  return (
   
      <View style={styles.container}>
        {/* Header with Home text and Icons */}
        <View style={styles.header}>
          <Text style={styles.homeText}>Home</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Forms2Screen')}>
              <Ionicons name="person-outline" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.cartIcon}>
              <Ionicons name="cart-outline" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* View Menu Button exactly in the center */}
        <View style={styles.centered}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuScreen')}>
            <Text style={styles.menuButtonText}>View Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  homeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  cartIcon: {
    marginLeft: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
