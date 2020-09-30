// import React,{useState,useEffect} from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import ChartComponent from '../components/ChartComponent';
// import Speedometer from 'react-native-speedometer-chart';
// import deanApi from '../api/deanApi';
// import branchesApi from '../api/branchesApi';

// const DeanScreen = ()=>{
    

//       const [Score,setScore] = useState([]);
//       const [Participation,setParticipation] = useState([]);
//       const [Branches,setBranches] = useState([]);
      
         
//       const getfaculty_score = async()=> {
//           deanApi.get('/').then(response=>{
//               setScore(response.data.score)
//           });

//       };
//       const getfaculty_participation = async()=> {
//         deanApi.get('/').then(response=>{
//             setParticipation(response.data.participation)
//         });

//     };
//     const getBranches = async()=>{                   
//         branchesApi.get('/').then(response=>{
            
//                 setBranches(response.data)
//             });
        
//     };
    
//     useEffect(() => {
//         getfaculty_score();
//         getfaculty_participation();
//         getBranches();
//     });

//     const data = {
//         labels: Branches.branch_name,
//         datasets: [
//           {
//             data: Branches.branch_score
//           }
//         ]
//       };

//     return (
    
//     <View style={styles.Container}>
       
//         <View style={styles.DashBoard}>
//            <View style = {styles.BoxStyle}>
//            <Text style={{marginLeft:10}}>Percentage of Voting</Text>
                
//                 <View style={styles.speedoStyle}>
//                 <Speedometer 
//                 value={{Participation}} 
//                 totalValue={100}
//                 size={130}
//                 showPercent
//                 percentStyle={{color:'red'}}
//                 showLabels
//                 labelStyle={{color:'blue'}}

//                 />
//                 </View>
//            </View>
                
         
//            <View style = {styles.BoxStyle}>
//            <Text style={{marginLeft:10}}>Total score of Faculty</Text>
                
//                 <View style={styles.speedoStyle}>
//                 <Speedometer 
//                 value={{Score}} 
//                 totalValue={100}
//                 size={130}
//                 showPercent
//                 percentStyle={{color:'red'}}
//                 showLabels
//                 labelStyle={{color:'blue'}}

//                 />
//                 </View>
//             </View>
//         </View>
//         <View style={styles.chartStyle}>
//         <ChartComponent
        
//         data={data}
//     />
//         </View>
        
//     </View>
//     );
// };

// const styles = StyleSheet.create({
//     Container: {
//         flex: 1,
//         flexDirection:'column',
//         backgroundColor: '#ecf0f1',
//         padding: 2,
//     },
//     DashBoard:{
   
//         backgroundColor: "#F09",
//         width:150,
//         height:70,
//         margin:15,
//         marginRight:10,
//         flexDirection:'row',       
//         },
//         BoxStyle:{
//             width:150,
//             height:130,
//             backgroundColor: "grey",
//             borderWidth:2,           
//         },
//         chartStyle:{
//             marginRight:100,
//             padding:1
//         },
//         speedoStyle:{
//             margin:8,
//             marginTop:20,
//             marginLeft:10
//         }

// });

// export default DeanScreen;