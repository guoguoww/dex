<template>
    <div class="">
        <van-nav-bar title="系统通知" left-text="关闭" right-text="全部已读" class="noticehead" style="color:#fff;" @click-left='$back' @click-right="readall">
            <!-- <van-icon class="iconfont icon-fanhui" slot="left" /> -->
        </van-nav-bar>
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <van-cell class="box-inform ng-star-inserted" v-for="(i,index) in msglist" :key="index" @click="read(i)">
                <div class="i-f">
                    <p class="ccccc">
                        <img height="12px" src="../../../..//static/images/r.png" width="12px" v-if="i.readStatus">
                        <img height="12px" src="../../../..//static/images/ar.png" width="12px" v-else>
                    </p>

                    <div class="s2" :class="{'nr':!i.readStatus}">
                        {{i.title }}
                        <!-- <p class="s2" :class="{'nr':!i.readStatus}">
                            {{i.content }}
                        </p> -->
                    </div>

                </div>
                <div class="s3 " :class="{'nr':!i.readStatus}">{{i.createTime}}</div>
            </van-cell>
            <!-- <div class="more" style="pointer-events: auto;" @click="loadmore">
                <span v-if="msgtotal==msglist.length">没有更多数据</span>
                <span v-else>加载更多</span>
            </div> -->
            <div class="box-inform" @click="loadmore">
                <button  v-if="msgtotal==msglist.length">没有更多数据</button>
                <button  v-else>加载更多</button>
            </div>
        </van-list>
         <div  v-if="mloading" class="m">
             <van-loading class="loading" color="white" />
            <div class="mask"></div>
         </div>
    </div>
</template>

<script type="">
export default {
    name: "notice",
    data() {
        return {
            msglist: [], //消息列表
            msgtotal: 0, //消息总数
            loading: false,
            finished: true,
            mloading:false,//loading 是否显示
            start: 0,
            rows: 10
        };
    },
    components: {},
    created() {
        this.getmsg();
    },
    methods: {
        onLoad() {
            // setTimeout(() => {
            //     this.start += this.rows;
            //     this.getmsg();
            // }, 500);
        },
        loaded() {
            //加载完成
            this.finished = true;
            //this.$toast('没有更多了')
        },
        getmsg() {
            //获取消息
            this.$axios.post("api/user/query_user_message", {
                    start: this.start,
                    rows: this.rows
                })
                .then(res => {
                    if (!res.data.errorCode) {
                        this.mloading=false
                        this.msglist = [...this.msglist,...res.data.page.data];
                        this.msgtotal = res.data.page.total;
                        this.loading = false;
                        if (!res.data.page.data.length) {
                            this.loaded();
                        }

                    }
                })
                .catch(err => {});
        },
        read(i){
            if (i.readStatus == 0) {
                this.$axios.get(`api/user/read_message?messageIds=${i.id}`)
            }
            this.$router.push(`/buy/${i.content}`)
        },
        readall() {
            //消息全部已读
            var arr = [];
            this.msglist.forEach(function(i, index) {
                if (i.readStatus == 0) {
                    console.log(i);
                    arr.push(i.id);
                }
            });
            if (!arr.join(",").length) {
                return;
            }
            this.$axios
                .get(`api/user/read_message?messageIds=${arr.join(",")}`)
                .then(res => {
                    if (!res.data.errorCode) {
                        this.start = 0;
                        this.msglist = [];
                        this.getmsg();
                    }
                })
                .catch(err => {});
        },
        // 加载更多
        loadmore() {
            if (this.msgtotal == this.msglist.length) {
                return;
            }
            this.start += this.rows;
            this.mloading=true
            this.getmsg();
        }
    }
};
</script>

<style scoped lang="less">

.box-inform {
    background: #fff;
    padding: 0.4rem;
    text-align: center;
    border-bottom: none;
    button{
        color: #0088f1;
        border: none !important;
        background: #fff;
        font-size: 15px;
        font-family: inherit;
        font-style: inherit;
        font-variant: inherit;
        line-height: 1;
        text-transform: none;
        cursor: pointer;
        -webkit-appearance: button;
    }
}
.more {
    text-align: center;
    margin-top: 6px;
    font-size: 1rem;
}
.noticehead {
    background-color: #0088f1;
}
.box-inform {
    background: #fff;
    padding: 1.25rem;
    border-bottom: 3px solid #eeeff0;
    .i-f {
        display: flex;
        .ccccc {
            width: 5%;
            height: 50px;
            line-height: 15px;
            margin-right: 0.03rem;
            > img {
                width: 12px;
                height: 12px;
            }
        }
        .s2 {
            line-height: 1.56rem;
            width: 100%;
        }
    }
    .s3 {
        text-align: right;
        padding-top: 0.93rem;
    }
    .s2,
    .s3 {
        color: rgb(150, 150, 150);
        font-size: 13px;
        letter-spacing: 0.09rem;
        > p {
            text-indent: 2rem;
        }
    }
    .nr {
        color: #000;
    }
}
</style>
