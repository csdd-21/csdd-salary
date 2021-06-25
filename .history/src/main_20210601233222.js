import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import qs from 'qs';
import ElementPlus from 'element-plus';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Pagination } from "swiper/core";
import { mapState, mapMutations, mapActions } from "vuex";

import 'element-plus/lib/theme-chalk/index.css';
import "swiper/swiper.less";
import "swiper/components/pagination/pagination.less";

const app = createApp(App)
app.config.globalProperties.axios = axios;
app.use(store)
  .use(router)
  .use(ElementPlus)
  .component("Swiper", Swiper)
  .component("SwiperSlide", SwiperSlide)

app.mount('#app')
app.prototype.mapState=mapState

SwiperCore.use([Pagination]);

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    config.transformRequest = [function (data, headers) {
      return qs.stringify(data);
    }];
    console.log('post config ----', config);
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

export { Swiper, SwiperSlide }