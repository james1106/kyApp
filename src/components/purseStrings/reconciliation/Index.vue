<style lang="less">
  .container {
    margin-bottom: 0;
    .title-category {
      border-bottom: 2px solid #f5f5f5;
      height: 44px;
      .title-padding {
        padding: 5px 10px 5px 10px;
        .title-item {
          justify-content: space-between;
          .title-sort-down {
            line-height: 8px;
            font-size: 17px;
          }
        }
      }
    }
    .body-category {
      border-bottom: 10px solid #f5f5f5;
      height: 66px;
      .title-padding {
        padding: 5px 10px 5px 10px;
        .title-item {
          display: flex;
          justify-content: center;
          .title-sort-down {
            line-height: 8px;
            font-size: 17px;
          }
        }
      }
    }
    .footer-title {
      height: 55px;
    }
  }

  .mint-popup-1 {
    width: 200px;
    border-radius: 8px;
    padding: 10px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
  }

  .mint-popup-1:before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -20px;
    right: 50px;
  }

</style>

<template>
  <div class="container">
    <ky-header class="headerTop color-main_bg"></ky-header>
    <ky-header
      title="对账"
      class="headerTitle color-white color-main_bg"
    >
      <mt-button icon="plus" slot="left" @click="back">返回</mt-button>
    </ky-header>

    <!--分类title-->
    <div class="title-category flex fon-size_14 color-tip">
      <div class="title-padding flex_1 border-right" @click="openPopup('one')">
        <div class="title-item flex_d_r ">
          <div>{{store}}</div>
          <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
        </div>
      </div>
      <div class="title-padding flex_1 border-right" @click="openPopup('two')">
        <div class="title-item flex_d_r ">
          <div>{{payment}}</div>
          <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
        </div>
      </div>
      <div class="title-padding flex_1 border-right" @click="openPopup('three')">
        <div class="title-item flex_d_r">
          <div class="fon-size_12">
            <div class="ellipsis">{{beginTime}}</div>
            <div class="ellipsis">{{endTime}}</div>
          </div>
          <span class="mar-left_0_5 fa fa-sort-down title-sort-down" style="line-height: 18px"></span>
        </div>
      </div>
      <!--<div class="title-padding flex_1" @click="openPopup('four')">
        <div class="title-item flex_d_r">
          <div>今日</div>
          <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
        </div>
      </div>-->

    </div>

    <!--实收body-->
    <div class="body-title flex_d_c flex mar-top_2 color-main">
      <div @click="popupVisibleQ = true">收款实收 <span class="fa fa-question-circle-o fon-size_17" ></span></div>
      <div class="mar-top_2">
        <span class="fon-size_14">&yen;</span>
        <span class="fon-size_25 fon-bold">{{realyMoney}}</span>
        <span>元</span>
      </div>
    </div>

    <!--折线图-->
    <canvas id="myChart" height="150" class="width_100 mar-top_1"></canvas>

    <!--item 1-->
    <div class="body-category flex fon-size_14 color-tip">
      <div class="title-padding flex_1 border-right">
        <div class="title-item flex_d_r color-default">
          <span>{{orderMoney}}元</span>
        </div>
        <div class="title-item flex_d_r mar-top_0_5">
          <div>支付金额</div>
        </div>
      </div>
      <div class="title-padding flex_1 border-right">
        <div class="title-item flex_d_r color-default">
          <span>0.00元</span>
        </div>
        <div class="title-item flex_d_r mar-top_0_5">
          <div>商家优惠</div>
        </div>
      </div>
      <div class="title-padding flex_1 border-right">
        <div class="title-item flex_d_r color-default">
          <span>{{refundMoney}}元</span>
        </div>
        <div class="title-item flex_d_r mar-top_0_5">
          <div>退款金额</div>
        </div>
      </div>
    </div>

    <!--item 2-->
    <div class="body-category flex fon-size_14 color-tip">

      <div class="title-padding flex_1 border-right" @click="changeRoute('全部')">
        <div class="title-item flex_d_r color-default">
          <span>{{orderSum}}笔数</span>
        </div>
        <div class="title-item flex_d_r mar-top_0_5">
          <div>订单笔数</div>
          <span class="mar-left_0_5 fa fa-angle-right"></span>
        </div>
      </div>

      <div class="title-padding flex_1 border-right" @click="changeRoute('退款完成')">
        <div class="title-item flex_d_r color-default">
          <span>{{orderRefundTotal}}笔数</span>
        </div>
        <div class="title-item flex_d_r mar-top_0_5">
          <div>退款笔数</div>
          <span class="mar-left_0_5 fa fa-angle-right"></span>
        </div>
      </div>
    </div>

    <!--item 3-->
    <!--<div class="body-title flex_d_c flex mar-top_2_0 border-bottom_10">
      <div class="fon-size_14 color-tip">总实收净额</div>
      <div class="mar-top_2 color-main mar-bottom_2">
        <span class="fon-size_14 fon-bold">&yen;</span>
        <span class="fon-size_25 fon-bold">78.68</span>
        <span>元</span>
      </div>
    </div>-->

    <!--item 4-->
    <!--<div class="flex footer-title color-tip flex_1">
      <span>服务费</span><span>&yen;</span><span>8.88</span>
    </div>-->

    <!--弹窗-->
    <div class="customDialog">
      <!--one-->
      <mt-popup
        v-model="popupVisible1"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('one')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slots1" @change="onValuesChange1"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!--two-->
      <mt-popup
        v-model="popupVisible2"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('two')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slots2" @change="onValuesChange2"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!--three-->
      <mt-datetime-picker
        cancelText="结束时间"
        ref="picker2"
        type="datetime"
        :startDate="beginDate"
        hourFormat="{value} 时"
        minuteFormat="{value} 分"
        :endDate="endDate"
        v-model="pickerValue2"
        @confirm="handleConfirm2"
      >
      </mt-datetime-picker>
      <mt-datetime-picker
        ref="picker1"
        type="datetime"
        cancelText="开始时间"
        v-model="pickerValue1"
        :endDate="endDate"
        hourFormat="{value} 时"
        minuteFormat="{value} 分"
        @confirm="handleConfirm1"
      >
      </mt-datetime-picker>

      <!--four-->
      <mt-popup
        v-model="popupVisible4"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('four')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slots2" @change="onValuesChange1"
                   value-key="value"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!-- question -->
      <mt-popup
        v-model="popupVisibleQ"
        popup-transition="popup-fade" class="mint-popup-1" style="top: 160px; z-index: 2004;left: 40%;">
        收款实收 = 总支付金额-商家优惠-退款金额
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import kyHeader from '@/common/header/Header.vue'
  import {Toast} from 'mint-ui';
  import Chart from 'chart.js'
  import {baseMsg, accountCheckDetail} from '@/api'


  export default {
    components: {
      kyHeader
    },
    data() {
      return {
        popupVisible1: false,
        popupVisible2: false,
        popupVisible3: false,
        popupVisible4: false,

        popupVisibleQ: false,                 // 问号弹窗

        store: this.$store.state.store,
        payment: this.$store.state.payment,

        pickerValue1: new Date().Format("yyyy-MM-dd hh:mm"),      // 开始时间默认选中今天
        pickerValue2: '',                                         //

        tempValue: '',                       // 临时变量

        endDate: new Date(new Date().Format("yyyy-MM-dd hh:mm")), // 结束日期

        beginTime: this.$store.state.beginTime,                // 开始时间站位
        endTime: this.$store.state.endTime,                    // 结束时间站位


        options1: [],
        options2: [],
        slots1: [
          {
            flex: 1,
            values: [],
          }
        ],
        slots2: [
          {
            flex: 1,
            values: [],
          }
        ],

        keyArr: [],             // 日期
        valueArr: [],           // 值


        orderMoney: '',         // 统计订单
        refundMoney: '',        // 统计实退金额
        orderSum: '',           // 统计订单笔数
        orderRefundTotal: '',   // 统计退款笔数
        realyMoney: '',         // 实收金额
      }
    },
    methods: {
      openPopup(value) {
        if (value == 'one') {
          this.popupVisible1 = true;
        } else if (value == 'two') {
          this.popupVisible2 = true;
        } else if (value == 'three') {

          // 打开日期
          this.$refs.picker1.open();
          this.$refs.picker2.open();
        } else if (value == 'four') {
          this.popupVisible4 = true;
        }
      },
      makeSure(value) {
        if (value == 'one') {
          this.popupVisible1 = false;
          this.store = this.tempValue;
          this.getAccountCheckDetail();
          // 保存到vuex
          this.$store.commit('storeSave',this.store);

        } else if (value == 'two') {
          this.payment = this.tempValue;
          this.getAccountCheckDetail();
          this.popupVisible2 = false;
          // 保存到vuex
          this.$store.commit('paymentSave',this.payment);

        } else if (value == 'three') {
          this.popupVisible3 = false;

        } else if (value == 'four') {
          this.popupVisible4 = false;
        }
      },
      onValuesChange1(picker, values) {
        this.tempValue = values[0];
      },
      onValuesChange2(picker, values) {
        this.tempValue = values[0];
      },
      changeRoute(value){
        // 保存到vuex
        this.$store.commit('statusSave',value);
        this.$router.push('/purseStrings/order/eatIn');
      },
      back() {
        this.$router.go(-1);
      },
      handleConfirm1(value) {
        this.beginTime = new Date(value).Format("yyyy-MM-dd hh:mm");
        // 保存到vuex
        this.$store.commit('beginTimeSave',this.beginTime);
        if (this.endTime == '请选择结束时间') {
          Toast('请选择结束时间')
        } else {
          // 发请求
          this.getAccountCheckDetail();
        }
      },
      handleConfirm2(value) {
        this.endTime = new Date(value).Format("yyyy-MM-dd hh:mm");
        // 保存到vuex
        this.$store.commit('endTimeSave',this.endTime);
        if (this.beginTime == '请选择开始时间') {
          Toast('请选择开始时间')
        } else {
          // 发请求
          this.getAccountCheckDetail();
        }
      },
      // 创建折线图
      createLine() {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.keyArr,
            datasets: [{
              label: '周报',
              fill: true,
              spanGaps: true,
              data: this.valueArr,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              borderJoinStyle: ''
            }]
          },
          options: {
            title: {
              display: false,
              position: 'bottom'
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                }
              }]
            }
          }
        });
      },


      /*********************** api **************************/
      // 获取基础信息
      getBaseMsg() {
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          token: localStorage.getItem('token')
        };

        params = this.formatParams(params);

        // 获取基础信息
        baseMsg(params).then((res) => {
          if (res.errcode == 0) {
            console.log(res);
            this.options1 = res.data.store;
            this.options2 = res.data.payWay;
            this.slots1[0].values = this.arrToArr(this.addAllOption(res.data.store, 'storeName'), 'storeName');
            this.slots2[0].values = this.arrToArr(this.addAllOption(res.data.payWay, 'payWayName'), 'payWayName');


            // 判断当前vuex内是否存有store || payment,如果没有,那么默认全部
            if (this.$store.state.store) {
              this.store = this.$store.state.store;
            } else {
              this.store = this.slots1[0].values[0];
            }

            if (this.$store.state.payment){
              this.payment = this.$store.state.payment;
            }else {
              this.payment = this.slots2[0].values[0];
            }

            // 获取对账页详情
            this.getAccountCheckDetail();
          } else {
            Toast(res.errmsg);
          }
        })
      },
      // 对账页详情
      getAccountCheckDetail() {
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          token: localStorage.getItem('token'),
          storeId: this.findId(this.store, this.options1, 'id'),
          payWay: this.findId(this.payment, this.options2, 'id'),
          startTime: this.beginTime,
          endTime: this.endTime
        };

        params = this.formatParams(params);

        accountCheckDetail(params).then((res) => {
          if (res.errcode == 0) {

            // 先清空再追加
            this.keyArr = [];
            this.valueArr = [];
            this.objToTwoArr(res.data.line, this.keyArr, this.valueArr);

            this.createLine();

            this.orderMoney = res.data.account.orderMoney;
            this.refundMoney = res.data.account.refundMoney;
            this.orderRefundTotal = res.data.account.orderRefundTotal;
            this.orderSum = res.data.account.orderSum;
            this.realyMoney = res.data.account.realyMoney;


            console.log(res);
          } else {
            Toast(res.errmsg);
          }
        })

      }
    },
    computed: {
      beginDate() {                       // 结束日期的开始时间
        return new Date(this.pickerValue1)
      }
    },
    mounted() {

      // 获取基础信息
      this.getBaseMsg();

      if (!this.$store.state.beginTime || !this.$store.state.endTime) {
        this.beginTime = new Date().Format("yyyy-MM-dd hh:mm");
        this.endTime = new Date().Format("yyyy-MM-dd hh:mm");
      }
    }
  }
</script>

