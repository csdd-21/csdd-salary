import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import qs from 'qs';

const app =createApp(App)

app.config.globalProperties.axios = axios;
app.use(store).use(router).mount('#app')

/* 请求拦截器 */
// axios.interceptors.request.use((config) => {
//     console.log('config00000000000000000');   
//     if(config.method === 'post') {
//         // config.headers['Accept'] = 'application/json; charset=utf-8';
//         config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
//         // config.transformRequest = [function (data, headers) {
//         //     return qs.stringify(data);
//         // }];
//         config.transformRequest = [function (data, headers) {
//             return qs.stringify(data);
//         }];
//         console.log('config ----',config);   
//     }
//   return config;
// }, (err) => {
//   return Promise.reject(err);
// });