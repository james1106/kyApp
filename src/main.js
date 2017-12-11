// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
  Button,
  Cell,
  DatetimePicker,
  Header,
  Tabbar, TabItem,
  IndexList, IndexSection,
  Search,
  Popup,
  Picker,
  Field,
  Switch,
  TabContainer,TabContainerItem,
  Badge
} from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.css'



// mint-ui按需就不能使用use方式了->tip
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Search.name, Search);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Field.name, Field);
Vue.component(Switch.name, Switch);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Badge.name, Badge);

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  // 直接通过store.commit提交的事件不通过actions这一环节
  var isShowTabbar = false;
  if (to.matched[0]){
     isShowTabbar = to.matched[0].meta.isShowTabbar;
  }
  store.commit('changeTabbarShow', isShowTabbar);
  next() // 确保一定要调用 next()
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
