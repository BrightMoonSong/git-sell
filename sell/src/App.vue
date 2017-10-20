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
    .tab-item {
        background: #1F2D3D;
        .first-nav {
            background: #1F2D3D;
            border: none;
            color: #fff;
        }
        .second-nav {
            padding-left: 20px;
            background: #324057;
            border: none;
            color: #fff;
            text-decoration: none;
            &:hover {
                background: #322157;
            }
        }
    }
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
      <span class="form-control first-nav" @click="hideOrShowDetail()">系统管理</span>
      <div v-show="detailShow">
        <div class="tab-item">
          <router-link to="/user" class="form-control second-nav">用户管理</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/role" class="form-control second-nav">角色管理</router-link>
        </div>
      </div>
    </div>
      <div class="tab-item" v-for="item in navlist">
        <span class="form-control first-nav" @click="hideOrShowDetail(item)">{{item}}</span>
        <div v-show="detailShow">
          <div class="tab-item">
            <router-link to="/user" class="form-control second-nav">用户管理</router-link>
          </div>
          <div class="tab-item">
            <router-link to="/role" class="form-control second-nav">角色管理</router-link>
          </div>
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
      seller: {},
      detailShow: true
    };
  },
  methods: {
    hideOrShowDetail() {
      let value = this.detailShow;
      if (value) {
        this.detailShow = false;
      } else {
        this.detailShow = true;
      }
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
    this.navlist = ['first', 'sec', 'third', 'four', 'five'];
  },
  components: {
    // 'v-header': header
  }
};
</script>
