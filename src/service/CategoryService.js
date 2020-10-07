import axios from 'axios'
import '../util/config/variable'

export default class LoginService {

    getAllCategories(per, lang){
        let language = global.final.languages.find(element => element.code === lang)
        // let axiosConfig = {
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     }
        // };
        return axios.get(`${global.final.api}category/per/${per}/lang/${language.id}`).then(res => res.data);
    }

}