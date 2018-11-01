<template>
  <div class="">
    <div class="sign-head" style="pointer-events: auto;">
      <router-link to="/" tag="div"><span>取消</span></router-link>
    </div>
    <div class="sign-logo" style="pointer-events: auto;">
      <img src="../../../static/images/logo.png">
    </div>
  </div>
</template>

<script type="">
export default {
    name: "sign-head",
    data() {
        return {};
    },
    components: {}
};
</script>

<style scoped lang="less">
div {
    .sign-head {
        height: 9.1rem;
        background: url(../../../static/images/sign-head.png);
        background-size: 100% 100%;
        position: relative;
        span {
            display: inline-block;
            padding: 1.4rem 0 0 1.4rem;
            font-size: 1.2rem;
            color: #fff;
        }
    }
    .sign-logo {
        padding: 3.2rem 0 2rem;
        text-align: center;
        img {
            height: 2.8rem;
        }
    }
}
</style>
