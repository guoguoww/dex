<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title=" c2c 收付款设置" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <!--上传内容-->
      <div class="receiving_con" v-if="uploadQrcode === false">
        <!--查看已有支付方式-->
        <div class="receiving_view clearfix" @click="viewReceiving(payList)">
          <p class="fl">已添加支付方式</p>
          <em class="fr">
            查看
            <i class="iconfont icon-jiantouarrow487 "></i>
          </em>
        </div>
        <!--添加-->
        <div class="receiving_add">
          <h6>添加支付方式</h6>
          <div class="receiving_type">
            <p>支付方式</p>
            <select v-model="typeDefault" @change="typeChage()" >
              <option v-for="item in typeList"  :value="item.value">{{item.name}}</option>
            </select>
          </div>
          <ul class="receiving_con_list">
            <li class="name">
              <p>姓名</p>
              <input class="readonly" type="text" name="name" value="" v-model="userData.chnName" readonly>
            </li>
            <li class="openBank" v-if="typeShift.openBank">
              <p>开户银行</p>
              <input type="text" value="" placeholder="请输入开户银行" v-model="payData.bankName">
            </li>
            <li class="openBranch" v-if="typeShift.openBranch">
              <p>开户支行</p>
              <input type="text" value="" placeholder="请输入详细具体支行" v-model="payData.openBankName">
            </li>
            <li class="account">
              <p>{{typeShift.typeName}}账号</p>
              <input type="text" value="" :placeholder="'请输入'+ typeShift.typeName +'账号'" v-model="payData.account">
            </li>
            <li class="twoPic" v-if="typeShift.twoPic">
              <p>二维码</p>
              <b @click="upload()">{{!!payData.image ? '上传成功' : '点击上传您的收款二维码图片'}}</b>
            </li>
            <li class="note">
              <p>备注</p>
              <input type="text" value="" placeholder="备注" v-model="payData.remark">
            </li>
          </ul>
        </div>
        <!--按钮组-->
        <div class="btns">
          <button class="cancel" @click="$back()">取消</button>
          <button class="submit" @click="submitData()">提交</button>
        </div>
      </div>

      <div class="uploadQrcode" v-if="uploadQrcode">
        <h6>上传二维码</h6>
        <ul>
          <li class="name">
            <p>姓名</p>
            <input class="readonly" type="text" name="name" value="" v-model="userData.chnName" readonly>
          </li>
          <li class="qrcode">
            <p>收款二维码</p>
            <div class="upload clearfix">
              <div class="fl uploadImg">
                <img id="qrcodePic" :src="!!payData.image ? payData.image : ''" v-preview="QrcodeImg" alt="">
              </div>
              <div class="fr uploadBtn" @change="changImg('qrcodePic', $event)">
                <span>上传图片</span>
                <input type="file" name="file" accept="image/*" >
              </div>
            </div>
          </li>
        </ul>
        <!--按钮组-->
        <div class="btns">
          <button class="cancel" @click="cencel()">取消</button>
          <button class="submit" @click="save()">保存</button>
        </div>
      </div>


    </div>
</template>

<script>
  export default {
    name: "receivingAdd",
    data() {
      return {
        userData: {}, //用户信息
        payList: {},
        uploadQrcode: false, //上传二维码页面显示
        QrcodeImg: '', //二维码图片
        typeDefault: '0',  //支付类型初始
        typeList: [ //支付类型选择
          {
            name: '支付宝',
            value: '0'
          },
          {
            name: '微信',
            value: '1'
          },
          {
            name: '银行卡',
            value: '2'
          },
        ],
        typeShift: { //支付方式转换 切换不同内容
          typeName: '支付宝', //类型账号
          twoPic: true, //二维码显示
          openBank: false, //开户银行选择显示
          openBranch: false, //开户支行填写显示
        },
        payData: {
          account: '', //账号
          bankName: '', //银行名称
          image: '', //二维码图片内容
          openBankName: '', //开户行支行地址
          remark: '', //备注
          type: '0', //收付款方式 0 支付宝 1 微信 2 银行卡
        }
      }
    },
    created() {
      this.getUserData();
      this.getPayList();
    },
    methods: {
      getUserData() {  //获取用户信息
        this.$axios.post("/api/user/query_active_user")
          .then(res => {
            if(res.data.errorCode === 0) {
              this.userData = res.data.data;
            }
          })
      },
      getPayList() { //获取支付列表
        this.$axios({
          url: "/api/user/paymentreceived",
          method: "post",
          params: {
            start: 0,
            rows: 10,
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.payList = res.data.page.total;
          }
        })
      },

      viewReceiving(num) { //查看收付款信息
        if(num === 0) {
          this.$toast('还没有支付方式 请先添加');
          return
        }
        if(num > 0) {
          this.$router.push({
            path: '/receiving',
          })
        }
      },

      upload() { //上传图片
        this.uploadQrcode = true;
      },
      cencel() { //取消上传图片
        this.uploadQrcode = false;
      },
      save() { //保存图片上传
        this.uploadQrcode = false;
        this.payData.image = this.QrcodeImg
      },

      typeChage() { //支付方式转换 切换不同内容
        if(this.typeDefault === '0') {
          this.typeShift.typeName = '支付宝';
          this.typeShift.twoPic = true;
          this.typeShift.openBank = false;
          this.typeShift.openBranch = false;
        }
        if(this.typeDefault === '1') {
          this.typeShift.typeName = '微信';
          this.typeShift.twoPic = true;
          this.typeShift.openBank = false;
          this.typeShift.openBranch = false;
        }
        if(this.typeDefault === '2') {
          this.typeShift.typeName = '银行卡';
          this.typeShift.twoPic = false;
          this.typeShift.openBank = true;
          this.typeShift.openBranch = true;
        }
        this.payData.account = ''; //账号初始
        this.payData.bankName = ''; //银行初始
        this.payData.image = ''; //二维码初始
        this.payData.openBankName = ''; //支行初始
        this.payData.remark = ''; //备注初始
        this.payData.type = this.typeDefault; //类型赋值
      },

      changImg(id, e) { //上传图片回显
        var that = this;
        var id = id
        for (var i = 0; i < e.target.files.length; i++) {
          var file = e.target.files.item(i);
          if (!(/^image\/.*$/i.test(file.type))) {
            continue; //不是图片 就跳出这一次循环
          }
          if(e.target.files[i].size > 5242880) { //大小不能超过5M
            this.$toast('海报大小不能超过5M');
            continue
          }
          //实例化FileReader API
          var freader = new FileReader();
          freader.readAsDataURL(file);
          freader.onload = function(e) {
            document.getElementById(id).setAttribute('src',e.target.result);
            that.QrcodeImg = e.target.result || ''
          }
        }
      },

      submitData() { //提交支付方式
        if(this.payData.account === '') {
          this.$toast('账号不能为空');
          return;
        }
        if((this.payData.type === '0' || this.payData.type === '1') && this.payData.image === '') {
          this.$toast('请上传二维码');
          return;
        }
        if(this.payData.type === '2' && this.payData.bankName === '') {
          this.$toast('银行名称不能为空');
          return;
        }
        this.$axios({
          url: "/api/user/addpaymentreceived",
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          data: this.payData
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$dialog.confirm({
              message: '添加成功',
              confirmButtonText: '查看支付列表',
              cancelButtonText: '继续添加',
            }).then(() => {
              this.$router.push('/receiving') //跳转支付列表
            }).catch(() => { //继续添加 初始化页面
              this.getUserData();
              this.getPayList();

              this.typeDefault = '0';
              this.typeShift.typeName = '支付宝';
              this.typeShift.twoPic = true;
              this.typeShift.openBank = false;
              this.typeShift.openBranch = false;

              this.payData.account = ''; //账号初始
              this.payData.bankName = ''; //银行初始
              this.payData.image = ''; //二维码初始
              this.payData.openBankName = ''; //支行初始
              this.payData.remark = ''; //备注初始
              this.payData.type = '0'; //类型赋值
            });
          }
        })
          .catch(err => {});
      },

    }
  }
</script>

<style scoped>
  .van-nav-bar {
    border-bottom: 4px solid #f7f8f9;
  }
  .receiving_con {
    padding: 0 1rem;
  }
  /*查看已有支付方式*/
  .receiving_con .receiving_view {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    border-bottom: 1px solid #d9d9d9;
  }
  .receiving_con .receiving_view em {
    color: #0088f1;
  }
  .receiving_con .receiving_view em i {
    color: #787878;
  }
  /*上传内容*/
  .receiving_con .receiving_add h6 {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    font-weight: normal;
    color: #676767;
  }
  /*支付方式*/
  .receiving_con .receiving_add .receiving_type,
  .receiving_con .receiving_add  .receiving_con_list{
    padding: 0 0.4rem;
  }
  .receiving_con .receiving_add .receiving_type p {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
  }
  .receiving_con .receiving_add .receiving_type select {
    width: 100%;
    height: 2.4rem;
    outline: 0;
    border: 1px solid #d9d9d9;
  }
  .receiving_con .receiving_add .receiving_type select:focus {
    outline: 0;
  }
  .receiving_con .receiving_add  .receiving_con_list li {
    padding: 0.4rem 0;
  }
  .receiving_con .receiving_add  .receiving_con_list li p {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
  }
  .receiving_con .receiving_add  .receiving_con_list li input {
    border: 1px solid #d9d9d9;
    width: calc(100% - 0.5rem);
    height: 2.4rem;
    padding-left: 0.4rem;
  }
  .receiving_con .receiving_add  .receiving_con_list li input[name='name'] {
    background: #ebebe4;
  }
  .receiving_con .receiving_add  .receiving_con_list li b {
    display: inline-block;
    border: 1px solid #d9d9d9;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    width: 100%;
    font-weight: normal;
  }

  /*上传二维码页面*/
  .uploadQrcode {
    padding: 0 1rem;
  }
  .uploadQrcode h6 {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    border-bottom: 1px solid #d9d9d9;
    font-weight: normal;
  }
  .uploadQrcode ul li {
    padding: 0.5rem 0 1.5rem;
    border-bottom: 1px dashed #969696;
  }
  .uploadQrcode ul li p {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
  }
  .uploadQrcode ul li input[name='name'] {
    border: 1px solid #d9d9d9;
    width: calc(100% - 0.5rem);
    height: 2.4rem;
    padding-left: 0.4rem;
    background: #ebebe4;
  }
  .uploadQrcode ul li .upload {
    display:flex;
    justify-content:center;
  }
  .uploadQrcode ul li .upload .uploadImg {
    width: 8rem;
    height: 11rem;
    padding: 0.5rem;
    border: 1px dashed #969696;
    overflow: hidden;
  }
  .uploadQrcode ul li .upload .uploadImg img {
    width: 100%;
  }
  .uploadQrcode ul li .upload .uploadBtn {
    width: 10rem;
    height: 3rem;
    position: relative;
    overflow: hidden;
    border: 1px solid #0088f1;
    border-radius: 10px;
    margin: auto 2rem;
  }
  .uploadQrcode ul li .upload .uploadBtn span {
    display: inline-block;
    width: 10rem;
    height: 3rem;
    line-height: 3rem;
    color: #0088f1;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
  }
  .uploadQrcode ul li .upload .uploadBtn input[name='file'] {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
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
