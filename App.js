import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/reducer/store'
import Navigation from './src/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});


