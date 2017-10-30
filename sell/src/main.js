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
  getStore,
  setStore
} from '@/config/mUtils';
import {
  messageCode
} from '@/config/config';

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
  },
  created() {
    // 下边代码添加在main.js中
    Vue.http.interceptors.push((request, next) => {
      // 此处this为请求所在页面的Vue实例
      let userToken = getStore('userToken');
      let formToken = getStore('formToken');
      let funcId = getStore('funcId');

      if (userToken && request.url.indexOf('mapi') > 0) {
        if (request.url.indexOf('?') < 0) {
          request.url += '?userToken=' + userToken;
        } else {
          request.url += '&userToken=' + userToken;
        }
        if (formToken) {
          request.url += '&formToken=' + formToken;
        }
        if (funcId && request.url.indexOf('userfunctions') < 0) {
          request.url += '&funcId=' + funcId;
        }
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
        if (response.headers.map.formtoken) {
          setStore('formToken', response.headers.map.formtoken[0]);
        }
        let res = response.body;
        try {
          if (res.code || res.code === 0) {
            if (messageCode()[res.code].type === 5) { // 请重新登录
              alert(messageCode()[res.code].message);
              // window.location.href = 'http://localhost:8085/#/login';
              this.$router.push('login');
            } else if (messageCode()[res.code].type === 4) { // 权限不足
              alert(messageCode()[res.code].message);
            } else if (messageCode()[res.code].type === 3) { // 系统错误，操作失败
              alert(messageCode()[res.code].message);
            } else if (messageCode()[res.code].type === 6) { // 请稍后重试
              alert(messageCode()[res.code].message);
            }
          }
        } catch (e) {

        }
        return response;
      });
    });
  }
});
