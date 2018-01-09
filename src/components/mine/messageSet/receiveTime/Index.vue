<template>
  <div class="container container-t">
    <mt-header title="" class="headerTop color-main_bg"></mt-header>
    <mt-header title="接收时段" class="headerTitle color-main_bg">
      <router-link to="/mine/messageSet" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="title"></div>
    <mt-cell title="周期" :value="time" is-link @click.native="dataPick"></mt-cell>
    <mt-cell title="全天24小时">
      <mt-switch v-model="isOneDate"></mt-switch>
    </mt-cell>


    <!-- 周期弹窗 -->
    <div>
      <mt-popup
        class="width_100"
        v-model="popupVisible"
        position="bottom">
        <div class="makeSureBtn" @click="makeSure">
          <div>确定</div>
        </div>
        <mt-checklist
          align="right"
          v-model="timeValue"
          :options="options">
        </mt-checklist>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        time: '',            // 周期
        isOneDate: false,             // 全天24小时
        popupVisible: false,          // 周期弹窗
        timeValue: [],
        options: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],      // 日期选项
      }
    },
    methods: {
      dataPick() {
        this.popupVisible = true;
      },
      makeSure() {
        this.time = '';
        var vm = this;

        this.timeValue.forEach(function (value) {
          vm.time += value + ' '
        });

        if (this.timeValue.length == this.options.length) {
          this.time = '周一至周日'
        }

        this.popupVisible = false;
      }
    },
  }
</script>

<style scoped lang="less">

  .title {
    height: 10px;
    background-color: #f5f5f5;
  }

</style>
