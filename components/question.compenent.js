import * as React from 'react';
import Option from "./option.component.js";
import { Text, View, StyleSheet, Image } from 'react-native';


const Question = ({ question, options,setSelectedOption }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        height: 100,
        padding: 20,
      }}
       >
      <Text>{question}</Text>
      

      <Option options={options} setOption={(option)=>setSelectedOption(option)} />
   
      <View style={{margin:5}}/>
        
    </View>
  );
};

export default Question;
