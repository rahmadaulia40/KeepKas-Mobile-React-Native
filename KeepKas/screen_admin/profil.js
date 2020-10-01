import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'

export default class barang extends React.Component {
   render(){
      this.state = { 
         displayName: firebase.auth().currentUser.displayName,
         email: firebase.auth().currentUser.email,
         photoURL: firebase.auth().currentUser.photoURL,
       }
       if(this.state.photoURL == null)
      {
         this.state.gambar = require('../assets/user.png')
      }
   return (
      <View style={{flex:1, margin: 20}}>
         <View style={styles.header}>
            <View style={{alignItems: 'center', marginTop: 20}}>
               <Image source={this.state.gambar} style={styles.picture}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 30}}>
               <View>
                  <Text style={styles.title2}>E-mail</Text>
                  <Text style={styles.title2}>Nama</Text>
               </View>
               <View>
                  <Text style={styles.title2}>: {this.state.email}</Text>
                  <Text style={styles.title2}>: {this.state.displayName}</Text>
               </View>
            </View>

            <ButtonInput
               onPress={() => {this.props.navigation.navigate('UbahDataProfil')}}
               titleButton = 'Ubah Data'
               Txt = 'Ubah Data'
               Color = '#3C6AE1'
               MarginTop = {20}
            />
            
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   header:{
      flexDirection: 'column',
   },
   picture:{
      width: 230,
      height: 230,
      borderRadius: 230
   },
   title1 :{
      margin: 20,
      fontSize: 24,
      fontWeight: 'bold'
   },
   title2 :{
      fontSize: 18,
      fontWeight: 'bold'
   },
})