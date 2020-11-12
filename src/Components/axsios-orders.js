import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://alanrecipes1313.firebaseio.com/',

})
export default instance;