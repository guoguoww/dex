<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar :title="payType.type + '详情'" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>

      <div class="payType_con">
        <ul>
          <li class="clearfix">
            <span class="fl">姓名:</span>
            <p class="fl">{{payType.name}}</p>
          </li>
          <li class="clearfix">
            <span class="fl">{{payType.type}}:</span>
            <p class="fl">15706400209</p>
          </li>
          <li class="clearfix">
            <span class="fl">备注:</span>
            <p class="fl">{{!!payType.remark? payType.remark : '无'}}</p>
          </li>
          <li class="Img" v-if="!!payType.image">
            <img :src="!!payType.image? getimgs(payType.image) : ''" v-preview="getimgs(payType.image)" alt="">
          </li>
        </ul>
      </div>

    </div>
</template>

<script>
  export default {
    name: "releaseDetails",
    data() {
      return {
        payType: {},
        baseImg: ''
      }
    },
    computed: {
      router() { //根据hash值判断导航改变
        var routerId = this.$route.path.split('/')[2];
        return routerId;
      }
    },
    created() {
      this.getPayDetails()
    },
    methods: {
      getPayDetails() {
        console.log(location.host)
        this.$axios({
          url: "/api/user/findOnePaymentReceived",
          method: "get",
          params: {
            id: this.router
          },
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.payType = res.data.data;
            switch (this.payType.type) {
              case '0':
                this.payType.type = '支付宝'
                break;
              case '1':
                this.payType.type = '微信'
                break
              case '2':
                this.payType.type = '银行卡'
                break
            }
          }
        })
      },
      getimgs(id) {
        //获取图片
        this.$axios.get('/api/image/'+ id)
          .then(res => {
            this.baseImg = res.data
          })
        return this.baseImg
      },
    },
  }
</script>

<style scoped>
  .payType_con {
    padding: 0 1rem;
    border-top: 2px solid #f0f0f0;
  }
  .payType_con ul {
    margin: 1rem 0 0;
  }
  .payType_con ul li {
    padding: 1rem 0;
    font-size: 1.2rem;
    line-height: 2rem;
  }
  .payType_con ul li span {
    width: 18%;
  }
  .payType_con ul li p {
    width: 80%;
  }
  .payType_con ul li.Img {
    text-align: center;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  .payType_con ul li img {
    width: 60%;
  }
</style>
