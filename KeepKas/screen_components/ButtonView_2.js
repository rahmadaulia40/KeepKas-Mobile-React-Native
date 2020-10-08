import React from 'react'
import {StyleSheet,TouchableOpacity,Text, View} from 'react-native'

const ButtonView = ({Txt1,Txt2,Txt3,Txt4,Color, ...rest}) => {
   return (
      <TouchableOpacity
         style={{
            height: 120,
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
            <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>{Txt3}</Text>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{Txt4}</Text>
         </View>
      </TouchableOpacity>
   )
}

export default ButtonView

const styles = StyleSheet.create({
   left: {
      height: 120,
      width: 170,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft: {
      fontSize: 22,
      color: 'white',
      fontWeight: 'bold'

   },
   right: {
      height: 120,
      width: 170,
      justifyContent: 'center',
      alignItems: 'center'

   },
})