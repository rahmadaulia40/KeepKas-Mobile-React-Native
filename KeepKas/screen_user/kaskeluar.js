import React from 'react'
import {View, StyleSheet, FlatList, Alert} from 'react-native'
import firebase from '../database/firebase'
import ListKasKeluarUser from '../screen_node/ListKasKeluarUser'

export default class KasKeluarUser extends React.Component {
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
      const { photoURL } = this.props.route.params
      const db = firebase.database().ref()
      const twoRef = db.child('kas_keluar/'+photoURL+'/')
      twoRef.on('value', snap => {
           const datai = snap.val()
           this.setState({data : datai})
        })
    }
    CekData(){
      if (this.state.data == undefined)
      {
        Alert.alert('Data Kas Keluar', 'Data Kosong/Tidak ditemukan')
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
               renderItem={({ item }) => <ListKasKeluarUser data={item} />}
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