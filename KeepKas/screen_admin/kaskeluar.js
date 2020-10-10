import React from 'react'
import {View, StyleSheet, FlatList, Alert, Text} from 'react-native'
import firebase from '../database/firebase'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ListKasKeluarAdmin from '../screen_node/ListKasKeluarAdmin'

export default class KasKeluarAdmin extends React.Component {
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
      const twoRef = db.child('kas_keluar/'+uid+'/')
      twoRef.on('value', snap => {
           const datai = snap.val()
           this.setState({data : datai})
        })
    }
    Nilai(list) {
      this.props.navigation.navigate('DetailKasKeluar', {
      data : this.setState.data = list
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
               renderItem={({ item }) => <ListKasKeluarAdmin Nilai={this.Nilai.bind(this)} data={item} />}
               keyExtractor={item => item.id}
               ListEmptyComponent={NullData()}
            />
         </View>
         <FAB 
            buttonColor='#B90303'
            iconTextColor="#FFFFFF" 
            onClickAction={() => {this.props.navigation.navigate('TambahKasKeluar', {uid: firebase.auth().currentUser.uid, displayName : firebase.auth().currentUser.displayName})}}
            visible={true} 
            iconTextComponent={<Icon name="pencil-minus"/>} 
          />   
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