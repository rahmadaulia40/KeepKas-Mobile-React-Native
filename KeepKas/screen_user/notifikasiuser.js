import React from 'react';
import { StyleSheet, View,FlatList, Text} from 'react-native'
import firebase from '../database/firebase'
import ListNotifikasiUser from '../screen_node//ListNotifikasiUser'
export default class NotifikasiUser extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.fetchData()
 }

  fetchData = async () => {
    const { id_admin, uid } = this.props.route.params
    const db = firebase.database().ref('proses/'+id_admin+'/').orderByChild('id_user').equalTo(uid)
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
          date: child.val().date,
          id_user: child.val().id_user,
          sorting: child.val().sorting
        })
      })
      this.setState({data:li})
    })
  }

  Nilai(list) {
    this.props.navigation.navigate('DetailNotifikasiUser', {
    data : this.setState.data = list
    })
  }

  render(){
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
            data={this.state.data}
            renderItem={({ item }) => <ListNotifikasiUser Nilai={this.Nilai.bind(this)} data={item} />}
            ListEmptyComponent={NullData()}
            
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
