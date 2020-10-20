import React from 'react';
import { StyleSheet, View,FlatList, Text} from 'react-native'
import firebase from '../database/firebase'
import ListUser from '../screen_node/ListUser'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class JumlahAnggota extends React.Component {
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
    const twoRef = db.child('users/'+uid+'/')
    twoRef.on('value', onValueChange)
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
            renderItem={({ item }) => <ListUser data={item} />}
            keyExtractor={item => item.id}
            ListEmptyComponent={NullData()}
        />
      </View>
      <FAB 
        buttonColor='#3C6AE1'
        iconTextColor="#FFFFFF" 
        onClickAction={() => {this.props.navigation.navigate('ScanTambahUser')}}
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
    justifyContent: 'space-between',
  },
  body: {
    margin: 2,
  }
});
