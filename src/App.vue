<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view @selectType="onSelectType"/>
    </transition>

    <mt-tabbar v-model="selected" v-if="isShowTabbar">
      <mt-tab-item id="管钱" @click.native="change(1)" class="color-tip">
        <span class="icon-tabbar-money fon-size_24" slot="icon"></span>
        管钱
      </mt-tab-item>
      <!--<mt-tab-item id="管店" @click.native="change(2)" class="color-tip">
        <span class="icon-tabbar-store fon-size_26" slot="icon"></span>
        管店
      </mt-tab-item>
      <mt-tab-item id="管人" @click.native="change(3)" class="color-tip">
        <span class="icon-tabbar-conservator fon-size_26" slot="icon"></span>
        管人
      </mt-tab-item>-->
      <mt-tab-item id="我的" @click.native="change(4)" class="color-tip">
        <span class="icon-tabbar-mine fon-size_24" slot="icon"></span>
        我的
      </mt-tab-item>
    </mt-tabbar>
    <ky-loading></ky-loading>
  </div>
</template>

<script>
  import {MessageBox,Toast} from 'mint-ui';
  import {mapGetters, mapActions} from 'vuex'
  import kyLoading from './common/loading/loading.vue'
  import {AccessKey, PollingMessage, ReportNews,getBaiDuAccess_token} from '@/api/index.js'

  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left',
        selected: "管钱",
        timer: null,
        isComplete: true, // 是否播放成功
        appid: '',        // 用户id
        value: '',        // 密钥
        key: '',          // 删除已播放过语言所用数据
        text: '',         // 语言内容
      }
    },
    methods: {
      ...mapActions([
        'messageCountChange', 'appidGet', 'valueGet', 'tokenGet'
      ]),
      change(value) {
        if (value == 1) {
          this.$router.push('/purseStrings');
        } else if (value == 2) {
          this.$router.push('/keepShop');
        } else if (value == 3) {
          this.$router.push('/conservator');
        } else if (value == 4) {
          this.$router.push('/mine')
        }
      },
      onSelectType(value){
        this.selected = value;
      }
    },
    watch: {
      $route(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
    },
    mounted() {
      // /**
      //  * 判断当前时间是否过期 -> 重新获取access_token 提前1000ms获取
      //  */
      // var nowData = Date.parse(new Date()) / 1000;
      // if (nowData - localStorage.getItem('nowData') > localStorage.getItem('expires_in') - 1000){
      //   /**
      //    * 获取百度access_token
      //    */
      //   getBaiDuAccess_to
      // ken().then((res) => {
      //     // 保存access_token
      //     // 保存当前时间 -> 时间戳
      //     // 保存过期时间
      //     localStorage.setItem('access_token',res.access_token);
      //     localStorage.setItem('expires_in',res.expires_in);
      //     localStorage.setItem('nowData',Date.parse(new Date()) / 1000);
      //   });
      // }

      // 只请求一次 -> 密钥键值对
      if (localStorage.getItem('appid') == null || localStorage.getItem('appid') == 'undefined'){
        AccessKey().then((res) => {
          if (res.errcode == 0) {
            console.log(res);
            this.appid = res.data.key;
            this.value = res.data.value;

            this.appidGet(res.data.key);
            this.valueGet(res.data.value);

            localStorage.setItem('appid',res.data.key);
            localStorage.setItem('key',res.data.value);
          }
        });
      }

      // 备份指针 -> 下面有定时器
      var vm = this;

      // 判断当前是否存在messageCount -> 没有默认为0
      var messageCount = localStorage.getItem('messageCount');
      if (messageCount == null || messageCount == 'NaN' || messageCount == '' || messageCount == NaN) {
        messageCount = 0;
        localStorage.setItem('messageCount', messageCount);
        vm.messageCountChange(messageCount);
      }

      // 轮询数据
      this.timer = setInterval(function () {
        if (vm.isComplete){
          // 判断是否有权限语音播报
          if (localStorage.getItem('isCashier') == 1) {
            // 轮询获取语音通道信息
            var params = {
              appid: localStorage.getItem('appid'),
              token: localStorage.getItem('token'),
              timestamp: Date.parse(new Date()) / 1000
            };

            params = vm.formatParams(params);

            console.log(params);
            PollingMessage(params).then((res) => {
              console.log(res);
              if (res.errcode == 0) {
                if (res.data != null) {
                  vm.isComplete = false;
                  // 如果在消息界面,那么消息次数为0
                  if (vm.$route.fullPath == '/purseStrings/message') {
                    localStorage.setItem('messageCount', 0);
                    var messageCount = localStorage.getItem('messageCount');
                    vm.messageCountChange(messageCount);
                  } else {
                    // 订单来了,次数加一
                    var messageCount = localStorage.getItem('messageCount');
                    messageCount = parseInt(messageCount) + 1;
                    localStorage.setItem('messageCount', messageCount);
                    vm.messageCountChange(messageCount);
                  }
                  // 保存删除数据所用key
                  vm.key = res.data.key;
                  vm.text = res.data.text;
                  /*语音播报*/
                  var audio = api.require('audio');
                  // 设置音量
                  audio.setVolume({
                    volume: 1
                  });
                  audio.play({
                    // path: 'widget://static/audio/banner1.mp3'  -> // 本地音频
                    path: 'http://tsn.baidu.com/text2audio?lan=zh&cuid=ac:bc:32:9a:a6:5b&ctp=1&tok=24.92e7fd9a3ede7cc82f3666ca4dd6fa78.2592000.1516628818.282335-10570617&per=0&vol=15&tex=' + vm.text
                  }, function (ret, err) {
                    if (ret) {

                      // 播放完成
                      if (ret.complete) {
                        vm.isComplete = true;

                        // 上报消息通报
                        var params = {
                          appid: vm.appid,
                          token: localStorage.getItem('token'),
                          timestamp: Date.parse(new Date()) / 1000,
                          key: vm.key
                        };

                        params = vm.formatParams(params);
                        ReportNews(params).then((res) => {

                        })
                      }else {
                        Toast(vm.text);
                      }
                    }
                  })
                }
              }
            });
          }
        }
      }, 1000);
    },
    computed: mapGetters([
      'isShowTabbar', 'getAppid', 'getsValue', 'getToken'
    ]),
    components: {
      kyLoading
    }
  }
</script>

<style lang="less">
  @import "./style/main.less";
</style>
