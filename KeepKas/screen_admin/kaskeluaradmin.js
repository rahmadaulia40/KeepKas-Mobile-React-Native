import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'
import FromInput from '../screen_components/FromInput'
import Loading from '../screen_components/Loading'
import ButtonInput from '../screen_components/ButtonInput'

export default class barang extends React.Component {
   constructor() {
      super()
      this.state = {
          uid: '',
          displayName: '',
          nominal : '',
          keterangan: '',
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
      var hours = new Date().getHours();
      var minutes = new Date().getMinutes();
      var second = new Date().getSeconds();
      return hours + ':'+ minutes + ':' + second + ' ' + date + '-' + month + '-' + year
    }
    input = () => {
      if(this.state.jumlah === '')
      {
         Alert.alert('Login Error !','Data Tidak Boleh Kosong')
      }
      else 
      {
         const { uid,displayName } = this.props.route.params
         this.setState({isLoading: true})
         var db = firebase.database().ref('kas_keluar')
         var ref = db.push({
            id_user : uid,
            nama : displayName,
            nominal : this.state.nominal,
            keterangan : this.state.keterangan,
            waktu : this.getCurrentDate()
         })
         var id = ref.key
         db.child(ref.key).update({id : id})
         .then(()=>{
            this.setState({isLoading: false,nominal: '', keterangan: ''})
            console.log('INSERTED !')
            Alert.alert('Input Data', 'Berhasil !')
            this.setState({isLoading: false})
            this.props.navigation.navigate('Kaskeluar')
            
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
               <Text style={styles.title1}>Tambah Pengeluaran</Text>
            </View>

            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Silahkan Input Data Pengeluaran anda, data pengeluaran ini dapat dilihat oleh selurh anggota anda</Text>
            </View>

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'nominal')}
               labelValue={this.state.nominal}
               placeholderText = 'Input Nominal'
               KeyboardType= 'numeric'
            />

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
               labelValue={this.state.keterangan}
               placeholderText = 'Keterangan'
            />

            <ButtonInput onPress={() => this.input()} title='Tambah' Color='#B90303' Txt='Tambah'/>

         </ScrollView>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   body:{
      flex: 1,
      marginLeft: 40,
      marginRight: 40
   },
   box1:{
      height: 200,
      backgroundColor: '#B90303',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      padding: 20,
      marginBottom: 30
   },
   title1 :{
      margin: 20,
      fontSize: 24,
      fontWeight: 'bold'

   },
   titleInfo: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold'
   }
})