<template>
  <div class="container">
    <div class="test">
      <mt-header class="headerTop transparent"></mt-header>
      <mt-header title="我的" class="headerTitle transparent"></mt-header>
      <div class="content">
        <div class="top">
          <img src="../../assets/logo.png" alt="" style="width: 70px;height: 70px;">
          <span>收银员</span>

          <div class="middle">小霸王</div>
          <div class="bottom">131-3866-3037</div>
        </div>

      </div>
    </div>
    <mt-cell title="所属门店" value="珍云的面馆"></mt-cell>
    <mt-cell title="营业信息" is-link to="/mine/businessMsg"></mt-cell>
    <mt-cell title="消息设置" is-link to="/mine/messageSet"></mt-cell>
    <mt-cell title="标题文字" value="020-382557987"></mt-cell>
    <mt-cell title="关于" is-link to="/mine/about"></mt-cell>

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
  }

  .test{
    background: url("../../assets/logo.png") ;
  }

  .transparent{
    background-color: transparent;
  }

  .content{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0 10px 0;
    padding-top: 60px;
    .top{
      position: relative;
      display: flex;
      margin-bottom: 5px;
      margin-top: 5px;
      img{
        border-radius: 50px;
        background-color: red;
      }
      span{
        position: absolute;
        bottom: 3px;
        font-size: 12px;
        width: 40px;
        background-color: gainsboro;
        text-align: center;
        border-radius: 4px;
      }
    }
    .middle{
      margin-bottom: 5px;
    }
  }
</style>
