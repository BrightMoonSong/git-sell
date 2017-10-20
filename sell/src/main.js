// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './common/scss/index.scss';
// Vue.use()安装插件，在这里是安装路由模块
// 相当于全局注册
Vue.use(VueResource);
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
