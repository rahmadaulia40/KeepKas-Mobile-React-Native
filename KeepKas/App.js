import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Index from './route'

export default function App() {
  
  return (
    <View style={styles.container}>
      <StatusBar style='light' backgroundColor='#3C6AE1'/>
      <Index />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bar: {
    backgroundColor: 'green'
  }
});
