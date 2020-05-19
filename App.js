import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FirstScreen from "./src/screens/FirstScreen"
import SecondScreen from './src/screens/SecondScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="FirstScreen">
                <Stack.Screen name="FirstScreen" component={FirstScreen} />
                <Stack.Screen name="SecondScreen" component={SecondScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
