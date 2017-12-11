<template>
  <div class="hello">
    <!--<mt-header fixed title="固定在顶部"></mt-header>-->


    <router-view>
      <mt-button type="default" @click="openMsg">default</mt-button>
      <mt-button type="primary" @click="openDate" size="small">打开日历</mt-button>
      <mt-button type="primary" size="small">{{selected}}</mt-button>
    </router-view>


    <mt-tabbar v-model="selected">
      <mt-tab-item id="管钱" @click.native="one(1)">
        <img slot="icon" src="../assets/logo.png">
        管钱
      </mt-tab-item>
      <mt-tab-item id="管店" @click.native="one(2)">
        <img slot="icon" src="../assets/logo.png">
        管店
      </mt-tab-item>
      <mt-tab-item id="管人" @click.native="one(3)">
        <img slot="icon" src="../assets/logo.png">
        管人
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>


    <!--日历-->
    <template>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerValue">
      </mt-datetime-picker>
    </template>
  </div>
</template>

<script>

  import { MessageBox } from 'mint-ui';

  export default {
    data(){
      return {
        pickerValue: '2017-10-12',
        selected: '管钱'
      }
    },
    methods: {
      openMsg(){
        MessageBox('提示','操作成功');
      },
      openDate(){
        this.$refs.picker.open();
      },
      one(value){
        if (value == 1){
          this.$router.push('/one');
        }else if (value == 2){
          this.$router.push('/two');
        }else if (value == 3){
          this.$router.push('/three');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
