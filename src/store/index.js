import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const state = {
  isShowTabbar: true
};

const actions = {
  changeTabbarShow({commit,state}, value){

    console.log('actions');
    commit('changeTabbarShow');
  }
};

const getters = {
  isShowTabbar(state){
    return state.isShowTabbar;
  }
};

const mutations = {
  changeTabbarShow(state, value){
    state.isShowTabbar = value;
  }
};


export default new vuex.Store({
  state,
  actions,
  getters,
  mutations
})
