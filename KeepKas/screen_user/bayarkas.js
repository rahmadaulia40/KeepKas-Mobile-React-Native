import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import firebase from '../database/firebase'
import FromInput from '../screen_components/FromInput'
import Loading from '../screen_components/Loading'
import ButtonInput from '../screen_components/ButtonInput'

export default class BayarKas extends React.Component {
   constructor() {
      super()
      this.state = {
         showAlert : false,
         confirmAlert : false,
         pressAlert : '',
         titleAlert : '',
         messageAlert : '',
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
         this.setState({
            showAlert : true,
            confirmAlert : false,
            titleAlert: 'Bayar Kas !',
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
         const { uid,photoURL,displayName } = this.props.route.params
         var db = firebase.database().ref('proses/'+photoURL+'/')
         var ref = db.push({
            id_admin : photoURL,
            id_user : uid,
            nama : displayName,
            nominal : this.state.jumlah,
            status : 'Di Proses',
            keterangan : this.state.keterangan,
            sorting : 99999999-Number(thn+bln+tgl),
            date : this.state.date
         })
         var id = ref.key
         db.child(ref.key).update({id : id})
         .then(()=>{
            this.setState({isLoading : false, jumlah:'',keterangan: ''})
            this.props.navigation.navigate('HomeUser')
         }).catch((error) => {
            this.setState({isLoading : false})
            this.setState({
               showAlert : true,
               confirmAlert : false,
               titleAlert: 'Bayar Kas Gagal !',
               messageAlert : String(error)
            })
           })
      }
    }
   render(){
   return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
         <ScrollView style={styles.body}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.title1}>Bayar Kas</Text>
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
               MarginTop={Ukuran/25}
            />

            <FromInput onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
               labelValue={this.state.keterangan}
               placeholderText = 'Input Keterangan'
               MarginTop={Ukuran/35}
            />

            <ButtonInput
               onPress={() => this.input()}
               titleButton = 'Tambah'
               Txt = 'Tambah'
               Color = '#3C6AE1'
               MarginTop = {Ukuran/30}
            />

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
          onCancelPressed={() => {this.setState({showAlert: false})}}
        />

         
         
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
      height: Panjang/3.5,
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
      fontSize: Ukuran/32,
      fontWeight: 'bold'
   },
   titleInfo: {
      color: 'white',
      fontSize: Ukuran/35,
      textAlign: 'center',
      fontWeight: 'bold'
   }
})