import React from 'react';
import { StyleSheet, Text, View,FlatList} from 'react-native';
import firebase from '../database/firebase'
import ListKasMasukAdmin from '../admin_screens/node_screens_admin/ListKasMasukAdmin'

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
    const twoRef = db.child('kas_masuk').orderByChild('id_kasmasuk').equalTo(uid)
    twoRef.on('value', snap => {
         const datai = snap.val()
         this.setState({data : datai})
         
      })
  }
  Nilai(list) {
    this.props.navigation.navigate('DetailAdmin', {
    data : this.setState.data = list
    })
  }


    
  render(){
   

  
  const nilai = Object.values(this.state.data)
  console.log(nilai)
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
            data={nilai}
            renderItem={({ item }) => <ListKasMasukAdmin Nilai={this.Nilai.bind(this)} data={item} />}
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
