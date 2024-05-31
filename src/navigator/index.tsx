import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Stack = createStackNavigator();

export const Navigator = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown:false }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
