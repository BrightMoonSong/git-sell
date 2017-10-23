<template lang="html">
  <div class="wrap">
    <div class="content">user::</div>
    <div class="content">{{seller.bulletin}}</div>
  </div>
</template>

<script>
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {},
      detailShow: true
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
}
</style>
