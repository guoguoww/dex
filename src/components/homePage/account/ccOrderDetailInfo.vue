<template>
    <div class="changeBG">
      <van-nav-bar
        title="C2C详情"
        left-arrow
        @click-left="back"
      >
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <div class="detailContent">
        <p class="curOrderTit">当前订单详情：</p>
        <ul class="detailInfo">
          <li><span>交易方：</span><span>{{detailLists.nickName}}</span></li>
          <li><span>订单金额：</span><span>{{detailLists.orderPrice}}</span></li>
          <li><span>交易数量：</span><span>{{detailLists.orderQuantity}}</span></li>
          <li><span>付款参考号：</span><span>{{detailLists.id}}</span></li>
          <li><span>订单号：</span><span>{{detailLists.serialNo}}</span></li>
          <li><span>订单创建时间：</span><span>{{detailLists.createTime}}</span></li>
          <li><span>订单状态：</span><span>{{detailLists.status == '0'?'未付款':detailLists.status == '1'?'已付款':detailLists.status == '2'?'已完成':detailLists.status == '3'?'已取消':'无效状态'}}</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "conDetailInfo",
      data(){
        return {
          detailLists: {},
          nickName: this.$route.query.nickName,
        }
      },
      mounted(){
        this.getOrderInfo();
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        getOrderInfo(){
          this.$axios({
            url: '/api/trade/c2c/get_order',
            method: 'post',
            params: {
              tradeId: this.$route.query.ccListId,
            }
          })
            .then(res => {
              if(res.data.errorCode === 0){

                if(Object.keys(res.data.data).length!==0){
                  this.detailLists = res.data.data;
                }else {
                  this.$toast('详情数据为空');
                }
              }
            })
            .catch(err => {
              this.$toast(err.data.errorMsg);
            })
        }
      }
    }
</script>

<style scoped>
  .detailContent {
    padding: 1.2rem;
  }
  .curOrderTit {
    height: 3rem;
  }
  .detailInfo li {
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    line-height: 3;
    border-bottom: 1px solid #eee;
  }
</style>
