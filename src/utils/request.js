import axios from 'axios'


const service = axios.create({
  baseURL: 'https://raw.xox48.com:8048/api', // url = base url + request url
  timeout: 15000 // request timeout
})


export default service

