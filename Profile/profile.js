import React , { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, CheckBox, Picker, Button, AsyncStorage, Alert} from 'react-native'

export default class Profile extends Component{
    state = {
        IN: true,
        Id: '',
        Email: '',
        Password: '',
        Role: '',
        FirstName: '',
        LastName: '',
        token: ''
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

            this.setState({ token: token })
            this.setState({ Id: id })
            this.setState({ Email: email })
            this.setState({ Password: password })
            this.setState({ Role: role })
            this.setState({ FirstName: fname })
            this.setState({ LastName: lname })
        }catch(err){
            Alert.alert('Error:',err.message)
        }
    }
    Logout = () => {
        AsyncStorage.multiRemove([
            ['token']
            ['ID'],
            ['Password'],
            ['Role'],
            ['Email'],
            ['FirstName'],
            ['LastName']
         ])
         this.props.onLogoutPress()
    }
    render(){
        if(this.state.IN){
            this.getInfo()
            this.setState({IN: false})
        }
        
        return (
            <View style = {styles.container}>
                
                <Text>Welcome, {this.state.FirstName} {this.state.LastName}</Text>
                <Text>Your Email is {this.state.Email}</Text>

                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('ListSurveysScreen') }
                    style={styles.ToSurvey}
                >
                    <Text style={styles.ChangePasswordButtonText}>To Survey</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('') }
                    style={styles.ToResults}
                >
                    <Text style={styles.ChangePasswordButtonText}>To Results</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('ChangePassForm') }
                    style={styles.ChangePasswordButton}
                >
                    <Text style={styles.ChangePasswordButtonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => this.props.onLogoutPress() }
                    style={styles.LogoutButton}
                >
                    <Text style={styles.LogoutButtonText}>Logout</Text>
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
    LogoutButton: {
        backgroundColor: 'red',
        paddingTop: 10,
        margin: 10,
        height: 40,
        width:200,
        alignSelf:"center"
     },
     LogoutButtonText:{
        color: 'white',
        textAlign: "center"
     },
     ChangePasswordButton: {
        backgroundColor: '#133337',
        paddingTop: 10,
        marginTop: 125,
        height: 40,
        width:200,
        alignSelf:"center"
     },
     ToSurvey: {
        backgroundColor: '#6981c5',
        paddingTop: 10,
        marginTop: 125,
        height: 40,
        width:200,
        alignSelf:"center"
     },
     ToResults: {
        backgroundColor: '#4f6194',
        paddingTop: 10,
        height: 40,
        margin: 10,
        width:200,
        alignSelf:"center"
     },
     ChangePasswordButtonText: {
        color: 'white',
        textAlign: "center"
     }
})