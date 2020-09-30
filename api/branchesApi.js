// import axios from 'axios';
// import { AsyncStorage } from 'react-native';

// getToken = async () => {
//     try{
//         const token = await AsyncStorage.getItem('token');
//         return token;
//     }catch(err){

//     }
// } 

// export default axios.create({
//     baseURL: `https://server.survey-ul.info/server/api/manager/branches/?faculty_id`,    
//     headers: {
//         'x_auth_key': getToken(),
//         'faculty_id':this.state.faculty_id
//     }
// })