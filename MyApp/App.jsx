import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { DeviceProvider } from './src/context/DeviceContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DeviceProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </DeviceProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
