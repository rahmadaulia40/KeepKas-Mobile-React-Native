import React from 'react';
import { StyleSheet, View,FlatList} from 'react-native';
import firebase from '../database/firebase'
import ListRincianKas from '../screen_node/ListRincianKas'

export default class RincianKas extends React.Component {
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
    const twoRef = db.child('kas_masuk').orderByChild('id_user').equalTo(uid)
    twoRef.on('value', snap => {
         const data = snap.val()
         const json = data
         this.setState({data : json})
         
      })
  }
  Nilai(list) {
    this.props.navigation.navigate('Details', {
    data : this.setState.data = list
    })
  }

  render(){
  const nilai = Object.values(this.state.data)
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
            data={nilai}
            renderItem={({ item }) => <ListRincianKas Nilai={this.Nilai.bind(this)} data={item} />}
            keyExtractor={item => item.id}
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
