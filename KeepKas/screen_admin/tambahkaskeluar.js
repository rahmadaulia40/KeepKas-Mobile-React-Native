import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import firebase from '../database/firebase'
import FromInput from '../screen_components/FromInput'
import Loading from '../screen_components/Loading'
import ButtonInput from '../screen_components/ButtonInput'

export default class TambahKasKeluar extends React.Component {
   constructor() {
      super()
      this.state = {
         showAlert : false,
         confirmAlert : false,
         pressAlert : '',
         titleAlert : '',
         messageAlert : '',
          uid: '',
          displayName: '',
          nominal : '',
          keterangan: '',
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
      if(this.state.nominal === '')
      {
         this.setState({
            showAlert : true,
            confirmAlert : false,
            titleAlert: 'Tambah Pengeluaran !',
            messageAlert : 'Data tidak boleh kosong'
         })
      }
      else 
      {
         this.setState({isLoading: true})
         var dateItem = this.state.date.split('-')
         var tgl = dateItem[0]
         var bln = dateItem[1]
         var thn = dateItem[2]
         const { uid,displayName } = this.props.route.params
         var db = firebase.database().ref().child('kas_keluar/'+uid+'/')
         var ref = db.push({
            id_admin : uid,
            nama : displayName,
            nominal : Number(-this.state.nominal),
            keterangan : this.state.keterangan,
            sorting : 99999999-Number(thn+bln+tgl),
            date : this.state.date
         })
         var id = ref.key
         db.child(ref.key).update({id : id})
         .then(()=>{
            firebase.database().ref().child('total_kas_keluar/'+uid+ '/').update({[ref.key] : Number(-this.state.nominal)})
            this.ButtonAlertSukses()
         })
         .catch((error) => {
            this.setState({
               isLoading : false,
               showAlert : true,
               confirmAlert : false,
               titleAlert: 'Input Gagal !',
               messageAlert : String(error)
            })
         })
      }
    }

    ButtonAlertSukses = () =>{
      this.setState({
         isLoading : false,
         nominal: '',
         keterangan: '',
         showAlert : true,
         confirmAlert : false,
         titleAlert: "Tambah Pengeluaran",
         messageAlert : "Data pengeluaran berhasil di input, silahkan cek Kas Keluar"
      })
    }
   render(){
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <ScrollView style={styles.body}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.title1}>Tambah Pengeluaran</Text>
            </View>

            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Silahkan Input Data Pengeluaran anda, data pengeluaran ini dapat dilihat oleh selurh anggota anda</Text>
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

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'nominal')}
               labelValue={this.state.nominal}
               placeholderText = 'Input Nominal'
               KeyboardType= 'numeric'
               MarginTop={Ukuran/30}
               MarginBottom={Ukuran/40}
            />

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
               labelValue={this.state.keterangan}
               placeholderText = 'Keterangan'
               MarginBottom={Ukuran/40}
            />

            <ButtonInput onPress={() => this.input()} title='Tambah' Color='#B90303' Txt='Tambah'/>
            <Loading Proses = {this.state.isLoading}/>
         </ScrollView>

         <AwesomeAlert
          show={this.state.showAlert}
          title={this.state.titleAlert}
          message={this.state.messageAlert}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={this.state.confirmAlert}
          cancelText='Kembali'
          confirmText='Konfirmasi'
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {this.KonfirmasiAlert()}}
          onCancelPressed={() => {this.setState({showAlert : false})}}
        />

         <Loading Proses = {this.state.isLoading}/>

      </View>
   )}
}

const styles = StyleSheet.create({
   body:{
      flex: 1,
      marginLeft: 20,
      marginRight: 20
   },
   box1:{
      height: Panjang/4,
      backgroundColor: '#B90303',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      padding: Ukuran/40,
      marginBottom: Ukuran/50
   },
   title1 :{
      margin: Ukuran/45,
      fontSize: Ukuran/35,
      fontWeight: 'bold'

   },
   titleInfo: {
      color: 'white',
      fontSize: Ukuran/40,
      textAlign: 'center',
      fontWeight: 'bold'
   }
})