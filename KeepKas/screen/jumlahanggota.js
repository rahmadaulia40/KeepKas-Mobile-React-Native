import React from 'react';
import { StyleSheet, View,FlatList, Alert} from 'react-native'
import firebase from '../database/firebase'
import ListUser from '../screen_node/ListUser'
import ButtonAction from '../screen_components/ButtonAction'

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
    const ButtonHeader = () => {
      return(
        <ButtonAction
          onPress={() => {this.props.navigation.navigate('ScanTambahUser')}}
          Txt = 'Tambah Anggota'
          iconName='account-multiple-plus'
          Color='#3C6AE1'
        />
      )
    }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
            data={nilai}
            renderItem={({ item }) => <ListUser Nilai={this.Nilai.bind(this)} data={item} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={ButtonHeader}
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
