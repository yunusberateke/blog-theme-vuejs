import axios from 'axios';

const httpRequest = axios.create({

    baseURL: "http://192.168.1.39:8000/api",
    headers: {'Authorization': 'Bearer '+localStorage.getItem('access_key')}

});


export default httpRequest;
