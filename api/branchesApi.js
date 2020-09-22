import axios from 'axios';

export default axios.create({
    baseURL: `https://server.survey-ul.info/server/api/manager/branches/?faculty_id`,    
    headers: {
        'x_auth_key': this.state.x_auth_key,
        'faculty_id':this.state.faculty_id
    }
})