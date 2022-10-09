import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from 'src/screens/Home';
import AddContact from 'src/screens/AddContact';
import EditContact from 'src/screens/EditContact';
const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AddContact"
          options={{title: 'Add Contact'}}
          component={AddContact}
        />
        <Stack.Screen
          name="EditContact"
          options={{title: 'Edit Contact'}}
          component={EditContact}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
