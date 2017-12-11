<template>
  <div class="container">
    <div>
      <mt-header class="headerTop" style="background-color: transparent;"></mt-header>
      <mt-header title="账户注册" class="headerTitle" style="color: #F02200;background-color: transparent;">
        <router-link to="/login" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>

    <div class="content">
      <ky-input
        @kyChange="usernameGet"
        :width="'60%'"
        :types="'number'"
        class="mar-top_2"
        :placeholder="'请输入手机号'"></ky-input>

      <ky-input
        @kyChange="usernameGet"
        :width="'80%'"
        :types="'code'"
        class="mar-top_2"
        :placeholder="'请输入验证码'">
        <mt-button
          class="code"
          :size="'small'"
          :disabled="canClick"
          @click="getCode"
        >{{codeMsg}}</mt-button>
      </ky-input>

      <ky-input
        @kyChange="usernameGet"
        :width="'80%'"
        :types="'password'"
        class="mar-top_2"
        :placeholder="'请输入密码'">
      </ky-input>

      <div class="footer">
        <ky-button
          :width="'80%'"
          class="mar-top_2"
        >
          立即注册
        </ky-button>
      </div>

    </div>


    <!--弹窗-->
    <div>
      <mt-popup
        v-model="popupVisible"
      >
        <div class="code-mask">
            <div class="code-mask-top">
            请输入正确验证码
          </div>
          <div class="code-mask-middle mar-top_2">
            <img src="../../../assets/logo.png" alt="" height="30" style="background-color: red;width: 100%;">
          </div>
          <div class="code-mask-footer mar-top_1">
            <input type="text" placeholder="请输入验证码">
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import kyInput from '@/common/input/Input.vue'
  import kyButton from '@/common/button/Button.vue'

  export default {
    name: "index",
    data() {
      return {
        username: '',
        canClick: false,
        popupVisible: false,            // 本地验证码弹窗
        codeMsg: '获取验证码',
        second: 60,
        timer: null
      }
    },
    methods: {
      usernameGet(val) {
        this.username = val;
      },
      getCode(){
        var vm = this;
        vm.canClick = true;

        vm.popupVisible = true;


        this.timer = setInterval(function () {
          vm.second --;
          vm.codeMsg = '倒计时' + vm.second;
          if (vm.second == 1){
             vm.canClick = false;
             vm.second = 60;
             vm.codeMsg = '获取验证码';
            clearInterval(vm.timer);
          }
        },1000)
      }
    },
    components: {
      kyInput,
      kyButton
    }
  }
</script>

<style scoped lang="less">
  @import "../../../style/variable.less";

  .content {
    margin-top: 20px;
    border-top: 10px solid @placeholderBg;;

    .code{
      background-color: @mainColor;
      color: white;
      height: 30px;
      font-size: 14px;
      margin-right: 5px;
      width: 100px;
    }

    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
