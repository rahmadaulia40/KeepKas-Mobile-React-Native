import React from 'react'
import {Ukuran} from '../screen_components/Dimentions'
import AwesomeAlert from 'react-native-awesome-alerts'

const Loading = ({Proses}) => {
   return (
      <AwesomeAlert
          show= {Proses}
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          progressSize={Ukuran/12}
          progressColor='blue'
          message="Sedang Proses..."
          confirmButtonColor="#DD6B55"
        />
   )
}

export default Loading