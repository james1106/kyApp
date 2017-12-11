<template>
  <div class="container">
    <div>
      <mt-header class="headerTop" style="background-color: transparent;"></mt-header>
      <mt-header title="商家版登录" class="headerTitle" style="color: #F02200;background-color: transparent;"></mt-header>
    </div>

    <div class="logo mar-top_10 mar-bottom_3" >
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
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        phone: Number,
        password: String
      }
    },
    methods: {
      phoneGet(val) {
        this.phone = val;
      },
      passwordGet(val){
        this.password = val;
      },
      changeRouter(routes){
        this.$router.push('/login/' + routes);
      },
      // 登录按钮
      login(){
        if (this.phone == 1 && this.password == '1'){
          localStorage.setItem('user', true);
          Toast('登录成功');
          this.$router.push('/purseStrings')
        }else {
          Toast('账号或密码错误');
        }
      }
    },
    components: {
      kyInput,
      kyButton
    },
    mounted(){
      let user = localStorage.getItem('user');
      if (user){
         this.$router.push('/purseStrings');
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../style/variable.less";

  .content {
    margin-top: 20px;
  }

  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    div{
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
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    color: @mainColor;
  }
</style>
