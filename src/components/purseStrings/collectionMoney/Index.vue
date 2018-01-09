<style scoped lang="less">
  .title-header {
    .title-tab {
      line-height: 44px;
      height: 44px;
      box-sizing: border-box;
    }
  }

  .ky-tab-container {
    height: calc(~'100% - 54px');
  }

  .mint-tab-container-wrap {
    height: 100% !important;
  }

  /*page-one*/
  .keyBoard-one, .keyBoard-two {
    left: 0;
    right: 0;
    height: 160px;
    background-color: white;
    display: flex;
    font-size: 18px;
    font-weight: bold;
  }

  .keyBoard-one {
    bottom: 160px;
  }

  .keyBoard-two {
    bottom: 0;
  }

  .delete {
    font-size: 16px;
    font-weight: normal;
  }

  .scan-btn {
    width: 50px;
    height: 120px;
    border-radius: 12px;
  }

  /*page-two*/
  .page-two {
    .page-two-title {
    }
    .page-two-code {
      padding: 35px 35px 20px 35px;
    }
    .page-two-tip {
      line-height: 20px;
    }
  }

  #qrcode {
    margin: auto;
  }

</style>

<template>
  <div class="container container-t pos-r">
    <mt-header title="" class="headerTop color-main_bg"></mt-header>
    <mt-header title="收款" class="headerTitle color-main_bg">
      <router-link to="/purseStrings" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="title-header flex color-white_bg border-bottom_10">
      <div class="flex_1 text-ac width_100 height_100 flex title-tab" :class="{'isSelected' : isSelected}"
           @click="tabClick(true)">普通收款
      </div>
      <div class="flex_1 text-ac width_100 height_100 flex title-tab" :class="{'isSelected' : !isSelected}"
           @click="tabClick(false)">门店码收款
      </div>
    </div>
    <mt-tab-container v-model="active" :swipeable="true" class="ky-tab-container">

      <!--普通收款-->
      <mt-tab-container-item id="page-one">
        <div>

        </div>

        <mt-cell title="请选择门店" @click.native="chooseStore" :value="store"></mt-cell>
        <mt-field label="消费总金额" placeholder="请输入金额" v-model="totalMoney" :disableClear="true" :readonly="true"
                  @click.native="inputChange(true)"></mt-field>
        <!--<mt-field placeholder="请输入不参与优惠金额" class="icon-tip" v-model="money" :disableClear="true" :readonly="true"
                  @click.native="inputChange(false)"></mt-field>-->

        <div class="flex mar-top_4">
          <ky-button width="95%">确定</ky-button>
        </div>

        <div class="pos-a keyBoard-one flex flex_d_c">
          <div class="key-board-item flex flex_1 width_100 text-ac" v-for="(value,index) in keyBoardListOne"
               :key="index">
            <div class="flex_1 text-ac width_100 height_100 flex" v-for="(item,count) in value" :key="count"
                 :class="{'delete' : item == '删除' || item == '清除'}" @click="keyBoardClick(item)">{{item}}
            </div>
          </div>
        </div>
        <div class="pos-a keyBoard-two flex flex_d_r">
          <div class="flex_3 width_75 flex flex_d_c height_100">


            <div class="flex_1 width_100 flex" v-for="(value,index) in keyBoardListTwo" :key="index">
              <div class="flex_1 text-ac width_100 height_100 flex" v-for="(item,count) in value" :key="count"
                   @click="keyBoardClick(item)">
                {{item}}
              </div>
            </div>

          </div>
          <div class="flex_1 width_25 height_100 flex" @click="openScanner">
            <div class="scan-btn color-main_bg flex">
              <img src="../../../assets/img/home/home-scan.png" alt="" width="35" height="35">
            </div>
          </div>
        </div>

      </mt-tab-container-item>

      <!--门店码收款-->
      <mt-tab-container-item id='page-two'>
        <mt-cell title="请选择门店" @click.native="chooseStore" :value="store"></mt-cell>
        <div class="page-two flex flex_d_c" style="height: 90%;">
          <div class="page-two-title color-tip mar-top_1">{{store}}</div>
          <div class="page-two-code color-white_bg mar-top_2">
            <!--离线二维码-->
            <div id="qrcode" ref="qrcode"></div>
            <div class="page-two-price flex mar-top_2" v-if="pageTwoInputValue != ''">
              <span>&yen;&nbsp;</span>
              <span>{{pageTwoInputValue}} 元</span>
            </div>
            <div class="page-two-tab mar-top_2 flex color-main fon-size_14" style="width: 200px;">
              <div class="flex_1 text-ac border-right" @click="popupVisible = true;">设置金额</div>
              <div class="flex_1 text-ac" @click="saveImg">保存图片</div>
            </div>
          </div>
          <div class="page-two-tip width_50 text-ac mar-top_2 color-main mar-top_3 mar-bottom_1">
            <mt-button type="danger" class="fon-size_15 color-main_bg color-white" size="small"
                       @click="changePaymentCode">{{storeGatheringMsg}}
            </mt-button>
          </div>
          <div class="page-two-tip width_50 fon-size_12 text-ac mar-top_2 color-tip">
            顾客可使用微信/支付宝手机客户端扫码进行支付
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <!--弹窗-->
    <mt-popup
      v-model="popupVisible" style="width: 300px;"
      :closeOnClickModal="false"
      popup-transition="popup-fade"
    >
      <transition name="msgbox-bounce">
        <div class="mint-msgbox">
          <div class="mint-msgbox-header">
            <div class="mint-msgbox-title">设置金额</div>
          </div>
          <div class="mint-msgbox-content">
            <div class="mint-msgbox-message text-al">金额</div>
            <div class="mint-msgbox-input">
              <input v-model="pageTwoInputValueTransit" placeholder="请输入金额" ref="input" type="number">
            </div>
          </div>
          <div class="mint-msgbox-btns">
            <button class="cancelButtonClasses mint-msgbox-btn border-right" @click="popupVisible = false;">取消</button>
            <button class="confirmButtonClasses mint-msgbox-btn mint-msgbox-confirm" @click="handleAction()">
              确定
            </button>
          </div>
        </div>
      </transition>
    </mt-popup>

    <!--门店弹窗-->
    <mt-popup
      v-model="popupVisible1"
      popup-transition="popup-fade"
      style="max-height: 200px;overflow: auto;width: 200px;"
    >
      <mt-radio
        title="门店列表"
        v-model="store"
        :options="options">
      </mt-radio>
    </mt-popup>

  </div>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui';
  import kyButton from '@/common/button/Button.vue'
  import {getStores, url} from '@/api'


  console.log(url);

  require('../../../plugins/qrcode/qrcode.js');

  export default {
    components: {
      kyButton
    },
    data() {
      return {
        active: 'page-one',
        store: '',                  // 门店
        options: [],                // 门店可选项
        resOptions: null,           // 返回值门店可选项
        storeGatheringMsg: '切换到门店收款码',      // 门店收款码消息

        popupVisible1: false,
        popupVisible: false,


        totalMoney: '',
        money: '',
        isSelected: true,
        inputPosition: true,               // 键盘输入位置 true -> 总金额 false -> 不参与优惠金额
        pageTwoInputValue: '',             // 设置金额value
        pageTwoInputValueTransit: '',      // 设置中转金额value
        keyBoardListOne: [
          [1, 2, 3, '删除'], [4, 5, 6, '清除']
        ],
        keyBoardListTwo: [
          [7, 8, 9], [0, '.', '+']
        ]
      }
    },
    methods: {
      // page-one
      tabClick(value) {
        if (value) {
          this.active = 'page-one'
          this.isSelected = true;
        } else {
          this.active = 'page-two'
          this.isSelected = false;
        }
      },
      keyBoardClick(value) {
        if (value == '删除') {
          if (this.inputPosition) {
            this.totalMoney = this.totalMoney.substring(0, this.totalMoney.length - 1);
          } else {
            this.money = this.money.substring(0, this.money.length - 1);
          }
        }
        if (value == '清除') {
          if (this.inputPosition) {
            this.totalMoney = '';
          } else {
            this.money = '';
          }
        }
        if (value != '删除' && value != '清除' && this.inputPosition) {
          this.totalMoney += value;
        } else if (value != '删除' && value != '清除' && this.inputPosition == false) {
          this.money += value;
        }
      },
      inputChange(value) {
        if (value) {
          this.inputPosition = true;
          Toast('已切换至总金额');

        } else {
          this.inputPosition = false;
          Toast('已切换至不参与优惠金额');
        }
      },
      // 打开摄像头
      openScanner() {
        /*var qrScanner = api.require('qrScanner');
        qrScanner.openScanner(function (ret) {
          if (ret) {
            alert(ret.data);
          }
        });*/
        Toast('功能暂未实现,尽情期待');
      },

      // page-two
      handleAction() {
        if (this.pageTwoInputValueTransit == '') {
          Toast('金额不能为空');
        } else {
          this.popupVisible = false;
          this.pageTwoInputValue = this.pageTwoInputValueTransit;

          // 重新生成二维码
          if (this.storeGatheringMsg == '切换到个人收款码') {
            this._getQart('store');
          } else {
            this._getQart('user');
          }
        }
      },
      // 生成离线二维码
      _getQart(store_type) {

        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          token: localStorage.getItem('token'),
          storeid: this.findId(this.store, this.resOptions, 'storeid'),
          store_type: store_type,
          price: this.pageTwoInputValueTransit * 100,
          invalidParams: 1         // 填充内容
        };

        params = this.formatParams(params);

        var baseUrl = url + '/pos/index.php?controller=apppay&action=index&';
        var qrcode = document.getElementById("qrcode");

        // url
        console.log(this.removeLastString(this.paramsToUrl(params, baseUrl)));

        qrcode.innerHTML = '';
        qrcode.width = 200;
        qrcode.height = 200;

        new QRCode(document.getElementById("qrcode"), {
          text: this.removeLastString(this.paramsToUrl(params, baseUrl)),
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      },
      // 切换到门店收款码
      changePaymentCode() {
        if (!this.pageTwoInputValueTransit) {
          Toast('请输入金额');
        } else if (!this.store) {
          Toast('请选择门店')
        } else {
          if (this.storeGatheringMsg == '切换到门店收款码') {
            this.storeGatheringMsg = '切换到个人收款码';
            Toast('成功切换到个人收款码');
            this._getQart('store');
          } else {
            this.storeGatheringMsg = '切换到门店收款码';
            Toast('成功切换到门店收款码');
            this._getQart('user');
          }
        }
      },
      // 选择门店
      chooseStore() {
        this.popupVisible1 = true;
      },
      saveImg() {
        Toast('功能暂未实现,尽情期待!');
      }
    },
    watch: {
      active(newOld) {
        if (newOld == 'page-one') {
          this.isSelected = true;
        } else {
          this.isSelected = false;
        }
      },
      store(newOld, oldValue) {
        if (oldValue) {
          if (!this.pageTwoInputValueTransit) {
            Toast('请设置金额');
          } else {
            if (this.storeGatheringMsg == '切换到个人收款码') {
              this._getQart('store');
            } else {
              this._getQart('user');
            }
          }
        }
      }
    },
    mounted() {
      var params = {
        appid: localStorage.getItem('appid'),
        timestamp: Date.parse(new Date()) / 1000,
        token: localStorage.getItem('token')
      };

      params = this.formatParams(params);

      getStores(params).then((res) => {
        if (res.errcode == 0) {
          console.log(res);
          this.options = this.arrToArr(res.data, 'storename');
          this.store = this.options[0];
          this.resOptions = res.data;
        }
      });
    }
  }
</script>
