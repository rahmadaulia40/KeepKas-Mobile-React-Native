import React from 'react'
import {View, StyleSheet, FlatList, Text, Alert} from 'react-native'
import firebase from '../database/firebase'
import ListKasKeluarAdmin from '../screen_node/ListKasKeluarAdmin'
import ButtonInput from '../screen_components/ButtonInput'

export default class KasKeluar extends React.Component {
   constructor() {
      super()
      this.state = {
        data: ''
      }
    }
    componentDidMount() {
      this.fetchData()
   }
    fetchData = async () => {
      const { uid } = this.props.route.params
      const db = firebase.database().ref()
      const twoRef = db.child('kas_keluar').orderByChild('id_user').equalTo(uid)
      twoRef.on('value', snap => {
           const datai = snap.val()
           this.setState({data : datai})
        })
    }
    Nilai(list) {
      this.props.navigation.navigate('DetailAdmin', {
      data : this.setState.data = list
      })
    }
    CekData(){
      if (this.state.data == undefined)
      {
        Alert.alert('Data Kas Masuk', 'Data Kosong/Tidak ditemukan')
      }
      else
      {
        return Object.values(this.state.data)
      }
    }
  
   render(){
      const nilai = this.CekData()
      this.state = { 
         displayName: firebase.auth().currentUser.displayName,
         uid: firebase.auth().currentUser.uid,
         photoURL: firebase.auth().currentUser.photoURL
       }
   return (
      <View style={styles.container}>

         <View style={styles.body}>
            <FlatList
               data={nilai}
               renderItem={({ item }) => <ListKasKeluarAdmin Nilai={this.Nilai.bind(this)} data={item} />}
               keyExtractor={item => item.id}
            />
         </View>
         <View style={styles.footer}>
            <ButtonInput
               onPress={() => {this.props.navigation.navigate('TambahKasKeluar', {uid: this.state.uid, displayName : this.state.displayName})}}
               titleButton = 'Bayar Kas'
               Txt = 'Tambah Pengeluaran'
               Color = '#B90303'
            />
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   container: {
     justifyContent: 'space-between',
     flex: 1
   },
   body: {
     flex: 1
   },
   footer: {
      margin: 5
   },
 });