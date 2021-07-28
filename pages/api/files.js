
import axios from 'axios';

const BASE_PATH = 'http://localhost:8081/upload'

export const uploadFile = image => axios.post(BASE_PATH, image, {})
    .then(res => {
      console.log(res.statusText)
      return res
    })
    .catch((err) => err);