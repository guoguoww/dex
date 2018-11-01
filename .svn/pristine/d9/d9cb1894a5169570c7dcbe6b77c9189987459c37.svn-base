<template>
  <div class="changeBG">
    <!-- <van-nav-bar title="找回登录密码" left-text="" left-arrow @click-left="onClickLeft" /> -->
    <van-nav-bar title="找回登录密码" left-text="返回" left-arrow @click-left="$back">
      <van-icon class="iconfont icon-fanhui" slot="left" />
    </van-nav-bar>

    <div class="forget-content">
      <div class="forget-enter">
        <ul>
          <li :class="{'active':status==0}">
            <i class="iconfont icon-yanzhengshenfen"></i>
            <p>验证身份</p>
          </li>
          <li>
            <em></em>
          </li>
          <li :class="{'active':status==1}">
            <i class="iconfont icon-zhaohuimima"></i>
            <p>重置密码</p>
          </li>
        </ul>
      </div>

      <div class="forget-tab">
        <div class="forget-ul clear">

          <div class="capital-cont" v-if="status==0">
            <ul>
              <li>
                <p class="p1">账户</p>
                <p class="p2">
                  <input class="cap-ver" placeholder="手机号" type="text" v-model="user.mobile">
                </p>
              </li>
            </ul>
            <div class="capital-but">
              <button @click="next">下一步</button>
            </div>
          </div>
          <div class="capital-cont" v-if="status==1">
            <ul>
              <li>
                <p class="p1">手机验证码</p>
                <p class="p2">
                  <input class="cap-ver" type="text" placeholder="请输入手机验证码" v-model="user.smsValidCode">
                  <button style="color:#0088f1;" @click="getsms">{{codebtn}}</button>
                </p>
              </li>
              <li>
                <p class="p1">新密码</p>
                <p class="p2">
                  <input class="cap-ver" placeholder="请输入新密码" type="password" v-model="user.password">
                </p>
              </li>
              <li>
                <p class="p1">确认新密码</p>
                <p class="p2">
                  <input class="cap-ver" placeholder="确认新登录密码" type="password" v-model="repwd">
                </p>
              </li>
            </ul>
            <div class="capital-but">
              <button @click="forget">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="">
export default {
    name: "forget",
    data() {
        return {
            status: 0, //下一步
            user: {
                mobile: "",
                password: "",
                smsValidCode: ""
            },
            repwd: "", //确认密码
            codebtn: "获取验证码", //获取验证码按钮文字
            codedisable: false //按钮禁用
        };
    },
    components: {},
    methods: {
        next() {
            //下一步
            if (!this.user.mobile) {
                this.$toast("请输入手机号");
                return;
            }
            if (this.user.mobile.length != 11) {
                this.$toast("请输入正确手机号");
                return;
            }
            this.status = 1;
        },
        forget() {
            //忘记密码
            if (!this.user.password) {
                this.$toast("请输入密码");
                return;
            }
            if (!this.user.smsValidCode) {
                this.$toast("请输入验证码");
                return;
            }
            if (this.user.password != this.repwd) {
                this.$toast("两次输入密码不一致");
                return;
            }
            this.$axios
                .post("api/user/modify_password", this.user)
                .then(res => {
                    if (!res.data.errorCode) {
                    }
                })
                .catch(err => {});
        },
        getsms() {
            //获取验证码
            if (this.codedisable) {
                return;
            }
            this.countdown();
            if (!this.user.mobile) {
                this.$toast("请输入手机号码");
                return;
            }
            if (this.user.mobile.length < 11) {
                this.$toast("请输入正确的手机号码");
                return;
            }
            this.$store.commit("getsms", {
                mobile: this.user.mobile,
                type: "mtpwd",
                callback: function(res) {
                    console.log(res);
                }
            });
        },
        countdown() {
            //倒计时
            var text = this.codebtn;
            var num = 60;
            this.codedisable = true;
            this.codebtn = `${num--}秒`;
            var timer = setInterval(() => {
                this.codebtn = `${num--}秒`;
                if (num < 0) {
                    this.codebtn = text;
                    this.codedisable = false;
                    clearInterval(timer);
                }
            }, 1000);
        }
    }
};
</script>

<style scoped lang="less">
div {
    .forget-enter {
        height: 13.7rem;
        background: #fafdff;
        .active > i {
            color: #0088f1 !important;
        }
        > ul {
            display: flex;
            > li {
                flex: 1;
                text-align: center;
                padding-top: 3rem;
                i {
                    font-size: 46px;
                    color: #8a8a8a;
                }
                p {
                    color: #000;
                    padding-top: 1rem;
                }
                em {
                    display: inline-block;
                    border-top: 1px dashed #8a8a8a;
                    width: 80%;
                    margin-top: 2rem;
                    height: 1px;
                }
            }
        }
        li:first-child {
            text-align: right;
        }
        li:last-child {
            text-align: left;
        }
    }
    .forget-tab {
        overflow: hidden;
        margin: 0 1.5rem;
        .forget-ul {
            transition-duration: 0.2s;
            .capital-cont {
                padding: 0.5rem 1.4em;
                background: #fff;
                z-index: 1;
                ul {
                    margin-bottom: 3rem;
                    li {
                        line-height: 2rem;
                        padding: 0.5rem;
                        margin: auto;
                        .p2 {
                            border: 1px solid gainsboro;
                            border-radius: 5px;
                            padding: 0.54rem;
                            display: flex;
                            justify-content: space-between;
                            input {
                                // width: 70%;
                                padding-left: 1rem;
                                margin-right: 1rem;
                                font-size: 12px;
                                background: #fff;
                            }
                            button {
                                background: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
    .capital-but {
        button {
            background: #0088f1;
            text-align: center;
            margin-left: 3%;
            display: inline-block;
            width: 90%;
            height: 3rem;
            font-size: 1.12rem;
            color: #fff;
            border: 0;
            box-shadow: 0 0.4rem 0.35rem #f3f3f3;
        }
    }
}
</style>
