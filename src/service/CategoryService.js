import axios from 'axios'
import '../util/use/variable'

export default class CategoryService {

    getPaginationCategories(per, lang){
        let language = global.variable.languages.find(element => element.code === lang)
        return axios.get(`${global.variable.api}category/per/${per}/lang/${language.id}`).then(res => res.data);
    }

    getAllTopCategories(){
        return axios.get(`${global.variable.api}category/top/all`).then(res => res.data);
    }

    saveCategory(){
        // Bearer token
    }
}