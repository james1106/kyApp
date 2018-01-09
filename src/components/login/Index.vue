<template>
  <div class="container">
    <div>
      <mt-header class="headerTop" style="background-color: transparent;"></mt-header>
      <mt-header title="商家版登录" class="headerTitle" style="color: #F02200;background-color: transparent;"></mt-header>
    </div>

    <div class="logo mar-top_10 mar-bottom_3">
      <div>
        <img src="../../assets/img/login/logo.png" alt="" style="width: 100%;">
      </div>
    </div>

    <div class="content">
      <ky-input
        @kyChange="phoneGet"
        :width="'60%'"
        :types="'number'"
        class="mar-top_2"
        :placeholder="'请输入手机号'"></ky-input>

      <ky-input
        @kyChange="passwordGet"
        :width="'80%'"
        :types="'password'"
        class="mar-top_2"
        :placeholder="'请输入密码'"></ky-input>

      <div class="footer mar-top_2">
        <ky-button :width="'80%'" @click.native="login">登录</ky-button>
        <div class="footnote mar-top_2">
          <div @click="changeRouter('findPassword')">忘记密码</div>
          <div @click="changeRouter('activateEm')">激活员工</div>
        </div>
      </div>

      <div class="footernote">
        <div @click="changeRouter('signIn')">立即注册</div>
      </div>
    </div>
  </div>
</template>
<script>
  import kyInput from '@/common/input/Input.vue'
  import kyButton from '@/common/button/Button.vue'
  import {Toast} from 'mint-ui';
  import {mapGetters, mapActions} from 'vuex'
  import {Login} from '@/api/index.js'
  import {Indicator} from 'mint-ui';



  export default {
    data() {
      return {
        phone: '',
        password: ''
      }
    },
    methods: {
      ...mapActions([
        'tokenGet'
      ]),
      phoneGet(val) {
        this.phone = val;
      },
      passwordGet(val) {
        this.password = val;
      },
      changeRouter(routes) {
        this.$router.push('/login/' + routes);
      },
      // 登录按钮
      login() {
        if (!this.phone || !this.password) {
          Toast('请输入账号与密码');
        } else {
          Indicator.open();
          var params = {
            appid: localStorage.getItem('appid'),
            timestamp: Date.parse(new Date()) / 1000,
            userName: this.phone,
            passWord: this.password
          };

          params = this.formatParams(params);

          console.log(params);
          Login(params).then((res) => {
            Indicator.close();
            if (res.errcode == 0) {
              localStorage.setItem('version', this.version);
              localStorage.setItem('isCashier', res.data.isCashier);
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('isLogin', 'true');

              Toast('登录成功');
              this.$router.push('/purseStrings')
            } else {
              Toast(res.errmsg);
            }
          });
        }
      }
    },
    components: {
      kyInput,
      kyButton
    },
    mounted() {
      let isLogin = localStorage.getItem('isLogin');
      if (isLogin == 'true') {
        this.$router.push('/purseStrings');
      }
    },
    computed: mapGetters([
      'version', 'getAppid', 'getsValue'
    ])
  }
</script>
<style scoped lang="less">
  @import "../../style/variable.less";

  .content {
    margin-top: 20px;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 40%;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .footnote {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        font-size: 16px;
        color: @placeholder;
      }
    }
  }

  .footernote {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 200px;
    color: @mainColor;
  }
</style>
