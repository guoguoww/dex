<template>
    <div style="padding-bottom:60px;">
      <!--头部-->
      <div class="userHead">
        <div class="userHead_bg"></div>
        <div class="userHead_con">
          <img src="./image/headPortrait.png" alt="">
          <p class="account"> {{userData.nickName }} </p>
          <span class="UID"> 邀请码：{{userData.inviteCode}} </span>
        </div>
      </div>
      <!--跳转菜单-->
      <ul class="userMenu">
        <li>
          <router-link to="/certification">
            <i class="iconfont icon-icon10"> </i>
            <span>个人中心</span>
            <em class="iconfont icon-jiantouarrow487"> </em>
          </router-link>
        </li>
        <li>
          <router-link to="/c2cMenu">
            <i class="iconfont icon-icon11"> </i>
            <span>c2c 管理</span>
            <em class="iconfont icon-jiantouarrow487"> </em>
          </router-link>
        </li>
        <li>
          <router-link to="topupMenu">
            <i class="iconfont icon-icon12"> </i>
            <span>充值币管理</span>
            <em class="iconfont icon-jiantouarrow487"> </em>
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
            <i class="iconfont icon-icon14"> </i>
            <span>账号管理</span>
            <em class="iconfont icon-jiantouarrow487"> </em>
          </router-link>
        </li>
        <li>
          <router-link to="/promote">
            <i class="iconfont icon-icon13"> </i>
            <span>邀请推广</span>
            <em class="iconfont icon-jiantouarrow487"> </em>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <i class="iconfont icon-icon15"> </i>
            <span>关于我们</span>
            <em class="iconfont icon-jiantouarrow487"> </em>
          </router-link>
        </li>
      </ul>
      <!--退出按钮-->
      <div class="exit" @click="logout()">
        <span>退出当前帐号</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        userData: {}
      }
    },
    created() {
      this.getUserData()
    },
    mounted () {//实例创建后
      document.querySelector('body').style.background = '#f7f8f9'
    },
    destroyed () {//组件销毁触发
      document.querySelector('body').style.background = '#fff'
    },
    methods: {
      getUserData() {  //获取用户信息
        this.$axios.post("/api/user/query_active_user")
          .then(res => {
            if(res.data.errorCode === 0) {
              this.userData = res.data.data;
            }
          }).catch(err => {

          });
      },
      logout(){  //退出登录
        this.$dialog.confirm({
          title: '退出登录',
          message: '确认退出?'
        }).then(() => {
          if(this.$cookie.get('_auth')){
            this.$cookie.clear(); //清除cookie
            this.$router.push('/login')//跳转登录页
          }else{
            this.$router.push('/login')
          }
        })
      },
    },
  }
</script>

<style scoped>
  /*头部*/
  .userHead {
    background: #fff;
  }
  .userHead .userHead_bg {
    width: 100%;
    height: 9rem;
    background: url("./image/userBG.png") no-repeat;
    background-size: 100% 100%;
  }
  .userHead .userHead_con {
    width: 100%;
    height: 8rem;
    text-align: center;
  }
  .userHead .userHead_con img {
    background: #fff;
    border-radius: 50%;
    border: 1px solid #fff;
    width: 5.5rem;
    height: 5.5rem;
    margin-top: -4.5rem;
  }
  .userHead .userHead_con .account {
    font-size: 1.2rem;
    font-weight: bold;
    color: #00b4ff;
    line-height: 2.6rem;
  }
  .userHead .userHead_con .UID {
    font-size: 1rem;
  }
  /*个人中心菜单*/
  .userMenu {
    margin-top: 1.5rem;
    width: 100%;
  }
  .userMenu li {
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
    height: 4rem;
    padding: 0 1rem;
  }
  .userMenu li a {
    display: block;
    height: 100%;
    color: #000;
    line-height: 4rem;
    position: relative;
  }
  .userMenu li a i {
    position: absolute;
    color: #00b4ff;
    font-size: 1.6rem;
  }
  .userMenu li a span {
    position: absolute;
    font-size: 1.2rem;
    left: 2.2rem;
  }
  .userMenu li a em {
    position: absolute;
    right: 0;
    color: #b4b4b4;
  }
  /*退出按钮*/
  .exit {
    height: 4rem;
    line-height: 4rem;
    background: #fff;
    text-align: center;
    color: #b4b4b4;
    font-size: 1.2rem;
    margin: 1.5rem 0 0;
  }

</style>
