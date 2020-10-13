import React from 'react'
import {StyleSheet,TouchableOpacity,Text, View} from 'react-native'
import {Panjang, Lebar, Ukuran} from '../screen_components/Dimentions'

const ButtonView = ({Txt1,Txt2,Txt3,Txt4,Color, ...rest}) => {
   return (
      <TouchableOpacity
         style={{
            height: Panjang / 7,
            backgroundColor: Color,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Ukuran/40,
            marginBottom: Ukuran/40,
            elevation: 10
         }}
         {...rest}
      >
         <View style={styles.left}>
            <Text style={styles.titleLeft}>{Txt1}</Text>
            <Text style={styles.titleLeft}>{Txt2}</Text>
         </View>
         <View style={styles.right}>
            <Text style={{color: 'white', fontSize: Ukuran/20, fontWeight: 'bold'}}>{Txt3}</Text>
            <Text style={{color: 'white', fontSize: Ukuran/40, fontWeight: 'bold'}}>{Txt4}</Text>
         </View>
      </TouchableOpacity>
   )
}

export default ButtonView

const styles = StyleSheet.create({
   left: {
      height: Panjang,
      width: Lebar / 2.5,
      justifyContent: 'center',
      alignItems: 'center'

   },
   titleLeft: {
      fontSize: Ukuran/35,
      color: 'white',
      fontWeight: 'bold'

   },
   right: {
      height: Panjang,
      width: Lebar / 3,
      justifyContent: 'center',
      alignItems: 'center'

   },
})