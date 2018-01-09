<template>
  <div class="container container-t">
    <mt-header title="" class="headerTop color-main_bg"></mt-header>
    <mt-header title="关于" class="headerTitle color-main_bg">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>


    <div class="mine-logo flex color-white_bg">
      <img src="../../../assets/img/mine/mine-ky-logo.png" alt=""  style="width: 40%;">
      <div class="mine-version mar-top_2_0 fon-size_14">款易APP {{version}}</div>
    </div>


    <div class="mine-body border-top_10">
      <mt-cell title="系统通知" is-link></mt-cell>
      <mt-cell title="版本更新" is-link></mt-cell>
    </div>
  </div>
</template>
<script>

  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters([
      'version'
    ])
  }
</script>
<style scoped lang="less">
  @import "../../../style/variable.less";

  .mine-logo{
    height: 150px;
    flex-direction: column;
    color: @borderColor;
    .mine-version{}
  }

  .mine-body{

  }

</style>
