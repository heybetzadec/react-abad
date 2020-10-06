import axios from 'axios'
import '../util/config/variable'

export default class LoginService {

    getLoginAuthentication(requestBody){
        let axiosConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };
        return axios.post(`${global.final.api}user/login`, requestBody, axiosConfig).then(res => res.data);
    }

    checkToken(token){
        let axiosConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        return axios.post(`${global.final.api}user/login`, {}, axiosConfig).then(res => res.data);
    }

}