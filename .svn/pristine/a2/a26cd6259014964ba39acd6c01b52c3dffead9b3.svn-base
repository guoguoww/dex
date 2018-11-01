<template>
    <div class="changeBG">
        <signhead/>
        <div class="sign-li" style="display: block;">
            <h5>手机注册</h5>
            <ul>
                <li>
                    <span>0086
                        <i class="iconfont icon-xialasanjiao"></i>
                    </span>
                    <input placeholder="手机号" type="number" v-model="user.mobile">
                    <i class="iconfont icon-ai54" v-if="user.mobile" @click="user.mobile=''"></i>
                </li>
                <li>
                    <input maxlength="6" placeholder="短信验证码" type="text" v-model="user.smsValidCode">
                    <button class="ver-but" @click="getsms">
                        {{codebtn}}
                    </button>
                </li>
                <li>
                    <input placeholder="密码" :type="pwdshow?'text':'password'" v-model="user.password">
                    <i class="iconfont icon-kaiicon" v-if="pwdshow" @click="pwdshow=!pwdshow"></i>
                    <i class="iconfont icon-guanicon" v-else @click="pwdshow=!pwdshow"></i>
                </li>
                <li>
                    <input placeholder="确认密码" type="password" v-model="repwd">
                </li>

                <li style="display: block;">
                    <input placeholder="推荐码" type="text" v-model="user.inviteCode" :readonly='readonly'>
                </li>
            </ul>
            <div class="sign-but">
                <button @click="register">注册</button>
            </div>
            <div class="register-name">
                <dl>
                    <dt>
                        <p>点击“注册”按钮，即表示您同意</p>
                    </dt>
                    <!-- <dd>
                        <span>邮箱注册</span>
                    </dd> -->
                </dl>
            </div>
        </div>
    </div>
</template>

<script type="">
import signhead from "../public/sign-head";

export default {
    name: "register",
    data() {
        return {
            user: {
                inviteCode: this.$route.params.id||"", // 邀请码
                mobile: "", //手机
                nationality: "", //国籍
                password: "", //密码
                smsValidCode: "", //验证码
                terminal: "" //设备类型
            },
            repwd: "", //确认密码
            pwdshow: false, //显示密码
            codebtn: "获取验证码", //验证码按钮文字
            codedisable: false ,//验证码按钮禁用
            readonly:false,
        };
    },
    components: {
        signhead
    },
    created() {
        var u = navigator.userAgent;
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
            //安卓手机
            this.user.terminal = 1;
        } else if (u.indexOf("iPhone") > -1) {
            //苹果手机
            this.user.terminal = 2;
        } else {
            //wap
            this.user.terminal = 3;
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.readonly=true
        }
        
    },
    methods: {
        register() {
            //注册
            for (const key in this.user) {
                if (!this.user[key].length) {
                    if (key == "mobile") {
                        this.$toast("请输入手机号");
                        return;
                    }
                    if (key == "password") {
                        this.$toast("请输入密码");
                        return;
                    }
                    if (key == "smsValidCode") {
                        this.$toast("请输入短信验证码");
                        return;
                    }
                }
            }
            if (!this.repwd) {
                this.$toast("请确认密码");
                return;
            }
            if (this.repwd != this.user.password) {
                this.$toast("两次输入密码不一致");
                return;
            }
            this.$axios({
                url: "/api/user/register",
                method: "post",
                headers: {
                    "Content-Type": "application/json;charse=UTF-8"
                },
                data: this.user
            })
                .then(res => {
                    if (!res.data.errorCode) {
                        // this.$cookie.set("_auth", res.data.data.cookie);
                        this.$toast("注册成功");
                        this.$router.push('/login')
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getsms() {
            //获取短信验证码
            // this.$axios.post("api/sms/validate_code",
            //         {
            //             mobile: 12345678901,
            //             type: "reg"
            //         },
            //     ).then(res => {});

            // var codebtn=this.codebtn
            // var num=6
            // // this.codebtn=`${num}秒`
            // this.codedisable=true
            // var timer=setInterval(() => {
            //     this.codebtn=`${num--}秒`
            //     if (num<0) {
            //         this.codebtn=codebtn
            //         this.codedisable=false
            //         clearInterval(timer)
            //     }
            // }, 1000);
            if (this.codedisable) {
                return;
            }
            if (!this.user.mobile) {
                this.$toast("请输入手机号码");
                return;
            }
            if (this.user.mobile.length < 11) {
                this.$toast("请输入正确的手机号码");
                return;
            }
            this.countdown();
            this.$store.commit("getsms", {
                mobile: this.user.mobile,
                type: "reg",
                callback: function(res) {
                    console.log(res);
                }
            });
        },
        countdown( ) {
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
    .sign-li {
        /* float: left; */
        // width: 50%;
        padding: 0 3rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        h5 {
            color: #787878;
            padding-left: 0.75rem;
            font-weight: normal;
        }
        li {
            border-bottom: 0.333px solid #dcdcdc;
            padding: 2rem 0 0.1rem;
            position: relative;
            input {
                width: 60%;
                height: 2.7rem;
                // font-size: 35px;
                padding-left: 1rem;
                outline: none;
                background-color: #fff;
            }
            > span {
                font-size: 1rem;
                padding-left: 1.5rem;
                color: #787878;
                > i {
                    font-size: 10px;
                    padding-left: 3px;
                }
            }
            > i {
                font-size: 1.6rem;
                color: #e3e3e3;
                position: absolute;
                top: 3rem;
                right: 1rem;
            }
            > button {
                height: 1.5rem;
                outline: none;
                border: 0;
                width: 8rem;
                position: absolute;
                top: 2.7rem;
                right: 0.7rem;
                z-index: 1;
                color: #0088f1;
                background-color: #f7f8f9;
                border-left: 1px solid #dcdcdc;
            }
        }
        .sign-but {
            padding-top: 4rem;
            button {
                width: 100%;
                height: 3rem;
                font-size: 1.12rem;
                background: #0088f1;
                outline: none;
                border-radius: 3px;
                color: #fff;
                border: 0;
                -webkit-box-shadow: 0 0.4rem 0.35rem #f3f3f3;
                box-shadow: 0 0.4rem 0.35rem #f3f3f3;
            }
        }
        .register-name {
            padding-top: 1.5rem;
            dl {
                display: flex;
                dt {
                    flex: 2;
                    > p {
                        color: #b4b4b4;
                        padding-bottom: 0.75em;
                    }
                }
                dd {
                    flex: 1;
                    text-align: right;
                    color: #00a8ff;
                }
            }
        }
    }
}
</style>
