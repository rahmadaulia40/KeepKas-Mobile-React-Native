import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
      <View style={styles.body}>
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
            size= {380}
            logoSize={80}
          />
        </View>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('TambahUserManual',{uid : this.state.uid, displayName: this.state.displayName})}}>
            <Text style={styles.InputManualText}>
               Input penambahan anggota secara manual
            </Text>
         </TouchableOpacity>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body:{
      marginLeft: 40,
      marginRight: 40
  },
  title1 :{
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold'
 },
 titleInfo: {
  color: 'white',
  fontSize: 22,
  textAlign: 'center',
  fontWeight: 'bold'
 },
 box1:{
  height: 150,
  backgroundColor: '#00DCEA',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#3C6AE1',
  borderWidth: 2,
  borderRadius: 10,
  padding: 20,
  marginBottom: 20
},
InputManualText: {
   color: '#3740FE',
   textAlign: 'center',
   fontSize: 14,
 },

});
