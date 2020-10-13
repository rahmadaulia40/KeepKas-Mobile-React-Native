import React from 'react'
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
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
          isLoading : false,
          date : moment().format('DD-MM-YYYY')
      }
    }
    
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }

    input = () => {
      if(this.state.jumlah === '')
      {
         Alert.alert('Login Error !','Data Tidak Boleh Kosong')
      }
      else 
      {
         this.setState({isLoading: true})
         var dateItem = this.state.date.split('-')
         var tgl = dateItem[0]
         var bln = dateItem[1]
         var thn = dateItem[2]
         const { uid,displayName } = this.props.route.params
         var db = firebase.database().ref('kas_masuk/'+uid+'/')
         var ref = db.push({
            id_admin : uid,
            nama : displayName,
            nominal : Number(this.state.jumlah),
            status : 'Sukses',
            keterangan : this.state.keterangan,
            sorting : 99999999-Number(thn+bln+tgl),
            date : this.state.date
         })
         var id = ref.key
         db.child(ref.key).update({id : id})
         .then(()=>{
            console.log('INSERTED !')
            firebase.database().ref('total_kas_masuk/'+uid+ '/').update({[id] : Number(this.state.jumlah)})
            this.ButtonAlertSukses()
         })
         .catch((error) => {
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
           this.setState({isLoading: false,jumlah: '',keterangan: ''})
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

            <DatePicker
               style={{marginTop: Ukuran/20, width: Lebar / 1.1}}
               date={this.state.date}
               mode='date'
               format='DD-MM-YYYY'
               minDate='01-05-2016'
               maxDate='29-12-2200'
               showIcon={false}
               customStyles={{
                  dateInput:{
                     backgroundColor: '#DAEAF9',
                     borderWidth: 0,
                     height: Panjang/13,
                     alignItems:'baseline',
                     paddingLeft: Ukuran/40
                  }
               }}
               onDateChange={(date)=>{this.setState({date: date})}}
            />
            <FromInput onChangeText={(val) => this.updateInputVal(val, 'jumlah')}
               labelValue={this.state.jumlah}
               KeyboardType= 'numeric'
               placeholderText = 'Input Nominal'
               MarginTop={Ukuran/30}
            />

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
               labelValue={this.state.keterangan}
               placeholderText = 'Input Keterangan'
               MarginTop={Ukuran/40}
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
   body:{
      flex: 1,
      marginLeft: Ukuran/40,
      marginRight: Ukuran/40
   },
   box1:{
      height: Panjang/4,
      backgroundColor: '#00DCEA',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#3C6AE1',
      borderWidth: 2,
      borderRadius: 5,
      padding: Ukuran/40
   },
   title1 :{
      margin: Ukuran/40,
      fontSize: Ukuran/35,
      fontWeight: 'bold'
   },
   titleInfo: {
      color: 'white',
      fontSize: Ukuran/40,
      textAlign: 'center',
      fontWeight: 'bold'
   },
})