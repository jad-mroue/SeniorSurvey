import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage, CheckBox, Picker, Alert} from 'react-native'

export default class Inputs extends Component{
   state = {
      id: '',
      password: '',
      isLoggingIn: false,
      role: 'student',
      message: '',
      checked: true,
      email: '',
      fname: '',
      lname: '',
      token: ''
   }

   handleID = (text) => {
      this.setState({ id: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }

   login = async (ID, pass, Role) => {
      const loginURL = "https://survey-ul.info/server/api/auth/login"
      const user = {
         id: ID,
         password: pass,
         role: Role
      }
      const options = {
         method: 'POST',
         body: JSON.stringify(user),
         headers: {
             'Content-Type': 'application/json'
         }
      }
      try{
         const response = await fetch(loginURL, options)
         const result = await response.json()

         if(response.ok){
            //console.log(result.x_auth_token)
            this.setInAsyncStorage(ID, result.user.first_name, result.user.last_name, result.user.email, pass, Role, result.x_auth_token)
            this.props.onLoginPress()
         }else{
            if(response.status == 401){
               Alert.alert('Check your credentials or Internet connection')
            }
            if(response.status == 404){
               Alert.alert('User not found. Please try again.')
            }
            if(response.status == 500){
               Alert.alert('An error occured')
            }
         }
      }
      catch(error_network){
         Alert.alert('Cannot Login', error_network.message,[
            {text: 'OK'}
          ])
      }

      this.setState({ isLoggingIn: true, message: '' });

   }
   setInAsyncStorage = async (id, fname, lname, email, password, role, token) => {
      try{
         await AsyncStorage.setItem('token', token)
         await AsyncStorage.setItem('ID', id)
         await AsyncStorage.setItem('Password', password)
         await AsyncStorage.setItem('Role', role)
         await AsyncStorage.setItem('Email', email)
         await AsyncStorage.setItem('FirstName', fname)
         await AsyncStorage.setItem('LastName', lname)
         // await AsyncStorage.multiSet(
         //    [
         //       ['token', token]
         //       ['ID', id],
         //       ['Password', password],
         //       ['Role', role],
         //       ['Email', email],
         //       ['FirstName', fname],
         //       ['LastName', lname]
         //    ]
         // )
      }
      catch(error){
         console.log("\n\n\nError in Async MultiSet\n\n\n" + error.message)
      }
   }
   testfn = async () => {
      this.props.onLoginPress()
   }
   goToForgotPassword = () => this.props.navigation.navigate('ForgotPass')
   
   LoginRemebered = async () => {
      this.getInfo()
      const loginURL = "https://survey-ul.info/server/api/auth/login"
      const user = {
         id: this.state.id,
         password: this.state.password,
         role: this.state.role
      }
      const options = {
         method: 'POST',
         body: JSON.stringify(user),
         headers: {
             'Content-Type': 'application/json'
         }
      }
      try{
         const response = await fetch(loginURL, options)
         const result = await response.json()

         if(response.ok){
            this.props.onLoginPress()
         }else{
            if(response.status === 401){
               Alert.alert(response.status,': Check your credentials or Internet connection')
            }
            if(response.status === 404){
               Alert.alert('User not found. Please try again.')
            }
            if(response.status === 500){
               Alert.alert('An error occured')
            }
         }
      }
      catch(error_network){
         Alert.alert('Cannot Login', 'Check connection and credentials',[
            {text: 'OK'}
          ])
         console.log("\n\n\nError in catch"+ error_network + "\n\n\n")
      }

   }
   getInfo = async () => {
      try{
          const token = await AsyncStorage.getItem('token')
          const id = await AsyncStorage.getItem('ID')
          const email = await AsyncStorage.getItem('Email')
          const password = await AsyncStorage.getItem('Password')
          const role = await AsyncStorage.getItem('Role')
          const fname = await AsyncStorage.getItem('FirstName')
          const lname = await AsyncStorage.getItem('LastName')
          if(id !== null && email !== null && password !== null && role !== null && fname !== null && lname !== null)
          {
              this.setState({ token: token })
              this.setState({ id: id })
              this.setState({ email: email })
              this.setState({ password: password })
              this.setState({ role: role })
              this.setState({ fname: fname })
              this.setState({ lname: lname })
          }
          else{
             Alert.alert('Null Value(s)', 'Retry Logging In',[
               {text: 'OK'}
             ])
          }
      }catch(err){

      }
  }
   render(){
      // const token = AsyncStorage.getItem('token')
      // if(token !== true){
      //    LoginRemebered()
      // }
      return (
        <View style={styles.container_external}>
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               placeholder = "ID Number"
               placeholderTextColor = "#1C2039"
               autoCapitalize = "none"
               onChangeText = {this.handleID}/>
            
            <TextInput style = {styles.input}
               placeholder = "Password"
               placeholderTextColor = "#1C2039"
               secureTextEntry={true}
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>


            <View>
               <TouchableOpacity>
                  <Picker
                     selectedValue={this.state.role}
                     onValueChange={(itemValue, itemValueIndex) => this.setState({ role: itemValue })}
                     alignSelf="center"
                     style={styles.container_picker}
                  >
                     <Picker.Item label="Student" value="student"></Picker.Item>
                     <Picker.Item label="Staff" value="staff"></Picker.Item>
                  </Picker>
               </TouchableOpacity>
            </View>
            <View>
               <TouchableOpacity
                  style = {styles.LoginButton}
                  disabled = { !this.state.id || !this.state.password }
                  onPress = {
                     () => this.login(this.state.id, this.state.password, this.state.role)
                  }>
                  <Text style = {styles.LoginButtonText}> Login </Text>
               </TouchableOpacity>
               <TouchableOpacity
                    onPress={
                        this.goToForgotPassword
                    }
                    >
                    <Text style={styles.forgotPass}>Forgot my password?</Text>
                  
               </TouchableOpacity>

               <View style = {styles.checkbox} >
                  <CheckBox 
                     value={this.state.checked}
                     onValueChange={() => this.setState({ checked: !this.state.checked })}
                  />
                  <Text style = {styles.remember}> Remember Me</Text>
                  
               </View>
            </View>
         </View>
         </View>
      )
    }
}  

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   container_external: {
       flex: 1,
       backgroundColor: '#ffffff',
       alignItems: 'center',
       justifyContent: 'center',
    },
   container_picker: {
      margin: 0.5,
      padding: 0,
   },
   input: {
      margin: 15,
      height: 40,
      width:300,
      borderColor: '#1C2039',
      borderWidth: 1,
      textAlign: "center"
   },
   LoginButton: {
      backgroundColor: '#1C2039',
      padding: 10,
      margin: 15,
      height: 40,
      width:200,
      alignSelf:"center"
   },
   LoginButtonText:{
      color: 'white',
      textAlign: "center"
   },
   checkbox: {
      paddingTop:25,
      alignSelf:"center",
      flexDirection: "row"
   },
   forgotPass: {
      color:'blue',
      alignSelf:'center',
      paddingTop:10
   },
   remember: {
      paddingTop:7,
   }
})