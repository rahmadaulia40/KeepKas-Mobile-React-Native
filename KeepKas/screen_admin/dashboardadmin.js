import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

import ButtonView from '../screen_components/ButtonView'
import ButtonView_2 from '../screen_components/ButtonView_2'
import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'
import TotalKasMasuk from '../processing/totalkasmasuk'
import TotalKasKeluar from '../processing/totalkaskeluar'
import SaldoKas from '../processing/saldokas'
import TotalUser from '../processing/totaldatauser'


export default class Home extends React.Component {
   constructor() {
      super()
      this.state ={
         isLoading : false,
         gambar: 'user',
         displayName : firebase.auth().currentUser.displayName,
         email : firebase.auth().currentUser.email,
         uid : firebase.auth().currentUser.uid
      }
   }
   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };
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
      firebase.auth().signOut()
      .then(() => {this.props.navigation.navigate('Login')})
      .catch(error => alert(error))
    }

   render(){
      if(this.state.isLoading){
         return(
           <Loading/>
         )
       }
       var imageRef = firebase.storage().ref('ImageProfile/'+this.state.uid+'.png')
         imageRef.getDownloadURL()
         .then((url)=>{
            this.setState ({gambar : url})
         })
         .catch(() => {
            var imageRef = firebase.storage().ref('ImageProfile/user.png')
            imageRef.getDownloadURL()
            .then((url)=>{
               this.setState({gambar : url})
            })
         })
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
               <Text style={styles.titleHeader}>Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               <TouchableOpacity  style={styles.rightH} 
                  onPress={() => {this.props.navigation.navigate('ProfilAdmin',{uid : this.state.uid, displayName : this.state.displayName, email : this.state.email})}}>
                  <Text style={styles.text}>Hai, {this.state.displayName}</Text>
                  <Image source={{uri : this.state.gambar}} style={styles.picture} />
               </TouchableOpacity>
         </View>

         <View style={styles.body}>
            <View style={styles.box4}>
                  <View style={styles.left}>
                     <Text style={styles.titleLeft1}>Saldo Kas</Text>
                  </View>
                  <View style={styles.right1}>
                     <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', paddingRight: 24}}>{<SaldoKas/>}</Text>
                  </View>
               </View>
               <ScrollView style={{paddingLeft: 20,paddingRight: 20}}>
                  
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('KasMasukAdmin',{uid: this.state.uid})} }
                     Txt1 = 'Kas' Txt2 = 'Masuk' Txt3 = {<TotalKasMasuk/>} Color= '#088506'
                  />
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('KasKeluarAdmin',{uid: this.state.uid})}}
                     Txt1 = 'Kas' Txt2 = 'Keluar' Txt3 = {<TotalKasKeluar/>} Color= '#B90303'
                  />
                  <ButtonView_2
                     onPress={() => {this.props.navigation.navigate('Jumlahanggota', {uid: this.state.uid})}}
                     Txt1 = 'Data' Txt2 = 'Anggota' Txt3 = {<TotalUser/>} Txt4 = 'Anggota' Color= '#44BAFD'
                  />
                  <ButtonInput
                     onPress={() => {this.props.navigation.navigate('TambahUser',{uid : this.state.uid, displayName: this.state.displayName})}}
                     titleButton = 'Tambah Anggota'
                     Txt = 'Tambah Anggota'
                     Color = '#3C6AE1'
                  />
                  <ButtonInput
                     onPress={() => {this.props.navigation.navigate('TambahKasAdmin',{uid : this.state.uid, displayName: this.state.displayName, photoURL: this.state.photoURL})}}
                     titleButton = 'Tambah Kas'
                     Txt = 'Tambah Kas'
                     Color = '#3C6AE1'
                     MarginTop = {20}
                  />
                  <ButtonInput
                     onPress={() => {this.props.navigation.navigate('TambahKasKeluar', {uid: this.state.uid, displayName : this.state.displayName})}}
                     titleButton = 'Tambah Pengeluaran'
                     Txt = 'Tambah Pengeluaran'
                     Color = '#B90303'
                     MarginTop = {20}
                  />
                  <ButtonInput
                     onPress={() => this.ButtonAlertKonfirmasi()}
                     titleButton = 'Keluar'
                     Txt = 'Keluar'
                     Color = '#B90303'
                     MarginTop = {20}
                  />   
               </ScrollView>

               <TouchableOpacity style={styles.keepKas} onPress={() => {this.props.navigation.navigate('Tentang')}}>
                     <Text style={styles.titleHeader}>@Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               </TouchableOpacity>
            
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
   picture:{
      height: 40,
      width: 40,
      marginRight: 24,
      borderRadius: 50
   }
})