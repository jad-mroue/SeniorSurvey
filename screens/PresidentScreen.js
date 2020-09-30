// import React,{useState,useEffect} from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import ChartComponent from '../components/ChartComponent';
// import Speedometer from 'react-native-speedometer-chart';
// import presidentApi from '../api/presidentApi';
// import facultiesApi from '../api/facultiesApi';

// const PresidentScreen = ()=>{
   
//       const [UniScore,setUniScore] = useState();
//       const [UniParticipation,setUniParticipation] = useState();
//       const [Faculties,setFaculties]= useState([]);
    

//       const getUniversity_score = async () =>{
//           presidentApi.get('/').then(response=>{
//               setUniScore(response.data.score)
//           });
//       };
//       const getUni_participation = async () =>{
//           presidentApi.get('/').then(response=>{
//               setUniParticipation(response.data.participation)
//           });
//     };
//     const getfaculties_info = async () =>{
//             facultiesApi.get('/').then(response=>{
//                 setFaculties(response.data)
//             });
//       };
//       const data = {
//             labels: Faculties.faculty_name,
//         datasets: [
//           {
//             data: Faculties.faculty_score
//           }
//         ]
//       };

//       useEffect(() => {
//           getUniversity_score();
//           getUni_participation();
//           getfaculties_info();
//         });

//     return (
  
//     <View style={styles.Container}>
       
//          <View style={styles.DashBoard}>
//            <View style = {styles.BoxStyle}>
//            <Text style={{marginLeft:5, marginTop:5}}>Total Participation</Text>
//                 <View style={styles.speedoStyle}>
//                 <Speedometer
//                     value={{UniParticipation}}
//                     totalValue={100}
//                     size={130}
//                     outerColor='#d3d3d3'
//                     internalColor="#ff0000"
//                     showText
//                     text={{UniParticipation}}
//                     textStyle={{color: 'green'}}
//                     showLabels
//                     labelStyle={{color:'blue'}}
//                     showPercent
//                     percentStyle={{color:'red'}}
//                 />
//                 </View>
//            </View>
                
         
//            <View style = {styles.BoxStyle}>
//            <Text style={{marginLeft:15,marginTop:5}}>Total Voting Score</Text>
//                 <View style={styles.speedoStyle}>
//                 <Speedometer
//                     value={{UniScore}}
//                     totalValue={100}
//                     size={130}
//                     outerColor='#d3d3d3'
//                     internalColor="#ff0000"
//                     showText
//                     text={{UniScore}}
//                     textStyle={{color: 'green'}}
//                     showLabels
//                     labelStyle={{color:'blue'}}
//                     showPercent
//                     percentStyle={{color:'red'}}
//                 />
//                 </View>
//             </View>
//             </View>
//             <View style={styles.chartStyle}>
//             <ChartComponent
//                 data={data}
//             />
//             </View>
          
       
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
//         margin:10,
//         marginRight:20,
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

// export default PresidentScreen;