<template>
  <div class="container container-t">
    <mt-header class="headerTop" style="background-color: #Fc4a01;"></mt-header>
    <ky-header class="headerTitle color-main_bg" style="height: 46px;">
      <mt-button slot="left" icon="back" style="color: white" @click="goBack"></mt-button>
      <div slot="titles" class="flex_a header-mid">
        <div class="flex_1 flex height_100 fon-size_14"
             :style="{'background':(index === headerId)?'white':'','color':(index === headerId)?'#Fc4a01':''}"
             v-for="(item,index) in headerList" :key="item.id" @click="clickHeader(index)">{{item.name}}
        </div>
      </div>
    </ky-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import kyHeader from '@/common/header/Header.vue'
  import kyButton from '@/common/button/Button.vue'
  import {MessageBox, Toast, DatetimePicker} from 'mint-ui';
  import {baseMsg, orderMsg, orderDetail} from '@/api'

  export default {
    components: {
      kyHeader, kyButton
    },
    data() {
      return {
        headerList: [{id: 0, name: '堂食'}, {id: 1, name: '外卖'}],
        headerId: 0
      }
    },
    methods: {
      clickHeader(index) {
        this.headerId = index;
        if (index == 0) {
          this.$router.push('/purseStrings/order/eatIn');
        } else {
          this.$router.push('/purseStrings/order/takeOut');
        }
      },
      goBack() {
        this.$router.push('/purseStrings');
      },
    }
  }
</script>
