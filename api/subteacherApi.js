import axios from 'axios';



export default axios.create({
    baseURL: `https://server.survey-ul.info/server/api/teacher/score/?sectionId/?department`,
                                                                          
    headers: {
        'x_auth_key': this.state.x_auth_key,
        'sectionId': this.state.sectionId,
        'department': this.state.department
    
    }
});