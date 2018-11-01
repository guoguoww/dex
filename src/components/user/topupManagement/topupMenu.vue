<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="充值币管理" left-text="返回" left-arrow @click-left="back">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <!--跳转列表-->
      <ul>
        <li v-for="item in menuList">
          <router-link :to="item.url">
            <p class="fl">{{item.name}}</p>
            <em class="iconfont icon-jiantouarrow487 fr"> </em>
          </router-link>
        </li>
      </ul>

    </div>
</template>

<script>
  export default {
    name: "topupMenu",
    data() {
      return{
        menuList: [
          {
            name: '地址管理',
            url: '/walletAddress',
          },
          {
            name: '充值',
            url: '/moneyIn',
          },
          {
            name: '提现',
            url: '/moneyOut',
          },
          {
            name: '历史记录',
            url: '/history',
          },
        ]
      }
    },
    methods: {
      back(){
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped>
ul {
  padding: 1rem 1rem 0;
}
ul li {
  height: 4rem;
  border-bottom: 1px solid #d9d9d9;
}
ul li a {
  display: block;
  height: 4rem;
  line-height: 4rem;
}
ul li a span {
  color: #00a8ff;
}
</style>
