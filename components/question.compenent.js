import * as React from "react";
import Option from "./option.component.js";
import { View, StyleSheet, Image, Text } from "react-native";
// import RadioGroup from 'react-native-radio-buttons-group';
// import { log } from "react-native-reanimated";
import RadioGroup from 'react-native-custom-radio-group';


const Question = ({ question, options, setSelectedOption }) => {
  return (
    <View>
      <Text>{question}</Text>

      {/* <RadioGroup radioButtons={options} onPress={setSelectedOption} /> */}
      <RadioGroup 
      
      
      style ={ {margin: 5}} initialValue={-1} onChange={setSelectedOption} radioGroupList={options} />
      
      <View style={{ margin: 5 }} />
    </View>
  );
};

export default Question;
