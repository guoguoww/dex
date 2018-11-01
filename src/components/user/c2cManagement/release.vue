<template>
  <div class="changeBG">
    <!--头部-->
    <van-nav-bar title="发布交易广告" left-text="返回" left-arrow @click-left="$back()">
      <van-icon class="iconfont icon-fanhui" slot="left" />
    </van-nav-bar>
    <!--发布广告-->
    <ul class="release_list">
      <li>
        <select name="" v-model="subData.direction">
          <option value="0">买入</option>
          <option value="1">卖出</option>
        </select>
      </li>
      <li>
        <select name="" v-model="subData.currencyCode">
          <!--<option value="USDT">USDT</option>-->
          <!--<option value="BTC">BTC</option>-->
          <!--<option value="ETH">ETH</option>-->
          <option v-for="item in $store.getters.currency.params"  :value="item.code">{{item.code}}</option>
        </select>
      </li>
      <li>
        <input type="text" placeholder="请输入价格"  v-model="subData.price">
      </li>
      <li>
        <input type="text" placeholder="请输入数量" v-model="subData.number">
      </li>
      <li class="clearfix">
        <span class="fl">实际上架数量：{{subData.direction === '0'?  subData.number : (subData.number - (subData.number * freezingRate)).toFixed(2)}}</span>
        <span class="fr">冻结：{{subData.direction === '0'?  '0' : (subData.number * freezingRate).toFixed(2)}}</span>
      </li>
      <li>
        <input type="text" placeholder="请输入限额：如120-50000" v-model="limit">
      </li>
      <!--<li>-->
      <!--<p>选择交易用户</p>-->
      <!--<select name="" v-model="subData.dealerStatus">-->
      <!--<option value="0">普通认证用户</option>-->
      <!--<option value="1">高级认证用户</option>-->
      <!--</select>-->
      <!--</li>-->
      <li v-if="subData.direction === '1'">
        <p>选择支付方式（可以多个）</p>
        <v-select multiple v-model="selected" :options="options"></v-select>
      </li>
    </ul>

    <!--按钮组-->
    <div class="btns">
      <button class="cancel" @click="$back()">取消</button>
      <button class="submit" @click="releaseData()">提交</button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "release",
    data() {
      return {
        selected: [],
        options: [
          // {id: '1', label: '支付宝'},
          // {id: '2', label: '微信'},
          // {id: '3', label: '银行卡'},
        ],
        limit: '', //限额
        freezingRate: 0, //冻结率
        subData: { //初始默认上传数据
          currencyCode: 'USDT', //币种
          direction: '0', //方向 0 买入 1 卖出 ,
          maxQuota: '', //最大限额
          minQuota: '', //最小限额
          number: '' , //总数量
          // dealerStatus: '0', //交易用户
          payType: '', //收款方式
          price: '', //价格
        }
      }
    },
    created() {
      this.getPayList()
      this.getFreezingRate()
    },
    methods: {
      getFreezingRate() { //获取冻结比例
        this.$axios({
          url: "/api/advertisement/freeze_ratio",
          method: "post",
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.freezingRate = Number(res.data.data)
          }
        })
      },
      getPayList() { //获取支付列表
        this.$axios({
          url: "/api/user/paymentreceived",
          method: "post",
          params: {
            start: 0,
            rows: 100,
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            for(var i=0; i<res.data.page.data.length;i++) {
              switch (res.data.page.data[i].type) {
                case '0':
                  res.data.page.data[i].type = '支付宝'
                  break;
                case '1':
                  res.data.page.data[i].type = '微信'
                  break;
                case '2':
                  res.data.page.data[i].type = '银行卡'
                  break;
              }
              this.options.push({
                id: res.data.page.data[i].id,
                label: res.data.page.data[i].type + ':' + res.data.page.data[i].account,
              })
            }
          }
        })
      },

      releaseData() { //发布
        var rsg = /^[1-9]\d*-{1}[1-9]\d*$/   //验证限额格式
        if(this.subData.price === '') {
          this.$toast('请输入价格');
          return;
        }
        if(this.subData.number === '') {
          this.$toast('请输入数量');
          return;
        }
        if(this.limit === '') {
          this.$toast('请输入限额');
          return;
        }
        if(rsg.test(this.limit)) {
          this.subData.minQuota = this.limit.split('-')[0];
          this.subData.maxQuota = this.limit.split('-')[1];
          if(parseInt(this.subData.minQuota) > parseInt(this.subData.maxQuota)) {
            this.$toast('最小限额不能大于最大限额');
            return;
          }
        }else {
          this.$toast('限额格式不正确 正确格式:(例)120-50000');
          return;
        }
        if(this.subData.direction === '1') {
          if(this.selected.length === 0) {
            this.$toast('请选择支付方式');
            return;
          }else {
            var a = '';
            var that = this
            this.selected.forEach(function (item,i) {
              if((i +1) === that.selected.length){
                a += item.id;
              }else {
                a += (item.id + ',');
              }
            })
            this.subData.payType = a;
          }
        }else {
          this.subData.payType = '';
        }

        this.$axios({
          url: "/api/advertisement/release",
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          data: this.subData,
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$dialog.confirm({
              message: '发布成功',
              confirmButtonText: '查看广告列表',
              cancelButtonText: '继续发布',
            }).then(() => {
              this.$router.push('/myAdvertising') //跳转支付列表
            }).catch(() => { //继续发布 初始化页面
              this.getPayList();

              this.subData.currencyCode = 'USDT'; //币种初始化
              this.subData.direction = '0'; //方向初始化
              this.limit = ''; //限额初始化
              this.subData.maxQuota = ''; //最大限额初始化
              this.subData.minQuota = ''; //最小限额初始化
              this.subData.number = ''; //总数量初始化
              this.subData.payType = ''; //收款方式初始化
              this.subData.price = ''; //价格初始化
              // this.subData.dealerStatus = '0'; //交易用户初始化
              this.selected = []; ////收款方式页面初始化
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  /*发布交易信息*/+
  .release_list {
    padding: 0 1rem;
  }
  .release_list li {
    margin: 1.5rem;
  }
  .release_list li p {
    line-height: 2.4rem;
  }
  .release_list li select {
    width: 100%;
    height: 2.4rem;
    outline: 0;
    border: 1px solid #d9d9d9;
  }
  .release_list li select:focus {
    outline: 0;
  }
  .release_list li input {
    border: 1px solid #d9d9d9;
    width: calc(100% - 0.5rem);
    height: 2.4rem;
    padding-left: 0.4rem;
  }

  /*按钮组*/
  .btns {
    margin: 4rem 0 0;
    text-align: center;
  }
  .btns button {
    width: 8rem;
    height: 2.4rem;
    line-height: 2.4rem;
    margin: 0 0.8rem;
  }
  .btns .submit {
    background: #0088f1;
    color: #fff;
  }
</style>
