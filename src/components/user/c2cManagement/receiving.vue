<template>
  <div class="changeBG">
    <!--头部-->
    <van-nav-bar title=" 支付方式查看" left-text="返回" left-arrow @click-left="$back()">
      <van-icon class="iconfont icon-fanhui" slot="left" />
    </van-nav-bar>
    <!--<ul class="pay_list">-->
      <!--<li class="pay_item" v-for="(item,i) in payList" :key="i">-->
        <!--<span class="fl" @click="releaseDetails(item.id)">{{item.type}}</span>-->
        <!--<span class="fl note">{{!!item.remark ? item.remark : '无'}}</span>-->
        <!--<span class="fr">-->
          <!--<b class="delete">删除</b>-->
        <!--</span>-->
      <!--</li>-->
    <!--</ul>-->
    <div class="pay_list">
      <van-list v-model="loading" :finished="finished" :immediate-check="immediateCheck" @load="onLoad" v-if="payList.data.length > 0">
        <van-cell v-for="(item,i) in payList.data" :key="i">
          <div class="pay_item">
            <span class="fl" @click="releaseDetails(item.id)">
              <img src="../../../../static/images/cc2.png" alt="" v-if="item.type === '支付宝'">
              <img src="../../../../static/images/cc3.png" alt="" v-if="item.type === '微信'">
              <img src="../../../../static/images/cc4.png" alt="" v-if="item.type === '银行卡'">
              {{item.type}}
            </span>
            <span class="fl note">{{!!item.remark ? item.remark : '无'}}</span>
            <span class="fr">
            <b class="delete" @click="removeAddress(item.id)">删除</b>
          </span>
          </div>
        </van-cell>
        <p style="width: 100%;text-align: center;height: 3rem;line-height: 3rem;color: #ccc">
          {{this.load}}
        </p>
        <!--<van-cell v-for="item in list" :key="item" :title="item + ''" />-->
      </van-list>
      <p v-if="payList.data.length === 0" style="width: 100%;text-align: center;height: 5rem;line-height: 5rem;">
        暂无支付方式...
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "receiving",
    data() {
      return {
        payList: {
          data: [],
          total: 0,
        },
        load: '上拉加载更多',
        loading: false, //是否显示加载中提示，加载过程中不触发load事件
        finished: false, //是否已加载完成，加载完成后不再触发load事件
        immediateCheck: false, //是否在初始化时立即执行滚动位置检查
        pages: {
          start: -10,
          rows: 10,
        }
      }
    },
    created() {
      this.getPayList();
    },
    methods: {
      getPayList() { //获取支付列表
        this.pages.start += this.pages.rows;
        this.$axios({
          url: "/api/user/paymentreceived",
          method: "post",
          params: this.pages,
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.loading = false;

            this.payList.data = this.payList.data.concat(res.data.page.data)
            this.payList.total = res.data.page.total
            this.payList.data.forEach(function (item) {
              switch (item.type) {
                case '0':
                  item.type = '支付宝';
                  break;
                case '1':
                  item.type = '微信';
                  break;
                case '2':
                  item.type = '银行卡';
                  break;
              }
            })

            if (this.payList.data.length >= this.payList.total) {
              this.finished = true;
              this.load = 'END'
            }
          }
        })
      },
      onLoad() { //滚动加载
        this.load = ''
        setTimeout(() => {
          this.getPayList();
        }, 500);
      },
      releaseDetails(id) { //查看详情
        this.$router.push({
          path: '/releaseDetails/' + id
        })
      },
      removeAddress(id) { //删除支付方式
        this.$axios({
          url: '/api/user/delPaymentReceived',
          method: "get",
          params: {
            id: id
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$toast('删除成功');
            this.pages.start = -10;
            this.payList.data = [];
            this.payList.total = 0;
            this.getPayList();
          }
        })
      },

    }
  }
</script>

<style scoped>
.pay_list {
  padding: 0 1rem;
  border-top: 2px solid #f0f0f0;
}
.pay_list .pay_item {
  width: 100%;
  height: 3rem;
  /*margin: 1rem 0;*/
  line-height: 3rem;
  font-size: 1.2rem;
  /*border-bottom: 1px dashed #ccc;*/
}
.pay_list .pay_item span {
  display: inline-block;
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pay_list .pay_item span img {
  width: 1.4rem;
  vertical-align: middle;
}
.pay_list .pay_item span.note {
  width: 55%;
  padding-left: 5%;
}
.pay_list .pay_item span .delete {
  display: inline-block;
  width: 100%;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  vertical-align: middle;
  background: #0088f1;
  border-radius: 10px;
  color: #fff;
  font-weight: normal;
}

</style>
