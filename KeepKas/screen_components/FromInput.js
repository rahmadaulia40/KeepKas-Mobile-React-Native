import React from 'react'
import {View, TextInput, StyleSheet, Dimensions} from 'react-native'

const FromInput = ({labelValue, placeholderText,NumberOfLines,KeyboardType,MarginTop,MarginBottom, ...rest}) => {
   return (
         <View style={{
            backgroundColor: '#DAEAF9',
            height: Dimensions.get('window').height / 13,
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
      padding: 15,
      fontSize: 15
    }
})