<template>
    <div class="">
        <van-nav-bar title="资产管理" left-text="返回" left-arrow>
            <van-icon class="iconfont icon-fanhui" slot="left" />
        </van-nav-bar>
        <!-- 资产的蓝色框 -->
        <div class="acc-acc">
            <div class="acc-acc-con bb-ba">
                <h5>总资产折合（BTC）</h5>
                <span style="display: inherit;">0</span>
                <span style="display: none;">******</span>
                <i class="iconfont icon-yanjing"></i>
            </div>
        </div>

        <div class="acc-list">
            <div class="acc-list-haed">
                <dl>
                    <dt>
                        <span>资产明细</span>
                    </dt>
                </dl>
            </div>

            <div class="accListTab">
            </div>
        </div>
    </div>
</template>

<script type="">
export default {
    name: "payment",
    data() {
        return {};
    },
    components: {}
};
</script>

<style scoped lang="less">
div {
    // 资产的蓝色框
    .acc-acc {
        padding: 0 1.15rem;
        padding-bottom: 0.2rem;
        background: #fff;
        .acc-acc-con {
            background: url(../../../../static/images/bb.e374aa4.png) no-repeat 0 0;
            background-size: 100% 100%;
            border-radius: 5px;
            text-align: center;
            height: 9.25rem;
            position: relative;
            > h5 {
                font-size: 12px;
                color: #d4e9ff;
                padding-top: 1.6rem;
            }
            > span {
                color: #fff;
                padding-top: 1.15rem;
                display: inline-block;
                font-weight: bolder;
            }
            > i {
                position: absolute;
                top: 0.8rem;
                right: 0.8rem;
                z-index: 1;
                color: #fff;
            }
        }
    }
    //
    .acc-list {
        padding: 0 1.6rem;
        background: #fff;
        position: absolute;
        top: 15.45rem;
        left: 0;
        right: 0;
        bottom: 4.34rem;
        z-index: 1;
        overflow-y: scroll;
        .acc-list-haed {
            border-bottom: 0.3333333333px solid #ececec;
            dl {
                display: flex;
                height: 2.89rem;
                line-height: 2.89rem;
                color: #787878;
                > dt {
                    flex: 1;
                }
            }
        }
    }
}
</style>
