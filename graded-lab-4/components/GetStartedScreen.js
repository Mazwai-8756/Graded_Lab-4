import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

// Local image path
const backgroundImage = require('./background.jpg');

const GetStartedScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={backgroundImage} // Use the local image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Foodie Heaven!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AuthScreen')} // Change 'AuthScreen' to your login/signup screen name
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    // Removed backgroundColor since ImageBackground handles the background
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50, // Space between the welcome text and button
  },
  button: {
    backgroundColor: '#FFA500', // Button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;
