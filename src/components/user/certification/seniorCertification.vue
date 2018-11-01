<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="高级认证" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <ul>
        <li class="clearfix">
          <div class="file_left fl">
            <p>身份证正面照</p>
          </div>
          <div class="file_right fr">
            <input type="file" accept="image/*" @change="changImg('idCardZ', $event)">
            <img id="idCardZ" src="" alt="">
            <i>+</i>
          </div>
        </li>
        <li class="clearfix">
          <div class="file_left fl">
            <p>身份证反面</p>
          </div>
          <div class="file_right fr">
            <input type="file" accept="image/*" @change="changImg('idCardF', $event)">
            <img id="idCardF" src="" alt="">
            <i>+</i>
          </div>
        </li>
        <li class="clearfix">
          <div class="file_left fl">
            <p>手持身份证照</p>
          </div>
          <div class="file_right fr">
            <input type="file" accept="image/*" @change="changImg('handheldId', $event)">
            <img id="handheldId" src="" alt="">
            <i>+</i>
          </div>
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
    name: "seniorCertification",
    data() {
      return {
        idCardZ: '', //身份证正面
        idCardF: '', //身份证反面
        handheldId: '' //手持身份证照
      }
    },
    created() {
      //进入组件 判断一下是否实名认证 防止更改路由恶意更改信息
      this.$axios.post("/api/user/query_active_user")
        .then(res => {
          if(res.data.errorCode === 0) {
            if(res.data.data.authStatusAdvanced  === 2) {
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
      changImg(id, e) { //上传图片回显 //企业/组织营业执照 证件正反面
        var that = this;
        var id = id;
        for (var i = 0; i < e.target.files.length; i++) {
          var file = e.target.files.item(i);
          if (!(/^image\/.*$/i.test(file.type))) {
            continue; //不是图片 就跳出这一次循环
          }
          if(e.target.files[i].size > 5242880) { //大小不能超过5M
            this.$Message.warning('海报大小不能超过5M');
            continue
          }
          //实例化FileReader API
          var freader = new FileReader();
          freader.readAsDataURL(file);
          freader.onload = function(e) {
            document.getElementById(id).setAttribute('src',e.target.result);
            if(id === 'idCardZ') {
              that.idCardZ = e.target.result
            }
            if(id === 'idCardF') {
              that.idCardF = e.target.result
            }
            if(id === 'handheldId') {
              that.handheldId = e.target.result
            }
          }
        }
      },
      submitData() { //提交信息
        if(this.idCardZ === '') {
          this.$toast('请上传身份证正面照片');
          return;
        }
        if(this.idCardF === '') {
          this.$toast('请上传身份证反面照片');
          return;
        }
        if(this.handheldId === '') {
          this.$toast('请上传手持身份证照片');
          return;
        }
        this.$axios({
          url: "/api/user/certificationadvanced",
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          data: {
            certificateFrontPhoto: this.idCardZ, //正面
            certificateBackPhoto: this.idCardF, //反面
            certificateHandPhoto: this.handheldId, //手持
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
      },
    }
  }
</script>

<style scoped>
/*上传内容*/
ul {
  font-size: 1.4rem;
  padding: 1.4rem 1rem 0;
}
ul li {
  padding: 1.4rem 0;
}
ul li .file_left {
  width: 30%;
}
ul li .file_left p {
  line-height: 8rem;
  font-size: 1.2rem;
}
ul li .file_right {
  width: 60%;
  /*width: 18rem;*/
  height: 10rem;
  margin-right: 4%;
  border: 1px solid #f1f1f1;
  position: relative;
}
ul li  .file_right input {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 201;
  background: #FA322B;
  border-radius: 2px;
  color: #fff;
  font-style: normal;
  left: 0;
  top: 0;
  opacity: 0;
}
ul li  .file_right img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
ul li  .file_right i {
  width: 30px;
  height: 30px;
  position: absolute;
  left: calc(50% - 15px);
  top: calc(50% - 25px);
  font-size: 50px;
  color: #d1d1d1
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
