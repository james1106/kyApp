<template>
  <div class="container container-t-b" id="keepShop">
    <mt-header title="" class="headerTop color-main_bg"></mt-header>
    <mt-header title="管店" class="headerTitle color-main_bg"></mt-header>


    <!--分类title-->
    <div style="position: fixed;left: 0;right: 0;z-index: 999">
      <div class="title-category flex fon-size_14 color-tip color-white_bg">
        <div class="title-padding flex_1 border-right" @click="openPopup(1)">
          <div class="title-item flex_d_r ">
            <div>全国</div>
            <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
          </div>
        </div>
        <div class="title-padding flex_1 border-right" @click="openPopup(2)">
          <div class="title-item flex_d_r">
            <div>我的门店</div>
            <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
          </div>
        </div>
        <div class="title-padding flex_1" @click="openPopup(3)">
          <div class="title-item flex_d_r">
            <div>全部状态</div>
            <span class="mar-left_0_5 fa fa-sort-down title-sort-down"></span>
          </div>
        </div>
      </div>
    </div>

    <mt-loadmore :top-method="loadTop"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange"
                 ref="loadmore"
                 :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" style="padding-top: 44px;"

    >
      <div class="content border-top_10" v-for="item in list">
        <div class="shop-item color-white_bg">
          <div class="shop-item-left pos-r">
            <img src="../../assets/bg_button_review_hl_15x25_@2x.png" alt="" style="width: 60px;height: 60px;">
            <div class="pos-a store-status fon-size_12">营业中{{item}}</div>
          </div>
          <div class="shop-item-right mar-left_1">
            <div class="shop-item-top mar-bottom_1">一间小面馆(天河店)</div>
            <div class="shop-item-middle mar-bottom_1 color-tip fon-size_14">惺惺惜惺惺想寻寻寻寻</div>
            <div class="shop-item-bottom color-tip fon-size_14">美食-中餐-发的说法</div>
          </div>
        </div>
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


    <!--弹窗-->
    <div class="customDialog">
      <!--area-->
      <mt-popup
        v-model="popupArea"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('area')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="one"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!--store-->
      <mt-popup
        v-model="popupStore"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('store')">
          <div>确定</div>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="value"
                   :visibleItemCount=5
        ></mt-picker>
      </mt-popup>

      <!--status-->
      <mt-popup
        v-model="popupStatus"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure('status')">
          <div>确定</div>
        </div>
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
        popupArea: false,    // 地区显隐
        popupStore: false,    // 门店显隐
        popupStatus: false,    // 状态显隐
        slots: [
          {
            flex: 1,
            values: [{
              one: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }, {
              value: '上海'
            }],
          }
        ],
        topStatus: '',
        bottomStatus: '',
        allLoaded: false,
        list: [1, 2, 3, 4, 5, 6, 7, 8]
      }
    },
    methods: {
      openPopup(value) {
        if (value == 1) {
          this.popupArea = true;
        } else if (value == 2) {
          this.popupStore = true;
        } else if (value == 3) {
          this.popupStatus = true;
        }
      },
      onValuesChange(value) {
        console.log(value);
      },
      loadTop() {
        // 加载更多数据
        console.log('上啦重新加载数据');
        var vm = this;
        setTimeout(function () {
          vm.list = [1, 2, 3, 4, 5, 6, 7, 8];
          vm.$refs.loadmore.onTopLoaded();
        }, 2500)
      },
      loadBottom() {
        // 加载更多数据
        console.log('下拉加载更多数据');
        var vm = this;
        setTimeout(function () {

          for (var item in [11, 12, 13, 14, 15]) {
            console.log(item);
            vm.list.push(item);
          }
          vm.$refs.loadmore.onBottomLoaded();
        }, 2500);

        // this.allLoaded = true;// 若数据已全部获取完毕
      },
      makeSure(value) {
        if (value == 'area') {
          this.popupArea = false;
        } else if (value == 'store') {
          this.popupStore = false;
        } else if (value == 'status') {
          this.popupStatus = false;
        }
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      }
    }
  }
</script>
<style lang="less" scoped>
  .content {
    // padding-top: 44px;
    .shop-item {
      padding: 10px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 88px;
      .shop-item-left {
        .store-status {
          text-align: center;
          background-color: #Fc4a01;
          color: white;
          opacity: .8;
          height: 15px;
          line-height: 15px;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      .shop-item-right {
        .shop-item-top {
        }
        .shop-item-middle {
        }
        .shop-item-bottom {
        }
      }
    }
  }

</style>
