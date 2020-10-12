import React from 'react'
import {StyleSheet,TouchableOpacity,Text, View, Dimensions} from 'react-native'

const ButtonView = ({Txt1,Txt2,Txt3,Color, ...rest}) => {
   return (
      <TouchableOpacity 
         style={{
            height: Dimensions.get('window').height / 7,
            backgroundColor: Color,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
            elevation: 10
         }} 
         {...rest}
      >
         <View style={styles.left}>
            <Text style={styles.titleLeft}>{Txt1}</Text>
            <Text style={styles.titleLeft}>{Txt2}</Text>
         </View>
         <View style={styles.right}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>{Txt3}</Text>
         </View>
      
   </TouchableOpacity>
   )
}

export default ButtonView

const styles = StyleSheet.create({
   left: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width / 2.5,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft: {
      fontSize: 22,
      color: 'white',
      fontWeight: 'bold'

   },
   right: {
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      paddingRight: 20

   },
})