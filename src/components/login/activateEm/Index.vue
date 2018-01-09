<template>
  <div class="container">
    <div>
      <mt-header class="headerTop" style="background-color: transparent;"></mt-header>
      <mt-header title="激活员工" class="headerTitle" style="color: #F02200;background-color: transparent;">
        <router-link to="/login" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>

    <div class="content">
      <ky-input
        @kyChange="phoneGet"
        :width="'60%'"
        :types="'number'"
        class="mar-top_2"
        :placeholder="'请输入手机号'"></ky-input>

      <ky-input
        @kyChange="codeGet"
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

      <div class="footer">
        <ky-button
          :width="'80%'"
          class="mar-top_4"
        >
          立即激活
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
            <input type="text" class="mint-field-core border padding_l_10 box-bb" placeholder="请输入验证码"
                   v-model="verificationCode">
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import kyInput from '@/common/input/Input.vue'
  import kyButton from '@/common/button/Button.vue'
  import {Toast} from 'mint-ui';

  export default {
    name: "index",
    data() {
      return {
        phone: '',            // 手机号
        code: '',             // 验证码
        verificationCode: '', // 验证码
        popupVisible: false,
        canClick: false,
        codeMsg: '获取验证码',
        second: 60,
        timer: null
      }
    },
    methods: {
      phoneGet(val) {
        this.phone = val;
      },
      codeGet(val){
        this.code = val;
      },
      getCode(){
        var vm = this;
        vm.popupVisible = true;
      }
    },
    watch: {
      verificationCode(newValue) {
        var vm = this;
        if (newValue.length == 6) {
          if (newValue == '123456') {
            Toast('验证成功');
            vm.popupVisible = false;
            vm.canClick = true;
            this.timer = setInterval(function () {
              vm.second--;
              vm.codeMsg = '倒计时' + vm.second;
              if (vm.second == 1) {
                vm.canClick = false;
                vm.second = 60;
                vm.codeMsg = '获取验证码';
                clearInterval(vm.timer);
              }
            }, 1000)
          } else {
            Toast('验证失败,请重新验证');
            this.verificationCode = '';
          }
        }
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
