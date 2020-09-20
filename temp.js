import 'react-native-gesture-handler'
import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Inputs from './LoginPage/Inputs'
import ForgotPass from './LoginPage/ForgotPass'
import Profile from './Profile/profile'
import ChangePassForm from './Profile/ChangePassForm';

const Stack = createStackNavigator()


export default class App extends Component {
  state = {
    isLoggedIn: false,
    username: '',
    email: '',
    password: ''
  }
  //password is used in case user wants to change his password
  //we compare saved password with entered password to successfully change it
  retrieveData = async () => {
    try{
      const email = await AsyncStorage.getItem('Email')
      if(email !== null)
      {
        return email
      }
    }
    catch(error){

    }
  }

  render(){
    if(!this.state.isLoggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Inputs' options={{title: 'Login'}}>
            {props => <Inputs {...props} onLoginPress={ () => this.setState({ isLoggedIn: !isLoggedIn}) } onChangeUsername = { (user_id) => ChangeUsername(user_id)} />}
          </Stack.Screen>
          <Stack.Screen name='ForgotPass' component={ForgotPass} options={{title: 'Password Recovery'}}/>
        </Stack.Navigator>
      </NavigationContainer>  
      )
    }
    else{
      return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Profile' options={{title: 'My Profile'}}>
            {props => <Profile {...props} onLogoutPress={ () => setIsLoggedIn(!isLoggedIn) } email = {Email}/>}
          </Stack.Screen>
          <Stack.Screen name='ChangePassForm' options={{title: 'Change Password Form'}}>
            {props => <ChangePassForm {...props}  />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>  
      )
    }
  }

}
