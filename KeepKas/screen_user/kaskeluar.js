import React from 'react'
import {View, StyleSheet, FlatList, Alert, Text} from 'react-native'
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
      const NullData=()=>{
        return (
          <View style={{alignItems: 'center', paddingTop: 30}}>
            <Text style={{color:'#a7a7a7', fontSize: 14}}>Data Kosong/Tidak Ditemukan</Text>
          </View>
        )
      }
   return (
      <View style={styles.container}>
         <View style={styles.body}>
            <FlatList
               data={nilai}
               renderItem={({ item }) => <ListKasKeluarUser data={item} />}
               keyExtractor={item => item.id}
               ListEmptyComponent={NullData()}
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