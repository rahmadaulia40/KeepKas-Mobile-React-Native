import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import firebase from '../database/firebase'
import ButtonPlus from '../screen_components/ButtonPlus'
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
            <ButtonPlus 
               onPress={() => {this.props.navigation.navigate('TambahKasKeluarAdmin', {uid: this.state.uid, displayName : this.state.displayName})}}
               Color = '#B90303'
            />
         </View>

         
      </View>
   )}
}

const styles = StyleSheet.create({
   container: {
     flex:1, 
     justifyContent: 'space-between'
   },
   body: {
     margin: 2,
     flex: 1
   },
   footer: {
      alignItems: 'flex-end',
   },
 });