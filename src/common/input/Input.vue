<template>
  <div class="inputD">
    <div class="title titleP" v-if="types == 'number'">+86</div>

    <div class="mint-cell-value" :style="'width:' + width" :class="{'border' : types != 'number'}">
      <input :placeholder="placeholder ? placeholder : ''" :type="type ? type : 'text'" class="mint-field-core" v-model="value" :class="{'border' : types != 'number'}">
      <div class="mint-field-clear">
        <i class="mintui mintui-field-error" @click="clear" v-show="value.length != 0"></i>
        <span v-if="types == 'password'" class="icon-eyes color-tip fon-size_24 mar-left_0_5" @click="showPw"></span>
      </div>
      <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span>
      <div class="mint-field-other"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "input",
    data() {
      return {
        value: '',
        type: this.types,
        flag: true
      }
    },
    props: {
      types: String,
      width: String,
      placeholder: String
    },
    methods: {
      clear(){
        this.value = '';
      },
      showPw(){
        if (this.flag){
          this.type = 'text';
        }else {
          this.type = 'password';
        }
        this.flag = !this.flag;
      }
    },
    watch: {
      value(val) {
        this.$emit('kyChange', val);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/variable.less";
  .inputD{
    display: flex;
    justify-content: center;
    align-items: center;
    .titleP{
      background-color: @mainColor !important;
    }
    .title{
      width: 20%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom-left-radius: 7px;
      border-top-left-radius: 7px;
      color: white;
      background-color: @placeholderBg;
    }
    .mint-cell-value{
      padding-right: 5px;
      display: flex;
      height: 50px;
      background-color: @placeholderBg;
      border-bottom-right-radius: 7px;
      border-top-right-radius: 7px;
      input{
        height: 100%;
        padding: 0 0 0 20px;
        background-color: @placeholderBg;
      }
      input::-webkit-input-placeholder { /* WebKit browsers */
        color: @placeholder;
      }
      input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: @placeholder;
      }
      input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: @placeholder;
      }
      input:-ms-input-placeholder { /* Internet Explorer 10+ */
        color: @placeholder;
      }
    }

    .border{
      border-bottom-left-radius: 7px;
      border-top-left-radius: 7px;
    }
    .mint-field-clear{
      color: black;
      margin-right: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
