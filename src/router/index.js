import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    /********************* 管钱 ************************/
    {
      path: '/purseStrings',
      name: 'purseStrings',
      meta: { isShowTabbar: true },
      component: function (resolve) {
        require(['../components/purseStrings/Index.vue'], resolve)
      }
    },
    // 收款
    {
      path: '/purseStrings/collectionMoney',
      name: 'collectionMoney',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/purseStrings/collectionMoney/Index.vue'], resolve)
      }
    },
    // 订单
    {
      path: '/purseStrings/order',
      name: 'order',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/purseStrings/order/Index.vue'], resolve)
      },
      children: [
        {
          path: '/purseStrings/order/takeOut',
          name: 'takeOut',
          meta: {isShowTabbar: false},
          component: function (resolve) {
            require(['../components/purseStrings/order/takeOut.vue'], resolve)
          },
        },
        {
          path: '/purseStrings/order/eatIn',
          name: 'eatIn',
          meta: {isShowTabbar: false},
          component: function (resolve) {
            require(['../components/purseStrings/order/eatIn.vue'], resolve)
          },
        }
      ]
    },
    // 对账
    {
      path: '/purseStrings/todayIncome',
      name: 'todayIncome',
      meta: { isShowTabbar: true },
      component: function (resolve) {
        require(['../components/purseStrings/todayIncome/Index.vue'], resolve)
      }
    },
    // 今日收入
    {
      path: '/purseStrings/reconciliation',
      name: 'reconciliation',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/purseStrings/reconciliation/Index.vue'], resolve)
      }
    },
    /********************* 管店 ************************/
    {
      path: '/keepShop',
      name: 'keepShop',
      meta: { isShowTabbar: true },
      component: function (resolve) {
        require(['../components/keepShop/Index.vue'], resolve)
      }
    },
    /********************* 管人 ************************/
    {
      path: '/conservator',
      name: 'conservator',
      meta: { isShowTabbar: true },
      component: function (resolve) {
        require(['../components/conservator/Index.vue'], resolve)
      }
    },
    /********************* 我的 ************************/
    {
      path: '/mine',
      name: 'mine',
      meta: { isShowTabbar: true },
      component: function (resolve) {
        require(['../components/mine/Index.vue'], resolve)
      }
    },
    // 营业信息
    {
      path: '/mine/businessMsg',
      meta: { isShowTabbar: true },
      component: function (resolve) {
        require(['../components/mine/businessMsg/Index.vue'], resolve)
      },
    },
    // 消息设置
    {
      path: '/mine/messageSet',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/mine/messageSet/Index.vue'], resolve)
      },
    },
    // 接收时段
    {
      path: '/mine/messageSet/receiveTime',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/mine/messageSet/receiveTime/Index.vue'], resolve)
      },
    },
    // 关于
    {
      path: '/mine/about',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/mine/about/Index.vue'], resolve)
      },
    },
    // 设置登录密码
    {
      path: '/mine/setPassword',
      name: 'setPassword',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/login/setPassword/Index.vue'], resolve)
      }
    },
    /********************* 登录 ************************/
    {
      path: '/login',
      name: 'login',
      meta: { isShowTabbar: false },
      component: function (resolve) {
        require(['../components/login/Index.vue'], resolve)
      }
    },
    //
    {
      path: '/login/signIn',
      name: 'signIn',
      meta: { isShowTabbar: false },
      component: function (resolve) {
        require(['../components/login/signIn/Index.vue'], resolve)
      }
    },
    // 找回密码
    {
      path: '/login/findPassword',
      name: 'findPassword',
      meta: { isShowTabbar: false },
      component: function (resolve) {
        require(['../components/login/findPassword/Index.vue'], resolve)
      }
    },
    // 激活员工
    {
      path: '/login/activateEm',
      name: 'activateEm',
      meta: { isShowTabbar: false },
      component: function (resolve) {
        require(['../components/login/activateEm/Index.vue'], resolve)
      }
    },

    /*{
      path: '/',
      component: function (resolve) {
        require(['../App.vue'], resolve)
      }
    },*/
    {
      path: '/',
      meta: { isShowTabbar: false },
      component: function (resolve) {
        require(['../components/login/Index.vue'], resolve)
      }
    },
    /********************* 消息 ************************/
    {
      path: '/purseStrings/message',
      name: 'message',
      meta: {isShowTabbar: false},
      component: function (resolve) {
        require(['../components/message/Index.vue'], resolve)
      }
    },
  ]
})


/**
 * 异步加载组件
 {
     path: '/somepath',
         component: function (resolve) {
     require(['./demos/somepath.vue'], resolve)
   }
 }*/
