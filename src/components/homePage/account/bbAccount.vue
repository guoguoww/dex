<template>
  <div class="changeBG">
    <div class="ccAccountC">
      <van-nav-bar
        title="币币账户"
        left-arrow
        @click-left="back"
      >
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>

      <div class="accountC">
        <div class="accountBg">
          <p class="tit">币币总资产折合 (USDT)</p>
          <div v-show="eyeOpen">
            <p class="totalM" ref="total">{{total | number}}</p>
            <p class="zhM"><span ref="changeH">≈ {{changeH | number}}</span> <span>CNY</span></p>
          </div>
          <div v-show="!eyeOpen">
            <p class="totalM" ref="total">******</p>
            <p class="zhM"><span ref="changeH">******</span> <span>CNY</span></p>
          </div>
        </div>
        <i class="iconfont icon-yanjing" @click="changeEyeOpen" v-show="eyeOpen"></i>
        <i class="iconfont icon-yanjing-bi" @click="changeEyeCl" v-show="!eyeOpen"></i>
      </div>

      <div class="acc_tab">
        <ul>
          <li v-for="(item,index) of accTabs" :key="index" @click="tiaoZhuan(item.txt)">
            <img :src="item.url" alt="">
            <p>{{item.txt}}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="accList">
      <div class="accTitle">
        <span>资产明细</span>
        <p>
        <i class="iconfont icon-duihao" @click="showInfo" v-if="unDuiHao"></i>
        <em @click="hideInfo" v-if="!unDuiHao"></em>隐藏 <span>0</span><span>余额</span>
        </p>
      </div>
      <ul class="accInfo" v-show="isShow">
        <li v-for="(item, index) of accInfos" :key="index">
          <span>{{item.currencyCode}}</span>
          <span>{{item.amount}}</span>
          <span>冻结：{{item.frozenAmount}}</span>
        </li>
      </ul>
    </div>
    <!--<div class="more" v-show="noData">-->

      <!--<span>没有更多数据</span>-->

    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "bbAccount",
    data(){
      return {
        eyeOpen: this.toBool(localStorage.getItem('eyeState2')),
        isShow: true,
        unDuiHao: false,
        accTabs: [
          {url: require('../images/recharge.png'), txt: '充值'},
          {url: require('../images/cash.png'), txt: '提现'},
          {url: require('../images/account.png'), txt: '资产划转'},
          {url: require('../images/check.png'), txt: '币币账单'},
        ],
        accInfos: [],
        curBZ: '',//当前币种
        total: 0.0000,
        changeH: 0.00,
        noData: true,
      }
    },
    mounted(){
      this.curBZ = this.$route.query.curTypeNum;//获取当前币种的账户类型

      this.assetDetail();//进入币币账户获取资产明细
      this.getSurveyQuery();//获取资产概况查询
    },
    methods: {
      toBool(val){//转换布尔值函数
        if ("false" === val)
          return false;
        else
          return val;

      },
      back(){
        this.$router.go(-1);
      },
      changeEyeOpen(){
        localStorage.setItem('eyeState2','false');
        this.eyeOpen = this.toBool(localStorage.getItem('eyeState2'));
      },
      changeEyeCl(){
        localStorage.setItem('eyeState2','true');
        this.eyeOpen = this.toBool(localStorage.getItem('eyeState2'));
      },
      showInfo(){
        this.unDuiHao = false;
        this.isShow = true;
      },
      hideInfo(){
        this.unDuiHao = true;
        this.isShow = false;
      },
      tiaoZhuan(txt){
        switch (txt) {
          case '充值':
            this.$router.push('moneyIn');
            return;
          case '提现':
            this.$router.push('moneyOut');
            return;
          case '资产划转':
            this.$router.push({path: '/assetTransfer',query: {curType: '1'}});
            return;
          case '币币账单':
            this.$router.push('bbBills');
            return;
        }
      },
      assetDetail(){//获取c2c账户获取资产明细
        this.$axios({
          url: 'api/assets/query',
          method: 'post',
          headers: {"Content-Type": "application/json;charset=utf-8"},
          params: {
            type: '1'
          }
        })
          .then(res => {
            if(res.data.errorCode === 0){
              if(res.data.data.length !== 0){
                this.accInfos = res.data.data;
              }else {
                this.$toast('资产明细数据列表为空');
              }
            }else {
              this.$toast(res.data.errorMsg);
            }
          })
          .catch(err => {
            this.$toast(err.data.errorMsg);
          })
      },
      getSurveyQuery(){//获取资产概况查询
        this.$axios({
          url: '/api/assets/survey/query',
          method: 'post',
        })
          .then(res => {
            if(res.data.errorCode === 0){
              if(res.data.data.length !== 0){
                res.data.data.forEach((item,index) => {
                  if(item.assetsType == this.curBZ){
                    this.total = item.btc;
                    this.changeH = item.cny;
                  }
                })
              }else {
                // this.$toast('没有更多数据');
              }
            }else {
              this.$toast(res.data.errorMsg);
            }
          })
          .catch(err => {
            this.$toast(err.data.errorMsg);
          })
      },
    },
    filters: {
      //保留2位小数点过滤器 不四舍五入
      number(value) {
        var toFixedNum = Number(value).toFixed(3);
        var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        return realVal;
      }
    },
  }
</script>

<style scoped>
  .ccAccountC {
    background: #f0f0f0;
    padding-bottom: .6rem;
  }
  .accountC {
    padding: 0 1.2rem;
    background: #fff;
    position: relative;
  }
  .accountC div.accountBg {
    background: url("../images/bb.png") no-repeat 0 0;
    background-size: 100% 100%;
    color: #fff;
    height: 8rem;
    border-radius: .5rem;
    text-align: center;
  }
  .accountBg .tit {
    font-size: 1rem;
    padding-top: 1rem;
    color: #d4e9ff;
  }
  .accountBg .totalM {
    font-size: 1.3rem;
    padding-top: 1rem;
    font-weight: bold;
    color: #fff;
  }
  .accountBg .zhM {
    font-size: 1rem;
    padding-top: .98rem;
    color: #d4e9ff;
  }
  .accountC i {
    position: absolute;
    right: 2rem;
    top: .4rem;
    color: #fff;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .acc_tab {
    padding: 0 1.2rem;
    background: #fff;
  }
  .acc_tab ul {
    display: flex;
    justify-content: space-between;

  }
  .acc_tab ul li {
    padding: 1.4rem 0;
    flex: 1;
    text-align: center;
  }
  .acc_tab ul li img {
    max-width: 100%;
    height: 2.1rem;
    vertical-align: bottom;
  }
  .acc_tab ul li p {
    font-size: 1rem;
    padding-top: 0.4rem;
    color: #787878;
  }
  .accList {
    padding: 0 1.2rem;
    background: #fff;
  }
  .accTitle {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ececec;
    font-size: 1rem;
    color: #787878;
    height: 2.6rem;
    line-height: 2.6rem;
  }
  .accInfo li{
    display: flex;
    justify-content: space-between;
    height: 2.6rem;
    border-bottom: 1px solid #ececec;
    line-height: 2.6rem;
    color: #787878;
    padding: 0 .3rem;
    font-size: 1rem;
  }
  .accInfo li span{
    display: inline-block;
    width: 33%;
    color: #000;
    text-align: center;
  }
  .accInfo li span:first-child{
    width: 20%;
    text-align: left;
  }
  .accInfo li span:last-child {
    text-align: right;
  }
  .accTitle em {
    display: inline-block;
    width: .6rem;
    height: .6rem;
    border: 1px solid #787878;
    margin-right: .5rem;
    vertical-align: middle;
  }
  .accTitle i {
    border: 1px solid #787878;
    font-size: .8rem;
  }
  .more {
    font-size: 1rem;
    text-align: center;
    padding-top: .5rem;
  }

</style>
