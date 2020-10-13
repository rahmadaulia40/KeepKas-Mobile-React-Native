import * as React from 'react';
import {View, StyleSheet} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Constants from 'expo-constants'
import {Panjang, Ukuran} from './screen_components/Dimentions'

import Login from './screen/login'
import SignupUser from './screen/signupuser'
import Signup from './screen/signup'
import ScanSignup from './screen/scannersignup'
import Profil from './screen/profil'

import DashboardUser from './screen_user/dashboarduser'
import BayarKasUser from './screen_user/bayarkas'
import KasMasukUser from './screen_user/kasmasuk'
import KasKeluarUser from './screen_user/kaskeluar'
import Jumlahanggotauser from './screen_user/jumlahanggotauser'

import ScanTambahUser from './screen_admin/scantambahuser'
import TambahKasAdmin from './screen_admin/tambahkas'
import DashboardAdmin from './screen_admin/dashboardadmin'
import KasMasukAdmin from './screen_admin/kasmasukadmin'
import KasKeluarAdmin from './screen_admin/kaskeluar'
import DetailKasMasuk from './screen_admin/detailkasmasuk'
import TambahKasKeluar from './screen_admin/tambahkaskeluar'
import DetailKasKeluar from './screen_admin/detailkaskeluar'
import Jumlahanggotaadmin from './screen_admin/jumlahanggota'

const Stack = createStackNavigator();
const statusBarHeight = Constants.statusBarHeight

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <View style = {styles.bar}/>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle:{backgroundColor:'#3C6AE1'}, headerTintColor: 'white', headerTitleStyle :{fontWeight: 'bold', fontSize: Ukuran/35} }}>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='SignUpUser' component={SignupUser} options={{headerShown: false}} />
          <Stack.Screen name='SignUp' component={Signup} options={{headerShown: false}} />
          <Stack.Screen name='ScannerSignUp' component={ScanSignup} options={{headerShown: false}} />
          <Stack.Screen name='Profil' component={Profil} options={{ headerTitle: 'Profil'}} />

          <Stack.Screen name='HomeUser' component={DashboardUser} options={{ headerShown: false}} />
          <Stack.Screen name='KasMasukUser' component={KasMasukUser} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='KasKeluarUser' component={KasKeluarUser} options={{ headerTitle: 'Kas Keluar'}} />
          <Stack.Screen name='BayarKasUser' component={BayarKasUser} options={{ headerTitle: 'Tambah Kas'}} />
          <Stack.Screen name='Jumlahanggotauser' component={Jumlahanggotauser} options={{ headerTitle: 'Data Angota'}} />

          <Stack.Screen name='HomeAdmin' component={DashboardAdmin} options={{ headerShown: false}} />
          <Stack.Screen name='KasMasukAdmin' component={KasMasukAdmin} options={{ headerTitle: 'Kas Masuk'}} />
          <Stack.Screen name='KasKeluarAdmin' component={KasKeluarAdmin} options={{ headerTitle: 'Kas Keluar'}} />
          <Stack.Screen name='DetailKasMasuk' component={DetailKasMasuk} options={{ headerTitle: 'Detail Kas Masuk'}} />
          <Stack.Screen name='DetailKasKeluar' component={DetailKasKeluar} options={{ headerTitle: 'Detail Kas Keluar'}} />
          <Stack.Screen name='TambahKasKeluar' component={TambahKasKeluar} options={{ headerTitle: 'Tambah Pengeluaran'}} />
          <Stack.Screen name='ScanTambahUser' component={ScanTambahUser} options={{ headerTitle: 'Tambah Anggota'}} />
          <Stack.Screen name='TambahKasAdmin' component={TambahKasAdmin} options={{ headerTitle: 'Tambah Kas'}} />
          <Stack.Screen name='Jumlahanggotaadmin' component={Jumlahanggotaadmin} options={{ headerTitle: 'Data Angota'}} />

          

          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles=StyleSheet.create({
  bar:{
    marginTop: statusBarHeight,
  },
  TitleHeader: {
    fontSize: Ukuran/35,
    fontWeight: 'bold'
  }
})

