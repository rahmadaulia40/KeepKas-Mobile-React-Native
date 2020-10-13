import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import {Panjang, Ukuran} from '../screen_components/Dimentions'
const FromInput = ({labelValue, placeholderText,NumberOfLines,KeyboardType,MarginTop,MarginBottom, ...rest}) => {
   return (
         <View style={{
            backgroundColor: '#DAEAF9',
            height: Panjang / 13,
            marginTop: MarginTop,
            marginBottom: MarginBottom,

         }}>
            <TextInput
               value={labelValue}
               style={styles.textInput}
               numberOfLines={NumberOfLines}
               placeholder={placeholderText}
               keyboardType={KeyboardType}
               {...rest}
            />
         </View>
   )
}

export default FromInput

const styles = StyleSheet.create ({
   textInput:{
      color : 'black',
      padding: Ukuran/40,
      fontSize: Ukuran/55
    }
})