<template>
    <div class="changeBG">
      <div class="head">
        <i class="iconfont icon-fanhui" @click="back"></i>
        <span>币币账单</span>
      </div>
      <div class="tabContent" >
        <ul class="bbListTit">
          <li>
            <span>时间</span>
            <span>交易币种</span>
            <span>方向</span>
            <span>类型</span>
            <span>单价</span>
            <span>数量</span>
            <span>总价</span>
          </li>
        </ul>
      </div>
      <div>
        <van-list v-model="loading" :finished="finished" :immediate-check="immediateCheck"  @load="onLoad">
          <van-cell v-for="(item,index) in bbListInfos" :key="index">
            <ul class="bbListInfo">
              <li>
                <span>{{item.createTime}}</span>
                <span>{{item.symbol}}</span>
                <span>{{item.direction == '0'?'买入':item.direction == '1'?'卖出':'无效方向'}}</span>
                <span>{{item.orderType == '0'?'市价':item.orderType == '1'?'限价':'无效类型'}}</span>
                <span>{{item.unitPrice}}</span>
                <span>{{item.orderQuantity}}</span>
                <span>{{item.orderPrice}}</span>
              </li>
            </ul>
          </van-cell>
        </van-list>
      </div>
      <div class="more" v-show="noData">

        <span>没有更多数据</span>

      </div>
    </div>
</template>

<script>
    export default {
      name: "flow",
      data(){
        return {
          bbListInfos: [],
          loading: false,
          finished: false,
          startPage: -10, //起始页码
          rows: 10,
          immediateCheck: false,
          totalPageNum: 0,//数据总条数据
          noData: true,
        }
      },
      mounted(){
        //获取币币委托查询列表
        this.getBbQueryEntrust();
      },
      methods: {
        back(){
          this.$router.go(-1);
        },
        getBbQueryEntrust(){//获取币币委托查询列表
          this.startPage += this.rows;
          this.$axios({
            url: '/api/trade/coin/query_entrust',
            method: 'post',
            data: {
              start: this.startPage,
              rows: this.rows,
              status: '1'
            }
          })
            .then(res => {
              if(res.data.errorCode === 0){
                if(res.data.page.data.length !== 0){
                  this.loading = false;

                  this.bbListInfos = this.bbListInfos.concat(res.data.page.data);

                  this.totalPageNum = res.data.page.total;

                  if (this.bbListInfos.length >= this.totalPageNum) {
                    this.finished = true;
                    // this.$toast('没有更多数据了');

                    return;
                  }

                }else {
                  // this.$toast('暂时无数据');
                }
              }else {
                this.$toast(res.data.errorMsg);
              }
            })
            .catch(err => {
              this.$toast(err.data.errorMsg);
            })
        },
        onLoad() {//上拉加载,下拉刷新
          setTimeout(() => {

            this.getBbQueryEntrust();

          }, 500);
        },
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
  .bbListTit, .bbListInfo{
    padding: .5rem 1.2rem;
  }
  .bbListTit li, .bbListInfo li {
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    align-items: center;
  }
  .bbListTit li span, .bbListInfo li span{
    width: 14%;
    text-align: center;
  }
  .bbListTit li span:first-child, .bbListInfo li span:first-child{
    text-align: left;
  }
  .bbListTit li span:last-child, .bbListInfo li span:last-child{
    text-align: right;
  }
  .van-cell {
    padding: 10px 0;
  }
  .more {
    font-size: 1rem;
    text-align: center;
    padding-top: .5rem;
  }
</style>
