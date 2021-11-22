import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://zoom-backend-nov22.herokuapp.com'
    // http://localhost:8000
    // https://zoom-002-oct04.herokuapp.com'

    //https://zoom-002-oct04.herokuapp.com - This use with my personal itephere acc
})

export default instance