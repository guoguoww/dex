<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="申请交易员" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <ol>
        <li>
          <h6> 步骤一：按要求准备下述材料</h6>
          <p> 1.请下载《申请资料模板》，按要求填写申请资料。</p>
        </li>
        <li>
          <h6> 步骤二：发送申请邮件</h6>
          <p> 请将以上申请资料发送邮件至 <mark>{{traderParams.email}}</mark>，邮件主题为“申请成为交易员”</p>
        </li>
        <li>
          <h6> 步骤三：提交申请</h6>
          <p> 发送邮件后，请在本页面点击“确认申请”按钮，提交申请。并同意冻结 <mark>{{traderParams.freezeMoney}}个{{traderParams.currencyCode}}</mark>作为交易员保证金。提交完成后，您即可发布广告。</p>
        </li>
        <li>
          <h6> 步骤四：资料审核</h6>
          <p> 我们将在72小时内对您的申请资料进行审核，请保持通讯畅通，我们会主动与您取得联系。</p>
        </li>
      </ol>

      <div class="btns">
        <div class="checkbox" v-if="!userData.applyTraderStatus || userData.applyTraderStatus === '3'">
          <van-checkbox v-model="agreed">同意冻结 <mark>{{traderParams.freezeMoney}}个{{traderParams.currencyCode}}</mark>作为保证金</van-checkbox>
        </div>
        <div class="apply" v-if="userData.applyTraderStatus === '0' || userData.applyTraderStatus === '1'">
          <span>已申请 正在审核</span>
        </div>
        <div class="apply" v-if="userData.applyTraderStatus === '2'">
          <span>您已是交易员</span>
        </div>
        <div class="apply" v-if="agreed === false && (userData.applyTraderStatus === '0' || userData.applyTraderStatus === '3')">
          <span>申请</span>
        </div>
        <div class="apply agreed" v-if="agreed && (!userData.applyTraderStatus || userData.applyTraderStatus === '3')" @click="applyFor()">
          <span>申请</span>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: "traders",
    data() {
      return {
        agreed: false,
        userData: {},
        traderParams: {}, //申请交易员条件
      }
    },
    created() {
      this.getUserData();
      this.getTraderParams()
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
  //
      getTraderParams() {
        this.$axios.post("/api/user/traderparams")
          .then(res => {
            // console.log(res)
            if(res.data.errorCode === 0) {
              this.traderParams = res.data.data;
            }
          })
      },
      applyFor() {
        this.$axios.post("/api/user/applytrader")
          .then(res => {
            if(res.data.errorCode === 0) {
              this.$dialog.alert({
                message: '申请成功 请等待审核结果'
              }).then(() => {
                this.$router.push('/user')
              });
            }
          }).catch(err => {

        });
      }
    },
  }
</script>

<style scoped>
  mark {
    background: #0088f1;
    color: #fff;
  }
  ol {
    padding: 1rem 1rem 0;
  }
  ol li {
    margin-bottom: 2rem;
  }
  ol li h6 {
    font-size: 1.25rem;
    font-weight: normal;
    height: 2rem;
    line-height: 2rem;
  }
  ol li p {
    font-size: 1.2rem;
  }
  /*按钮*/
  .btns {
    text-align: center;
  }
  .btns .checkbox {
    line-height: 3rem;
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  .btns .apply {
    width: 60%;
    height: 4rem;
    line-height: 4rem;
    background: #fff;
    text-align: center;
    color: #b4b4b4;
    font-size: 1.4rem;
    border: 1px solid #ccc;
    margin: 0 auto;
  }
  .btns .agreed {
    background: #0088f1;
    color: #fff;
  }
</style>
