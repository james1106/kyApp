<template>
  <div class="container">
    <div>
      <mt-header class="headerTop" style="background-color: transparent;"></mt-header>
      <mt-header title="找回密码" class="headerTitle" style="color: #F02200;background-color: transparent;">
        <router-link to="/login" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>

    <div class="content mar-top_2">
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
        >{{codeMsg}}
        </mt-button>
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
          class="mar-top_4"
          @click.native="apiFindBackPassword"
        >
          找回密码
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
          <div class="mar-top_2">
            <img :src="codeSrc" alt="" style="background-color: red;width: 100%;" @click="apiGetImgCode" v-show="imgError">
            <div style="height: 60px;width: 182px;border: 1px solid gainsboro" class="flex" v-show="!imgError" @click="imgError = !imgError">
              加载失败,点击重新加载
            </div>
          </div>
          <div class="code-mask-footer mar-top_1" style="border-radius: 3px">
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
  import { getImgCode,verifyImgCode,sendPhoneCode,findBackPassword } from '@/api'

  export default {
    name: "index",
    data() {
      return {
        phone: '',            // 手机号
        code: '',             // 验证码
        password: '',         // 密码
        verificationCode: '', // 图片验证码
        popupVisible: false,
        canClick: false,
        codeMsg: '获取验证码',
        second: 60,
        timer: null,
        codeSrc: '',          // 图片验证码src
        imgError: true,       // 图片加载是否成功
      }
    },
    methods: {
      phoneGet(val) {
        this.phone = val;
      },
      codeGet(val) {
        this.code = val;
      },
      usernameGet(val) {
        this.password = val;
      },
      getCode() {
        if (this.phone){
          if (!this.checkPhone(this.phone)){
             Toast('请输入正确的手机号');
          }else {
            this.popupVisible = true;
            this.apiGetImgCode();
          }
        }else {
          Toast('请输入手机号');
        }
      },
      // 获取验证码图片
      apiGetImgCode(){
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
        };

        params = this.formatParams(params);

        getImgCode(params).then((res) => {
          if (res.errcode == 0){
            this.codeSrc = 'data:image/jpg;base64,' + res.data;
          }else {

          }
        });
      },
      // 验证图片验证码
      apiVerifyImgCode(){
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          app_code: this.verificationCode
        };

        params = this.formatParams(params);

        verifyImgCode(params).then((res) => {
          if (res.errcode == 0){
            Toast({
              message: '验证成功',
              position: 'bottom',
              duration: 3000
            });
            this.popupVisible = false;

            // 发送手机验证码
            this.apiSendPhoneCode();
          }else {
            Toast({
              message: res.errmsg,
              position: 'bottom',
              duration: 3000
            });
            this.verificationCode = '';
          }
        });
      },
      // 发送手机验证码
      apiSendPhoneCode(){
        var vm = this;
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          app_code: this.verificationCode,
          mobile: this.phone
        };

        params = this.formatParams(params);

        sendPhoneCode(params).then((res) => {
          if (res.errcode == 0){
            this.canClick = true;

            // 倒计时
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
          }else {
            Toast(res.errmsg);
          }
        })
      },
      // 找回密码
      apiFindBackPassword(){
        if (!this.phone || !this.code || !this.password){
           Toast('所有项都要填写')
        }else {
          var params = {
            appid: localStorage.getItem('appid'),
            timestamp: Date.parse(new Date()) / 1000,
            mobile: this.phone,
            mobile_code: this.code,
            newpassword: this.password
          };

          params = this.formatParams(params);

          findBackPassword(params).then((res) => {
            if (res.errcode == 0){
              Toast(res.errmsg);
              this.$router.push('/login')
            }else {
              Toast(res.errmsg);
            }
          })
        }
      }
    },
    watch: {
      verificationCode(newValue) {
        var vm = this;
        if (newValue.length == 6) {
          this.apiVerifyImgCode();
        }
      }
    },
    components: {
      kyInput,
      kyButton
    },
  }
</script>

<style scoped lang="less">
  @import "../../../style/variable.less";

  .content {
    border-top: 10px solid @placeholderBg;;

    .code {
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
