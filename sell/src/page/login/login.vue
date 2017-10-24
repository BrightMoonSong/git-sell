<template lang="html">
  <div class="box">
    <div class="login-box">
      <div class="login-title text-center">
        <h1>
              <small>登录</small>
          </h1>
      </div>
      <div class="login-content ">
        <div class="form">
          <div class="form-group">
            <div class="col-xs-12  ">
              <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" v-model="userName" id="username" name="username" class="form-control" placeholder="手机号" autofocus maxlength="20">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-12">
              <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" v-model="password" id="password" name="password" class="form-control" placeholder="密码">
              </div>
            </div>
          </div>
          <div class="form-group">
                        <div class="col-xs-6 col-xs-offset-6 link">
                            <p class="text-center remove-margin">
                                <small>忘记密码？</small>
                                <a href="javascript:void(0)" @click="forgetPassword()">
                                    <small>找回</small>
                                </a>
                            </p>
                        </div>
                    </div>
          <div class="form-group form-actions">
            <div class="col-xs-4 col-xs-offset-4 ">
              <button @click="login()" class="btn btn-sm btn-info"><span class="glyphicon glyphicon-off"></span> 登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$http.post('/mapi/mapi/shiro/login?phone=' + this.userName + '&password=' + this.password).then((response) => {
        response = response.body;
        console.log(response);
        this.$router.push({
          path: '/home/user/2'
        });
      });
    },
    forgetPassword() {
      console.log('forgetPassword');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./login.css";
</style>
