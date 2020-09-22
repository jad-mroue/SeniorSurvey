import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SkillBar from 'react-skillbars';

const BarComponent = ({SKILLS})=>{
    
    return (
    <View>
    
     <SkillBar skills={SKILLS}  height ={50}/> 
    
    </View>
    
    )};

const styles = StyleSheet.create({

});

export default BarComponent;


