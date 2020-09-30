import React from 'react';
import{ StyleSheet, Text, View} from 'react-native';
import { BarChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const ChartComponent = ({data})=>{
  
      const screenWidth = Dimensions.get("window").width;
      const chartConfig = {
        
        
          backgroundGradientFromOpacity: 0,
          backgroundColor: 'blue',
        
         
          backgroundGradientToOpacity: 0.5,
          color:()=>`rgba(0, 0, 0, 50)`,
         
          strokeWidth: 2, 
          barPercentage: 0.5,
          useShadowColorFromDataset: false 
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