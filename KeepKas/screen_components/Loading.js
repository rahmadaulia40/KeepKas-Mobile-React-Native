import React from 'react'
import {StyleSheet,View,Image,ActivityIndicator, Dimensions} from 'react-native'

const Loading = () => {
   return (
   <View style={styles.preloader}>
      <Image source={require('../assets/icon.png')} style={{height: Dimensions.get('window').height/8, width: Dimensions.get('window').width/4}} />
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