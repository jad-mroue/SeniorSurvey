import 'react-native-gesture-handler'
import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage ,Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Inputs from './LoginPage/Inputs'
import ForgotPass from './LoginPage/ForgotPass'
import Profile from './Profile/profile'
import ChangePassForm from './Profile/ChangePassForm';
import ListQuestions from './screens/list.questions.screen'
import ListSurveysScreen from './screens/list.surveys.screen'
import Home from './screens/HomeScreen'
import DeanScreen from './screens/DeanScreen'
import PresidentScreen from './screens/PresidentScreen'
import TeacherScreen from './screens/TeacherScreen'
import { SvgXml } from 'react-native-svg'
import RadioGroup from 'react-native-radio-buttons-group';

const Stack = createStackNavigator()


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //logging in stack navigator
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
//using the application services stack navigator
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
        <Stack.Screen name='ListQuestions' options={{title: 'Survey'}}>
          {props => <ListQuestions {...props}  />}
        </Stack.Screen>
        {/* <Stack.Screen name='Home' options={{title: 'Home'}}>
          {props => <Home {...props}  />}
        </Stack.Screen>
        <Stack.Screen name='President' options={{title: 'President Results'}}>
          {props => <PresidentScreen {...props}  />}
        </Stack.Screen>
        <Stack.Screen name='Dean' options={{title: 'Dean Results'}}>
          {props => <DeanScreen {...props}  />}
        </Stack.Screen>
        <Stack.Screen name='Teacher' options={{title: 'Teacher Results'}}>
          {props => <TeacherScreen {...props}  />}
        </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>  
);
  //if user is not logged in go to the login navigation (login and forgot password pages)
  //else go to the authenticated navigation (profile, change password, survey, ...)
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