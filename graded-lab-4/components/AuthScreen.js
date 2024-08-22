import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Load the background image
const backgroundImage = require('./background.jpg');

const AuthScreen = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');

      if (email === storedEmail && password === storedPassword) {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Invalid credentials', 'Email or password is incorrect.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      Alert.alert('Success', 'Account created successfully. Please log in.');
      setIsSignup(false);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {isSignup && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={isSignup ? handleSignup : handleLogin}
        >
          <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsSignup(!isSignup)}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            {isSignup ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Ensure the image covers the entire screen
    resizeMode: 'cover', // Adjust how the image fits in the container
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Removed backgroundColor as it's handled by the background image
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for input fields
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 10,
  },
  switchText: {
    color: '#007BFF',
  },
});

export default AuthScreen;
