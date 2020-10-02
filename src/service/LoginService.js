import axios from 'axios'
import '../util/config/variable'

export default class LoginService {

    getLoginAuthentication(requestBody){
        let axiosConfig = {
            headers: {
                'Content-Type': "application/application/json",
            }
        };

        return axios.post(`${global.final.api}user/login`, requestBody, axiosConfig).then(res => res.data);
    }

}