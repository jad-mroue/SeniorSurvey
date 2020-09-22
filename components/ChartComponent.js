import React from 'react';
import{ StyleSheet, Text, View} from 'react-native';
import { BarChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const ChartComponent = ({data})=>{
    // const data = {
    //     labels: ["History", "Science", "Engineering", "Education", "Economy", "Health"],
    //     datasets: [
    //       {
    //         data: [20, 45, 28, 80, 99, 43]
    //       }
    //     ]
    //   };
      const screenWidth = Dimensions.get("window").width;
      const chartConfig = {
        
        //backgroundGradientFrom: "#732f22",
          backgroundGradientFromOpacity: 0,
          backgroundColor: 'blue',
        
         //backgroundGradientTo: "#732f22",
          backgroundGradientToOpacity: 0.5,
          color:()=>`rgba(0, 0, 0, 50)`,
          //color: (opacity = 10) => `rgba(165, 42, 42, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false // optional
        };
return (
    <BarChart  style={{marginTop:75}}
    data={data}
    width={screenWidth-2}
    height={300}
    yAxisLabel="%"
    chartConfig={chartConfig}
    verticalLabelRotation={30}/>
);

    
       

   

};

 
const styles = StyleSheet.create({
   
});

export default ChartComponent;