import * as React from 'react';
import {View, StyleSheet} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import 'react-native-gesture-handler'
import Constants from 'expo-constants'

import Login from './screen/login'
import Signup from './screen/signup'
import RincianKasSaya from './screen/rinciankas'
import UbahDataProfil from './screen/ubahdataprofil'
import Jumlahanggota from './screen/jumlahanggota'
import Tentang from './screen/tentang'

import DashboardUser from './screen_user/dashboarduser'
import BayarKasUser from './screen_user/bayarkas'
import KasMasukUser from './screen_user/kasmasuk'

import TambahUser from './screen_admin/tambahuser'
import TambahKasAdmin from './screen_admin/tambahkas'
import DashboardAdmin from './screen_admin/dashboardadmin'
import ProfilAdmin from './screen_admin/profil'
import KasMasukAdmin from './screen_admin/kasmasukadmin'
import KasKeluarAdmin from './screen_admin/kaskeluar'
import DetailKasMasuk from './screen_admin/detailkasmasuk'
import TambahKasKeluar from './screen_admin/tambahkaskeluar'

const Stack = createStackNavigator();
const statusBarHeight = Constants.statusBarHeight

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <View style = {styles.bar}/>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle:{backgroundColor:'#3C6AE1'}, headerTintColor: 'white', headerTitleStyle :{fontWeight: 'bold', fontSize: 22} }}>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='SignUp' component={Signup} options={{headerShown: false}} />
          <Stack.Screen name='Jumlahanggota' component={Jumlahanggota} options={{ headerTitle: 'Data Angota'}} />
          <Stack.Screen name='RincianKasSaya' component={RincianKasSaya} options={{ headerTitle: 'Rincian Kas Saya'}} />
          <Stack.Screen name='Tentang' component={Tentang} options={{ headerTitle: 'Tentang Aplikasi'}} />

          <Stack.Screen name='HomeUser' component={DashboardUser} options={{ headerShown: false}} />
          <Stack.Screen name='KasMasukUser' component={KasMasukUser} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='BayarKasUser' component={BayarKasUser} options={{ headerTitle: 'Tambah Kas'}} />

          <Stack.Screen name='HomeAdmin' component={DashboardAdmin} options={{ headerShown: false}} />
          <Stack.Screen name='ProfilAdmin' component={ProfilAdmin} options={{ headerTitle: 'Profil'}} />
          <Stack.Screen name='UbahDataProfil' component={UbahDataProfil} options={{ headerTitle: 'Edit Profil'}} />
          <Stack.Screen name='KasMasukAdmin' component={KasMasukAdmin} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='KasKeluarAdmin' component={KasKeluarAdmin} options={{ headerTitle: 'Kas Keluar'}} />
          <Stack.Screen name='DetailKasMasuk' component={DetailKasMasuk} options={{ headerTitle: 'Detail Kas Masuk'}} />
          <Stack.Screen name='TambahKasKeluar' component={TambahKasKeluar} options={{ headerTitle: 'Tambah Pengeluaran'}} />
          <Stack.Screen name='TambahUser' component={TambahUser} options={{ headerTitle: 'Tambah Anggota'}} />
          <Stack.Screen name='TambahKasAdmin' component={TambahKasAdmin} options={{ headerTitle: 'Tambah Kas'}} />

          

          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles=StyleSheet.create({
  bar:{
    marginTop: statusBarHeight,
  },
  boxDrawer: {
    backgroundColor: 'white',
    borderRadius: 2,
    marginTop: 60
  },
  HeaderNav: {
     color: 'black'
  }
})

