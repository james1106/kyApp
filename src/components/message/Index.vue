<style scoped lang="less">

  .container {
    background-color: #f5f5f5;
    height: calc(~"100% - 64px");
    margin-bottom: 0;
  }

  .content {
    background-color: white;
    .content-time {
      height: 40px;
      background: #F4F5F4
    }
    .content-item {
      padding: 0 10px;
      height: 49px;
      border-bottom: 1px solid #F4F5F4;
      .content-img {
        width: 30px;
        height: 30px;
      }
    }

    .content-foot {
      padding: 0 10px;
      height: 70px;
      .content-footImg {
        border-radius: 50px;
        width: 50px;
        height: 50px;
      }

    }
    .font-c {
      color: #8C8D8E
    }
  }

</style>

<template>
  <div class="container">

    <mt-header class="headerTop" style="background-color: #Fc4a01;"></mt-header>
    <ky-header class="headerTitle color-main_bg">
      <router-link to="/purseStrings" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>

      <div slot="titles" class="flex_a header-mid">
        <div class="flex_1 flex height_100 fon-size_15"
             :style="{'background':(index === headerId)?'white':'','color':(index === headerId)?'#Fc4a01':''}"
             v-for="(item,index) in headerList" :key="item.id" @click="headerId = index">{{ item.name }}
        </div>
      </div>
    </ky-header>

    <mt-loadmore :top-method="loadTop"
                 @top-status-change="handleTopChange"
                 @bottom-status-change="handleBottomChange"
                 ref="loadmore"
                 :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"

    >
      <div v-for="item in list" class="content">
        <div class="content-time flex font-c">{{item.create_time}}</div>

        <div class="flex_a content-item">
          <div class="flex_2 ellipsis" style="color: #EE5D3A">桌号:&nbsp;{{item.table_number}}</div>
          <div class="flex_5 flex ellipsis">{{item.store_name}}</div>
          <div class="flex_1 flex_e ellipsis">
            <img src="../../assets/img/message/ariPay.png" alt="" class="content-img" v-if="item.way == '支付宝'">
            <img src="../../assets/img/message/wechat.png" alt="" class="content-img" v-if="item.way == '微信'">
          </div>
        </div>

        <div class="flex_a content-foot">
          <img src="../../assets/img/message/mine.png" class="content-footImg" alt="" width="44" height="50">
          <div class="flex_sb width_100">
            <div class="margin_l_10" style="font-size: 20px">来自{{item.way}}</div>
            <div>
              <div style="margin-bottom: 4px;text-align: right;">+{{item.price}}</div>
              <div class="font-c fon-size_14 mar-top_0_5">{{item.order_status}}</div>
            </div>
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

    <!--<mt-tab-container v-model="headerId" :swipeable="true" class="height_100 overflow_a">
      <mt-tab-container-item :id=0>

      </mt-tab-container-item>
      <mt-tab-container-item :id=1>
        <div class="flex height_100 color-tip">
          <div class="flex height_100">
            <img src="../../assets/img/message/nothing.png" alt="" style="width: 40px;height: 80px;" class="">
            <div class="mar-left_1">您未开通外卖服务</div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>-->
  </div>
</template>

<script>
  import kyHeader from '@/common/header/Header.vue';
  import {Toast} from 'mint-ui';
  import {mapGetters} from 'vuex'
  import {VoiceNotificationList} from '@/api/index.js'

  export default {
    data() {
      return {
        load: false,
        loadMsg: '没有更多数据啦..',
        headerId: 0,
        page: 1,          // 当前加载页码
        pageNum: 5,       // 当前加载数量
        headerList: [{id: 0, name: '收款消息'}, {id: 1, name: '外卖订单消息'}],
        topStatus: '',
        bottomStatus: '',
        allLoaded: false,
        list: [],
      }
    },
    methods: {
      apiLoad(value) {
        var params = {
          appid: localStorage.getItem('appid'),
          timestamp: Date.parse(new Date()) / 1000,
          page: this.page,
          pageNum: this.pageNum,
          token: localStorage.getItem('token')
        };

        params = this.formatParams(params);
        VoiceNotificationList(params).then((res) => {
          console.log(res);
          if (res.errcode == 0) {

            this.load = false;
            this.allLoaded = false;
            this.$refs.loadmore.onTopLoaded();
            this.$refs.loadmore.onBottomLoaded();

            if (res.data.length == 0) {
              // 展示没有更多数据..
              this.load = true;
              this.allLoaded = true;

              if (this.page != 1) {
                this.page -= 1;
              }

            } else {
              if (res.data.length < 5) {
                this.load = true;
                this.allLoaded = true;
              }
              if (value == 'top') {
                this.page = 2;
                this.list = res.data;
              } else if (value == 'bottom') {
                this.page += 1;
                for (var item in res.data) {
                  this.list.push(res.data[item]);
                }
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
      loadTop() {
        // 上啦重新加载数据
        console.log('上啦重新加载数据');
        this.page = 1;
        this.apiLoad('top');
      },
      loadBottom() {
        // 加载更多数据
        console.log('下拉加载更多数据');
        this.apiLoad('bottom')
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      }
    },
    components: {
      kyHeader
    },
    computed: mapGetters([
      'getAppid', 'getsValue'
    ]),
  }


</script>
