import axios from 'axios'
import '../util/use/variable'

export default class CategoryService {

    getPaginationCategories(per, lang){
        let language = global.variable.languages.find(element => element.code === lang)
        return axios.get(`${global.variable.api}category/per/${per}/lang/${language.id}`).then(res => res.data);
    }

    getAllTopCategories(lang){
        let language = global.variable.languages.find(element => element.code === lang)
        return axios.get(`${global.variable.api}category/top/all/lang/${language.id}`).then(res => res.data);
    }

}