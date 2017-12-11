<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>


    <mt-tabbar v-model="selected" v-if="isShowTabbar">
      <mt-tab-item id="管钱" @click.native="change(1)">
        <img slot="icon" src="./assets/logo.png">
        管钱
      </mt-tab-item>
      <mt-tab-item id="管店" @click.native="change(2)">
        <img slot="icon" src="./assets/logo.png">
        管店
      </mt-tab-item>
      <mt-tab-item id="管人" @click.native="change(3)">
        <img slot="icon" src="./assets/logo.png">
        管人
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="change(4)">
        <img slot="icon" src="./assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      selected: "我的"
    }
  },
  methods: {
    change(value){
      if (value == 1){
        this.$router.push('/purseStrings');
      }else if (value == 2){
        this.$router.push('/keepShop');
      }else if (value == 3){
        this.$router.push('/conservator');
      }else if (value == 4){
         this.$router.push('/mine')
      }
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  mounted(){
    // this.change(4);
  },
  computed: mapGetters([
    'isShowTabbar'
  ])
}
</script>

<style lang="less">
  @import "./style/reset.css";
  @import "./style/main.less";
  @import "./style/transition.less";
</style>
