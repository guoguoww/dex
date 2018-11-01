import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios";
import cookie from "../../static/js/cookie";
// 首页
const HomePage = () =>import ('../components/homePage/HomePage')
const ccAccount = () => import('../components/homePage/account/ccAccount')
const conAccount = () => import('../components/homePage/account/conAccount')
const bbAccount = () => import('../components/homePage/account/bbAccount')
const bbBills = () => import('../components/homePage/account/bbBills')
const ccBills = () => import('../components/homePage/account/ccBills')
const assetTransfer = () => import('../components/homePage/account/assetTransfer')
const moneyIn = () => import('../components/homePage/account/moneyIn')
const moneyOut = () => import('../components/homePage/account/moneyOut')
const conBills = () => import('../components/homePage/account/conBills')
const announceDetail = () => import('../components/homePage/account/announceDetail')
const ccOrderDetailInfo = () => import('../components/homePage/account/ccOrderDetailInfo')

//个人中心
const user = () => import('../components/user/user')
const certification = () => import('../components/user/certification/certification')
const identityCertification = () => import('../components/user/certification/identityCertification')
const seniorCertification = () => import('../components/user/certification/seniorCertification')
// c2c管理
const c2cMenu = () => import('../components/user/c2cManagement/c2cMenu')
const receivingAdd = () => import('../components/user/c2cManagement/receivingAdd')
const receiving = () => import('../components/user/c2cManagement/receiving')
const release = () => import('../components/user/c2cManagement/release')
const releaseDetails = () => import('../components/user/c2cManagement/releaseDetails')
const myAdvertising = () => import('../components/user/c2cManagement/myAdvertising')
const traders = () => import('../components/user/c2cManagement/traders')

// 充值币管理
const topupMenu = () => import('../components/user/topupManagement/topupMenu')
const walletAddress = () => import('../components/user/topupManagement/walletAddress')
const history = () => import('../components/user/topupManagement/history')

// 账号管理 /邀请推广 / 关于我们
const settings = () => import('../components/user/settings/settings')
const promote = () => import('../components/user/promote/promote')
const about = () => import('../components/user/about/about')

// 登录
const login = () =>import ('../components/login')
const register = () => import('../components/login/register')
const forget = () => import('../components/login/forget')
// 交易
const c2c = () =>import ('../components/transaction/c2c/index') //c2c交易
const buy = () => import('../components/transaction/c2c/buy') //c2c买入
const sell = () => import('../components/transaction/c2c/sell') //c2c卖出
const notice = () => import('../components/transaction/c2c/notice') //系统通知
// const state=()=>import ('../components/transaction/c2c/state');//订单状态

const coin = () =>import ('../components/transaction/coin/index') //币币交易
const current = () =>import ('../components/transaction/coin/current') //币币当前委托
const payment = () =>import ('../components/transaction/coin/payment') //币币资产管理
const tradehistory = () =>import ('../components/transaction/coin/tradehistory') //币币历史成交

const contract = () =>import ('../components/transaction/contract') //合约交易


// const compoents = () =>import ('../components/xxx')


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/ccAccount',
    name: 'ccAccount',
    component: ccAccount,
    meta: {
      auth: true,
    }
  },
  {
    path: '/conAccount',
    name: 'conAccount',
    component: conAccount,
    meta: {
      auth: true,
    }
  },
  {
    path: '/bbAccount',
    name: 'bbAccount',
    component: bbAccount,
    meta: {
      auth: true,
    }
  },
  {
    path: '/bbBills',
    name: 'bbBills',
    component: bbBills,
    meta: {
      auth: true,
    }
  },
  {
    path: '/ccBills',
    name: 'ccBills',
    component: ccBills,
    meta: {
      auth: true,
    }
  },
  {
    path: '/assetTransfer',
    name: 'assetTransfer',
    component: assetTransfer,
    meta: {
      auth: true,
    }
  },
  {
    path: '/moneyIn',
    name: 'moneyIn',
    component: moneyIn,
    meta: {
      auth: true,
      hidenav:true,//隐藏底栏
    }
  },
  {
    path: '/moneyOut',
    name: 'moneyOut',
    component: moneyOut,
    meta: {
      auth: true,
      hidenav:true,//隐藏底栏
    }
  },
  {
    path: '/conBills',
    name: 'conBills',
    component: conBills,
    meta: {
      auth: true,
    }
  },
  {
    path: '/announceDetail',
    name: 'announceDetail',
    component: announceDetail,
    meta: {
      hidenav:true,//隐藏底栏
    }
  },
  {
    path: '/ccOrderDetailInfo',
    name: 'ccOrderDetailInfo',
    component: ccOrderDetailInfo,
    meta: {
      auth: true,
      hidenav: true,//隐藏底栏
    }
  },
  {
    path: '/login',
    component: login,
    name: 'login',
    meta: {
      hidenav:true,//隐藏底栏
    }
  },
  {
    path: '/register/:id?',
    component: register,
    name: 'register',
    meta: {
      hidenav: true, //隐藏底栏
    }
  },
  {
    path: '/forget',
    component: forget,
    name: 'forget',
    meta: {
      hidenav: true, //隐藏底栏
    }
  },
  { //个人中心
    path: '/user',
    component: user,
    name: 'user',
    meta: {
      auth: true,
    }
  },
  { //认证中心
    path: '/certification',
    component: certification,
    name: 'certification',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //身份认证
    path: '/identityCertification',
    component: identityCertification,
    name: 'identityCertification',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //高级认证
    path: '/seniorCertification',
    component: seniorCertification,
    name: 'seniorCertification',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //c2c 管理
    path: '/c2cMenu',
    component: c2cMenu,
    name: 'c2cMenu',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //c2c 收付款设置
    path: '/receivingAdd',
    component: receivingAdd,
    name: 'receivingAdd',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //支付方式查看
    path: '/receiving',
    component: receiving,
    name: 'receiving',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //支付方式详情
    path: '/releaseDetails/:id',
    component: releaseDetails,
    name: 'releaseDetails',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //发布广告
    path: '/release',
    component: release,
    name: 'release',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //我的广告
    path: '/myAdvertising',
    component: myAdvertising,
    name: 'myAdvertising',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //申请交易员
    path: '/traders',
    component: traders,
    name: 'traders',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //充值币管理
    path: '/topupMenu',
    component: topupMenu,
    name: 'topupMenu',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //地址管理
    path: '/walletAddress',
    component: walletAddress,
    name: 'walletAddress',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //历史纪录
    path: '/history',
    component: history,
    name: 'history',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //账号管理
    path: '/settings',
    component: settings,
    name: 'settings',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //邀请推广
    path: '/promote',
    component: promote,
    name: 'promote',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //关于我们
    path: '/about',
    component: about,
    name: 'about',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  {//c2c
    path: '/c2c',
    component: c2c,
    name: 'c2c'
  },
  {//c2c买入
    path: '/buy/:id',
    component: buy,
    name: 'buy',
    meta: {
      auth: true,
      hidenav: true, //隐藏底栏
    }
  },
  { //c2c卖出
    path: '/sell',
    component: sell,
    name: 'sell'
  },
  { //系统通知
    path: '/notice',
    component: notice,
    name: 'notice',
    meta: {
      hidenav: true, //隐藏底栏
      auth:true
    }
  },

  {//币币
    path: '/coin',
    component: coin,
    name: 'coin'
  },
    { //币币当前委托
      path: '/current',
      component: current,
      name: 'current'
    },
  { //币币资产管理
    path: '/payment',
    component: payment,
    name: 'payment'
  },
  { //历史成交
    path: '/tradehistory',
    component: tradehistory,
    name: 'tradehistory'
  },

  {//合约
    path: '/contract',
    component: contract,
    name: 'contract'
  },


]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  var userInfo = cookie.get('_auth') //router.app.$cookie.get('_auth') //JSON.parse(localStorage.getItem('userInfoStorage'));
//
//
// 跳转路由时判断版本号
axios.get('./static/version.json?_=' + Math.random()).then(response => {
  if (200 == response.status) {
    // console.warn( process.env.VERSION, response.data.version,1111111111111);
    if (process.env.VERSION !== response.data.version) {
      // alert('版本更新');
      // console.warn(`上次版本${process.env.VERSION} 新版本${response.data.version}`)
      if (process.env.NODE_ENV == "development") {
        next();
        return
      }
      window.location.reload(true);
      return;
    }
    next();
  }
}).catch(err => {
  console.error(err);
  next();
});

  if (to.meta.auth) { //判断需不需要登录验证
    if (userInfo) { //有没有用户信息
      next()
    } else { //没有跳到登录页
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else if (to.name === 'login') { //判断进入的地址是不是登录页
    if (userInfo) { //有没有用户信息 有就返回首页 没有就进
      next()
    } else {
      next()
    }
  } else {
//
    next()
  }
//
})

export default router
