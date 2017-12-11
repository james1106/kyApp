<style scoped lang="less">
  .top {
    height: 140px;
    .top-img {
      height: 30px;
      width: 30px;
    }
  }

  .content {
    border-top: 1px solid #D8D9DA;
    margin: 0 10px;
    .content-item {
      height: 30px;

    }
  }

  .content-item-font {
    font-size: 15px;
  }

  .font-c {
    color: #888888
  }
</style>

<template>
  <div class="container">

    <mt-header class="headerTop" style="background-color: #Fc4a01;"></mt-header>

    <ky-header class="headerTitle color-main_bg">

      <mt-button slot="left" icon="back" style="color: white" @click="goBack()"></mt-button>

      <div slot="titles" class="flex_a header-mid">
        订单详情
      </div>

      <div slot="right">退款</div>
    </ky-header>

    <div class="top flex flex_f">
      <div class="flex_a flex_2">
        <img src="../../../../assets/logo.png" class="top-img" alt="">
        <span class="margin_l_10">*霸王 （177****1111）</span>
      </div>
      <div class="flex_1" style="font-size: 25px">688.88元</div>
      <div class="flex_1" style="font-size: 15px">交易成功</div>
    </div>

    <div class="content">
      <div class="content-item flex_sb content-item-font">
        <span class=" font-c">订单信息</span>
        <img src="../../../../assets/more_unfold.png" alt="">
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>桌号：</span>
        <span class="font-c">A02</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>订单号：</span>
        <span class="font-c">65746574567457</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>支付方式：</span>
        <span class="font-c">微信支付</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>用餐人数：</span>
        <span class="font-c">3人</span>
      </div>

    </div>

    <div class="content">
      <div class="content-item flex_sb content-item-font">
        <span class=" font-c">收款明细</span>
        <img src="../../../../assets/more_unfold.png" alt="">
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>收款人：</span>
        <span class="font-c">小王</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>收款门店：</span>
        <span class="font-c">一间小面</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>收款账号：</span>
        <span class="font-c">2342342</span>
      </div>
    </div>

    <div class="content">
      <div class="content-item flex_sb content-item-font">
        <span class=" font-c">商品</span>
        <img src="../../../../assets/more_unfold.png" alt="">
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>鸡：</span>
        <span class="font-c">￥88</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>甲鱼：</span>
        <span class="font-c">￥88</span>
      </div>

    </div>

    <div class="content">
      <div class="content-item flex_sb content-item-font">
        <span class=" font-c">创建时间</span>
        <span class=" font-c">2017-11-11 23：23：23</span>

      </div>
      <div class="content-item flex_sb content-item-font">
        <span class=" font-c">付款时间</span>
        <span class=" font-c">2017-11-11 23：23：23</span>

      </div>

    </div>

  </div>
</template>


<script>

  import kyHeader from '@/common/header/Header.vue'

  export default {

    components: {
      kyHeader
    },
    data() {
      return {}
    },
    methods: {

      goBack() {
        this.$router.go(-1)
      }
    }
  }


</script>
