import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import GetStartedScreen from './components/GetStartedScreen';
import HomeScreen from './components/HomeScreen';
import MenuScreen from './components/MenuScreen';
import Forms2Screen from './components/Forms2Screen';
import {CartProvider} from './components/CartContext';
import CartScreen from './components/CartScreen';
import CheckoutScreen from './components/CheckoutScreen';
import PaymentScreen from './components/PaymentScreen';
import MenuItemDetails from './components/MenuItemDetails';
import AuthScreen from './components/AuthScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
     <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStartedScreen">
        <Stack.Screen
          name="GetStartedScreen"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ title: 'Menu' }}
        />
         <Stack.Screen
          name="Forms2Screen"
          component={Forms2Screen}
          options={{ title: 'Profile' }}
        />
       
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ title: 'Cart' }}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{ title: 'Checkout' }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ title: 'Payment' }}
        />
        <Stack.Screen
          name="MenuItemDetails"
          component={MenuItemDetails}
          options={{ title: 'Menu Item Details' }}
        />
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ title: 'Authentication' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}
