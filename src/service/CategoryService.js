import axios from 'axios'
import '../util/config/variable'

export default class LoginService {

    getAllCategories(lang){
        let language = global.final.languages.find(element => element.code === lang)
        let axiosConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };
        // return axios.post(`${global.final.api}user/login`, {}, axiosConfig).then(res => res.data);
        return axios.get('http://127.0.0.1:8000/api/v1/category/lang/1/all').then(res => res.data);
    }

}