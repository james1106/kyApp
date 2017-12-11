<template>
  <div class="container" id="keepShop">
    <mt-header title="" class="headerTop color-main_bg"></mt-header>
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈" class="headerTitle color-main_bg">
      <router-link to="/" slot="right">
        <mt-button icon="more"></mt-button>
      </router-link>
    </mt-header>
    <h1>管店铺</h1>
    <div class="searchTop">
      <div @click="openPopup(1)">1</div>
      <div @click="openPopup(2)">2</div>
      <div @click="openPopup(3)">3</div>
      <div class="icon"><i class="fa fa-search"></i></div>
    </div>
    <div class="search">

    </div>
    <div class="content">

    </div>


    <!--弹窗-->
    <div class="customDialog">
      <!--area-->
      <mt-popup
        v-model="popupArea"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="value"
                   :visibleItemCount=3
        ></mt-picker>
      </mt-popup>

      <!--store-->
      <mt-popup
        v-model="popupStore"
        position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"
                   value-key="value"
                   :visibleItemCount=3
        ></mt-picker>
      </mt-popup>

      <!--status-->
      <mt-popup
        v-model="popupStatus"
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
    data(){
      return {
        search: '',         // 搜索值
        popupArea: false,    // 地区显隐
        popupStore: false,    // 门店显隐
        popupStatus: false,    // 状态显隐
        slots: [
          {
            flex: 1,
            values: [{
              value: '上海'
            },{
              value: '上海'
            },{
              value: '上海'
            },{
              value: '上海'
            }],
          }
        ]
      }
    },
    methods: {
      openPopup(value){
        if (value == 1){
          this.popupArea = true;
        }else if (value == 2){
          this.popupStore = true;
        }else if (value == 3){
          this.popupStatus = true;
        }
      },
      onValuesChange(value){
        console.log(value);
      }
    }
  }
</script>
<style lang="less" scoped>
  .searchTop{
    display: flex;
    text-align: center;
    justify-content: center;
    div{
      margin-top: 5px;
      height: 20px;
      line-height: 20px;
      flex: 3;
      border-radius: 5px;
      border: 1px solid black;
      margin-left: 5px;
      margin-right: 5px;
    }

    .icon{
      flex: 1;
      border: none;
      margin-left: 0;
      margin-right: 0;
    }
  }
  .search{
    padding: 5px 10px 5px 10px;
  }
</style>
