<template>
    <div class="changeBG">
      <van-nav-bar
        title="C2C账单"
        left-arrow
        @click-left="back"
      >
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>

      <div class="tabContent" >
        <van-tabs :active="active"  @click="tabClick" :swipe-threshold=5>
          <van-tab v-for="(item,index) of ccTites" :key="index">
            <div slot="title">{{item.tit}}</div>
            <van-list v-model="loading" :finished="finished" :immediate-check="immediateCheck"  @load="onLoad(index)">
              <van-cell v-for="(item,index) in allInfos" :key="index">
                <div>
                  <ul class="allLists">
                    <li>
                      <!-- <router-link  :to="{path:'ccOrderDetailInfo', query: {ccListId: item.id,nickName: item.nickName}}" tag="p"> -->
                      <a @click="godetails(item)">
                        <div><p><span>{{item.nickName}}</span></p><p><span>在线购买:</span><span>{{item.currency}}</span></p></div>
                        <div><p><span>订单号:</span><span>{{item.serialNo}}</span></p><p><span>交易状态：</span><span>{{item.status=='0'?'未付款':item.status=='1'?'已付款':item.status=='2'?'已完成':item.status=='3'?'已取消':'无效状态'}}</span></p></div>
                        <div><p><span>交易金额:</span><span>{{item.orderPrice}}</span></p><p><span>{{item.createTime}}</span></p></div>
                      </a>
                    </li>
                  </ul>
                </div>
              </van-cell>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
      <div class="more" v-show="noData">

        <span>没有更多数据</span>

      </div>
    </div>
</template>

<script>
    export default {
      name: "detailed",
      data(){
        return {
          active: 0,
          loading: false,
          finished: false,
          startPage: -10, //起始页码
          rows: 10,
          immediateCheck: false,
          totalPageNum: 0,//数据总条数据
          allInfos: [],
          unPayLists: [],
          curTNum: 0,
          ccTites: [
            {tit: '全部',state: 'Z'},
            {tit: '未付款',state: '0'},
            {tit: '已付款',state: '1'},
            {tit: '已完成',state: '2'},
            {tit: '已取消',state: '3'},
          ],
          noData: true,
        }
      },
      mounted(){
        //获取c2c全部数据
        this.getOrderQuery('Z');
      },
      methods: {
        godetails(item){//跳转订单详情 状态为未付款或已付款跳转结算页面    
          if (item.status==0||item.status==1) {
            this.$router.push(`/buy/${item.id}`)
            return
          }
          this.$router.push({
            path:'ccOrderDetailInfo', 
            query: {ccListId: item.id,nickName: item.nickName}
          })
        },
        back(){
          this.$router.go(-1);
        },
        getOrderQuery(state){
          this.startPage += this.rows;
          this.$axios({
            url: 'api/trade/c2c/order_query',
            method: 'post',
            headers: {
              "Content-Type": "application/json;"
            },
            params: {
              start: this.startPage,
              rows: this.rows,
              status: state
            }
          })
            .then(res => {
              if(res.data.errorCode === 0){
                if(res.data.page.data.length !== 0){
                  this.loading = false;
                  this.finished = false;

                  this.allInfos = this.allInfos.concat(res.data.page.data);

                  this.totalPageNum = res.data.page.total;

                  if (this.allInfos.length >= this.totalPageNum) {
                    this.finished = true;
                    // this.$toast('没有更多数据了');

                    return false;
                  }
                  console.log(res);
                }else {
                  // this.$toast('数据暂时为空');
                }
              }else {
                this.$toast(res.data.errorMsg);
              }
            })
            .catch(err => {
              this.$toast(err.data.errorMsg)
            })
        },
        tabClick(str){
          this.allInfos =  [],
          this.startPage = -10;
          this.totalPageNum = 0;

          if(str==0){
            this.getOrderQuery('Z');
          }else {
            this.getOrderQuery(str-1);
          }
        },
        onLoad(str) {//上拉加载,下拉刷新
          setTimeout(() => {

            if(str==0){
              this.getOrderQuery('Z');
            }else {
              this.getOrderQuery(str-1);
            }

          }, 500);
        },
      }
    }
</script>

<style scoped>
  .tabContent {
    /*padding: 0 1.2rem;*/
  }
  .van-tab--active {
    color: #0088f1 !important;
  }
  .van-tabs__line {
    z-index: 1;
    left: 0;
    bottom: 15px;
    height: 2px;
    position: absolute;
    background-color: #0088f1 !important;
  }
  .allLists, .unPayLists, .PayFinLists, .finishedLists, .cancelLists{
    padding: 0 1.2rem;
  }
  .allLists li div, .unPayLists li div, .PayFinLists li div, .finishedLists li div, .cancelLists li div {
    display: flex;
    justify-content: space-between;
  }
  .allLists li p, .unPayLists li p, .PayFinLists li p, .finishedLists li p, .cancelLists li p {
    font-size: 1rem;
    line-height: 2;
  }
  .more {
    font-size: 1rem;
    text-align: center;
    padding-top: .5rem;
  }
  .more {
    font-size: 1rem;
    text-align: center;
    padding-top: .5rem;
  }
</style>
