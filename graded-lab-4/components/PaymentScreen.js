import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PaymentScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCardNumberChange = (text) => {
    setCardNumber(text);
    determineCardType(text);
  };

  const determineCardType = (number) => {
    if (number.startsWith('4')) {
      setCardType('visa');
    } else if (number.startsWith('5')) {
      setCardType('mastercard');
    } else {
      setCardType(null);
    }
  };

  const validateCardNumber = () => {
    // Ensure the card number is 16 digits long and starts with either 4 or 5
    return cardNumber.length === 16 && (cardNumber.startsWith('4') || cardNumber.startsWith('5')) && /^\d+$/.test(cardNumber);
  };

  const validateExpirationDate = () => {
    const [month, year] = expirationDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!month || !year) return false;

    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    if (monthNumber < 1 || monthNumber > 12) return false;

    if (yearNumber < currentYear || (yearNumber === currentYear && monthNumber < currentMonth)) return false;

    return true;
  };

  const validateCVV = () => {
    return cvv.length === 3 && /^\d+$/.test(cvv);
  };

  const handleCheckout = () => {
    if (!cardNumber || !expirationDate || !cvv) {
      setPaymentStatus('failure');
      setErrorMessage('Please fill in the missing fields');
    } else if (!validateCardNumber()) {
      setPaymentStatus('failure');
      setErrorMessage('Card number must be 16 digits and start with a 4 or 5');
    } else if (!validateExpirationDate()) {
      setPaymentStatus('failure');
      setErrorMessage('Expiration month must be between 01 and 12');
    } else if (!validateCVV()) {
      setPaymentStatus('failure');
      setErrorMessage('CVV must be exactly 3 digits');
    } else {
      setPaymentStatus('success');
      setErrorMessage('');
      navigation.navigate('MenuScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Credit Card Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={16}
        placeholder="Enter 16-digit card number"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
      />

      {cardType === 'visa' && (
        <Image
          source={require('./visa.jpeg')}
          style={styles.cardImage}
        />
      )}

      {cardType === 'mastercard' && (
        <Image
          source={require('./mastercard.jpg')}
          style={styles.cardImage}
        />
      )}

      <Text style={styles.label}>Expiration Date (MM/YY)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={5}
        placeholder="MM/YY"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={3}
        placeholder="Enter 3-digit CVV"
        value={cvv}
        onChangeText={setCvv}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleCheckout}>
        <Text style={styles.submitButtonText}>Submit Payment</Text>
      </TouchableOpacity>

      {paymentStatus === 'success' && (
        <Text style={styles.successMessage}>Payment Successful!</Text>
      )}
      {paymentStatus === 'failure' && (
        <Text style={styles.failureMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  cardImage: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  failureMessage: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaymentScreen;
