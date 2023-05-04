import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ChatBot from './Screens/ChatBot';
import LeaveApplication from './Screens/LeaveApplication';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login Page" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Leave Application" component={LeaveApplication} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}