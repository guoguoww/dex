<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="身份认证" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <ul>
          <h6>国籍：中国</h6>
        <li>
          <p>身份证姓名</p>
          <input type="text" value="" placeholder="您的身份证姓名" v-model="userName">
        </li>
        <li>
          <p>身份证号码</p>
          <input type="text" value="" placeholder="您的身份证号码" v-model="userId">
        </li>
      </ul>
      <div class="btns">
        <button class="cancel" @click="$back()">取消</button>
        <button class="submit" @click="submitData()">提交</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: "identityCertification",
    data() {
      return {
        userName: '',
        userId: '',
      }
    },
    created() {
      //进入组件 判断一下是否实名认证 防止更改路由恶意更改信息
      this.$axios.post("/api/user/query_active_user")
        .then(res => {
          if(res.data.errorCode === 0) {
            if(res.data.data.authStatusGeneral === 2) {
              this.$dialog.alert({
                message: '您已实名认证'
              }).then(() => {
                this.$router.push('/user')//跳转个人中心
              });
            }
          }
        }).catch(err => {

      });
    },
    methods: {
      submitData() { //实名认证
        if(this.userName === '') {
          this.$toast('请输入身份证姓名');
          return;
        }
        if(this.userId === '') {
          this.$toast('请输入身份证号码');
          return;
        }
        this.$axios({
          url: "/api/user/certificationgeneral",
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          data: {
            chnName : this.userName,
            idCard : this.userId,
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$dialog.alert({
              message: '认证信息已提交 请等待结果'
            }).then(() => {
              this.$router.push('/user')//跳转个人中心
            });
          }
        })
          .catch(err => {});
      }
    },
  }
</script>

<style scoped>
  /*上传内容*/
  ul {
    padding: 1.4rem 1rem 0;
    font-size: 1.2rem;
  }
  ul h6 {
    font-size: 1.4rem;
    color: #787878;
    margin-bottom: 1rem;
  }
  ul li {
    height: 6rem;
    color: #787878;
  }
  ul li p {
    line-height: 3rem;
    font-weight: bold;
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
