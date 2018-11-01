<template>
    <div class="">
        <van-nav-bar title="历史成交" left-text="返回" left-arrow class="blue" style="color:#fff;" @click-left='$back'>
            <van-icon class="iconfont icon-fanhui" slot="left" />
        </van-nav-bar>
                    <!-- 最新成交 -->
            <div class="coin-new">
              <!-- <h6>最新成交</h6> -->
              <table border="0" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr>
                    <td>价格</td>
                    <td>数量</td>
                    <td>时间</td>
                  </tr>
                  <tr v-for="(i,index) in latestdeal" :key="index">
                    <td>{{i.transactionPrice }}</td>
                    <td>{{i.volumes}}</td>
                    <td>{{i.createTime}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
    </div>
</template>

<script type="">
export default {
    name: "tradehistory",
    data() {
        return {
            latestdeal:[]
        };
    },
    components: {},
    created () {
      this.getlatestdeal()  
    },
    methods: {
        getlatestdeal(){//获取最新交易
            this.$axios.post('api/trade/coin/history',{
                start:0,
                rows:100
            }).then(res=>{
                if (!res.data.errorCode) {
                    this.latestdeal=res.data.page.data
                }
                console.log(this.latestdeal);
                
            }).catch(err=>{

            })
        }
    }
};
</script>

<style scoped lang="less">
.blue{
    background: #0088f1;
    color: #fff;
}

.iconfont{
    color: #fff
}
    // 最新成交
    .coin-new {
        padding: 0 1.5rem;
        > h6 {
            border-bottom: 0.66px solid #d4d4d4;
            line-height: 2.66rem;
            font-size: 1.1rem;
        }
        > table {
            width: 100%;
            tr:first-child td {
                font-size: 11.66px;
                line-height: 1.9rem;
                text-align: left;
                width: 25%;
                text-align: center;
            }
        }
    }
</style>
