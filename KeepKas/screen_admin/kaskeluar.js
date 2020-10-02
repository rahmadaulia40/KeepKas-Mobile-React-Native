import React from 'react'
import {View, StyleSheet, FlatList, Alert} from 'react-native'
import firebase from '../database/firebase'
import ListKasKeluarAdmin from '../screen_node/ListKasKeluarAdmin'

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
      const twoRef = db.child('kas_keluar').orderByChild('id_admin').equalTo(uid)
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
   return (
      <View style={styles.container}>
         <View style={styles.body}>
            <FlatList
               data={nilai}
               renderItem={({ item }) => <ListKasKeluarAdmin Nilai={this.Nilai.bind(this)} data={item} />}
               keyExtractor={item => item.id}
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
     margin: 2
   },
 });