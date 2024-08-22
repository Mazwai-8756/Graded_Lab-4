import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const name = await AsyncStorage.getItem('name');
        if (email) setUserInfo(prev => ({ ...prev, email }));
        if (name) setUserInfo(prev => ({ ...prev, name }));
      } catch (error) {
        console.error('Failed to fetch user information', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.infoText}>Email: {userInfo.email}</Text>
      <Text style={styles.infoText}>Name: {userInfo.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
