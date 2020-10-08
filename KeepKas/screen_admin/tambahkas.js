import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import firebase from '../database/firebase'
import ButtonInput from '../screen_components/ButtonInput'
import FromInput from '../screen_components/FromInput'
import Loading from '../screen_components/Loading'

export default class TambahKasAdmin extends React.Component {
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
    getDateWithMoment = () => {
      return moment().format('DD-MM-YYYY');
    }
    input = () => {
      if(this.state.jumlah === '')
      {
         Alert.alert('Login Error !','Data Tidak Boleh Kosong')
      }
      else 
      {
         this.setState({isLoading: true})
         const { uid,displayName } = this.props.route.params
         var db = firebase.database().ref('kas_masuk')
         var ref = db.push({
            id_admin : uid,
            nama : displayName,
            jumlah : this.state.jumlah,
            status : 'Sukses',
            keterangan : this.state.keterangan,
            waktu : this.getDateWithMoment()
         })
         var id = ref.key
         db.child(ref.key).update({id : id})
         firebase.database().ref('total_kas_masuk/'+uid+ '/').update({[id] : this.state.jumlah})
         .then(()=>{
            this.setState({isLoading: false,jumlah: '',keterangan: ''})
            console.log('INSERTED !')
            this.ButtonAlertSukses()
            
         }).catch((error) => {
            this.setState({isLoading: false})
            console.log(error)
            Alert.alert('Input Error !!!',String(error))
           })
      }
    }
    ButtonAlertSukses = () =>
    Alert.alert(
      "Tambah Kas",
      "Penambahan kas berhasil, silahkan cek data kas masuk anda !",
      [
        { text: "OK", onPress: () => {
           this.props.navigation.navigate('HomeAdmin') 
            this.setState({isLoading: false})
         }}
      ],
      { cancelable: false }
    )
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
               MarginTop={14}
            />

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
               labelValue={this.state.keterangan}
               placeholderText = 'Input Keterangan'
            />

            <ButtonInput
               onPress={() => this.input()}
               titleButton = 'Tambah'
               Txt = 'Tambah'
               Color = '#3C6AE1'
               MarginTop = {20}
            />

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
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold'
   },
   boxInput: {
      height: 70,
      backgroundColor: '#DAEAF9',
      margin: 20
   },
   buttonLeft:{
      color: 'white',
      fontSize: 30,
      paddingLeft: 20
   }
})