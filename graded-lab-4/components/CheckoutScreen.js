import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { CartContext } from './CartContext'; // Import your cart context

const CartScreen = ({ navigation }) => {
  const { cart, updateItemQuantity, removeItemFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is Empty', 'Your cart is empty. Fill it with items before proceeding to checkout.');
    } else {
      navigation.navigate('PaymentScreen');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {cart.length > 0 ? (
        <>
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
          <Text style={styles.total}>Total: ${calculateTotal()}</Text>

          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('MenuScreen')}
          >
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.checkoutButton, { opacity: cart.length > 0 ? 1 : 0.5 }]} // Adjust opacity based on cart contents
            onPress={handleCheckout}
            disabled={cart.length === 0} // Disable button when cart is empty
          >
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty. Fill it with items to proceed to checkout.</Text>
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});

export default CartScreen;
