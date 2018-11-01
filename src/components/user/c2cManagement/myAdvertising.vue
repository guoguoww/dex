<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="我的广告" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <!--广告内容-->
      <div class="advertising_con">
        <van-tabs swipeable sticky @click="onClick">
          <van-tab v-for="(item,i) in titleList" :key="i" :title="item.name">
            <!--广告列表-->
            <div class="advertising" v-if="item.id === 1">
              <ul class="advertising_tit">
                <li class="fl">时间</li>
                <li class="fl">方向/币种</li>
                <li class="fl price">价格/数量/限额</li>
                <li class="fl">状态</li>
              </ul>
              <van-list v-model="loading" :finished="finished" :immediate-check="immediateCheck" :offset="0" @load="onLoad(item.id)" check v-if="advList.data.length > 0">
                <van-cell  v-for="(item,i) in advList.data" :key="i">
                  <ul class="advertising_item clearfix">
                    <li class="fl">{{item.createTime}}</li>
                    <li class="fl">
                      <p>{{item.direction === '0' ? '买入' : '卖出'}}</p>
                      <p>{{item.currencyCode}}</p>
                    </li>
                    <li class="fl price">
                      <p>{{item.price}}</p>
                      <p>{{item.number}}</p>
                      <p>{{item.minQuota}}-{{item.maxQuota}}</p>
                    </li>
                    <li class="fl">
                      <p>{{item.status === '0' ? '发布中': (item.status === '1' ? '完成':'已撤单')}}</p>
                      <button @click="undo(item.id)" v-if="item.status === '0'">撤单</button>
                    </li>
                  </ul>
                </van-cell>
              </van-list>
              <p v-if="advList.data.length === 0" style="width: 100%;text-align: center;height: 5rem;line-height: 5rem;">
                暂无记录...
              </p>
            </div>
            <!--交易列表-->
            <div class="trading" v-if="item.id === 2">
              <van-list v-model="loading" :finished="finished" :immediate-check="immediateCheck" :offset="0" @load="onLoad(item.id)" check  v-if="traList.data.length > 0">
                <van-cell  v-for="(item,i) in traList.data" :key="i">
                  <ul class="trading_item clearfix">
                    <li class="fl">{{item.createTime }}</li>
                    <li class="fl">{{item.orderPrice}}</li>
                    <li class="fl">{{item.currency}}</li>
                    <li class="fl">
                      <router-link to="">
                        交易
                      </router-link>
                    </li>
                  </ul>
                </van-cell>
              </van-list>
              <p v-if="traList.data.length === 0" style="width: 100%;text-align: center;height: 5rem;line-height: 5rem;">
                暂无记录...
              </p>
            </div>
          </van-tab>
        </van-tabs>
      </div>


    </div>
</template>

<script>
  export default {
    name: "myAdvertising",
    data() {
      return {
        titleList: [
          {
            name: '我的广告',
            id: 1,
          },
          {
            name: '等待交易',
            id: 2,
          }
        ],
        advList: { // 广告列表
          data: [],
          total: 0
        },
        loading: false, //是否显示加载中提示，加载过程中不触发load事件
        finished: false, //是否已加载完成，加载完成后不再触发load事件
        immediateCheck: true, //是否在初始化时立即执行滚动位置检查
        traList: { //交易列表
          data: [],
          total: 0
        },
        pages: {
          start: -10,
          rows: 10,
        }
      }
    },
    created() {
      this.getAdvList()
    },
    methods: {
      onClick(index) { //切换
        this.immediateCheck = false
        this.pages.start = -10;
        if(index === 0) {
          this.advList.total = 0;
          this.advList.data = [];
        }
        if(index === 1) {
          this.traList.total = 0;
          this.traList.data = [];
          this.getTraList()
        }
        this.onLoad(index+1)
      },
      getAdvList() { //获取我的广告
        this.pages.start += this.pages.rows;
        this.$axios({
          url: "/api/advertisement/myadversement",
          method: "post",
          params: this.pages,
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.loading = false;
            this.finished = false;

            this.advList.data = this.advList.data.concat(res.data.page.data)
            this.advList.total = res.data.page.total

            if (this.advList.data.length >= this.advList.total) {
              this.finished = true;
            }
          }
        })
      },
      getTraList() { //获取等待交易
        this.pages.start += this.pages.rows;
        this.$axios({
          url: "/api/advertisement/query/trade",
          method: "post",
          params: this.pages,
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.loading = false;
            this.finished = false;

            this.traList.data = this.traList.data.concat(res.data.page.data)
            this.traList.total = res.data.page.total

            if (this.traList.data.length >= this.traList.total) {
              this.finished = true;
            }
          }
        })
      },
      onLoad(id) { //加载
        if(id === 1) {
          setTimeout(() => {
            this.getAdvList()
          }, 500);
        }
        if(id === 2) {
          setTimeout(() => {
            this.getTraList()
          }, 500);
        }
      },
      undo(id) { //撤销订单
        this.$axios({
          url: '/api/advertisement/cancel_advertisement',
          method: "post",
          data: {
            id: id
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$toast('撤销成功');
            this.pages.start = -10
            this.advList.total = 0;
            this.advList.data = [];
            this.onLoad(1)
          }
        })
      },
    }
  }
</script>

<style scoped>
  .advertising_con {
    padding: 0 1rem;
    border-top: 2px solid #f0f0f0;
  }
  .advertising_con .advertising .advertising_tit {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.1rem;
    border-bottom: 1px dashed #f0f0f0;
  }
  .van-cell {
   padding: 0;
  }
  /*广告列表*/
  .advertising_con .advertising .advertising_tit li,
  .advertising_con .advertising .advertising_item li{
    width: 20%;
    text-align: center;
    word-wrap: break-word;
    word-break: normal;
  }

  .advertising_con .advertising .advertising_item li p {
    text-align: center;
    line-height: 2rem;
  }

  .advertising_con .advertising .advertising_item li button {
    margin: 0.4rem 0;
    background: #0088f1;
    color: #fff;
  }

  .advertising_con .advertising .advertising_tit li.price,
  .advertising_con .advertising .advertising_item li.price{
    width: 40%;
    margin: 0 !important;
  }
  /*交易列表*/
  .advertising_con .trading .trading_item li {
    width: 25%;
    text-align: center;
    word-wrap: break-word;
    word-break: normal;
    line-height: 3rem;
  }
  .advertising_con .trading .trading_item li a {
    display: inline-block;
    width: 4rem;
    height: 2rem;
    line-height: 2rem;
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
</style>
