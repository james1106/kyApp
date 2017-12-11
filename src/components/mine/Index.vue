<template>
  <div class="container color-gain_bg mine">
    <div class="scan-title">
      <mt-header class="headerTop transparent"></mt-header>
      <mt-header title="我的" class="headerTitle transparent"></mt-header>
      <div class="content">
        <div class="top">
          <img src="../../assets/logo.png" alt="" style="width: 70px;height: 70px;">
          <div class="top-right color-white">
            <div class="middle">
              小霸王
              <mt-badge type="warning" size="small">收营员</mt-badge>
            </div>
            <div class="bottom fon-size_14">131****3037</div>
          </div>
        </div>
      </div>
    </div>


    <mt-cell title="所属门店" value="珍云的面馆">
      <img src="../../assets/img/mine/mine-store.png" slot="icon" alt="" width="24" height="24">
    </mt-cell>
    <mt-cell title="消息设置" is-link to="/mine/messageSet" class="mar-top_2">
      <img src="../../assets/img/mine/mine-set.png" slot="icon" alt="" width="24" height="24">
    </mt-cell>
    <mt-cell title="修改密码" is-link>
      <img src="../../assets/img/mine/mine-password.png" slot="icon" alt="" width="24" height="24">
    </mt-cell>
    <mt-cell title="客服热线" value="020-382557987">
      <img src="../../assets/img/mine/mine-call.png" slot="icon" alt="" width="24" height="24">
    </mt-cell>
    <mt-cell title="关于" is-link to="/mine/about" class="mar-top_2">
      <img src="../../assets/img/mine/mine-about.png" slot="icon" alt="" width="24" height="24">
    </mt-cell>


  </div>
</template>
<script>

  import { MessageBox } from 'mint-ui';

  export default {
    methods: {
      open(){
        console.log(1);
      },
      prompt(){
        MessageBox({
          title: '设置金额',
          message: '金额',
          showCancelButton: true,
          closeOnClickModal: false,
          inputType: 'number',
          showInput: true,
          inputPlaceholder: '请输入金额'
        });
      }
    }
  }

</script>
<style lang="less" scoped>
  .container{
    margin-top: 0;
    margin-bottom: 55px;
    height: calc(~'100% - 55px');
  }

  .scan-title{
    background: url("../../assets/img/mine/mine-title-login.jpg") no-repeat center center / 100% 100%;
  }

  .content{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0 10px 0;
    padding-top: 74px;
    .top{
      position: relative;
      padding: 0 20px;
      display: flex;
      margin-bottom: 5px;
      margin-top: 5px;
      .top-right{
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /*align-items: center;*/
      }
      img{
        border-radius: 50px;
        background-color: red;
      }
      span{

      }
    }
    .middle{
      margin-bottom: 5px;
    }
  }
</style>
