import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens';
const Stack = createStackNavigator();

export const Navigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
