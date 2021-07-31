
import axios from 'axios';

const BASE_PATH = 'http://localhost:8081'

export const uploadFile = data => axios.post(`${BASE_PATH}/upload`, data, {})
    .then(res => {
      console.log(res.statusText)
      return res
    })
    .catch((err) => err);