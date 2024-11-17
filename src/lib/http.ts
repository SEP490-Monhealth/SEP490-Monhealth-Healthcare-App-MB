import axios from "axios"

const monAPI = axios.create({
  baseURL: "",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json"
  }
})

export default monAPI
