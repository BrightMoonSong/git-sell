// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueResource from 'vue-resource';
import Kiko from 'kiko-rascalhao';
import {
  getStore
} from '@/config/mUtils';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
import './common/scss/index.scss';
// Vue.use()安装插件，在这里是安装路由模块
// 相当于全局注册
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Kiko);
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

// 跳过eslint的规则校验，因为new 一个对象一般需要赋值给某个值，在这里new vue()不需要赋值给谁，所以需要单独设置规则校验，谁跳过就写no-xxx
/* eslint-disable no-new */
new Vue({
  // 挂载点
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
// 下边代码添加在main.js中
Vue.http.interceptors.push((request, next) => {
  // 此处this为请求所在页面的Vue实例
  console.log('this');
  let userToken = getStore('userToken');
  console.log(request);

  if (userToken && request.url.indexOf('mapi') > 0) {
    request.url += '&userToken=' + userToken;
    // 获取不到funcId
    // try {
    //   console.log(this.$route);
    //   console.log(this.$route.params.funcId);
    //   request.url += '&funcId=' + this.$route.params.funcId;
    // } catch (e) {
    //
    // }
  }

  // modify request
  // request.method = 'POST'; //在请求之前可以进行一些预处理和配置
  // continue to next interceptor
  // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
  next((response) => {
    console.log(response);
    //  response.body = '...';
    return response;
  });
});
