import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from 'src/screens/Home';
import AddContact from 'src/screens/AddContact';
import RootStack from 'src/route/RootStack';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <RootStack />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
