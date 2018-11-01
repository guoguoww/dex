<template>
    <div class="">
        <div class="border-table">
            <table border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td>时间</td>
                        <td>币种</td>
                        <td>方向</td>
                        <td>单价</td>
                        <td>数量</td>
                        <td>总价</td>
                        <!-- <td>操作</td> -->
                    </tr>
                    <tr class="item" v-for="(i,index) in entrustlist" :key="index">
                        <td>{{i.createTime}}</td>
                        <td>{{i.symbol}}</td>
                        <td>{{i.direction==0?'买入':'卖出'}}</td>
                        <td>{{i.unitPrice}}</td>
                        <td>{{i.orderQuantity}}</td>
                        <td>{{i.orderPrice}}</td>
                        <!-- <td>操作</td> -->
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script type="">
export default {
    name: "entrust",
    data() {
        return {
            entrustlist: [] //当前委托列表
        };
    },
    components: {},
    created() {
        this.getentrust();
    },
    methods: {
        getentrust() {
            //查询交易委托
            this.$axios
                .post("api/trade/coin/query_entrust", {
                    start: 0,
                    rows: 10,
                    status: 0
                })
                .then(res => {
                    if (!res.data.errorCode) {
                        this.entrustlist = res.data.page.data;
                    }
                })
                .catch(err => {});
        }
    }
};
</script>

<style scoped lang="less">
// 当前委托
.border-table table {
    width: 100%;
    td {
        text-align: center;
        padding: 0.7rem 0;
        background: #fff;
        font-size: 1rem;
        border-bottom: 0.66px solid #f9fafc;
    }
    .item td {
        padding: 0.2rem 0;
    }
}
</style>
