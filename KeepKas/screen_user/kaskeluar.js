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
      const db = firebase.database().ref('kas_keluar/'+photoURL+'/').orderByChild('sorting')
      db.on('value', (snapshot)=>{
        var li = []
        snapshot.forEach((child)=>{
          li.push({
            id:child.val().id,
            id_admin:child.val().id_admin,
            nama:child.val().nama,
            nominal:child.val().nominal,
            keterangan:child.val().keterangan,
            status:child.val().status,
            date: child.val().date
          })
        })
        this.setState({data:li})
      })
      }

   render(){
      const nilai = Object.values(this.state.data)
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