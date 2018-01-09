<template>
  <div class="container container-t">
    <mt-header title="" class="headerTop color-main_bg"></mt-header>
    <mt-header title="消息设置" class="headerTitle color-main_bg">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="title"></div>

    <mt-cell title="接收时段" is-link to="/mine/messageSet/receiveTime"></mt-cell>
    <mt-cell title="收款成功通知" class="mar-top_2">
      <mt-switch v-model="collectionV"></mt-switch>
    </mt-cell>

    <div class="cur-cell color-tip">当顾客扫门店/商户码并付款成功时,将受到该通知。</div>

    <mt-cell title="外卖订单通知">
      <mt-switch v-model="takeOutV"></mt-switch>
    </mt-cell>

    <div class="cur-cell color-tip">当顾客在外卖平台下单成功时,将受到该通知。</div>
    <div class="flex" @click="logOut">
      <ky-button
        :width="'90%'"
        :types="'password'"
        class="mar-top_2"
      >退出登录</ky-button>
    </div>
  </div>
</template>
<script>

  import kyButton from '@/common/button/Button.vue'
  import { MessageBox } from 'mint-ui';

  export default {
    components: {
      kyButton
    },
    data() {
      return {
        collectionV: true,       // 收款
        takeOutV: false          // 外卖
      }
    },
    methods: {
      logOut(){
        localStorage.setItem('isCashier',0);
        localStorage.removeItem('version');
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm'){
            // tabbar重新选中管钱
            this.$emit('selectType','管钱');
            localStorage.setItem('isLogin','false');
            this.$router.push('/login');
          }
        });
      }
    },
    mounted(){
      if (localStorage.getItem('isLogin') == 'false'){
         this.$router.push('/login')
      }
    }
  }
</script>
<style scoped lang="less">

  .title {
    height: 10px;
    background-color: #f5f5f5;
  }

  .cur-cell {
    padding: 0 10px;
    font-size: 13px;
    line-height: 48px;
  }

</style>
