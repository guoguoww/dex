<template>
    <div style="position: absolute; height: 100%; width: 100%; background: #fff">
      <!--头部-->
      <van-nav-bar title="邀请推广" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <!--内容-->
      <div class="promote_con">
        <img src="../image/fanyong.png" alt="">
        <ul>
          <li class="clearfix">
            <b>链接&nbsp&nbsp&nbsp&nbsp</b>
            <input type="text" id="link" value="" v-model="shareLink" readonly>
            <span  @click="copytxt('link')">
              <i class="iconfont icon-fuzhi"></i>
              复制
            </span>
          </li>
          <li class="clearfix">
            <b>邀请码&nbsp</b>
            <input type="text" id="invite" value="" v-model="userData.inviteCode" readonly>
            <span @click="copytxt('invite')">
              <i class="iconfont icon-fuzhi"></i>
              复制
            </span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: "promote",
    data() {
      return {
        userData: {},
        shareLink: ''
      }
    },
    computed: {
      router() {
        return location.origin;
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
              this.shareLink = location.origin + location.pathname + '#/register/' + this.userData.inviteCode
            }
          }).catch(err => {

        });
      },
      copytxt(id) { //复制
        // var d = document.getElementById(id);
        // d.select();
        // document.execCommand("Copy");
        // this.$toast('已复制到剪贴板');
        var input = document.createElement("input");
        input.value = document.getElementById(id).value;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
        document.body.removeChild(input);
        this.$toast('已复制到剪贴板');
      },
    }
  }
</script>

<style scoped>
  .promote_con {
    border-top: 2px solid #f0f0f0;
    text-align: center;
  }
  .promote_con img{
    margin: 4rem 0;
    width: 21rem;
    height: 21rem;
  }
  .promote_con ul li {
    height: 3rem;
    margin: 1rem 0;
  }
  .promote_con ul li input {
    width: 50%;
    height: 100%;
    border: 1px solid #ccc;
    padding-left: 1rem;
  }
  .promote_con ul li span {
    display: inline-block;
    width: 18%;
    text-align: center;
    height: 100%;
    line-height: 3rem;
    border: 1px solid #ccc;
    background: #30b8ff;
    color: #fff;
  }
</style>
