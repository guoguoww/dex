<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="账号管理" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <ul>
        <li>
          <input type="password" placeholder="请输入旧密码" v-model="oldPwd">
        </li>
        <li>
          <input type="password" placeholder="请输入新密码" v-model="newPwd">
        </li>
        <li>
          <input type="password" placeholder="再次输入新密码" v-model="confirmPwd">
        </li>
      </ul>
      <div class="btns">
        <button class="cancel" @click="$back()">取消</button>
        <button class="submit" @click="modifyPwd()">提交</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: "settings",
    data() {
      return {
        oldPwd: '', //旧密码
        newPwd: '', //新密码
        confirmPwd: '', //再次确认
      }
    },
    methods: {
      modifyPwd() {
        if(this.oldPwd === '') {
          this.$toast('请输入旧密码');
          return;
        }
        if(this.newPwd === '') {
          this.$toast('请输入新密码');
          return;
        }
        if(this.confirmPwd !== this.newPwd) {
          this.$toast('两次输入密码不同');
          return;
        }
        this.$axios({
          url: "/api/user/updatepassword",
          method: "post",
          data: {
            password: this.oldPwd,
            newPassword: this.newPwd,
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$dialog.alert({
              message: '密码修改成功 请重新登录'
            }).then(() => {
              this.$cookie.clear(); //清除cookie
              this.$router.push('/login')//跳转登录页
            });
          }
        })
          .catch(err => {});
      },

    }
  }
</script>

<style scoped>
  /*上传内容*/
  ul {
    padding: 1.4rem 1rem 0;
    font-size: 1.4rem;
  }
  ul li {
    height: 3rem;
    color: #787878;
    margin: 1rem 0;
  }
  ul li input {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    border-bottom: 1px solid #d9d9d9;
    font-size: 1.2rem;
  }
  /*按钮组*/
  .btns {
    margin: 4rem 0 0;
    text-align: center;
  }
  .btns button {
    width: 8rem;
    height: 2.4rem;
    line-height: 2.4rem;
    margin: 0 0.8rem;
  }
  .btns .submit {
    background: #0088f1;
    color: #fff;
  }
</style>
