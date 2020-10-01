import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
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
         photoURL: firebase.auth().currentUser.photoURL,
       }

      if(this.state.photoURL == null)
      {
         this.state.gambar = require('../assets/user.png')
      }

       firebase.database().ref().child('total_kas_masuk/'+this.state.uid +'/').on('value', snap => 
       {
         const datai = snap.val()
         if (datai == undefined){this.state.totalkasmasuk = '0'}
         else
         {
            var count_array = Object.values(datai)
            for(var i=0; i<count_array.length;i++) 
            count_array[i] = +count_array[i];
            var total = count_array.reduce(function(a, b){return a + b;});
            this.state.totalkasmasuk = total
            console.log('Kas Masuk : ' +total)
         }
         
      })
      firebase.database().ref().child('total_kas_keluar/'+this.state.uid +'/').on('value', snap => 
       {
         const datai = snap.val()
         if (datai == undefined){this.state.totalkaskeluar = '0'}
         else
         {
            var count_array = Object.values(datai)
            for(var i=0; i<count_array.length;i++) 
            count_array[i] = +count_array[i];
            var total = count_array.reduce(function(a, b){return a + b;});
            this.state.totalkaskeluar = total
            console.log('Kas Keluar : ' +total)
         }
         
      })
      var saldo_kas = this.state.totalkasmasuk - this.state.totalkaskeluar
      console.log('Saldo Kas : '+saldo_kas)
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <View style={styles.header}>
               <Text style={styles.titleHeader}>Keep<Text style={{fontWeight: 'normal'}}>Kas</Text></Text>
               <TouchableOpacity  style={styles.rightH} 
                  onPress={() => {this.props.navigation.navigate('ProfilAdmin')}}>
                  <Text style={styles.text}>Hai, {this.state.displayName}</Text>
                  <Image source={this.state.gambar} style={styles.picture} />
               </TouchableOpacity>
         </View>

         <View style={styles.body}>
            <View style={styles.box4}>
                  <View style={styles.left}>
                     <Text style={styles.titleLeft1}>Saldo Kas</Text>
                  </View>
                  <View style={styles.right1}>
                     <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', paddingRight: 24}}>{this.currencyFormat(Number(saldo_kas))}</Text>
                  </View>
               </View>
               <ScrollView style={{paddingLeft: 20,paddingRight: 20}}>
                  <ButtonView 
                     onPress={() => {this.setState({isLoading: true}),this.props.navigation.navigate('KasMasukAdmin',{uid: this.state.uid}), this.setState({isLoading: false})} }
                     Txt1 = 'Kas' Txt2 = 'Masuk' Txt3 = {this.currencyFormat(Number(this.state.totalkasmasuk))} Color= '#088506'
                  />
                  <ButtonView 
                     onPress={() => {{this.setState({isLoading: true}),this.props.navigation.navigate('KasKeluarAdmin',{uid: this.state.uid}), this.setState({isLoading: false})}}}
                     Txt1 = 'Kas' Txt2 = 'Keluar' Txt3 = {this.currencyFormat(Number(this.state.totalkaskeluar))} Color= '#B90303'
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
      height: 30,
      width: 30,
      marginRight: 24,
      borderRadius: 50
   }
})