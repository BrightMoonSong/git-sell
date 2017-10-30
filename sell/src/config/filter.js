export default {
  Vue.filter('money', (value, type) => {
    '￥' + value.toFixed(2) + type
  });
};
// export const signout = () => fetch('/admin/singout');
