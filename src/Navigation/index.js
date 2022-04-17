import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Student from './Screens/Student';
import Add from './Screens/Add';

const HomeStack = createNativeStackNavigator();

export default function Navigation(){
    console.log('running')
    return (
        <NavigationContainer>
            <HomeStack.Navigator screenOptions={{headerShown : false}}>
            <HomeStack.Screen name="Student" component={Student} />
            {/* <HomeStack.Screen name="Add" component={Add} /> */}
            </HomeStack.Navigator>
        </NavigationContainer>
    )
}