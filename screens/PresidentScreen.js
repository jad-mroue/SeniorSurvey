import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ChartComponent from '../components/ChartComponent';
import Speedometer from 'react-native-speedometer-chart';
import presidentApi from '../api/presidentApi';
import facultiesApi from '../api/facultiesApi';

const PresidentScreen = ()=>{
   
      const [UniScore,setUniScore] = useState();
      const [UniParticipation,setUniParticipation] = useState();
      const [Faculties,setFaculties]= useState([]);
    

      const getUniversity_score = async () =>{
          presidentApi.get('/').then(response=>{
              setUniScore(response.data.score)
          });
      };
      const getUni_participation = async () =>{
          presidentApi.get('/').then(response=>{
              setUniParticipation(response.data.participation)
          });
    };
    const getfaculties_info = async () =>{
            facultiesApi.get('/').then(response=>{
                setFaculties(response.data)
            });
      };
      const data = {
            labels: Faculties.faculty_name,
        datasets: [
          {
            data: Faculties.faculty_score
          }
        ]
      };

      useEffect(() => {
          getUniversity_score();
          getUni_participation();
          getfaculties_info();
        });

    return (
  
    <View style={styles.Container}>
        <Text>President</Text>
         <View style={styles.DashBoard}>
           <View style = {styles.BoxStyle}>
                <Text >Percentage of voting</Text>
                <View style={styles.speedoStyle}>
                <Speedometer
                    value={{UniParticipation}}
                    totalValue={100}
                    size={150}
                    outerColor='#d3d3d3'
                    internalColor="#ff0000"
                    showText
                    text={UniParticipation}
                    textStyle={{color: 'green'}}
                    showLabels
                    labelStyle={{color:'blue'}}
                    showPercent
                    percentStyle={{color:'red'}}
                />
                </View>
           </View>
                
         
           <View style = {styles.BoxStyle}>
                <Text>Total score of Teacher</Text>
                <View style={styles.speedoStyle}>
                <Speedometer
                    value={{UniScore}}
                    totalValue={100}
                    size={150}
                    outerColor='#d3d3d3'
                    internalColor="#ff0000"
                    showText
                    text={UniScore}
                    textStyle={{color: 'green'}}
                    showLabels
                    labelStyle={{color:'blue'}}
                    showPercent
                    percentStyle={{color:'red'}}
                />
                </View>
            </View>
            </View>
            <View style={styles.chartStyle}>
            <ChartComponent
                data={data}
            />
            </View>
          
       
    </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection:'column',
       // justifyContent: 'center',
        //alignItems: 'center',
        
        backgroundColor: '#ecf0f1',
        padding: 2,
    },
    DashBoard:{
   
        backgroundColor: "#F09",
        width:300,
        height:70,
        margin:10,
        marginRight:20,
        flexDirection:'row',
       
            
        
        },
        BoxStyle:{
            width:170,
            height:130,
          
            backgroundColor: "grey",
            borderWidth:2,
            
            
        },
        chartStyle:{
            marginRight:100,
            padding:1
        },
        speedoStyle:{
            margin:8
        }

});

export default PresidentScreen;