import React from 'react';
import { StyleSheet, View,FlatList, Alert} from 'react-native'
import firebase from '../database/firebase'
import ListKasMasukAdmin from '../screen_node/ListKasMasukAdmin'
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
    const twoRef = db.child('kas_masuk').orderByChild('id_admin').equalTo(uid)
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
          onPress={() => {this.props.navigation.navigate('TambahKasAdmin',{uid : firebase.auth().currentUser.uid, displayName: firebase.auth().currentUser.displayName, photoURL: firebase.auth().currentUser.photoURL})}}
          Txt = 'Tambah Kas'
          iconName='plus'
          Color='#3C6AE1'
        />
      )}
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
            data={nilai}
            renderItem={({ item }) => <ListKasMasukAdmin Nilai={this.Nilai.bind(this)} data={item} />}
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
    justifyContent: 'space-between'
  },
  body: {
    margin: 2,
  }
});
