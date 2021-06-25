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
axios.interceptors.request.use((config) => {
    if(config.method === 'post') {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8';
        config.transformRequest = [function (data, headers) {
            return qs.stringify(data);
        }];
    }
  return config;
}, (err) => {
  return Promise.reject(err);
});