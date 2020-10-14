import Axios from 'axios';
import React from 'react';
import {AsyncStorage, Text,View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';
import url  from '../utils/config.js';


const ListSurveysScreen = ({navigation}) => {
    const [pendingSurv,setPendingSurv] = React.useState([
        
    ])
    const [completedSurv,setCompletedSurv] = React.useState([
       
    ])
    const [pendingShown,setPendingShown] = React.useState(true)
    const [completedShown,setCompletedShown] = React.useState(false)

    const getSurveys =  async () => {
       const tk = await AsyncStorage.getItem('token')
        Axios({
            method:'GET',
            url: url + "student/courses",
            headers: {
                x_auth_token: tk
            }
        }).then((response)=> {
            console.log(response.data);
            setPendingSurv(response.data.surveys)
            setCompletedSurv(response.data.voted_surveys)
        })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // do something
          getSurveys();
        });
    
        return unsubscribe;
      }, [navigation]);


    return <View>
        <TouchableOpacity onPress={
            ()=> setPendingShown(!pendingShown)
        } style={{flexDirection:'row',alignItems:'center',padding:5,backgroundColor:'#ccc',margin:5}}>
            <Icon name={!pendingShown ? "md-add":"md-remove"} size={40} />
            <Text style={{marginHorizontal: 10,fontSize:20}}>Pending Surveys</Text>
        </TouchableOpacity>
        
        {
            pendingShown && pendingSurv.map((ps)=>{
                return <TouchableOpacity key={Math.random()*4567898765445} style={{backgroundColor: '#000',margin:5,padding:10}} onPress={()=>{
                    navigation.navigate('ListQuestions', {surveyid: ps.course_code,section_id: ps.section_id,department_id: ps.department_id,course_name: ps.course_name})
                }}><Text style={{marginHorizontal: 30,fontSize: 18,color:'#fff',textAlign:'center'}}>{ps.course_name}</Text></TouchableOpacity>
            })
        }
        <TouchableOpacity onPress={
            ()=> setCompletedShown(!completedShown)
        } style={{flexDirection:'row',alignItems:'center',padding:5,backgroundColor:'#ccc',margin:5}}>
            <Icon name={!completedShown ? "md-add":"md-remove"} size={40} />
            <Text style={{marginHorizontal: 5,fontSize:20}}>Completed Surveys</Text>
        </TouchableOpacity>
        {
            completedShown && completedSurv.map((cs)=>{
                return <TouchableOpacity key={Math.random()*4567898765445} style={{backgroundColor: '#000',margin:5,padding:10}} onPress={()=>{
                }}><Text style={{marginHorizontal: 30,fontSize: 18,color:'#fff',textAlign:'center'}}>{cs.course_name}</Text></TouchableOpacity>
            })
        }
    </View>
}


export default ListSurveysScreen;