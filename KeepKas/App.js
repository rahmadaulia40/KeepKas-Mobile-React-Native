import { StatusBar } from 'expo-status-bar';
import React from 'react'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { StyleSheet, View, Alert } from 'react-native';
import Index from './route'

export default class App extends React.Component {

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        Alert.alert('Izin Kamera Error !','Sistem membutuhkan izin menggunakan kamera !');
        this.setState({scanned : true})
      }
    }
    else
    {
       const { status } = await Permissions.askAsync(Permissions.CAMERA);
       if (status !== 'granted') {
        Alert.alert('Izin Kamera Error !','Sistem membutuhkan izin menggunakan kamera !');
        this.setState({scanned : true})
      }
    }
  }
  render(){
  return (
    <View style={styles.container}>
      <StatusBar style='light' backgroundColor='#3C6AE1'/>
      <Index/>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
