import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-88b9f.firebaseio.com/'
}) 

export default instance;