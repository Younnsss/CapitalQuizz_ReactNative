import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Decouvrir from './screens/decouvrir.js';
import NomsExercices from './screens/Noms.js';
import Sevaluer from './screens/Sevaluer.js';
import Sexercer from './screens/Sexercer.js';
import Home from './screens/home.js';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
        headerStyle: {
          backgroundColor: '#081621',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Home" options={{ title: 'CapitalQuizz' }} component={Home} />
        <Stack.Screen name="Exercices sur les Noms" options={{ title: 'CapitalQuizz' }} component={NomsExercices} />
        <Stack.Screen name="Decouvrir" options={{ title: 'CapitalQuizz' }} component={Decouvrir} />  
        <Stack.Screen name="Sevaluer" options={{ title: 'CapitalQuizz' }} component={Sevaluer} />  
        <Stack.Screen name="Sexercer" options={{ title: 'CapitalQuizz' }} component={Sexercer} />                                
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081621',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection : 'row'
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding : 20
  }
});
