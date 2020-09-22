import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';


const ToolBar = ()=>{
return (
<View style = {styles.background}>
    <TouchableOpacity style = {styles.buttonStyle} activeOpacity={0.5}>
    <Image
     source={require('../../assets/nav_icon.png')}
     style={styles.ImageIconStyle}
    />
    </TouchableOpacity>
   
</View>
);

};

const styles = StyleSheet.create({
background:{
    backgroundColor : '#732f22',
    height: 50,
    alignContent:'center',
},
ImageIconStyle: {
    padding: 5,
    margin: 5,
    marginLeft:300,
    height: 40,
    width: 40,
    resizeMode: 'stretch',
   
  },
buttonStyle: {
   alignItems:'center',
}


});

export default ToolBar;