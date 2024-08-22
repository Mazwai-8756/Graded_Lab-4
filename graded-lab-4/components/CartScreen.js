import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CartContext } from './CartContext'; // Import your cart context

const CartScreen = ({ navigation }) => {
  const { cart, updateItemQuantity, removeItemFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      {cart.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>${item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => updateItemQuantity(item.id, -1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateItemQuantity(item.id, 1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeItemFromCart(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      
      {/* Total Amount */}
      <Text style={styles.total}>Total: ${calculateTotal()}</Text>

      {/* Continue Shopping Button */}
      <TouchableOpacity
        style={styles.continueShoppingButton}
        onPress={() => navigation.navigate('MenuScreen')}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>

      {/* Checkout Button */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('CheckoutScreen')} // Replace with your checkout screen navigation
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  quantityText: {
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  continueShoppingButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
