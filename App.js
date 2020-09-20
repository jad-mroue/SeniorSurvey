import 'react-native-gesture-handler'
import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Inputs from './LoginPage/Inputs'
import ForgotPass from './LoginPage/ForgotPass'
import Profile from './Profile/profile'
import ChangePassForm from './Profile/ChangePassForm';
import ListQuestionScreen from './screens/list.questions.screen'
import ListSurveysScreen from './screens/list.surveys.screen'
const Stack = createStackNavigator()


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [Username, ChangeUsername] = useState('')
  // const [Email, ChangeEmail] = useState('')
  // const [Password, ChangePassword] = useState('')
  //password is used in case user wants to change his password
  //we compare saved password with entered password to successfully change it

  const Auth = (      
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Inputs' options={{title: 'Login'}}>
          {props => <Inputs {...props} onLoginPress={ () => setIsLoggedIn(!isLoggedIn)} />}
        </Stack.Screen>
        <Stack.Screen name='ForgotPass' component={ForgotPass} options={{title: 'Password Recovery'}}/>
      </Stack.Navigator>
    </NavigationContainer>  
);
const Use = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Profile' options={{title: 'My Profile'}}>
          {props => <Profile {...props} onLogoutPress={ () => setIsLoggedIn(!isLoggedIn) } />}
        </Stack.Screen>
        <Stack.Screen name='ChangePassForm' options={{title: 'Change Password Form'}}>
          {props => <ChangePassForm {...props}  />}
        </Stack.Screen>
        <Stack.Screen name='ListSurveysScreen' options={{title: 'Survey'}}>
          {props => <ListSurveysScreen {...props}  />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>  
);

  if(!isLoggedIn){
    return (
      Auth
    );
  }
  else{
    return (
      Use
    );
  }
}
  
  // _retrieveData = async () => {
  //   try{
  //     const ID = await AsyncStorage.getItem('ID')
  //     const email = await AsyncStorage.getItem('Email')
  //     const password = await AsyncStorage.getItem('password')
  //     const role = await AsyncStorage.getItem('Role')
  //     const fname = await AsyncStorage.getItem('FirstName')
  //     const lname = await AsyncStorage.getItem('LastName')
  //     if(ID !== null && email !== null && password !== null && role !== null && fname !== null && lname !== null)
  //     {
  
  //     }
  //     else{
  
  //     }
  //   }
  //   catch(error){
  
  //   }
  // }