import axios from 'axios';

const baseUrl ="https://api.msyml.cn/msyml/front/";
// const baseUrl ="http://localhost:8088/msyml/front/";

function serves(){
    const service = axios.create({
        baseURL: baseUrl,
        timeout: 30 * 1000,
    })
    service.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    service.interceptors.response.use(
        (response) =>{
            return response.data.data;
        },
        (error) => {
            return Promise.reject(error);
        }
    )
    return service;
}

export default serves;