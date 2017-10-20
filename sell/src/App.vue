<style lang="scss" scoped>
.wrap {
  width: 100%;
  float: left;
  height: 100%;
}

.content {
  height: 100%;
  background: #eee;
  margin-left: 200px;
}

.nav {
  width: 200px;
  height: 100%;
  background: #324157;
  color: #bfcbd9;
  float: left;
  margin-left: -100%;
}
</style>

<template>
<div class="app">
  <div class="wrap">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  <div class="nav">
    <div class="tab-item">
      <span class="form-control">系统管理</span>
      <div class="tab-item">
        <router-link to="/user">用户管理</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/role">角色管理</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
// import header from './components/header/header.vue';

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
  },
  components: {
    // 'v-header': header
  }
};
</script>
