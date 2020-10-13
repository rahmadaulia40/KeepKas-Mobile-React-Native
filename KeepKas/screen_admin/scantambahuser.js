import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'
import firebase from '../database/firebase'
import QRCode from 'react-native-qrcode-svg'

export default class ScanTambahUser extends React.Component {
   render(){
    this.state = {
       uid : firebase.auth().currentUser.uid,
       displayName : firebase.auth().currentUser.uid
    }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title1}>Tambah Anggota</Text>
        </View>

        <View style={styles.box1}>
          <Text style={styles.titleInfo}>Silahkan Scan QR Code berikut melakukan penambahan anggota</Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 10}}>
          <QRCode 
            value={this.state.uid} 
            logo={require('../assets/barcodeLogo.png')}
            size= {Ukuran/2}
            logoSize={Ukuran/7}
          />
        </View>
      </ScrollView>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body:{
      marginLeft: Ukuran/40,
      marginRight: Ukuran/40
  },
  title1 :{
    margin: Ukuran/40,
    fontSize: Ukuran/35,
    fontWeight: 'bold'
 },
 titleInfo: {
  color: 'white',
  fontSize: Ukuran/45,
  textAlign: 'center',
  fontWeight: 'bold'
 },
 box1:{
  height: Panjang/6,
  backgroundColor: '#00DCEA',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#3C6AE1',
  borderWidth: 2,
  borderRadius: 10,
  padding: Ukuran/40,
  marginBottom: 20
  },
});
