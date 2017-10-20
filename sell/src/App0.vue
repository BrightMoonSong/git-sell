<style lang="scss" scoped>
/* 移动端经典布局 flex布局 */
// &表示父元素，display block 是为了让a标签充满整个区块，这样不会必须点击字体才能跳转
// css规范：他的所有display也就是他的布局，或者他的position影响他的布局这些
// 样式要写在前面，然后他的宽高就是会触发重绘或回流的这些不可被继承的css也会往前面一点，在display
// 和position之后，最后再设置字体颜色啊这些可被继承的，可被继承的放在最后
// 需要注意的：在DPI为2或3的手机上，像素在手机上会乘以2或3，设计1像素的border，在手机上会是2像素。
@import "./common/scss/mixin.scss";

#app {
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        // border-bottom: 1px solid rgba(7,17,27,.1);
        @include border-1px(rgba(7,17,27,0.1));
        .tab-item {
            flex: 1;
            text-align: center;
            & > a {
                display: block;
                font-size: 14px;
                color: rgba(77, 85, 93, 1);
                &.active {
                    color: rgb(240,20,20);
                }
            }
        }
    }
}
</style>

<template>
<div id="app">
  <v-header :seller="seller"></v-header>
  <div class="tab border-1px">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue';

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
    'v-header': header
  }
};
</script>
