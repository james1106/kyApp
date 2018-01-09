<template>
  <div class="container container-t-b">
    <mt-header title="" class="headerTop color-main_bg"></mt-header>
    <mt-header title="管人" class="headerTitle color-main_bg">
      <router-link to="/" slot="right">
        <img src="../../assets/img/conservator/conservator-add.png" alt="" style="width: 20px;height: 20px;">
      </router-link>
    </mt-header>

    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore"
                 :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded"
    >
      <ul>
        <li v-for="item in list" style="height: 44px;background-color: pink;margin-top: 5px">{{ item }}</li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        topStatus: '',
        allLoaded: false,
        list: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
      }
    },
    methods: {
      loadTop() {
        // 加载更多数据
        console.log('上啦重新加载数据');
        var vm = this;
        setTimeout(function () {
          vm.list = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];
          vm.$refs.loadmore.onTopLoaded();
        },2500)
      },
      loadBottom() {
        // 加载更多数据
        console.log('下拉加载更多数据');
        var vm = this;
        setTimeout(function () {

          for (var item in [11,12,13,14,15]) {
            console.log(item);
            vm.list.push(item);
          }
          vm.$refs.loadmore.onBottomLoaded();
        },2500);

        // this.allLoaded = true;// 若数据已全部获取完毕
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
    }
  }
</script>
