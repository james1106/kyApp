<template>
  <div class="container">
    <mt-header class="headerTop" style="background-color: transparent;"></mt-header>
    <mt-header title="设置密码" class="headerTitle" style="color: #F02200;background-color: transparent;">
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="content">

      <div class="header-title mar-top_4">
        <div class="header-title-h fon-size_25">请设置登录密码</div>
        <div class="header-title-f mar-top_1 fon-size_12">长度为6~20位(字母加数字)</div>
      </div>

      <ky-input
        @kyChange="passwordGet"
        :width="'80%'"
        :types="'password'"
        class="mar-top_4"
        :placeholder="'请输入密码'"></ky-input>

      <ky-input
        @kyChange="againPGet"
        :width="'80%'"
        :types="'password'"
        class="mar-top_2"
        :placeholder="'请输入密码'">
      </ky-input>

      <div class="footer">
        <ky-button
          :width="'80%'"
          class="mar-top_2_0"
          @click.native="makeSure"
        >
          确认
        </ky-button>
      </div>
    </div>

  </div>
</template>

<script>
  import kyInput from '@/common/input/Input.vue'
  import kyButton from '@/common/button/Button.vue'
  import { Toast } from 'mint-ui';

  export default {
    name: "index",
    methods: {
      againPGet(){},
      passwordGet(){},
      makeSure(){
        Toast('找回密码成功');
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
    border-top: 10px solid @placeholderBg;

    .header-title{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .header-title-h{

      }
      .header-title-f{
        color: @borderColor;
      }
    }

    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
