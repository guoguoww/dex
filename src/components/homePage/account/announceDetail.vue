<template>
    <div class="changeBG">
      <div class="head">
        <i class="iconfont icon-fanhui" @click="back"></i>
        <span>公告通知</span>
      </div>
      <div class="annDetailInfos">
        <p v-html="annouceContent"></p>
        <p style="text-align: right;margin-top: 1rem"><span>{{createTime}}</span></p>
      </div>
    </div>
</template>

<script>
    export default {
      name: "announceDetail",
      data(){
        return {
          curAnnouceId: '',
          annouceContent: '',
          createTime: '',
        }
      },
      mounted(){
        this.curAnnouceId = this.$route.query.listId;
        this.queryDetailInfo(this.curAnnouceId);
      },
      methods: {
        back(){
          this.$router.go(-1);
        },
        queryDetailInfo(listId){//查询公告明细
          this.$axios({
            url: '/api/user/announce/details',
            method: 'post',
            params: {
              announceId: listId,
            }
          })
            .then(res => {
              if(res.data.errorCode === 0){
                this.annouceContent = res.data.data.content;
                this.createTime = res.data.data.createTime;
              }else {
                this.$toast(res.data.errorMsg);
              }
            })
            .catch(err => {
              this.$toast(err.data.errorMsg);
            })
        },
      }
    }
</script>

<style scoped>
  .head {
    height: 4rem;
    background: #0088f1;
    color: #fff;
    text-align: center;
    padding: 0 1.2rem;
    line-height: 4rem;
    font-size: 1.2rem;
  }
  .head i {
    position: absolute;
    color: #fff;
    left: 1.2rem;
    font-size: 1.4rem;
  }
  .annDetailInfos {
    padding: 1.2rem;
    line-height: 2;
  }
</style>
