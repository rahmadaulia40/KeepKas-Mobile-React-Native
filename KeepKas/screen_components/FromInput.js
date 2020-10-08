import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

const FromInput = ({labelValue, placeholderText,NumberOfLines,KeyboardType,MarginTop,MarginBottom, ...rest}) => {
   return (
         <View style={{
            backgroundColor: '#DAEAF9',
            height: 60,
            marginTop: MarginTop,//12
            marginBottom: MarginBottom,//24
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