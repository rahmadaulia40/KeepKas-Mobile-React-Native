import React from 'react'
import {StyleSheet,View,Image,ActivityIndicator, Text} from 'react-native'

import AwesomeAlert from 'react-native-awesome-alerts'

const Loading = () => {
   return (
   <View style={styles.preloader}>
      <Image source={require('../assets/icon.png')} style={{height: 90, width: 90}} />
      <ActivityIndicator size={50} color="#3C6AE1"/>
  </View>
   )
}

const styles = StyleSheet.create({
   preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }
})

export default Loading