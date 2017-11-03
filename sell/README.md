# sell

> sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



 created 钩子用来在一个实例被创建之后执行代码
 生命周期：
 beforeCreate-->created-->beforeMount-->mounted-->(when data changes;-->beforeUpdate-->updated)-->(when this.destroy{} is called;-->beforeDestroy--->destroyed)

   display:table  去写垂直居中最好了  display:table-cell
   &:last-child{}


# [Markdown 语法说明 (简体中文版)](http://www.appinn.com/markdown/)

# 用addRoutes实现动态路由

> 本地存用户token

每次刷新都重新从服务端获取，本地存用户token，每次刷新要凭token从服务端重新获取用户信息和权限，然后动态更新路由，
获取权限操作可以跟登录检测一起放在根组件的created回调中进行，确保访问任何路径都会先执行这一步，但因为获取权限是异步操作，
在此之前仍然会经过应用初始化，所以还是会遇到404的问题，为此我们只需做一个小调整，将不匹配路径(‘*’)跳404的路由从初始路由中移除，
动态更新路由时再把这个配置加进去，如下：
``` javascript
let userPath = ...//我们的动态路由
//注入时拼接404处理路由
this.$router.addRoutes(userPath.concat([{
  path: '*',
  redirect: '/404'
}]));
```
这样就解决了刷新问题，后面还有几个小问题就简单了。

首先是菜单，之前通过$router.options.routes访问路由数据实现动态菜单，但这个数据不是响应式的，无法追踪动态路由的变化，
因此我们需要将得到的导航菜单数据存到sessionStorage或Vuex里实现数据共享。

资源权限控制也受到很大的影响，实现较为细致的权限控制需要一个自定义权限验证指令和一个全局验证方法，
之前的方案里权限是在Vue实例化之前获取的，所以可以很方便的拿到权限后实现验证方法，然后用验证方法实现自定义指令，
再将方法全局混合进Vue，然后实例化，这样实例中的 所有组件都可以使用自定义指令和验证方法；但现在的方案是先实例化再获取权限，
实例化之前根本没有权限数据，所以自定义指无法实现，等拿到权限后实现了验证方法，却无法再全局混合了。

这个问题最后也解决了，但解决方案就彻底的”有辱斯文”了，首先是全局方法的实现，直接这么做:
``` javascript
Vue.prototype.has = function(){
    ...
}
```
使用方式跟全局混合的方法完全一样。

自定义指令的实现本来很头疼，因为全局指令只能在实例化之前实现，但那时候又确实没有权限，不过既然验证方法这么做的话，指令倒是也顺便解决了，像这样：

``` javascript
//权限指令
Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});
```
神奇的prototype貌似自带惰性效果，可以先注册后实现，具体原因我也不太明白，如过有大牛路过，希望能留下答案。


## 个人应用过程中发现this.$router.addRoutes必须写在根文件main.js中，否则会出现各种问题，这里是根据后台数据重新处理（用src/api/navPath.js作处理，不适用其他地方根据具体情况而定）。


[详情见此](http://refined-x.com/2017/09/01/%E7%94%A8addRoutes%E5%AE%9E%E7%8E%B0%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1/)



> 整个文件范围内禁止规则出现警告

将/* eslint-disable */放置于文件最顶部
``` javascript
/* eslint-disable */
alert('foo');
```
> 在文件中临时禁止规则出现警告

将需要忽略的代码块用注释包裹起来
``` javascript
/* eslint-disable */
alert('foo');
/* eslint-enable */
```
> 对指定规则的启用或者禁用警告

将需要忽略的代码块用注释包裹起来
``` javascript
/* eslint-disable no-alert, no-console */
alert('foo');
console.log('bar');
/* eslint-enable no-alert, no-console */
```
> 对指定行禁用规则警告

此方法，有两种形式，参见下方。
``` javascript
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');
```
> 在指定行上禁用指定的某个规则
``` javascript
alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');
```
> 在某个特定的行上禁用多个规则
``` javascript
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');
```
