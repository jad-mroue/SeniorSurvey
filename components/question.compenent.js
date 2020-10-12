import * as React from "react";
import Option from "./option.component.js";
import { View, StyleSheet, Image,Text } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';


const Question = ({ question, options, setSelectedOption}) => {
  let selectedButton = options.find(e => e.selected == true);
  selectedButton = selectedButton ? selectedButton.value : false
  return ( 
    <View >
      <Text>{question}</Text>

      <RadioGroup selected={false} radioButtons={options} onPress={setSelectedOption} />

      <View style={{ margin: 5 }} />
    </View>
  );
};

export default Question;
