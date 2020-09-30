import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

import ButtonView from '../screen_components/ButtonView'
import ButtonView_2 from '../screen_components/ButtonView_2'
import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'



export default class Home extends React.Component {
   constructor() {
      super()
      this.state ={
         isLoading : false
      }
   }
   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };
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
      this.state = { 
         displayName: firebase.auth().currentUser.displayName,
         uid: firebase.auth().currentUser.uid,
         photoURL: firebase.auth().currentUser.photoURL
       }
       var db = firebase.database().ref()
       var reff = db.child('total_kas_masuk/'+this.state.uid +'/')
       reff.on('value', snap => {
       const datai = snap.val()
         
         if (datai == undefined)
         {
            this.state.totalkasmasuk = '0'
         }
         else
         {
            
            var count_array = Object.values(datai)
            for(var i=0; i<count_array.length;i++) 
            count_array[i] = +count_array[i];
            var total = count_array.reduce(function(a, b){return a + b;});
            this.state.totalkasmasuk = total
            console.log('Kas Masuk : ' +total)
            //this.setState({isLoading: false})
         }
         
      })
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
               <Text style={styles.titleHeader}>Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               <TouchableOpacity  style={styles.rightH} onPress={() => {this.props.navigation.navigate('Profil')}}>
                  <Text style={styles.text}>Hai, {this.state.displayName}</Text>
                  <Icon name='account-circle' style={{color: 'white', fontSize: 34, paddingRight: 24}} />
               </TouchableOpacity>
         </View>

         <View style={styles.body}>
            <View style={styles.box4}>
                  <View style={styles.left}>
                     <Text style={styles.titleLeft1}>Saldo Kas</Text>
                  </View>
                  <View style={styles.right1}>
                     <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', paddingRight: 24}}>Rp.10.000.000</Text>
                  </View>
               </View>
               <ScrollView style={{paddingLeft: 20,paddingRight: 20}}>
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('KasMasukAdmin', {uid: this.state.uid})}}
                     Txt1 = 'Kas' Txt2 = 'Masuk' Txt3 = {this.currencyFormat(Number(this.state.totalkasmasuk))} Color= '#088506'
                  />
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('Kaskeluar',{uid: this.state.uid})}}
                     Txt1 = 'Kas' Txt2 = 'Keluar' Txt3 = '12.000' Color= '#B90303'
                  />
                  <ButtonView 
                     onPress={() => {this.props.navigation.navigate('RincianKas', {uid : this.state.uid})}}
                     Txt1 = 'Rincian' Txt2 = 'Kas Saya' Txt3 = '10.000' Color= '#269cae'
                  />
                  <ButtonView_2
                     onPress={() => {this.props.navigation.navigate('Jumlahanggota')}}
                     Txt1 = 'Data' Txt2 = 'Anggota' Txt3 = '8' Txt4 = 'Anggota' Color= '#44BAFD'
                  />
                  <ButtonInput
                     onPress={() => {this.props.navigation.navigate('BayarKas',{uid : this.state.uid, displayName: this.state.displayName, photoURL: this.state.photoURL})}}
                     titleButton = 'Bayar Kas'
                     Txt = 'Bayar Kas'
                     Color = '#3C6AE1'
                     
                  />
                  <ButtonInput
                     onPress={() => this.signOut()}
                     titleButton = 'Keluar'
                     Txt = 'Keluar'
                     Color = '#B90303'
                     MarginTop = {20}
                  />
                  <TouchableOpacity style={styles.button2} onPress={() => {this.props.navigation.navigate('Tentang')}}>
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