import md5 from '../md5/index'
import store from '../../store'

function objKeySort(arys) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(arys).sort();
  //console.log('newkey='+newkey);
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for(var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}


function format(params) {
  var sign = '';
  params = objKeySort(params);
  for (var item in params) {
    sign += item + '=' + params[item] + '&';
  }
  sign = sign.substr(0,sign.length - 1);
  sign += localStorage.getItem('key');
  sign = md5(sign);
  params.sign = sign;
  return params;
}

var MyPlugin = {};

MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.prototype.formatParams = format;
};

export default MyPlugin;
