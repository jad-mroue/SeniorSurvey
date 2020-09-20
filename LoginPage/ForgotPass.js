import React, { Component } from 'react'
import { Text, View, Alert, StyleSheet, TextInput, Picker} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

class ForgotPass extends Component {
  state = {
    email: '',
    role: '',
    ID: '',
    
  }
  handleEmail = (email) => {
    this.setState({email: email})
  }
  forgotpass = async (ID, email, Role) => {
    const forgotUrl = "https://survey-ul.info/server/api/auth/forgot"
    const user = {
       id: ID,
       password: pass,
       email: email,
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
       const response = await fetch(forgotUrl, options)
       const result = await response.json()

       if(response.ok){
        Alert.alert('Email Sent!', 'Check your email to retrieve yout password',[
          {text: 'OK'}
        ])
       }else{
        Alert.alert('An Error Occured!', 'Check the ID, email and role submitted',[
          {text: 'OK'}
        ])
       }
    }
    catch(error_network){
       console.log("\n\n\nError in http response\n\n\n")
    }
  }
 testfn = () => {
  Alert.alert('Email Sent!', 'Check your email to retrieve your password',[
    {text: 'OK'}
  ])
 }
  render() {
    return (
      <View style= {styles.container_external}>
      <View style = {styles.container}>
        <Text>Enter your ID, registered Email and your role to proceed</Text>
        <TextInput style = {styles.input}
          placeholder = "ID"
          placeholderTextColor = "#1C2039"
          autoCapitalize = "none"
          onChangeText = {this.handleID}/>
        <TextInput style = {styles.input}
          placeholder = "Email"
          placeholderTextColor = "#1C2039"
          autoCapitalize = "none"
          onChangeText = {this.handleEmail}/>
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
        <TouchableOpacity
          style = {styles.LoginButton}
          onPress = { this.testfn}>
          <Text style = {styles.LoginButtonText}> Proceed </Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}

export default ForgotPass
const styles = StyleSheet.create({
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
input: {
   margin: 15,
   height: 40,
   width:300,
   borderColor: '#1C2039',
   borderWidth: 1,
   textAlign: "center"
},
container_picker: {
  margin: 0.5,
  padding: 0,
},
container: {
  paddingTop: 23
},
container_external: {
  flex: 1,
  backgroundColor: '#ffffff',
  alignItems: 'center',
  justifyContent: 'center',
}})