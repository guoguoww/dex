<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="历史纪录" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <div class="history_con">
        <div class="history_title" id="history_con" >
          <select v-model="operation" @change="change(operation)">
            <option v-for="item in operationList"  :value="item.id">{{item.name}}</option>
          </select>
          <div  class="history_list_title">
            <span class="date">时间</span>
            <span class="">币种</span>
            <span class="">数量</span>
            <span class="">状态</span>
            <span class="address">地址</span>
          </div>
        </div>

        <p v-if="historyList.data.length === 0" style="width: 100%;text-align: center;height: 5rem;line-height: 5rem;">
          暂无记录...
        </p>
        <!--<ul>-->
          <!--&lt;!&ndash;<li class="history_list_title">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="date">时间</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="">币种</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="">数量</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="">状态</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="address">地址</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--<li>-->
            <van-list v-if="historyList.data.length > 0" class="history_list" v-model="loading" :finished="finished" :immediate-check="immediateCheck" :offset="10" @load="onLoad(operation)" check>
              <!--<van-list v-model="loading" :finished="finished" @load="onLoad">-->
              <van-cell v-for="(item,i) in historyList.data" :key="i">
                <span class="date">{{item.createTime}}</span>
                <span class="">{{item.currencyCode}}</span>
                <span class="">{{item.number}}</span>
                <span class="">{{item.status  === '0'? '审核中': (item.status  === '1' ? '成功' : '失败')}}</span>
                <span class="address">{{item.address}}</span>
              </van-cell>
              <!--<van-cell v-for="item in list" :key="item" :title="item + ''" />-->
            </van-list>
          <!--</li>-->

        <!--</ul>-->
      </div>

    </div>
</template>

<script>
  export default {
    name: "history",
    data() {
      return {
        operation: 0,
        operationList: [
          {
            name: '充值',
            id: 0,
          },
          {
            name: '提现',
            id: 1,
          },
        ],
        pages: {
          start: -10,
          rows: 10,
          type: 0,
        },
        historyList: {
          data: [],
          total: 0,
        },
        loading: false, //是否显示加载中提示，加载过程中不触发load事件
        finished: false, //是否已加载完成，加载完成后不再触发load事件
        immediateCheck: true, //是否在初始化时立即执行滚动位置检查
      }
    },
    mounted() {
      // this.getPayList(this.operation) //测试
      this.operation = parseInt(this.$route.query.type) || 0;
      this.getHistoryList(this.operation)
      window.addEventListener("scroll", this.scrollTop);
    },
    destroyed() {
      //离开该页面需要移除这个监听的事件
      window.removeEventListener("scroll", this.scrollTop);
    },
    methods: {
      getHistoryList(type) {
        this.pages.type = type || 0;
        this.pages.start += this.pages.rows;
        this.$axios({
          url: '/api/wallet/querycurrencychange',
          method: "post",
          data: this.pages
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.loading = false;
            this.finished = false;

            this.historyList.data = this.historyList.data.concat(res.data.page.data)
            this.historyList.total = res.data.page.total

            if (this.historyList.data.length >= this.historyList.total) {
              this.finished = true;
            }
          }
        })
      },
      change(type){
        // this.immediateCheck = false
        this.pages.start = -10;
        this.historyList.total = 0;
        this.historyList.data = [];
        this.getHistoryList(type)
        // this.onLoad(type)
      },

      // getPayList(type) { //获取支付列表  测试
      //   // console.log(type || 0)
      //   this.pages.type = type || 0;
      //   this.pages.start += this.pages.rows;
      //   this.$axios({
      //     url: "/api/user/paymentreceived",
      //     method: "post",
      //     params: this.pages,
      //   }).then(res => {
      //
      //     if(res.data.errorCode === 0) {
      //       this.loading = false;
      //       this.finished = false;
      //
      //       this.historyList.data = this.historyList.data.concat(res.data.page.data)
      //       this.historyList.total = res.data.page.total
      //
      //       if (this.historyList.data.length >= this.historyList.total) {
      //         this.finished = true;
      //       }
      //     }
      //   })
      // },

      onLoad(type) { //滚动加载
        setTimeout(() => {
          // this.getPayList(this.operation) //测试
          this.getHistoryList(type)
        }, 500);
      },
      scrollTop() {
        var tit = document.getElementById("history_con");
        //占位符的位置
        var rect = tit.getBoundingClientRect();//获得页面中导航条相对于浏览器视窗的位置
        var inser = document.createElement("div");
        tit.parentNode.replaceChild(inser,tit);
        inser.appendChild(tit);
        //获取距离页面顶端的距离
        var titleTop = tit.offsetTop
        inser.style.height = rect.height * 75% + 'rem'
        //获取当前滚动的距离
        var btop = document.body.scrollTop||document.documentElement.scrollTop;
        //如果滚动距离大于导航条据顶部的距离
        if(btop>titleTop){
          //为导航条设置fix
         tit.className = "history_title fix";
        }else{
          //移除fixed
          tit.className = "history_title ";
        }
      }
    }
  }
</script>

<style scoped>
  .history_con {
    padding: 0 1rem;
    border-top: 2px solid #f0f0f0;
  }
  .history_con select {
    width: 100%;
    height: 2.4rem;
    outline: 0;
    border: 1px solid #d9d9d9;
    margin: 1rem 0;
  }
  .history_title,.history_list, {
    width: 100%;
  }
  .history_title .history_list_title {
    height: 3rem;
    line-height: 3rem;
    margin: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .history_list .van-cell {
    padding: 0;
  }
  .history_list span,
  .history_title .history_list_title span{
    display: inline-block;
    width: 15%;
    height: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .history_list span.date,
  .history_list span.address,
  .history_title .history_list_title span.date,
  .history_title .history_list_title span.address{
    width: 24%;
  }
  .fix {
    position:fixed;
    top:0;
    left:0;
    width: calc(100% - 2rem) !important;
    margin: 0 1rem !important;
    z-index: 999;
    background: #fff;
  }
</style>
