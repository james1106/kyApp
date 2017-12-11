<style scoped lang="less">
  .content {
    .content-time {
      height: 40px;
      background: #F4F5F4
    }
    .content-item{
      padding: 0 10px;
      height: 60px;
      border-bottom: 1px solid #F4F5F4;
      .content-img{
        width: 30px;
        height: 30px;
      }
    }

    .content-foot{
      padding: 0 10px;
      height: 70px;
      .content-footImg{
        width: 50px;
        height: 50px;
      }

    }
    .font-c{
      color:  #8C8D8E
    }
  }

</style>

<template>
  <div class="container">

    <mt-header class="headerTop" style="background-color: #Fc4a01;"></mt-header>


    <mt-header title="消息" class="headerTitle color-main_bg">
      <router-link to="/purseStrings" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="content" v-for="(item,index) in list">
      <div class="content-time flex font-c">{{item.time}}</div>

        <div class="flex_a content-item">
          <div class="flex_1" style="color: #EE5D3A">桌号：A04</div>
          <div class="flex_2 flex">一间小面（天河店）</div>
          <div class="flex_1 flex_e"><img src="../../assets/logo.png" alt="" class="content-img"></div>
        </div>

        <div class="flex_a content-foot">
          <img src="../../assets/logo.png" class="content-footImg" alt="">
          <div class="flex_sb width_100">
            <div class="margin_l_10" style="font-size: 20px">小霸王</div>
            <div>
              <div style="margin-bottom: 4px;">+5.00</div>
              <div class="font-c">交易成功</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>


<script>


  export default {

    components: {},
    data() {
      return {
        list: [{id: 0,time: '今天 09：30'}, {id: 1, time: '今天 22：30'}]
      }
    },
    methods: {}
  }


</script>
