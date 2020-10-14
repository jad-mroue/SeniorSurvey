import React, { Component } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { View, Text, TouchableOpacity, StyleSheet, CheckBox, Picker, Button, Alert, AsyncStorage} from 'react-native'

export default class ChangePassForm extends Component{
    state = {
        //get old pass from async storage
        old_pass: '',
        new_pass: '',
        confirm_new_pass: '',
        token: '',
        IN: true,
        BorderColor: '#1C2039',
        BorderColor_Confirm: '#1C2039'
    } 
    //sending api request to change password
    ChangePassword = async (old_password, new_password) => {
        const forgotUrl = "https://server.survey-ul.info/server/api/profile/password"
        const password_change = {
            old_password: old_password,
            new_password: new_password
        }
        
        const options = {
            method: 'POST',
            body: JSON.stringify(password_change),
            headers: {
                'Content-Type': 'application/json',
                'x_auth_token': this.state.token
            }
        }
        
        try{
            const response = await fetch(forgotUrl, options)
            const result = await response.json()
            if(response.ok){
                //this.props.navigation.navigate('Profile') 
                Alert.alert('Success','Password Changed',[
                    {text: 'OK'}
                ])
            }else{
                if(response.status == 401){
                    Alert.alert('Incorrect Password!', 'Please try again later',[
                        {text: 'OK'}
                    ])
                }
                else{
                    if(response.status == 500){
                        Alert.alert('Error!', 'An error occured while changing the password',[
                            {text: 'OK'}
                        ])
                    }
                }
            }
        }
        catch(error_network){
            console.log("\n\n\nError in http response\n\n\n"+ error_network.message)
        }
    }
    handleOldPassword = (text) => {
        this.setState({ old_pass: text })
    }
    handleNewPassword = (text) => {
        this.setState({new_pass: text})
    }
    handleConfirmPassword = (text) => {
        this.setState({confirm_new_pass: text})
    }
    //comparing new and confirmation password 
    CheckConfirmPassword = (pass) => {
        if(this.state.new_pass === pass){
            this.setState({BorderColor_Confirm: '#5bea5b'})
        }
        else{
            this.setState({BorderColor_Confirm: 'red'})
        }
    }
    //checking password length and changing graphical appearance accordingly
    CheckPassword = (pass) => {
        if(pass.length < 3){
            this.setState({BorderColor: 'red'})
        }
        else{
            if(pass.length < 8){
                this.setState({BorderColor: '#f9a946'})
            }
            else{
                this.setState({BorderColor: '#5bea5b'})
            }
        }
    }
    getInfo = async () => {
        try{
            const token = await AsyncStorage.getItem('token')
            this.setState({ token: token })
            }catch(err){
                Alert.alert('Error:',err.message)
            }
    }
    render(){
        if(this.state.IN){
            this.getInfo()
            this.setState({IN: false})
        }
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder = "Old Password"
                    placeholderTextColor = "#1C2039"
                    secureTextEntry={true}
                    autoCapitalize = "none"
                    style={styles.input}
                    onChangeText = {this.handleOldPassword}
                    maxLength={16}
                />
                <TextInput
                    placeholder = "New Password"
                    placeholderTextColor = "#1C2039"
                    secureTextEntry={true}
                    autoCapitalize = "none"
                    style={styles.input }
                    borderColor = {this.state.BorderColor}
                    onChangeText = {this.handleNewPassword}
                    onChange = {() => this.CheckPassword(this.state.new_pass)}
                    maxLength = {16}
                />
                <TextInput
                    placeholder = "Confirm New Password"
                    placeholderTextColor = "#1C2039"
                    secureTextEntry={true}
                    autoCapitalize = "none"
                    style={styles.input}
                    borderColor = {this.state.BorderColor_Confirm}
                    onChangeText = {this.handleConfirmPassword}
                    onChangeText = {this.CheckConfirmPassword}
                    maxLength={16}
                />
               <TouchableOpacity
                    style={styles.ChangePasswordButton}
                    onPress={() => this.ChangePassword(this.state.old_pass, this.state.new_pass)}
                >
                    <Text style={styles.ChangePassText}>Change Password</Text>
                  
               </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 23,
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    ChangePasswordButton: {
        backgroundColor: '#133337',
        margin: 30,
        padding: 10, 
        width: 250, 
        alignSelf: 'center',
        alignItems: 'center'
    },
    ChangePassText:{
        color: 'white',
        textAlign: 'center'
    },
    input: {
        margin: 15,
        height: 40,
        width: 300,
        borderColor: '#1C2039',
        borderWidth: 1,
        textAlign: "center"
     },

})