<template lang="html">
  <div class="wrap">
    <div class="content">user::</div>
    <div class="content">{{seller.bulletin}}</div>
  </div>
</template>

<script>
// import config from '../../config/index.js';

const ERR_OK = 0;
// const R_PATH = config.requestPath;

export default {
  data() {
    return {
      seller: {},
      detailShow: true
    };
  },
  created() {
    // http://localhost:8099/mapi/shiro/login?phone=17301088769&password=123456
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
    // this.$http.post(R_PATH + '/mapi/shiro/login?phone=17301088769&password=123456').then((response) => {
    this.$http.post('/mapi/mapi/shiro/login?phone=17301088769&password=123456').then((response) => {
      response = response.body;
      console.log(response);
    });
  }
};
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
}
</style>
