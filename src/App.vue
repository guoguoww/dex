<template>
  <div id="app">
    <router-view/>
    <lg-preview></lg-preview>
    <footerC  v-show="!$route.meta.hidenav"></footerC>
  </div>
</template>

<script>
  import footerC from './components/common/footer/ComFooter'
  export default {
    name: 'App',
    components: {
      footerC
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    background: #f7f8f9;
    /*padding-bottom: 61px;*/
    /*min-height: calc(100% - 61px);*/
    /*position: relative;*/
    /*overflow: hidden;*/
  }
  .changeBG {
    position: absolute;
    width: 100%;
    background: #fff;
    padding-bottom: 61px;
  }
  /*@media screen and (min-width: 640px){*/
    /*#app {*/
      /*max-width: 54rem;*/
      /*margin: auto;*/
    /*}*/
  /*}*/

</style>
