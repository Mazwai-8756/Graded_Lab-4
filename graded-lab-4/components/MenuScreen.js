// MenuScreen.js
import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const MenuScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = React.useState([
    { id: 1, name: 'Burger', image: require('./burger.jpeg'), description: 'Juicy beef burger', price: 10.99 },
    { id: 2, name: 'Pizza', image: require('./pizza.jpeg'), description: 'Freshly baked pizza', price: 12.99 },
    { id: 3, name: 'Salad', image: require('./salad.jpeg'), description: 'Fresh mixed greens', price: 8.99 },
    { id: 4, name: 'Fries', image: require('./fries.jpeg'), description: 'Crispy french fries', price: 5.99 },
    { id: 5, name: 'Soda', image: require('./soda.jpeg'), description: 'Cold soda', price: 2.99 },
    { id: 6, name: 'Water', image: require('./water.jpeg'), description: 'Fresh water', price: 1.99 },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MenuItemDetails', { item })}>
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

MenuScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.cartIcon}>
      <Ionicons name="cart-outline" size={28} color="black" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartIcon: {
    marginRight: 20,
  },
});

export default MenuScreen;
