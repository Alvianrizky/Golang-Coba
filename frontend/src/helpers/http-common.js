import axios from "axios";

export const HTTP = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/',
    headers: {
      "Content-type": "application/json",
      "Authorization" : localStorage.getItem('token')
    }
  })