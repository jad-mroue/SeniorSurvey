import axios from 'axios';

export default axios.create({
    baseURL: `https://server.survey-ul.info/server/api/manager/uniscore`,
    headers: {
        'x_auth_key': this.StaticRange.x_auth_key
    }
})