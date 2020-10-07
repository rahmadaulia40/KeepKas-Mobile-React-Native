import React from 'react';
import { StyleSheet, View,FlatList, Alert} from 'react-native'
import firebase from '../database/firebase'
import ListUser from '../screen_node/ListUser'

import ButtonInput from '../screen_components/ButtonInput'

export default class Kasmasuk extends React.Component {
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
    var onValueChange =(snap)=>{ 
      const datai = snap.val()
      this.setState({data : datai})
    }
    const twoRef = db.child('users').orderByChild('uidadmin').equalTo(uid)
    twoRef.on('value', onValueChange)
  }

  Nilai(list) {
    this.props.navigation.navigate('DetailKasMasuk', {
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
       uid : firebase.auth().currentUser.uid,
       displayName : firebase.auth().currentUser.displayName
    }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
            data={nilai}
            renderItem={({ item }) => <ListUser Nilai={this.Nilai.bind(this)} data={item} />}
            keyExtractor={item => item.id}
        />
      </View>
      <View style={{margin: 20}}>
        <ButtonInput
          onPress={() => {this.props.navigation.navigate('ScanTambahUser')}}
          titleButton = 'Tambah Anggota'
          Txt = 'Tambah Anggota'
          Color = '#3C6AE1'
        />
      </View>
    </View>
  )

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent: 'space-between',
  },
  body: {
    margin: 2,
  }
});
