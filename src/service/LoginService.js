import axios from 'axios'
import '../util/config/variable'
const qs = require('querystring')

export default class LoginService {

    getLoginAuthentication(requestBody){
        let axiosConfig = {
            headers: {
                'Content-Type': "application/application/json",
            }
        };
        console.log(qs.stringify(requestBody))
        return axios.post(`${global.final.api}user/login`, requestBody, axiosConfig).then(res => res.data);
    }

}