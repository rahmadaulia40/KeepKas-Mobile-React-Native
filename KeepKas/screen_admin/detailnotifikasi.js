import React from 'react'
import {View, StyleSheet,Text, ScrollView} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import {Ukuran} from '../screen_components/Dimentions'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'

export default class DetailNotifikasi extends React.Component {
   constructor() {
      super()
      this.state = {
        isLoading: false,
        showAlert : false,
        confirmAlert : false,
        pressAlert : '',
        titleAlert : '',
        messageAlert : '',
      }
    }
   currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    konfirmasi = () => {
      this.setState({isLoading: true})
      const { data } = this.props.route.params
      var db = firebase.database().ref('kas_masuk/'+data.id_admin+'/')
         var ref = db.push({
            date: data.date,
            id: data.id,
            id_admin: data.id_admin,
            id_user: data.id_user,
            keterangan: data.keterangan,
            nama: data.nama,
            nominal: data.nominal,
            sorting: data.sorting,
            status: 'Sukses'
         })
         var id = ref.key
         db.child(ref.key).update({id : id})
         firebase.database().ref('total_kas_masuk/'+data.id_admin+ '/').update({[id] : Number(data.nominal)})
         .then(()=>{
            firebase.database().ref('proses/'+data.id_admin + '/'+data.id+'/').remove()
            this.props.navigation.navigate('NotifikasiAdmin')
         })
         .catch((error) => {
            this.setState({
               isLoading : false,
               showAlert : true,
               confirmAlert : false,
               titleAlert: 'Konfirmasi Data Gagal !',
               messageAlert : String(error)
            })
         })
    }

    KonfirmasiAlert=()=>{
      this.setState({pressAlert: this.delete()})
   }

   ButtonAlertKonfirmasi = () =>{
      this.setState({
         showAlert : true,
         confirmAlert : true,
         titleAlert: "Hapus Data !",
         messageAlert : "Apakah anda yakin ingin menghapus data ?"
      })
   }

    delete = () => {
      this.setState({isLoading: true})
      const { data } = this.props.route.params
      firebase.database().ref('proses/'+data.id_admin+ '/' + data.id + '/').remove()
      
      .then(()=>{
         this.props.navigation.navigate('NotifikasiAdmin')
      })
      
      .catch((error) => {
         this.setState({
            isLoading : false,
            showAlert : true,
            confirmAlert : false,
            titleAlert: 'Konfirmasi Data Gagal !',
            messageAlert : String(error)
         })
      })
    }
    KonfirmasiAlert=()=>{
      this.delete()
   }
   render() {
      const { data } = this.props.route.params
      if (data.status == 'Sukses')
      {
         this.state.color = '#98a8d2'
      }
      else
      {
         this.state.color = '#3C6AE1'
      } 
      return (
         <ScrollView style={styles.container}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.titleHeader}>Konfirmasi Kas Masuk</Text>
            </View>

            <View style={styles.box}>
               <View>
                  <Text style={styles.titleInfo}>Nama</Text>
                  <Text style={styles.titleInfo}>Nominal</Text>
                  <Text style={styles.titleInfo}>Tanggal</Text>
                  <Text style={styles.titleInfo}>Status</Text>
               </View>
               <View>
                  <Text style={styles.titleInfo}>: {data.nama}</Text>
                  <Text style={styles.titleInfo}>: {this.currencyFormat(Number(data.nominal))}</Text>
                  <Text style={styles.titleInfo}>: {data.date}</Text>
                  <Text style={styles.titleInfo}>: {data.status}</Text>
               </View>
            </View>
            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Keterangan :</Text>
                  <Text style={styles.titleInfo1} numberOfLines = {10}>{data.keterangan}</Text>
            </View>

            <ButtonInput
               onPress={() => this.konfirmasi()}
               titleButton = 'Konfirmasi'
               Txt = 'Konfirmasi'
               Color = {this.state.color}
               MarginTop = {20}
            />

            <ButtonInput
               onPress={() => this.ButtonAlertKonfirmasi()}
               titleButton = 'Hapus Data'
               Txt = 'Hapus Data'
               Color = '#B90303'
               MarginTop = {20}
            />

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
         
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: Ukuran/40
   },
   titleHeader :{
      margin: Ukuran/40,
      fontSize: Ukuran/35,
      fontWeight: 'bold',
      color: '#3C6AE1'
   },
   box:{
      backgroundColor: '#3C6AE1',
      alignItems: 'center',
      borderRadius: 20,
      padding: Ukuran/40,
      flexDirection: 'row',
      elevation: 10
   },
   titleInfo: {
      color: 'white',
      fontSize: Ukuran/40,
      fontWeight: 'bold',
      paddingRight: 5,
      marginTop: Ukuran/60,
      marginRight: Ukuran/60
   },
   box1 :{
      backgroundColor: '#3C6AE1',
      justifyContent: 'center',
      borderRadius: 20,
      padding: Ukuran/40,
      elevation: 10,
      marginTop: 10
   },
   titleInfo1 : {
      color: 'white',
      fontSize: Ukuran/40,
      fontWeight: 'bold',
      paddingLeft: 20,
      marginTop: 10,
   },
})