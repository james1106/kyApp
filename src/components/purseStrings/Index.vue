<template>
  <div class="container" id="purseString">

    <div class="scan-title">
      <mt-header class="headerTop transparent"></mt-header>
      <mt-header title="" class="headerTitle transparent">
        <mt-button class="icon-home-bell fon-size_20 test" size="normal" style="width: 30px;" slot="left"
                   @click="changeRouter('message')">
          <div class="badge" v-show="messageCount != null && messageCount != 0 && messageCount">{{messageCount}}</div>

        </mt-button>
      </mt-header>
      <div class="content">
        <div class="top mar-top_2">
          <div @click="openScanner" class="top-item pad-top_4">
            <img src="../../assets/img/home/home-scan.png" alt="" width="40" height="40">
            <div class="mar-top_1 h-title">扫一扫</div>
          </div>
          <div @click="changeRouter('collectionMoney')" class="top-item pad-top_4">
            <img src="../../assets/img/home/home-moeny.png" alt="" width="40" height="40">
            <div class="mar-top_1 h-title">收钱</div>
          </div>
          <div @click="changeRouter('reconciliation')" class="top-item pad-top_4">
            <img src="../../assets/img/home/home-account.png" alt="" width="40" height="40">
            <div class="mar-top_1 h-title">对账</div>
          </div>
          <div @click="changeRouter('order/eatIn')" class="top-item pad-top_4">
            <img src="../../assets/img/home/hoem-order.png" alt="" width="40" height="40">
            <div class="mar-top_1 h-title">订单</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="middle">
        <div class="titleTop">今日收入</div>
        <div class="middleContent">
          <div @click="changeRouter('reconciliation')" class="middle-cell">
            <img src="../../assets/img/home/home-page-one.jpg" alt="" style="width: 100%;">
            <div class="middle-content">
              <span class="middle-left color-main">今日收入</span>
              <span class="middle-yen color-main">&yen; <span class="middle-prices">888</span> </span>
            </div>
          </div>
          <div @click="changeRouter('reconciliation')" class="middle-cell">
            <img src="../../assets/img/home/home-page-two.png" alt="" style="width: 100%;">
            <div class="middle-content">
              <span class="middle-left color-main">今日笔数</span>
              <span class="middle-yen color-main">&yen; <span class="middle-prices">888</span> </span>
            </div>
          </div>
        </div>
      </div>
      <div class="middle mar-top_1">
        <div class="titleTop">今日订单</div>
        <div class="middleContent">
          <div @click="changeRouter('order/eatIn')" class="middle-cell">
            <img src="../../assets/img/home/home-page-three.jpg" alt="" style="width: 100%;">
            <div class="middle-content">
              <span class="middle-left color-chocolate">堂食</span>
              <span class="middle-yen color-chocolate"><span class="middle-prices">888</span> 笔</span>
            </div>
          </div>
          <div @click="changeRouter('out')" class="middle-cell">
            <img src="../../assets/img/home/home-page-four.jpg" alt="" style="width: 100%;">
            <div class="middle-content">
              <span class="middle-left color-chocolate">外卖</span>
              <span class="middle-yen color-chocolate"><span class="middle-prices">888</span> 笔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {
      // 打开二维码扫描
      openScanner() {
        /*var FNScanner = api.require('FNScanner');
        FNScanner.openScanner({
          autorotation: true
        }, function (ret, err) {
          if (ret) {
            if (ret.eventType == 'success') {
              alert('success');
            }
          } else {
            alert('扫描失败,请重新扫描');
          }
        });*/
        Toast('功能暂未实现,尽情期待');


        /*var qrScanner = api.require('qrScanner');
        qrScanner.openScanner(function(ret){
          if(ret){
            alert(ret.data);
          }
        });*/
      },
      changeRouter(value) {          // 路由跳转
        if (value == 'message') {
          localStorage.setItem('messageCount', 0);
        }

        // 对账,重置默认项
        if (value == 'reconciliation'){

          this.$store.commit('storeSave','');
          this.$store.commit('paymentSave','');
          this.$store.commit('statusSave','');


          this.$store.commit('beginTimeSave',new Date().Format("yyyy-MM-dd"));
          this.$store.commit('endTimeSave',new Date().Format("yyyy-MM-dd"));
        }

        if (value == 'out'){
           Toast('功能暂未实现,尽情期待');
        }else {
          var baseRouterUrl = '/purseStrings/';
          this.$router.push(baseRouterUrl + value)
        }
      },
      messageChange(value) {
        console.log(value);
      }
    },
    mounted() {
      // alert(window.location.href);
    },
    computed: {
      ...mapGetters([
        'messageCount'
      ])
    }
  }
</script>
<style scoped lang="less">

  @import "../../style/variable.less";

  .container {
    margin-top: 0;
    margin-bottom: 55px;
    height: calc(~'100% - 55px');
    background-color: #f5f5f5;
  }

  i.fa-qrcode {
    font-size: 20px;
  }

  .scan-title {
    background: url("../../assets/img/home/home-logo.jpg") no-repeat center center / 100% 100%;
    height: 177px;
    .test {
      transform: rotateZ(15deg);
      .badge {
        position: absolute;
        background-color: white;
        transform: rotateZ(-15deg);
        border-radius: 50px;
        color: @mainColor;
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        top: 0;
        left: 10px;
      }
    }

  }

  .content {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    .top {
      flex: 1.5;
      display: flex;
      .top-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .h-title {
          color: white;
        }
      }
    }
  }

  .content-body {
    height: calc(~'100% - 177px');
    padding: 5px 0 10px 0;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;

    .middle {
      background-color: white;
      box-sizing: border-box;
      flex: 2;
      display: flex;
      flex-direction: column;
      padding: 10px 10px 10px 10px;
      .titleTop {
        height: 25px;
      }
      .middleContent {
        flex: 1;
        display: flex;

        .middle-content {
          margin-bottom: 15px;
          .middle-left {
          }
          .middle-prices {
            font-size: 30px !important;
          }
        }
        .middle-cell {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          border: 1px solid gainsboro;
          border-radius: 7px;
          margin-left: 5px;
          margin-right: 5px;
          box-shadow: 1px -1px 3px @boxShadow;
        }
      }
    }

    img {
      border-radius: 5px;
    }
  }
</style>
