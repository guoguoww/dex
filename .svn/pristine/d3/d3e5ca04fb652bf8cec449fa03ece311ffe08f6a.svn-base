<template>
    <div class="changeBG">
      <div class="head">
        <i class="iconfont icon-fanhui" @click="back"></i>
        <span>充值</span>
      </div>
      <div class="rechargeC">
        <div class="selBZ">
          <p @click="changBZ"><span ref="selType">请选择币种</span><i class="iconfont icon-xiasanjiao"></i></p>
        </div>
        <ul class="hidLists" v-show="hidState">
          <!--<li v-for="(item,index) of hidInfos" @click="changTxt(item)">{{item}}</li>-->
          <li v-for="item in $store.getters.currency.params" @click="changTxt(item.code)">{{item.code}}</li>
        </ul>
        <div class="ewmCode">
          <div class="imgContainer" v-show="isShow"><img :src="ewmUrl" alt=""></div>
          <p class="saveEwm">保存二维码</p>
          <input class="imgAddrUrl" v-model="imgAddrUrl">
          <p class="fzAddr" @click="copyAddr">复制地址</p>
        </div>

      </div>
      <div class="alertInfos">
        <div>
          <p>注意:</p>
          <p>①请勿向上述地址充值任何非请选择币种资产,否则资产将不可找回。</p>
          <p>②您充值至上述地址后,需要整个网络节点的确认,在此过程中请耐心等待。</p>
          <p>③最小充值金额: <span>{{minRechargMoney}}</span> ,小于最小金额的充值将不会上账且无法退回。</p>
          <p>④您的充值地址不会经常改变,可以重复充值;如有更改,我们会尽量通过网站公告或邮件通知您。</p>
        </div>
        <div class="rechargeNum">
          <p><span>数量: </span><input type="number" v-model="reNum" placeholder="请输入充值数量"></p>
        </div>
        <div class="confirmRecharge" @click="confirmR"><span>确认</span></div>
      </div>
      <p class="rechargeHistory"><router-link :to="{path:'history',query:{type:'0'}}" tag="span">充币记录</router-link></p>
    </div>
</template>

<script>
    export default {
      name: "moneyIn",
      data(){
        return {
          hidState: false,
          // hidInfos: [ 'USDT', 'BTC', 'ETH'],
          reNum: '',
          ewmUrl: '',
          isShow: false,
          imgAddrUrl: '',
          minRechargMoney: '请选择币种',
        }
      },
      methods: {
        back(){
          this.$router.go(-1);
        },
        changBZ(){
          this.hidState = this.hidState == true? false: true;
          this.reNum = '';
        },
        changTxt(txt){
          this.$refs.selType.innerHTML = txt;
          this.hidState = false;
          this.getRechargeMinMoney();//获取最小充值金额
          this.getQueryQrcode();//调用查询二维码
        },
        confirmR(){//确认充值按钮
          if(this.$refs.selType.innerHTML == '请选择币种') {
            this.$toast('请选择币种');
          }else if(!this.reNum) {
            this.$toast('请选择充值数量');
          }else {//调用充值的接口
            this.getRecharge();
          }
        },
        getRecharge(){//充值的接口
          this.$axios({
            url: '/api/wallet/recharge',
            method: 'post',
            params:{
              currencyCode: this.$refs.selType.innerHTML,
              number: this.reNum,
            },
          })
            .then(res => {
              if(res.data.errorCode === 0){
                this.$toast(res.data.errorMsg);
                this.reNum = '';
              }else {
                this.$toast(res.data.errorMsg);
              }
            })
            .catch(err => {
              this.$toast(err.data.errorMsg);
            })
        },
        getQueryQrcode(){//查询充值二维码
          this.$axios({
            url: '/api/wallet/query/qr_code',
            method: 'post',
            data:{
              currencyCode: this.$refs.selType.innerHTML,
            },
          })
            .then(res => {
              if(res.data.errorCode === 0){
                //查询成功后返回的数据再调用生成图片的接口
                if(res.data.data && res.data.data.length !== 0){
                  this.imgAddrUrl = res.data.data.address;
                  this.getImage(res.data.data.qrCodeImage);
                }else {
                  // this.$toast('接口无数据');
                }

              }else {
                this.$toast(res.data.errorMsg);
              }
            })
            .catch(err => {
              this.$toast(err.data.errorMsg);
            })
        },
        getRechargeMinMoney(){//获取最小充值金额
          this.$axios({
            url: '/api/trade/currency_list',
            method: 'post',
          })
            .then(res => {
              if(res.data.errorCode === 0){
                if(res.data.data && res.data.data.length !== 0){
                  res.data.data.forEach((item,index) => {
                    if(item.code == this.$refs.selType.innerHTML){
                      this.minRechargMoney = item.rechargeMin;
                    }
                  })
                }else {
                  // this.$toast('数据为空');
                }
              }else {
                this.$toast(res.data.errorMsg);
              }
            })
            .catch(err => {
              this.$toast(err.data.errorMsg);
            })
        },
        getImage(imgId){//获取图片的base64的接口
          this.$axios.get('/api/image/'+ imgId)
            .then(res => {
              if(res.data){
                this.isShow = true;
                this.ewmUrl = res.data;
              }else {
                this.$toast('无base64返回')
              }

            })
            .catch(err => {

            })
        },
        copyAddr(){//点击复制地址
            try{
              if(document.execCommand('copy', false, null)){
                  //success info
                  let oInput = document.createElement('input');
                  oInput.value = this.imgAddrUrl;
                  document.body.appendChild(oInput);
                  oInput.select(); // 选择对象
                  document.execCommand("Copy"); // 执行浏览器复制命令
                  oInput.className = 'oInput';
                  oInput.style.display='none';
                  this.$toast('复制成功');
              } else{
                  //fail info
                  this.$toast('复制失败,请长按手动复制地址');
              }
          } catch(err){
              //fail info
              this.$toast('复制失败,请长按手动复制地址');
          }
          
        }
      }
    }
</script>

<style scoped>
  .head {
    height: 4rem;
    background: #0088f1;
    color: #fff;
    text-align: center;
    padding: 0 1.2rem;
    line-height: 4rem;
    font-size: 1.2rem;
  }
  .head i {
    position: absolute;
    color: #fff;
    left: 1.2rem;
    font-size: 1.4rem;
  }
  .rechargeC {
    padding:  1.2rem;
    background: #fff;
  }
  .selBZ P {
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 2.5rem;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 1.1rem;
  }
  .selBZ i {
    font-size: 1rem;
    color: #7a7a7a;
  }
  .hidLists {
    margin-top: .5rem;
    padding: 0 1rem;
    line-height: 2.5rem;
    border: 1px solid #b3b2b2;
    font-size: 1rem;
    border-radius: 3px;
    box-shadow: 0 0.3rem 0.3rem #d5d4d4;
  }
  .alertInfos {
    padding: 0 2.5rem;
    background: #fff;
  }
  .alertInfos > div {
    color: red;
    line-height: 1.5rem;
    font-size: 1rem;
    letter-spacing: 2px;
    padding: 0.3rem;
  }
  .rechargeNum span{
    display: inline-block;
    margin-top: 1rem;
    color: #333 !important;
    font-size: 1.1rem;
  }
  .rechargeNum input {
    border: 1px solid #ddd;
    padding: .5rem;
    border-radius: .2rem;
    width: 80%;
    color: #333;
    font-size: 1rem;
  }
  .confirmRecharge {
    text-align: center;
    margin: auto;
    margin-top: 1rem;
    width: 80%;
  }
  .confirmRecharge span {
    display: inline-block;
    width: 40%;
    padding: .3rem 0;
    color: #fff;
    font-size: 1.2rem;
    background: #0088f1;
  }
  .ewmCode {
    background: #fff;
    margin-top: 1rem;
    text-align: center;
  }
  .ewmCode .saveEwm {
    line-height: 3rem;
    color: #0088f1;
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .ewmCode .fzAddr {
    line-height: 3rem;
    color: #0088f1;
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .rechargeHistory {
    background: #fff;
    text-align: center;
    color: #0088f1;
    line-height: 2rem;
    cursor: pointer;
    padding: .5rem;
    padding-bottom: 1rem;
    font-size: 1.2rem;
  }
  .imgContainer {
    width: 35%;
    margin: auto;
    padding: 1rem 0;
  }
  .imgContainer img {
    max-width: 100%;
  }
  .imgAddrUrl {
    font-size: 1rem;
    padding: .5rem 0 1.2rem 0;
  }
</style>
