import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';


const Option = ({ options,setOption }) => {
  let opts = options.map((option)=>{
    return {
      id: option.option_id,
      label: option.option_description
    }
  })
  return (
    <View style={{ margin: 10 }}>
      
    </View>
  )
};

export default Option;

