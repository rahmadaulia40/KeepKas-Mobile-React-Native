import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import firebase from '../database/firebase'
import FromInput from '../screen_components/FromInput'
import Loading from '../screen_components/Loading'

export default class BayarKas extends React.Component {
   constructor() {
      super()
      this.state = {
          jumlah : '',
          keterangan : '',
          isLoading : false
      }
    }
    
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
    Date = () => {
      return moment().format('YYYY');
    }
    Mounth = ()=>{
       return moment().format('MM')
    }
    Day =()=>{
       return moment().format('DD')
    }
    input = () => {
      if(this.state.jumlah === '')
      {
         Alert.alert('Login Error !','Data Tidak Boleh Kosong')
      }
      else 
      {
         this.setState({isLoading: true})
         const { uid,photoURL,displayName } = this.props.route.params
         var db = firebase.database().ref('kas_masuk/'+photoURL+'/')
         var ref = db.push({
            id_admin : photoURL,
            id_user : uid,
            nama : displayName,
            jumlah : this.state.jumlah,
            status : 'Di Proses',
            keterangan : this.state.keterangan,
            tgl : Number(this.Day()),
            bln : Number(this.Mounth()),
            thn : Number(this.Date())
         })
         var id = ref.key
         db.child(ref.key).update({id : id})
         .then(()=>{
            this.setState({isLoading: false,jumlah: '',keterangan: ''})
            console.log('INSERTED !')
            Alert.alert('Input Data', 'Berhasil !')
            
         }).catch((error) => {
            console.log(error)
            Alert.alert('Input Error',error)
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
               <Text style={styles.title1}>Tambah Kas</Text>
            </View>

            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Silahkan masukkan nominal uang kas yang ingin di input. Selanjutnya Admin akan mengkonfirmasi penginputan kas Anda dan akan tampil di halaman Rincian Kas.</Text>
            </View>

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'jumlah')}
               labelValue={this.state.jumlah}
               KeyboardType= 'numeric'
               placeholderText = 'Input Nominal'
               MarginBottom={30}
               MarginTop={30}
            />

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
               labelValue={this.state.keterangan}
               placeholderText = 'Input Keterangan'
            />


            <TouchableOpacity style={styles.button} onPress={() => this.input()}>
               <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Tambah</Text>
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