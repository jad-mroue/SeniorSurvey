import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ChartComponent from '../components/ChartComponent';
import Speedometer from 'react-native-speedometer-chart';
import deanApi from '../api/deanApi';
import branchesApi from '../api/branchesApi';

const DeanScreen = ()=>{
    

      const [Score,setScore] = useState([]);
      const [Participation,setParticipation] = useState([]);
      const [Branches,setBranches] = useState([]);
      
         
      const getfaculty_score = async()=> {
          deanApi.get('/').then(response=>{
              setScore(response.data.score)
          });

      };
      const getfaculty_participation = async()=> {
        deanApi.get('/').then(response=>{
            setParticipation(response.data.participation)
        });

    };
    const getBranches = async()=>{                   //faculty_id needed ??
        branchesApi.get('/').then(response=>{
            
                setBranches(response.data)
            });
        
    };
    
    useEffect(() => {
        getfaculty_score();
        getfaculty_participation();
        getBranches();
    });

    const data = {
        labels: Branches.branch_name,
        datasets: [
          {
            data: Branches.branch_score
          }
        ]
      };

    return (
    
    <View style={styles.Container}>
        <Text>Dean</Text>
        <View style={styles.DashBoard}>
           <View style = {styles.BoxStyle}>
                <Text >Percentage of voting</Text>
                
                <View style={styles.speedoStyle}>
                <Speedometer 
                value={{Participation}} 
                totalValue={100}
                size={150}

                />
                </View>
           </View>
                
         
           <View style = {styles.BoxStyle}>
                <Text>Total score of Teacher</Text>
                
                <View style={styles.speedoStyle}>
                <Speedometer 
                value={{Score}} 
                totalValue={100}
                size={150}

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
        //justifyContent: 'center',
        //alignItems: 'center',
        
        backgroundColor: '#ecf0f1',
        padding: 2,
    },
    DashBoard:{
   
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
        chartStyle:{
            marginRight:100,
            padding:1
        },
        speedoStyle:{
            margin:3
        }

});

export default DeanScreen;