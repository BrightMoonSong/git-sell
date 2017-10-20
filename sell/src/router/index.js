import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';
import Seller from '@/components/sellers/seller';

import Home from '@/page/home';
import User from '@/page/user/user';
import Role from '@/page/role/role';

// Vue.use()安装插件，在这里是安装路由模块
Vue.use(Router);

export default new Router({
  // 由于router自动生成的默认的选中的是class：router-link-active太长，可以用该方法改变其默认className
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/role',
      name: 'role',
      component: Role
    }
  ]
});
