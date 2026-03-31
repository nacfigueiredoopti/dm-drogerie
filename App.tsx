import 'react-native-get-random-values';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import optimizelyClient from './src/optimizely';
import { Colors } from './src/constants/colors';

import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ProductScreen from './src/screens/ProductScreen';

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: string; categoryName: string };
  Product: { productId: string; productName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <OptimizelyProvider
        optimizely={optimizelyClient}
        user={{ id: `user-${Date.now()}` }}
        timeout={3000}
      >
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.background,
              },
              headerTintColor: Colors.dmBlue,
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 18,
                color: Colors.dmBlue,
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Category"
              component={CategoryScreen}
              options={({ route }) => ({
                title: route.params.categoryName,
              })}
            />
            <Stack.Screen
              name="Product"
              component={ProductScreen}
              options={({ route }) => ({
                title: route.params.productName,
                headerTitleStyle: {
                  fontWeight: '700',
                  fontSize: 16,
                },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaView>
      </OptimizelyProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
