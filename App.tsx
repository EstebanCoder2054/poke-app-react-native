import 'react-native-gesture-handler';
import React from 'react'
import { Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigation/Navigator';
import { Tabs } from './src/navigation/Tabs';

const App = () => {
  return (
    <>
    <NavigationContainer>
      {/* <Navigator /> */}
      <Tabs />
    </NavigationContainer>
    </>
  )
};

export default App;

