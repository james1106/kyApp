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
  .content-item-font1{
    font-size: 17px;

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

    </ky-header>

    <div class="top flex flex_f">
      <div class="flex_a flex_2">
        <img src="../../../../assets/logo.png" class="top-img" alt="">
        <span class="margin_l_10">*霸王 （177****1111）</span>
      </div>
      <div class="flex_1" style="font-size: 25px">688.88元</div>
      <div class="flex_1" style="font-size: 15px;color: #EF673E">立即送达，建议19：00送达</div>
    </div>

    <div class="content">
      <div class="content-item flex_sb content-item-font">
        <span class=" font-c">顾客信息</span>
        <img src="../../../../assets/more_unfold.png" alt="">
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>姓名：</span>
        <span class="font-c">小霸王</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>电话：</span>
        <span class="font-c">133-3333-3333</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>地址：</span>
        <span class="font-c">体育西路</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>订单序号：</span>
        <span class="font-c">#65</span>
      </div>

    </div>

    <div class="content">
      <div class="content-item flex_sb content-item-font">
        <span class=" font-c">订单信息</span>
        <img src="../../../../assets/more_unfold.png" alt="">
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>接单门店：</span>
        <span class="font-c">一间小店</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>订单编号：</span>
        <span class="font-c">23423432432</span>
      </div>
      <div class="content-item flex_sb content-item-font">
        <span>下单时间：</span>
        <span class="font-c">18：18：18</span>
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
      <div class="content-item flex_sb content-item-font1">
        <span class=" font-c">本单用户应付</span>
        <span class=" font-c">￥888</span>

      </div>


    </div>


    <div class="flex margin_t_10">
      <div class="flex_1 flex">
        <mt-button size="small" style="width: 100px;background:#747575;color: white" >拒单</mt-button>

      </div>
      <div class="flex_1 flex">
        <mt-button size="small" style="width: 100px;background: #Fc4a01;color: white"  >接单</mt-button>

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
