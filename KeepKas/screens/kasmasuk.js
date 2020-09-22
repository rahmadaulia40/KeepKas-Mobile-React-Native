import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList, ScrollView } from 'react-native';
import firebase from '../database/firebase'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        id_masuk : '',
        nama : '',
        jumlah : '',
        status : '',
        username : '',
        waktu : ''
    }
  }

  input(){
       firebase.database().ref('kas_masuk').push(
       {
         id_masuk : this.state.id,
         username : this.state.username,
         jumlah : this.state.jumlah,
         nama : this.state.nama,
         status : this.state.status,
         waktu : this.state.waktu
         
       }
       ).then(()=>{
       console.log('INSERTED !')
       //Alert.alert('Input Data', 'Berhasil !')
       
       }).catch((error) => {
       console.log(error)
   })
}
    
   render(){
  return (
    <View style={styles.container}>
      <Text>Input Data</Text>
    <View style={styles.body}>
      <View style={styles.box}>
        <TextInput placeholder='Input id' onChangeText={id => this.setState({ id })}></TextInput>
      </View>
      <View style={styles.box}>
        <TextInput placeholder='Input username' onChangeText={username => this.setState({ username })}></TextInput>
      </View>
      <View style={styles.box}>
        <TextInput placeholder='Input nama' onChangeText={nama => this.setState({ nama })}></TextInput>
      </View>
      <View style={styles.box}>
        <TextInput placeholder='Input jumlah' onChangeText={jumlah => this.setState({ jumlah })}></TextInput>
      </View>
      <View style={styles.box}>
        <TextInput placeholder='Input status' onChangeText={status => this.setState({ status })}></TextInput>
      </View>
      <View style={styles.box}>
        <TextInput placeholder='Input waktu' onChangeText={waktu => this.setState({ waktu })}></TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => this.input()}>
        <Text style={{color: 'white', textAlign: 'center'}}>INPUT</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center'
  },
  box: {
    borderWidth: 1,
    height: 50,
    width: 250,
    color: 'black',
    margin: 10
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: 'green',
    justifyContent: 'center'
  }
});
