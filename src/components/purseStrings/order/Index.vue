<style scoped lang="less">
  .header-mid {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid white;
    overflow: hidden;
  }
  .subContent{

    height: 40px;
    .subContent-item{
      padding: 0 4px;
      height: 90%;
      border-right: 1px solid #D8D9DA;
    }
    .subContent-item:last-child{
      height: 90%;
      border-right: 0;
    }
  }
  .triangle-down {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid black;
  }

  .bill{
    height: 50px;
    padding: 0 10px;
    background: #D8D9DA;
  }
  .content{
    height: 70px;
    margin: 0 10px;
    border-bottom: 1px solid #D8D9DA;
    .content-img{
      width: 70px;
      height: 70px;
    }
    .content1{
      font-size: 20px;
    }
    .content2{
     color: #8C8D8E;

    }
  }
  .content:last-child{
    border-bottom:0
  }

  a:link {
    color: #000000;
    text-decoration: none;
  }
  a:visited {
    color: #000000;
    text-decoration: none;
  }
</style>

<template>
  <div class="container">

    <mt-header class="headerTop" style="background-color: #Fc4a01;"></mt-header>


    <!--<mt-header title="订单" class="headerTitle">-->
    <!--<router-link to="/purseStrings" slot="left">-->
    <!--<mt-button icon="plus">返回</mt-button>-->
    <!--</router-link>-->
    <!--</mt-header>-->
    <ky-header class="headerTitle color-main_bg">

      <mt-button slot="left" icon="back" style="color: white" @click="goBack()"></mt-button>

      <div slot="titles" class="flex_a header-mid">
        <div class="flex_1 flex height_100"
             :style="{'background':(index === headerId)?'white':'','color':(index === headerId)?'#Fc4a01':''}"
             v-for="(item,index) in headerList" :key="item.id" @click="clickHeader(index)">{{item.name}}
        </div>
      </div>

      <img src="../../../assets/search.png" alt="" slot="right">
    </ky-header>



    <mt-tab-container v-model="headerId" :swipeable="true">
      <mt-tab-container-item :id=0>
        <div class="flex_a subContent">
          <div v-for="(item,index) in subContent1" :key="item.id" class="flex_1 flex_sb subContent-item">
            <div>{{item.name}}</div>
            <div class="triangle-down"></div>
          </div>
        </div>
        <div class="bill flex_f">
          <div class="flex_1 flex_sb">
            <span>今天 6:00 - 22:00</span>
            <span> 账单 > </span>
          </div>
          <div class="flex_1 flex_a">进行中888单，总888金额</div>
        </div>

        <router-link to="/purseStrings/order/canteenDetails" v-for="(item,index) in contentList1" :key="item.id">
        <div class="content flex_a" >
            <img src="../../../assets/logo.png" alt="" class="content-img">
            <div class="flex_f flex_j width_100 height_100 margin_l_10">
              <div class="margin_b_10 flex_sb">
                <span class="content1 ">{{item.name}}</span>
                <span class="content1 "> {{item.price}} </span>
              </div>
              <div class=" flex_sb">
                <span class="content2 ">{{item.time}}</span>
                <span class="content2 ">{{item.finish}}</span>
              </div>
            </div>


        </div>
        </router-link>

      </mt-tab-container-item>


      <mt-tab-container-item :id=1>
        <div class="flex_a subContent">
          <div v-for="(item,index) in subContent2" :key="item.id" class="flex_1 flex_sb subContent-item">
            <div>{{item.name}}</div>
            <div class="triangle-down"></div>
          </div>
        </div>
        <div class="bill flex_f">
          <div class="flex_1 flex_sb">
            <span>今天 6:00 - 22:00</span>
            <span> 账单 > </span>
          </div>
          <div class="flex_1 flex_a">进行中888单，总888金额</div>
        </div>
        <router-link to="/purseStrings/order/takeOutDetails" v-for="(item,index) in contentList2" :key="item.id">
        <div class="content flex_a" >
          <img src="../../../assets/logo.png" alt="" class="content-img">
          <div class="flex_f flex_j width_100 height_100 margin_l_10">
            <div class="margin_b_10 flex_sb">
              <span class="content1 ">{{item.name}}</span>
              <span class="content1 "> {{item.price}} </span>
            </div>
            <div class=" flex_sb">
              <span class="content2 ">{{item.time}}</span>
              <span class="content2 ">{{item.finish}}</span>
            </div>
          </div>
        </div>
        </router-link>
      </mt-tab-container-item>

    </mt-tab-container>


  </div>
</template>


<script>

  import kyHeader from '@/common/header/Header.vue'

  export default {

    components: {
      kyHeader
    },
    data() {
      return {
        headerId: 0,
        headerList: [{id: 0, name: '堂食'}, {id: 1, name: '外卖'}],
        subContent1:[{id: 0, name: '选择门店/帐'},{id: 0, name: '选择人员'},{id: 0, name: '全部'},{id: 0, name: '全部状态'}],
        subContent2:[{id: 0, name: '选择门店/帐'},{id: 0, name: '全部'},{id: 0, name: '状态'}],
        contentList1:[{id:0,name:'小王',price:'+5.00',time:'今天 09：30 A01',finish:'交易完成'},{id:1,name:'小王',price:'+5.00',time:'今天 09：30 A01',finish:'交易完成'}],
        contentList2:[{id:0,name:'小王',price:'+5.00',time:'今天 09：30 A01',finish:'交易完成'}],
        active:1

      }
    },
    methods: {
      clickHeader(index) {
        this.headerId = index

      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }


</script>
