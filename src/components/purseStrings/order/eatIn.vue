<style scoped lang="less">


  .bill {
    height: 35px;
    padding: 0 10px;
    /*background: #f5f5f5;*/
  }

  .content {
    height: 70px;
    padding: 0 10px;
    border-bottom: 1px solid #D8D9DA;
    .content-img {
      width: 70px;
      height: 70px;
    }
    .content1 {
      font-size: 20px;
    }
    .content2 {
      color: #8C8D8E;

    }
  }

  .content:last-child {
    border-bottom: 0
  }

  a:link {
    color: #000000;
    text-decoration: none;
  }

  a:visited {
    color: #000000;
    text-decoration: none;
  }

  .btn-small {
    width: 100px;
  }

  .mint-popup {
    width: 100%;
  }
</style>
<template>
  <div>
    <div style="position: fixed;left: 0;right: 0;z-index: 999;top: 63px;">
      <div class="title-category flex fon-size_14 color-tip color-white_bg" style="border-bottom: none">
        <div class="title-padding flex_1 border-right" @click="openPopup('oneT')">
          <div class="title-item flex_d_r">
            <div>{{popupValueT1}}</div>
            <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
          </div>
        </div>
        <div class="title-padding flex_1 border-right" @click="openPopup('twoT')">
          <div class="title-item flex_d_r">
            <div>{{popupValueT2}}</div>
            <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
          </div>
        </div>
        <div class="title-padding flex_1 border-right" @click="openPopup('threeT')">
          <div class="title-item flex_d_r">
            <div>{{popupValueT3}}</div>
            <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
          </div>
        </div>
        <div class="title-padding flex_1" @click="openPopup('fourT')">
          <div class="title-item flex_d_r">
            <div class="fon-size_12">
              <div class="ellipsis">{{beginTime}}</div>
              <div class="ellipsis">{{endTime}}</div>
            </div>
            <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="bill flex_f"
         style="position: fixed;left: 0;right: 0;top: 104px;z-index: 999;background-color: #f5f5f5;">
      <div class="flex_1 flex_sb flex_d_r">
        <div></div>
        <router-link to="/purseStrings/reconciliation">
          <span>账单 ></span>
        </router-link>
      </div>
    </div>
    <mt-loadmore :top-method="loadTop"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange"
                 ref="loadmore"
                 :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                 style="padding-top: 79px"
    >
      <div class="content flex_a color-white_bg"
           v-for="(item,index) in contentList1" :key="index"
           @click="openDetail(item.orderNo)">
        <img src="../../../assets/logo.png" alt="" class="content-img"
             style="width: 50px;height: 50px;border-radius: 100px">
        <div class="flex_f flex_j width_100 height_100 margin_l_10">
          <div class="flex_sb">
            <span class="content1">{{item.name}}</span>
            <span class="content1 mar-top_1"> {{item.receiveMoney}} </span>
          </div>
          <div class="flex_sb fon-size_14">
            <span class="content2">{{item.addTime}} {{item.deskNo}}</span>
            <span class="content2 mar-top_1">{{item.payStatus}}</span>
          </div>
        </div>
      </div>


      <div class="load-more" v-show="load">
        <span class="mar-left_1">{{loadMsg}}</span>
      </div>
      <div slot="top" class="mint-loadmore-top color-tip">
        <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓ 下拉刷新</span>
        <span v-show="topStatus === 'drop'" :class="{ 'rotate': topStatus === 'drop' }">↓ 松开刷新</span>

        <div class="flex height_100" v-show="topStatus === 'loading'">
          <mt-spinner type="double-bounce"></mt-spinner>
          <span class="mar-left_1 color-tip flex_ec">拼命加载中...</span>
        </div>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom color-tip">
        <span v-show="bottomStatus === 'pull'" :class="{ 'rotate': bottomStatus === 'drop' }">↓ 上拉加载更多</span>
        <span v-show="bottomStatus === 'drop'" :class="{ 'rotate': bottomStatus === 'drop' }">↓ 松开加载</span>

        <div class="flex height_100" v-show="bottomStatus === 'loading'">
          <mt-spinner type="double-bounce"></mt-spinner>
          <span class="mar-left_1 color-tip flex_ec">拼命加载中...</span>
        </div>
      </div>
    </mt-loadmore>

    <!-- 弹窗 -->
    <div>
      <!--订单详情页-->
      <mt-popup
        v-model="popupDetail"
        position="right"
        class="height_100 width_100"
        style="border-radius: 0"
        :closeOnClickModal="false"
      >
        <div class="container container-t" style="background-color: #fff;">
          <mt-header class="headerTop" style="background-color: #Fc4a01;"></mt-header>
          <ky-header class="headerTitle color-main_bg" title="订单详情">
            <mt-button slot="left" icon="back" style="color: white" @click="back"></mt-button>
            <mt-button slot="right" style="color: white" @click="refund">退款</mt-button>
          </ky-header>
          <div class="top flex flex_f">
            <div class="flex_a flex_2 mar-top_2">
              <span class="margin_l_10">商家实收</span>
            </div>
            <div class="flex_1 fon-size_26 fon-bold margin_t_10">{{eatInDetail.receiveMoney}}元</div>
            <div class="flex_1 mar-top_1 fon-size_13">{{eatInDetail.payStatus}}</div>
          </div>
          <div class="margin_l_r_10 border-top margin_t_20 fon-size_14">
            <div class="content-item flex_sb content-item-font margin_10 color-gain">
              <span class=" ">订单信息</span>
              <img src="../../../assets/img/order/order-arrows.png" alt="" style="width: 25px;height: 25px;"
                   @click="triggerT1 = !triggerT1">
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT1">
              <span>桌号：</span>
              <span class="color-gain">{{eatInDetail.deskNo}}</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT1">
              <span>订单号：</span>
              <span class="color-gain">{{eatInDetail.orderNo}}</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT1">
              <span>流水号：</span>
              <span class="color-gain">{{eatInDetail.tradeNo}}</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT1">
              <span>支付方式：</span>
              <span class="color-gain">{{eatInDetail.payWay}}</span>
            </div>
          </div>
          <div class="margin_l_r_10 border-top margin_t_20 fon-size_14">
            <div class="content-item flex_sb content-item-font margin_10 color-gain">
              <span class=" ">收款明细</span>
              <img src="../../../assets/img/order/order-arrows.png" alt="" style="width: 25px;height: 25px;"
                   @click="triggerT2 = !triggerT2">
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT2">
              <span>收款门店：</span>
              <span class="color-gain">{{eatInDetail.receivablesStore}}</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT2">
              <span>支付金额：</span>
              <span class="color-gain">{{eatInDetail.payMoney}}</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT2">
              <span>商家实收：</span>
              <span class="color-gain">{{eatInDetail.receiveMoney}}</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT2" v-if="eatInDetail.refundMoney">
              <span>退款金额：</span>
              <span class="color-gain">{{eatInDetail.refundMoney}}</span>
            </div>
          </div>
          <div class="margin_l_r_10 border-top margin_t_20 fon-size_14">
            <div class="content-item flex_sb content-item-font margin_10 color-gain">
              <span class=" ">其他信息</span>
              <img src="../../../assets/img/order/order-arrows.png" alt="" style="width: 25px;height: 25px;"
                   @click="triggerT3 = !triggerT3">
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT3">
              <span>创建时间：</span>
              <span class="color-gain">{{eatInDetail.addTime}}</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerT3">
              <span>付款时间：</span>
              <span class="color-gain">{{eatInDetail.payTime}}</span>
            </div>
          </div>
        </div>
      </mt-popup>

   <!--   &lt;!&ndash;外卖详情页&ndash;&gt;
      <mt-popup
        v-model="popupTakeOut"
        position="right"
        class="height_100 width_100"
        style="border-radius: 0"
        :closeOnClickModal="false"
      >
        <div class="container container-t" style="background-color: #fff;">
          <mt-header class="headerTop" style="background-color: #Fc4a01;"></mt-header>
          <ky-header class="headerTitle color-main_bg" title="订单详情">
            <mt-button slot="left" icon="back" style="color: white" @click="back"></mt-button>
          </ky-header>
          <div class="top flex flex_f">
            <div class="flex_a flex_2 mar-top_2">
              <img src="../../../assets/logo.png" alt="" style="width: 30px;height: 30px;border-radius: 30px">
              <span class="margin_l_10">*霸王(177****1111)</span>
            </div>
            <div class="flex_1 fon-size_26 fon-bold margin_t_20">688.88元</div>
            <div class="flex_1 mar-top_1 fon-size_13 color-main">立即送达,建议19:00送达</div>
          </div>
          <div class="margin_l_r_10 border-top margin_t_20 fon-size_14">
            <div class="content-item flex_sb content-item-font margin_10 color-gain">
              <span class=" ">订单信息</span>
              <img src="../../../assets/img/order/order-arrows.png" alt="" style="width: 25px;height: 25px;"
                   @click="trigger1 = !trigger1">
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW1">
              <span>桌号：</span>
              <span class="color-gain">A02</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW1">
              <span>订单号：</span>
              <span class="color-gain">65746574567457</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW1">
              <span>支付方式：</span>
              <span class="color-gain">微信支付</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW1">
              <span>用餐人数：</span>
              <span class="color-gain">3人</span>
            </div>
          </div>
          <div class="margin_l_r_10 border-top margin_t_20 fon-size_14">
            <div class="content-item flex_sb content-item-font margin_10 color-gain">
              <span class=" ">订单信息</span>
              <img src="../../../assets/img/order/order-arrows.png" alt="" style="width: 25px;height: 25px;"
                   @click="trigger2 = !trigger2">
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW2">
              <span>桌号：</span>
              <span class="color-gain">A02</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW2">
              <span>订单号：</span>
              <span class="color-gain">65746574567457</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW2">
              <span>支付方式：</span>
              <span class="color-gain">微信支付</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW2">
              <span>用餐人数：</span>
              <span class="color-gain">3人</span>
            </div>
          </div>
          <div class="margin_l_r_10 border-top margin_t_20 fon-size_14">
            <div class="content-item flex_sb content-item-font margin_10 color-gain">
              <span class=" ">订单信息</span>
              <img src="../../../assets/img/order/order-arrows.png" alt="" style="width: 25px;height: 25px;"
                   @click="trigger3 = !trigger3">
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW3">
              <span>桌号：</span>
              <span class="color-gain">A02</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW3">
              <span>订单号：</span>
              <span class="color-gain">65746574567457</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW3">
              <span>支付方式：</span>
              <span class="color-gain">微信支付</span>
            </div>
            <div class="content-item flex_sb content-item-font margin_10" v-show="triggerW3">
              <span>用餐人数：</span>
              <span class="color-gain">3人</span>
            </div>
          </div>
          <div class="margin_l_r_10 border-top margin_t_20 fon-size_14">
            <div class="content-item flex_sb content-item-font margin_10 color-gain">
              <span class="margin_t_10">本单用户应付</span>
              <span>388.43</span>
            </div>
            <div class="flex_sp margin_t_10">
              <mt-button size="small" class="color-f75_bg color-white btn-small">拒单</mt-button>
              <mt-button size="small" class="color-main_bg color-white btn-small">接单</mt-button>
            </div>
          </div>
        </div>
      </mt-popup>-->

      <!--退款弹窗-->
      <mt-popup
        v-model="popupRefund" style="width: 300px;"
        :closeOnClickModal="false"
        popup-transition="popup-fade">
        <transition name="msgbox-bounce">
          <div class="mint-msgbox">
            <div class="mint-msgbox-header">
              <div class="mint-msgbox-title">确认退款333.11元</div>
            </div>
            <div class="mint-msgbox-content">
              <div class="mint-msgbox-message text-ac fon-size_14">退款成功后,金额将原路返回</div>
              <div class="mint-msgbox-input">
                <input v-model="money" placeholder="请输入退款金额" ref="input" type="password">
              </div>
              <div class="mint-msgbox-input mar-top_1">
                <input v-model="password" placeholder="请输入当前账户支付密码" ref="input" type="password">
              </div>
            </div>
            <div class="mint-msgbox-btns">
              <button class="cancelButtonClasses mint-msgbox-btn border-right mint-msgbox-confirm"
                      @click="popupRefund = false;">取消
              </button>
              <button class="confirmButtonClasses mint-msgbox-btn" @click="handleAction()">
                确定退款
              </button>
            </div>
          </div>
        </transition>
      </mt-popup>

      <!-- 堂食 -->
      <!--堂食弹窗1-->
      <mt-popup
        v-model="popupVisibleT1"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('oneT')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slotsT1" @change="onvalueschange"
        ></mt-picker>
      </mt-popup>

      <!--堂食弹窗2-->
      <mt-popup
        v-model="popupVisibleT2"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('twoT')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slotsT2" @change="onvalueschange"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!--堂食弹窗3-->
      <mt-popup
        v-model="popupVisibleT3"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('threeT')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slotsT3" @change="onvalueschange"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!--堂食弹窗4-->
      <mt-datetime-picker
        cancelText="结束时间"
        ref="picker2"
        type="date"
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
        type="date"
        cancelText="开始时间"
        v-model="pickerValue1"
        :endDate="endDate"
        hourFormat="{value} 时"
        minuteFormat="{value} 分"
        @confirm="handleConfirm1"
      >
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
  import kyHeader from '@/common/header/Header.vue'
  import kyButton from '@/common/button/Button.vue'
  import {MessageBox, Toast, DatetimePicker} from 'mint-ui';
  import {baseMsg, orderMsg, orderDetail} from '@/api'

  export default {
    components: {
      kyHeader, kyButton
    },
    name: "eat-in",
    data() {
      return {
        popupDetail: false,       // 详细页
        popupRefund: false,       // 退款弹窗
        popupTakeOut: false,      // 外卖详情
        password: '',             // 退款密码
        money: '',                // 退款金额
        tempValue: '',            // 存放弹窗零时值

        flag: false,

        popupVisibleT1: false,    // -> 堂食弹窗
        popupVisibleT2: false,
        popupVisibleT3: false,
        popupVisibleT4: false,

        popupValueT1: '',
        popupValueT2: '',
        popupValueT3: '',

        eatInDetail: {},          // 堂食详情页数据

        popupVisibleW1: false,    // -> 外卖弹窗
        popupVisibleW2: false,
        popupVisibleW3: false,

        triggerT1: true,          // -> 堂食显隐标识
        triggerT2: true,
        triggerT3: true,

        pickerValue1: new Date().Format("yyyy-MM-dd"),  // 日期弹窗 -> 开始时间(默认选中今天)
        pickerValue2: '',      // 日期弹窗 -> 结束时间

        endDate: new Date(new Date().Format("yyyy-MM-dd")),

        beginTime: '',            // 开始时间站位
        endTime: '',

        slotsT1: [
          {
            flex: 1,
            values: [],
          }
        ],          // -> 堂食弹窗可选项
        slotsT2: [
          {
            flex: 1,
            values: [],
          }
        ],
        slotsT3: [
          {
            flex: 1,
            values: [],
          }
        ],
        slotsT4: [
          {
            flex: 1,
            values: [],
          }
        ],

        optionsT1: [],
        optionsT2: [],
        optionsT3: [],

        contentList1: [],

        load: false,
        loadMsg: '没有更多数据啦..',
        headerId: 0,
        page: 1,          // 当前加载页码
        pageNum: 10,       // 当前加载数量
        topStatus: '',
        bottomStatus: '',
        allLoaded: false,
        list: [],
      }
    },
    methods: {
      clickHeader(index) {
        this.headerId = index
        this.$router.push('/purseStrings/order/takeOut');
      },
      goBack() {
        this.$router.push('/purseStrings')
      },
      back() {
        this.popupDetail = false;
        this.popupTakeOut = false;
      },
      // 打开堂食详情
      openDetail(item) {
        this.popupDetail = true;
        this.getOrderDetail(item);
      },
      // 打开外卖详情
      openTakeOut() {
        this.popupTakeOut = true;
      },
      // 打开弹窗
      openPopup(value) {
        if (value == 'oneT') {
          this.popupVisibleT1 = true;
        } else if (value == 'twoT') {
          this.popupVisibleT2 = true;
        } else if (value == 'threeT') {
          this.popupVisibleT3 = true;
        } else if (value == 'fourT') {
          this.$refs.picker2.open();
          this.$refs.picker1.open();
        }
      },
      // 弹窗确认按钮
      makeSure(value) {
        if (value == 'oneT') {
          this.popupValueT1 = this.tempValue;
          this.popupVisibleT1 = false;
          // 保存到vuex
          this.$store.commit('storeSave', this.popupValueT1);
          this.loadTop();

        } else if (value == 'twoT') {
          this.popupVisibleT2 = false;
          this.popupValueT2 = this.tempValue;
          // 保存到vuex
          this.$store.commit('paymentSave', this.popupValueT2);
          this.loadTop();
        } else if (value == 'threeT') {
          this.popupVisibleT3 = false;
          this.popupValueT3 = this.tempValue;

          // 保存到vuex
          this.$store.commit('statusSave', this.popupValueT3);
          this.loadTop();

        } else if (value == 'fourT') {
          this.popupVisibleT4 = false;
        }
      },
      onvalueschange(picker, values) {
        this.tempValue = values[0];
      },
      refund() {
        this.popupRefund = true;
      },
      handleAction() {
        this.popupRefund = false;
        Toast('退款成功');
      },
      // 打开日期弹窗
      openPickerTime(flag) {
        if (flag) {
          this.$refs.picker1.open();
        } else {
          this.$refs.picker2.open();
        }
      },
      // 确认日期
      handleConfirm1(value) {
        this.beginTime = new Date(value).Format("yyyy-MM-dd");
        this.$store.commit('beginTimeSave', this.beginTime);
        this.loadTop();
        Toast('请选择结束时间')
      },
      handleConfirm2(value) {
        this.$store.commit('endTimeSave', this.endTime);
        this.endTime = new Date(value).Format("yyyy-MM-dd");
        this.loadTop();
      },
      // 下啦重新加载数据
      loadTop() {
        if (this.flag) {
          this.load = false;
          console.log('上啦重新加载数据');
          this.page = 1;
          this.getOrderMsg('top');
        }
      },
      // 上啦加载更多数据
      loadBottom() {
        if (this.flag) {
          console.log('下拉加载更多数据');
          this.getOrderMsg('bottom')
        }
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },

      /************************ api *****************************/
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

            this.optionsT1 = res.data.store;
            this.optionsT2 = res.data.payWay;
            this.optionsT3 = res.data.orderStatus;

            this.slotsT1[0].values = this.arrToArr(this.addAllOption(res.data.store, 'storeName'), 'storeName');
            this.slotsT2[0].values = this.arrToArr(this.addAllOption(res.data.payWay, 'payWayName'), 'payWayName');
            this.slotsT3[0].values = this.arrToArr(this.addAllOption(res.data.orderStatus, 'orderStatusName'), 'orderStatusName');

            // 判断当前vuex内是否存有store || payment,如果没有,那么默认全部
            if (this.$store.state.status) {
              this.popupValueT3 = this.$store.state.status;
            } else {
              this.popupValueT3 = this.slotsT3[0].values[0];
            }


            if (this.$store.state.payment) {
              this.popupValueT2 = this.$store.state.payment;
            } else {
              this.popupValueT2 = this.slotsT2[0].values[0];
            }

            if (this.$store.state.store) {
              this.popupValueT1 = this.$store.state.store;
            } else {
              this.popupValueT1 = this.slotsT1[0].values[0];
            }

            if (this.$store.state.beginTime) {
              this.beginTime = this.$store.state.beginTime;
            } else {
              this.beginTime = new Date().Format("yyyy-MM-dd");
            }

            if (this.$store.state.endTime) {
              this.endTime = this.$store.state.endTime;
            } else {
              this.endTime = new Date().Format("yyyy-MM-dd");
            }

            this.flag = true;
            this.loadTop();
          } else {
            Toast(res.errmsg);
          }
        })
      },

      // 获取订单信息
      getOrderMsg(value) {
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          token: localStorage.getItem('token'),
          storeId: this.findId(this.popupValueT1, this.optionsT1, 'id'),
          payWay: this.findId(this.popupValueT2, this.optionsT2, 'id'),
          orderStatus: this.findId(this.popupValueT3, this.optionsT3, 'id'),
          page: this.page,
          pageSize: this.pageNum,
          startTime: this.beginTime,
          endTime: this.endTime
        };

        params = this.formatParams(params);
        orderMsg(params).then((res) => {

          if (res.errcode == 0) {

            this.load = false;
            this.allLoaded = false;
            this.$refs.loadmore.onTopLoaded();
            this.$refs.loadmore.onBottomLoaded();

            /*if (res.data.length == 0) {
              // 展示没有更多数据..
              this.load = true;
              this.allLoaded = true;

              if (this.page != 1) {
                this.page -= 1;
              }
            } else {*/


            if (res.data.length < 10) {
              this.load = true;
              this.allLoaded = true;
            }

            if (value == 'top') {

              this.page = 2;
              this.contentList1 = res.data;

            } else if (value == 'bottom') {
              this.page += 1;
              for (var item in res.data) {
                this.contentList1.push(res.data[item]);
              }
            }

          } else {
            if (this.page != 1) {
              this.page -= 1;
            }
            Toast(res.errmsg);
          }
        })
      },

      // 订单详情
      getOrderDetail(orderNo) {
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          token: localStorage.getItem('token'),
          orderNo: orderNo
        };

        params = this.formatParams(params);

        orderDetail(params).then((res) => {
          console.log(res);
          this.eatInDetail = res.data;
        })
      }
    },
    computed: {
      beginDate() {                       // 结束日期的开始时间
        return new Date(this.pickerValue1);
      }
    },
    mounted() {
      // 获取基础信息
      this.getBaseMsg();
    }
  }
</script>

<style scoped>

</style>
