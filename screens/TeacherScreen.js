import React from 'react';
import {useEffect,useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import teacherApi from '../api/teacherApi';
import coursesApi from '../api/coursesApi';
import subteacherApi from '../api/subteacherApi';
import BarComponent from '../components/BarComponent';

const TeacherScreen = ()=>{
    
    const [Courses,setCourses] = useState([]);
    const [Score,setScore] = useState(0);
    const [Participation,setParticipation] = useState(0);

    const getCourses = async () =>{
        coursesApi.get('/').then(response=>{
            setCourses( response.data)
        });
    };
    const getScore = async () =>{                              
        teacherApi.get('/').then(response =>{
            setScore(response.data.score)
        });
    };
    const getParticipation = async () =>{                     
        teacherApi.get('/').then(response =>{
            setParticipation(response.data.Participation)
        });
        
    };
    const getCoursesScore = async () =>{
        subteacherApi.get('/').then(response=>{
            setCoursesScore(response.data.course_score)
        });
    };

    useEffect(()=>{
        getCourses();
        getScore();
        getParticipation();
        getCoursesScore();
    });

    const SKILLS = [
        
        {type: Courses.Course_name, level: Courses.course_score},
        
      ];

    return(
    <View style={styles.Container}>
        <Text > Teacher</Text>
        <View style={styles.dashBoard}>
           <View style = {styles.BoxStyle}>
                <Text >Percentage of voting</Text>
                <Text>70%</Text>
                <View style={styles.speedoStyle}>
                <Speedometer 
                value={{Score}} 
                totalValue={100}
                size={150}

                />
                </View>
                
           </View>
                
         
           <View style = {styles.BoxStyle}>
                <Text>Total score of Teacher</Text>
                <Text> 60</Text>
                <View style={styles.speedoStyle}>
                <Speedometer 
                value={{Participation}} 
                totalValue={100}
                size={150}

                />
                 </View>
            </View>
        </View>
       
        {/* <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" /> */}
        <View style={styles.containerProgress}>   
          
        <BarComponent
            SKILLS = {SKILLS}
        />
       
        </View>  
    </View>
    );
        
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        //alignItems: 'center',
        
        backgroundColor: '#ecf0f1',
        padding: 2,
    },
    containerProgress: {
        flex: 1,
        //justifyContent: 'center',
       // alignItems: 'center',
        marginTop:50,
        marginLeft:20,
        padding:2

    },
    dashBoard: {
   
    backgroundColor: "#F09",
    width:300,
    height:70,
    margin:20,
    flexDirection:'row',      
    
    },
    BoxStyle:{
        width:160,
        height:130,
        backgroundColor: "grey",
        borderWidth:2,
        
        
    },
    example: {
        marginVertical: 24,
      },
      speedoStyle:{
          margin:3
      }
    
    
});

export default TeacherScreen;