// import {  baseUrl} from './env';
import baseUrl from './index.js';
// 获取数据
export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl.requestPath + url;
  console.log(url);
  if (type === 'GET') {
    await this.$http.get(url).then((response) => {
      response = response.body;
      console.log(response);
      return response;
    });
  }
  if (type === 'POST') {
    await this.$http.post(url).then((response) => {
      response = response.body;
      console.log(response);
      return response;
    });
  }
};
