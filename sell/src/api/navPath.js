/* eslint-disable no-unused-vars */
const User = () =>
  import ('@/page/user/user');
/* eslint-disable */
const Role = () =>
  import ('@/page/role/role');
const Carmodellist = () =>
  import ('@/page/carmodel/carmodellist');
const Home = () =>
  import ('@/page/home');
/* eslint-disable */

export default (navlist = []) => {
  // 我们的动态路由
  let userPath = [];
  for (let i = 0; i < navlist.length; i++) {
    if (navlist[i].parentId === 0) {
      let parentObj = {
        path: navlist[i].functionUrl,
        name: navlist[i].namePath,
        component: eval(navlist[i].path)
      };
      let functionId = navlist[i].functionId;
      let userPathChild = [];
      for (let j = 0; j < navlist.length; j++) {
        if (navlist[j].parentId === functionId) {
          let obj = {
            path: navlist[j].functionUrl,
            name: navlist[j].namePath,
            component: eval(navlist[j].path)
          };
          userPathChild.push(obj);
        }
      }
      parentObj.children = userPathChild;
      userPath.push(parentObj);
    }
  }
  // 注入时拼接404处理路由
  userPath = userPath.concat([{
    path: '*',
    redirect: '/404'
  }]);
  return userPath;
};
