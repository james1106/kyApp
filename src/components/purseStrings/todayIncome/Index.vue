<template>
  <div class="container">
    <mt-header title="今日收入" class="headerTitle">
      <router-link to="/purseStrings" slot="left">
        <mt-button icon="plus">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="searchTop">
      <div @click="openPopup(1)">门店</div>
      <div @click="openPopup(2)">收银员</div>
      <div @click="openPopup(3)">支付方式</div>
      <div @click="openPopup(4)">时间</div>
    </div>

    <!--弹窗-->
    <div class="customDialog">
      <!--门店-->
      <mt-popup
        v-model="popupStore"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="value"
                   :visibleItemCount=3
        ></mt-picker>
      </mt-popup>

      <!--收银员-->
      <mt-popup
        v-model="popupCashier"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="value"
                   :visibleItemCount=3
        ></mt-picker>
      </mt-popup>

      <!--支付方式-->
      <mt-popup
        v-model="popupPayM"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="value"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!--时间-->
      <mt-popup
        v-model="popupTime"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="value"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        popupStore: false,        // 门店显隐
        popupCashier: false,      // 收银员显隐
        popupPayM: false,         // 支付方式显隐
        popupTime: false,         // 时间显隐
        slots: [
          {
            flex: 1,
            values: [{
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }],
          }
        ]
      }
    },
    methods: {
      openPopup(value) {
        if (value == 1) {
          this.popupStore = true;
        } else if (value == 2) {
          this.popupCashier = true;
        } else if (value == 3) {
          this.popupPayM = true;
        } else if (value == 4) {
          this.popupTime = true;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .searchTop {
    display: flex;
    text-align: center;
    justify-content: center;
    div {
      margin-top: 5px;
      height: 20px;
      line-height: 20px;
      flex: 3;
      border-radius: 5px;
      border: 1px solid black;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
</style>
