<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>


    <mt-tabbar v-model="selected" v-if="isShowTabbar">
      <mt-tab-item id="管钱" @click.native="change(1)" class="color-tip">
        <span class="icon-tabbar-money fon-size_24" slot="icon"></span>
        管钱
      </mt-tab-item>
      <mt-tab-item id="管店" @click.native="change(2)" class="color-tip">
        <span class="icon-tabbar-store fon-size_24" slot="icon"></span>
        管钱
      </mt-tab-item>
      <mt-tab-item id="管人" @click.native="change(3)" class="color-tip">
        <span class="icon-tabbar-conservator fon-size_24" slot="icon"></span>
        管钱
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="change(4)" class="color-tip">
        <span class="icon-tabbar-mine fon-size_24" slot="icon"></span>
        管钱
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left',
        selected: "管钱"
      }
    },
    methods: {
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
      }
    },
    watch: {
      $route(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    mounted() {
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
  @import "./style/fonts.css";
</style>
