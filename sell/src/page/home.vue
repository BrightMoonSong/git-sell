<style lang="scss" scoped>
.wrap {
    width: 100%;
    float: left;
    height: 100%;
    overflow: auto;
}

.content {
    height: 100%;
    background: #eee;
    margin-left: 200px;
    .top-strip {
        width: 100%;
        height: 60px;
        background: #aaa;
    }
}

.nav {
    width: 200px;
    height: 100%;
    background: #324157;
    color: #bfcbd9;
    float: left;
    margin-left: -100%;
    overflow: auto;
    .nav-top-strip {
        width: 100%;
        height: 80px;
        background: #ccc;
    }
    .tab-item {
        background: #1F2D3D;
        .first-nav {
            display: inline-block;
            background: #1F2D3D;
            border: none;
            color: #fff;
            margin: 3px auto;
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
      <div class="top-strip">

      </div>
      <router-view></router-view>
    </div>
  </div>
  <div class="nav">
    <div class="nav-top-strip">

    </div>
    <div class="tab-item">
      <span class="form-control first-nav">系统管理</span>
      <div>
        <div class="tab-item">
          <router-link to="/home/user/1" class="form-control second-nav">用户管理</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/home/role/2" class="form-control second-nav">角色管理</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/home/carmodellist/476" class="form-control second-nav">车型管理</router-link>
        </div>
      </div>
    </div>
    <div class="tab-item" v-for="(item, index) in navlist">
      <span class="form-control first-nav" @click="hideOrShowDetail(index)" v-if="item.parentId===0" v-text="item.name"></span>
      <div v-if="detailShow==index">
        <div class="tab-item" v-for="res in navlist" v-if="res.parentId===item.functionId">
          <router-link :to="res.functionUrl+'/'+res.functionId" class="form-control second-nav" v-text="res.name"></router-link>
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
      navlist: [],
      detailShow: -1
    };
  },
  methods: {
    hideOrShowDetail(index) {
      console.log(index);
      if (this.detailShow === index) {
        this.detailShow = -1;
      } else {
        this.detailShow = index;
      }
    }
  },
  created() {
    // this.$http.get('/api/navlist').then((response) => {
    //   response = response.body;
    //   if (response.errno === ERR_OK) {
    //     this.navlist = response.data;
    //   }
    // });
    // /mapi/shiro/userfunctions
    this.$http.get('/mapi/shiro/userfunctions').then((response) => {
      response = response.body;
      if (response.code === ERR_OK) {
        this.navlist = response.data;
      }
    });
  },
  components: {
    // 'v-header': header
  }
};
</script>
