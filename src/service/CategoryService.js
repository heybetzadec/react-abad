import axios from 'axios'
import '../util/use/variable'
import {Functions} from "../util/use/Functions";

export default class CategoryService {

    getPaginationCategories(per, lang){
        let language = global.variable.languages.find(element => element.code === lang)
        return axios.get(`${global.variable.api}category/per/${per}/lang/${language.id}`).then(res => res.data);
    }

    getAllTopCategories(){
        return axios.get(`${global.variable.api}category/top/all`).then(res => res.data);
    }

    saveCategory(token, data){
        return axios.post(`${global.variable.secureApi}category/save`, data, Functions.tokenHeader(token))
    }
}