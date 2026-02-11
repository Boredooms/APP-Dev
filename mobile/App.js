import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './context/LanguageContext';
import HomeScreen from './screens/HomeScreen';
import FeaturesScreen from './screens/FeaturesScreen';
import DemoScreen from './screens/DemoScreen';
import IoTCheckScreen from './screens/IoTCheckScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Features" component={FeaturesScreen} />
          <Stack.Screen name="IoTCheck" component={IoTCheckScreen} />
          <Stack.Screen name="Demo" component={DemoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
