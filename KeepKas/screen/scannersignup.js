import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Panjang, Lebar,Ukuran} from '../screen_components/Dimentions'

export default class ScannerSignup extends React.Component {
  constructor() {
    super()
    this.state = {
      scanned : false
    }
  }

  handleBarCodeScanned = ({data, type}) => {
    if( type === 256){
      this.setState({scanned : true})
      this.props.navigation.navigate('SignUpUser', {uidadmin : data})
    }
    else
    {
      this.setState({scanned : false})
    }
  };
  render() {
    return (
      <BarCodeScanner
        onBarCodeScanned ={this.state.scanned ? undefined : this.handleBarCodeScanned}
        style={[StyleSheet.absoluteFill]}
      >
        <View style={styles.layerTop}>
          <Image source={require('../assets/splash.png')} style={{width: Lebar/1.3, height: Panjang/10}}/>
          <Text style={styles.titleHeader}>Scan Untuk Mendaftar</Text>
        </View>
        
        <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.titleFooter}>Klik disini untuk mendaftar sebagai admin</Text>
          </TouchableOpacity>
        </View>
      </BarCodeScanner>
    )
  }
}

const opacity = 'rgba(0, 0, 0, 1)';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
    justifyContent: 'center',
    alignItems:'center'
  },
  layerCenter: {
    flex: 2,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  },
  titleQR:{
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  titleHeader:{
    color: 'white',
    fontSize: Ukuran/55
  },
  titleFooter:{
    color: '#3740FE',
    textAlign: 'center',
    marginTop: 70,
    fontSize: Ukuran/55,
    fontWeight: 'bold'
  }
});