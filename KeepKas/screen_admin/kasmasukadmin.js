import React from 'react';
import { StyleSheet, View,FlatList, Alert, Text} from 'react-native'
import firebase from '../database/firebase'
import moment from 'moment'
import ListKasMasukAdmin from '../screen_node/ListKasMasukAdmin'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class KasmasukAdmin extends React.Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }
  }
  componentDidMount() {
    this.fetchData()
 }
 getDateWithMoment = () => {
  return moment().format('DD');
}

  fetchData = async () => {
    const { uid } = this.props.route.params
    const db = firebase.database().ref('kas_masuk/'+uid+'/')
    var onValueChange =(snap)=>{ 
      const datai = snap.val() 
      this.setState({data : datai})
    }
    db.on('value', onValueChange)
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
            renderItem={({ item }) => <ListKasMasukAdmin Nilai={this.Nilai.bind(this)} data={item} />}
            keyExtractor={item=>item.id}
            ListEmptyComponent={NullData()}
        />
      </View>
      <FAB 
        buttonColor='#20c720' 
        iconTextColor="#FFFFFF" 
        onClickAction={() => {this.props.navigation.navigate('TambahKasAdmin',{uid : firebase.auth().currentUser.uid, displayName: firebase.auth().currentUser.displayName, photoURL: firebase.auth().currentUser.photoURL})}}
        visible={true} 
        iconTextComponent={<Icon name="plus"/>} 
      />   
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
