import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

import ButtonView from '../screen_components/ButtonView'
import ButtonView_2 from '../screen_components/ButtonView_2'
import ButtonInput from '../screen_components/ButtonInput'
import SaldoKas from '../processing/saldokas'
import KasMasuk from '../processing/totalkasmasuk'
import KasKeluar from '../processing/totalkaskeluar'
import User from '../processing/totaldatauser'
import PictureProfile from '../processing/PictureProfile'

export default class Home extends React.Component {
   constructor() {
      super()
      this.state = {
          isLoading : false
      }
    }

   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    ButtonAlertKonfirmasi = () =>
    Alert.alert(
      "KeepKas",
      "Apakah anda yakin ingin keluar ?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Ya", onPress: () => {this.signOut()}}
      ],
      { cancelable: false }
    )

    signOut = () => {
      firebase.auth().signOut().then(() => {this.props.navigation.navigate('Login')})
      .catch(error => this.setState({ errorMessage: error.message }))
    }
   render(){
      this.state = { 
         displayName: firebase.auth().currentUser.displayName,
         uid: firebase.auth().currentUser.uid,
         photoURL: firebase.auth().currentUser.photoURL,
         email : firebase.auth().currentUser.email
       }
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
               <Text style={styles.titleHeader}>Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               <TouchableOpacity  style={styles.rightH} onPress={() => {this.props.navigation.navigate('Profil',{uid : this.state.uid, displayName : this.state.displayName, email : this.state.email})}}>
                  <Text numberOfLines={1} style={styles.text}>Hai, {this.state.displayName}</Text>
                  <PictureProfile Size={50} MarginRight={20} UID={this.state.uid}/>
               </TouchableOpacity>
         </View>
         <View style={styles.box4}>
                  <View style={styles.left}>
                     <Text style={styles.titleLeft1}>Saldo Kas</Text>
                  </View>
                  <View style={styles.right1}>
                     <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', paddingRight: 24}}>{<SaldoKas/>}</Text>
                  </View>
               </View>

         <View style={styles.body}>
               <ScrollView style={{paddingLeft: 20,paddingRight: 20}}>
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('KasMasukUser', {photoURL: this.state.photoURL})}}
                     Txt1 = 'Kas' Txt2 = 'Masuk' Txt3 = {<KasMasuk/>} Color= '#088506'
                  />
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('KasKeluarUser', {photoURL: this.state.photoURL})}}
                     Txt1 = 'Kas' Txt2 = 'Keluar' Txt3 = {<KasKeluar/>} Color= '#B90303'
                  />
                  <ButtonView_2
                     onPress={() => {this.props.navigation.navigate('Jumlahanggotauser', {uid: this.state.photoURL})}}
                     Txt1 = 'Data' Txt2 = 'Anggota' Txt3 = {<User/>} Txt4 = 'Anggota' Color= '#44BAFD'
                  />

                  <ButtonInput
                     onPress={() => this.signOut()}
                     titleButton = 'Keluar'
                     Txt = 'Keluar'
                     Color = '#B90303'
                  />
                  <TouchableOpacity style={styles.button2} onPress={() => {
                  Alert.alert('Tentang Aplikasi','KeepKas ini berguna untuk melakukan penyimpanan data kas, terutama untuk para siswa/mahasiswa yang memiliki kegiatan iuran kas kelas. Aplikasi ini masih dalam tahap prototype')
                  }}>
                     <Text style={{color: '#7a7676', fontWeight: 'bold', fontSize: 18}}>Tentang Aplikasi</Text>
                  </TouchableOpacity>    
               </ScrollView>

               <View style={styles.keepKas}>
                     <Text style={styles.titleHeader}>@Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               </View>
         
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   header:{
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#3C6AE1',
      justifyContent: 'space-between'
   },
   titleHeader:{
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      paddingLeft: 20
   },
   rightH:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
   },
   text:{
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
      padding: 10
   },
   body:{
      flex: 1
   },
   box4:{
      height: 50,
      backgroundColor: '#D49900',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
   },
   left: {
      height: 120,
      width: 170,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft: {
      fontSize: 22,
      color: 'white',
      fontWeight: 'bold'

   },
   right: {
      height: 120,
      width: 170,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft1: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold'

   },
   right1: {
      height: 120,
      justifyContent: 'center',
      paddingRight: 20

   },
   button2:{
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20
   },
   keepKas:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3C6AE1',
      height: 60
   },
})