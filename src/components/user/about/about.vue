<template>
    <div class="changeBG">
      <!--头部-->
      <van-nav-bar title="关于我们" left-text="返回" left-arrow @click-left="$back()">
        <van-icon class="iconfont icon-fanhui" slot="left" />
      </van-nav-bar>
      <div class="about_con">
        <img src="../../../../static/images/logo.png" alt="">
        <br>
        <!-- <span>版本号: 1.3.2</span> -->
        <!--内容-->
        <h3>DSDEX致力于数字资产在全球的普及与发展</h3>
        <p>
DSDEX, 面向全球提供比特币、以太坊、莱特币、柚子（EOS）等多种数字资产交易服务，是安全可信赖的数字资产交易网。

平台使用多重技术安全防护打造金融级别的专业数字资产交易网， 致力于为数字资产投资爱好者创造一个安全、舒适、快捷的交易渠道，使投资者可以放心交易。

公司核心成员由拥有长期的互联网和金融领域产品研发和运营经验及具有国际化视角的专业人士组成， 从领导层到一线员工均秉承“用心服务每一刻”的理念，以用户需求为导向，以提升用户体验为核心，为全球 用户提供最可靠、最便捷的数字资产服务。
        </p>
      </div>

    </div>
</template>

<script>
  export default {
    name: "about",
    methods: {

    }
  }
</script>

<style scoped>
  .about_con {
    width: 100%;
    text-align: center;
  }
  .about_con img {
    width: 6rem;
    margin: 1.4rem 0 1rem;
  }
  .about_con span {
    font-size: 1.4rem;
    color: #787878;
  }
  .about_con p {
    padding: 1.4rem;
    color: #000;
    text-indent: 2em;
    text-align: left;
    font-size: 1.3rem;
  }
</style>
