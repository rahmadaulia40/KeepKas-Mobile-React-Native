import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'
import FromInput from '../components/FromInput'
import Loading from '../components/Loading'

export default class barang extends React.Component {
   constructor() {
      super()
      this.state = {
          jumlah : '',
          isLoading : false
      }
    }
    
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
    getCurrentDate=()=>{

      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      return date + '-' + month + '-' + year
    }
    input = () => {
      if(this.state.jumlah === '')
      {
         Alert.alert('Login Error !','Data Tidak Boleh Kosong')
      }
      else 
      {
         console.log(this.getCurrentDate())
         this.setState({isLoading: true})
         const { uid,photoURL,displayName } = this.props.route.params
         firebase.database().ref('kas_masuk').push(
         {
            id_kasmasuk : photoURL,
            id_user : uid,
            nama : displayName,
            jumlah : this.state.jumlah,
            status : 'Di Proses',
            waktu : this.getCurrentDate()

         })
         .then(()=>{
            this.setState({isLoading: false,jumlah: ''})
            console.log('INSERTED !')
            Alert.alert('Input Data', 'Berhasil !')
            
         }).catch((error) => {
            console.log(error)
           })
      }
    }
   render(){
      if(this.state.isLoading){
         return(
           <Loading/>
         )
       }

   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <ScrollView style={styles.body}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.title1}>Bayar Kas</Text>
            </View>

            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Silahkan masukkan nominal uang kas yang ingin di bayarkan. Selanjutnya Admin (bendahara) akan mengkonfirmasi pembayaran kas Anda dan akan tampil di halaman Rincian Kas.</Text>
            </View>

            <Text style={styles.title2}>Masukkan Jumlah</Text>

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'jumlah')}
               labelValue={this.state.jumlah}
            />


            <TouchableOpacity style={styles.button} onPress={() => this.input()}>
               <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Bayar</Text>
            </TouchableOpacity>

         </ScrollView>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   text:{
      fontSize: 14,
      color: 'white',
      fontWeight: 'bold',
      padding: 10
   },
   body:{
      flex: 1,
      marginLeft: 20,
      marginRight: 20
   },
   box1:{
      height: 250,
      backgroundColor: '#00DCEA',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      borderColor: '#3C6AE1',
      borderWidth: 2,
      borderRadius: 5,
      padding: 20
   },
   title1 :{
      margin: 20,
      fontSize: 24,
      fontWeight: 'bold'

   },
   title2 :{
      margin: 20,
      fontSize: 22,
      fontWeight: 'bold',
      alignItems: 'center',

   },
   titleInfo: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold'
   },
   boxInput: {
      height: 70,
      backgroundColor: '#DAEAF9',
      margin: 20
   },
   button:{
      height: 60,
      marginTop: 20,
      marginLeft: 100,
      marginRight: 100,
      borderRadius: 10,
      backgroundColor: '#3C6AE1',
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonLeft:{
      color: 'white',
      fontSize: 30,
      paddingLeft: 20
   }
})