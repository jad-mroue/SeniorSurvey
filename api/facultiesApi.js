import axios from 'axios';

export default axios.create({
    baseURL: `https://server.survey-ul.info/server/api/manager/faculties`, 
    headers: {
        'x_auth_key': this.state.x_auth_key
    }
})