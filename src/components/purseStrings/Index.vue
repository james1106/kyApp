<template>
  <div class="container" id="purseString">
    <mt-header title="管钱" class="headerTitle">
        <mt-button @click.native="openScanner" slot="right">
          <i class="fa fa-qrcode"></i>
        </mt-button>
        <mt-button icon="more" @click.native="openView" slot="left">

        </mt-button>
    </mt-header>
    <div class="content">
      <div class="top" >
        <div @click="changeRouter('collectionMoney')">收款</div>
        <div @click="changeRouter('reconciliation')">对账</div>
        <div @click="changeRouter('order')">订单</div>
      </div>

      <div class="middle">
        <div class="titleTop">今日收入</div>
        <div class="middleContent">
          <div @click="changeRouter('todayIncome')">今日收入</div>
          <div @click="changeRouter('order')">今日笔数</div>
        </div>
      </div>

      <div class="footer">
        footer
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    methods: {
      openScanner(){
        var FNScanner = api.require('FNScanner');
        FNScanner.openScanner({
          autorotation: true
        }, function(ret, err) {
          if (ret) {
            alert(JSON.stringify(ret));
          } else {
            alert(JSON.stringify(err));
          }
        });
      },
      openView(){
        var FNScanner = api.require('FNScanner');

        FNScanner.setFrame({
          x: 10,
          y: 64,
          w: 300,
          h: 300
        });

        FNScanner.openView({
          autorotation: true,

        }, function(ret, err) {
          if (ret.content) {
            alert(JSON.stringify(ret.content));
          } else {
            alert(JSON.stringify(err));
          }
        });
      },
      changeRouter(value){          // 路由跳转
        var baseRouterUrl = '/purseStrings/';
        this.$router.push(baseRouterUrl + value);
      }
    },
  }
</script>
<style scoped lang="less">
  i.fa-qrcode{
    font-size: 20px;
  }
  #purseString{
    height: calc(~"100% - 40px");
  }

  .content{
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    .top{
      flex: 1.5;
      background-color: paleturquoise;
      display: flex;
      div{
        flex: 1;
        justify-content: center;
        align-items: center;
      }
    }
    .middle{
      flex: 2;
      background-color: pink;
      display: flex;
      flex-direction: column;
      .titleTop{
        height: 30px;
      }
      .middleContent{
        background-color: yellowgreen;
        flex: 1;
        display: flex;
        div{
          flex: 1;
        }
      }
    }
    .footer{
      flex: 2;
      background-color: greenyellow;
    }
  }

</style>
