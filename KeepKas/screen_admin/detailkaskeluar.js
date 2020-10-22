import React from 'react'
import {View, StyleSheet,Text } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import {Ukuran} from '../screen_components/Dimentions'
import firebase from '../database/firebase'

import ButtonInput from '../screen_components/ButtonInput'
import Loading from '../screen_components/Loading'

export default class DetailKasKeluar extends React.Component {
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
    }

    KonfirmasiAlert=()=>{
      this.setState({pressAlert: this.delete()})
   }

   ButtonAlertKonfirmasi = () => {
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
      firebase.database().ref('kas_keluar/'+ data.id_admin + '/' + data.id + '/').remove()
      
      .then(()=>{
         firebase.database().ref('total_kas_keluar/'+data.id_admin+ '/' + data.id + '/').remove()
         this.props.navigation.navigate('KasKeluarAdmin')
      })
      
      .catch((error) => {
         this.setState({
            isLoading : false,
            showAlert : true,
            confirmAlert : false,
            titleAlert: 'Hapus Data Gagal !',
            messageAlert : String(error)
         })
      })
    }

   render() {
      const { data } = this.props.route.params   
      return (
         <View style={styles.container}>

            <View style={{alignItems: 'center'}}>
               <Text style={styles.titleHeader}>Detail Kas Keluar</Text>
            </View>

            <View style={styles.box}>
               <View>
                  <Text style={styles.titleInfo}>Nama</Text>
                  <Text style={styles.titleInfo}>Nominal</Text>
                  <Text style={styles.titleInfo}>Tanggal</Text>
               </View>
               <View>
                  <Text style={styles.titleInfo}>: {data.nama}</Text>
                  <Text style={styles.titleInfo}>: {this.currencyFormat(Number(data.nominal))}</Text>
                  <Text style={styles.titleInfo}>: {data.waktu}</Text>
               </View>
            </View>
            <View style={styles.box1}>
               <Text style={styles.titleInfo}>Keterangan :</Text>
                  <Text style={styles.titleInfo1} numberOfLines = {10}>{data.keterangan}</Text>
            </View>

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
         </View>
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
      color: '#B90303'
   },
   box:{
      backgroundColor: '#B90303',
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
      backgroundColor: '#B90303',
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