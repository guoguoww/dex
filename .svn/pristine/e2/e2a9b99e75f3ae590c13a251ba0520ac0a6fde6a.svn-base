<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="c2c 管理" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <!--跳转列表-->
      <ul>
        <li>
          <a href="javascript:void (0);" @click="nickShow = true" v-if="!userData.nickNameUpdateTime">
            <p class="fl">设置昵称</p>
            <em class="iconfont icon-jiantouarrow487 fr"> </em>
          </a>
          <a href="javascript:void (0);" v-if="!!userData.nickNameUpdateTime">
            <p class="fl">设置昵称</p>
            <em class="fr">{{userData.nickName}}</em>
          </a>
        </li>
        <li v-for="item in menuList">
          <a href="javascript:void (0);" @click="rouLink(item.url)">
            <p class="fl">{{item.name}}</p>
            <em class="iconfont icon-jiantouarrow487 fr"> </em>
          </a>
        </li>
      </ul>

      <!--设置昵称弹框-->
      <van-dialog
        v-model="nickShow"
        show-cancel-button
        @confirm="confirmSub"
        @cancel="nickShow = false"
        title="设置昵称"
      >
        <van-field
          v-model="nickName"
          placeholder="建议不使用真实姓名,设置后不可更改"
        />
      </van-dialog>
    </div>
</template>

<script>
  export default {
    name: "c2cMenu",
    data() {
      return{
        userData: {},
        menuList: [
          {
            name: '设置收付款信息',
            url: '/receivingAdd',
          },
          {
            name: '发布交易广告',
            url: '/release',
          },
          {
            name: '我的广告',
            url: '/myAdvertising',
          },
          {
            name: '申请交易员',
            url: '/traders',
          },
        ],
        nickName: '', //昵称
        nickShow: false,
      }
    },
    created() {
      this.getUserData()
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
      rouLink(url) {
          if(url === '/receivingAdd' && this.userData.authStatusGeneral !== '2') {
          this.$toast({
            message: '请先进行普通认证',
            forbidClick: true, // 禁用背景点击
            duration: 1000,
          })
          return
        }
        // if((url === '/release' || url === '/traders') && this.userData.authStatusAdvanced  !== '2') {
        //   this.$toast({
        //     message: '请先进行高级认证',
        //     forbidClick: true, // 禁用背景点击
        //     duration: 1000,
        //   })
        //   return
        // }
        if(url === '/release' && this.userData.applyTraderStatus  !== '2') {
          this.$toast({
            message: '请先申请交易员再发布广告',
            forbidClick: true, // 禁用背景点击
            duration: 1000,
          })
          return
        }
        this.$router.push(url)
      },
      confirmSub() { //设置昵称
        this.nickShow = true;
        if(this.nickName === '') {
          this.$toast('请输入昵称');
          return
        }
        this.$axios({
          url: '/api/user/modify/nick_name',
          method: 'post',
          data: {
            nickName: this.nickName,
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$toast('设置成功');
            this.nickShow = false;
            this.getUserData()
          }
        })
      }
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
