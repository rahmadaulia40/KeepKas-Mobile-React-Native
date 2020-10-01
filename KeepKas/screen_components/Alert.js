import React from 'react'
import {StyleSheet,View,Image,ActivityIndicator, Text} from 'react-native'

import AwesomeAlert from 'react-native-awesome-alerts'

const Alert = ({TxtHeader,Color,Message,MarginTop, ...rest}) => {
   return (
   <View style={styles.preloader}>
      <AwesomeAlert
          show={true}
          title={TxtHeader}
          message={Message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          {...rest}
      />
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

export default Alert