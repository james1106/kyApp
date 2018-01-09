import axios from 'axios'
import qs from 'qs'

// 配置域名
// export const url = 'http://testnewx1.kuan1.cn';       // 测试环境
// export const url = 'http://x1test.kuan1.cn';      // 开发环境
export const url = 'http://fu.kuan1.cn';           // 正式环境
// export const url = 'http://yk.com';           // 本地环境

// axios.defaults.withCredentials = true;

axios.defaults.baseURL = url;

// 延迟时间
let timeOut = {timeout: 1000 * 60};

// 获取秘钥键值对
export const AccessKey  = params => { return axios.get(`/app/api/getAppId`,qs.stringify(params),timeOut).then(res => res.data); };

// 轮询获取语音通道信息
export const PollingMessage  = params => { return axios.post(`/app/api/getOrderBulletin`,qs.stringify(params),timeOut).then(res => res.data); };

// 轮询上报消息通报
export const ReportNews  = params => { return axios.post(`/app/api/delBulletin`,qs.stringify(params),timeOut).then(res => res.data); };

// 登录
export const Login  = params => { return axios.post(`/app/api/login`,qs.stringify(params),timeOut).then(res => res.data); };

// 获取语音通报列表
export const VoiceNotificationList  = params => { return axios.post(`/app/api/getOrderList`,qs.stringify(params),timeOut).then(res => res.data); };

// 获取百度access_token
export const getBaiDuAccess_token  = params => { return axios.get(`https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=YgGVPHKOcF2esszimFcd6tLh&client_secret=10V7cp2p9vLPLuFgO5UMRb4G3mB23ZrO`).then(res => res.data); };

// 设置密码接口
export const setPassword  = params => { return axios.post(`/app/password/setpassword`,qs.stringify(params),timeOut).then(res => res.data); };

// 忘记密码 -> 获取图片验证码
export const getImgCode  = params => { return axios.post(`/app/password/validateimg`,qs.stringify(params),timeOut).then(res => res.data); };

// 校验图片验证码
export const verifyImgCode  = params => { return axios.post(`/app/password/checkcode`,qs.stringify(params),timeOut).then(res => res.data); };

// 发送手机验证码
export const sendPhoneCode  = params => { return axios.post(`/app/password/mobilevalidatecode`,qs.stringify(params),timeOut).then(res => res.data); };

// 找回密码接口
export const findBackPassword  = params => { return axios.post(`/app/password/setmobilepassword`,qs.stringify(params),timeOut).then(res => res.data); };

// 获取门店信息
export const getStores  = params => { return axios.post(`/app/index.php?controller=api&action=getStores`,qs.stringify(params),timeOut).then(res => res.data); };



// ----------------   -------------- //

// 基础信息 -> 门店信息、员工信息（这期没有）、支付方式、订单状态
export const baseMsg  = params => { return axios.post(`/app/order/getbaseinfo`,qs.stringify(params),timeOut).then(res => res.data); };

// 对账详情页
export const accountCheckDetail  = params => { return axios.post(`/app/order/getaccount`,qs.stringify(params),timeOut).then(res => res.data); };

// 订单数据
export const orderMsg  = params => { return axios.post(`/app/order/getorder`,qs.stringify(params),timeOut).then(res => res.data); };

// 订单详情页
export const orderDetail  = params => { return axios.post(`/app/order/getorderdetails`,qs.stringify(params),timeOut).then(res => res.data); };
