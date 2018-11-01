<template>
    <div class="" style="padding-bottom: 60px;">
        <!-- 头 -->
        <div class="cc-head clear">
            <div class="head-left" @click="dropdown=!dropdown">
                <span>{{c2cdata.currency}}/CNY</span>
                <i class="iconfont icon-xialasanjiao"></i>
            </div>
            <div class="head-right">
                <div class="c1">
                    <p>￥{{Number(currencyitem.price).toFixed(3)}}</p>
                    <em class="greens">{{Number(currencyitem.diffRate).toFixed(3)}}%</em>
                </div>
                <p class="icon-bg" @click="$router.push('/notice')">
                    <span class="notenum" style="text-align: center;" v-if='unreadmsg>0'>
                        <span style="font-size: 10px !important">{{unreadmsg}}</span>

                    </span>
                </p>
            </div>
        </div>
        <!-- 买入卖出 tabbar -->
        <div class="cc-tab">
            <div class="cc-tab-top">
                <ul>
                    <li :class="{'tab-act':tabactive==1}" @click="tabactive=1">
                        <span>买入</span>
                    </li>
                    <li :class="{'tab-act':tabactive==0}" @click="tabactive=0">
                        <span>卖出</span>
                    </li>

                    <li @click="$router.push('/ccBills')">
                        <span>订单</span>
                    </li>
                </ul>
            </div>
            <div class="cc-tab-down">
                <ul>
                    <li>
                        <span>成交单数</span>
                        <!-- <i class="iconfont  icon-jiantou-copy-copy-copy"></i> -->
                    </li>
                    <li>
                        <span>单价</span>
                        <!-- <i class="iconfont  icon-jiantou-copy-copy-copy"></i> -->
                    </li>
                    <li @click.stop='paylistshow=!paylistshow' >
                        <a>
                            <span>{{payactive.name}}</span>
                            <i class="iconfont icon-xialasanjiao"></i>
                        </a>
                        <!-- 付款方式菜单 -->
                        <div class="pay-list " v-show='paylistshow'>
                            <ul>
                                
                                <li v-for='(i,index) in paylist' :key='index' @click='changepaytype(i)'>
                                    {{i.name}}
                                </li>

                            </ul>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
        <div class="cc-cont">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <van-cell v-for="(i,index) in c2clist" :key="index">
                    <div class="cc-cont-li" >
                        <ul>
                            <li>
                                <div class="cont-he">
                                    <i>{{headstr(i.nickName)}}</i>
                                    <span>{{i.nickName}}</span>
                                </div>
                                <p>成交 {{i.volume }} | 成交率 {{(i.transactionRate*100).toFixed(2) }}%</p>
                                <div class="li-img">
                                    <img src="../../../../static/images/cc2.png" v-if="i.aliPay">
                                    <img src="../../../../static/images/cc3.png" v-if="i.weChatPay">
                                    <img src="../../../../static/images/cc4.png" v-if="i.bankPay">
                                </div>
                            </li>
                            <li>
                                <h5>{{i.price}} CNY</h5>
                                <em>限额：{{i.minQuota}}-{{i.maxQuota}}CNY </em>
                                <b>数量：{{i.practicalNum}}</b>
                            </li>
                            <li>
                                <button class="lan" @click="ordershow(i)" v-if="tabactive==1">买入</button>
                                <button @click="ordershow(i)" v-else>卖出</button>
                            </li>
                        </ul>
                    </div>
                </van-cell>
                <div class="more" style="pointer-events: auto;" @click="loadmore">
                    <span v-if="c2ctotal==c2clist.length">没有更多数据</span>
                    <span v-else>加载更多</span>
                </div>
            </van-list>
        </div>
        <!-- 下单 -->
        <div class="cc-prompt" v-if="popup">
            <div class="prom-cont">
                <div class="prom-head">
                    <span>{{c2citem.direction==1?'买入':'卖出'}}{{c2citem.currencyCode}}</span>
                </div>
                <div class="prom-content">
                    <div class="content-top c2c">
                        <span>￥{{c2citem.price}}</span>
                        <p>
                            限额：{{c2citem.minQuota}}-{{c2citem.maxQuota}}CNY </p>
                    </div>
                    <div class="content-list">
                        <ul>
                            <li>
                                <input id="ordernum" min="0" placeholder="请输入数量" step="any" type="number" v-model="ordernum" @input="ordernumchange">
                                <span>{{c2citem.currencyCode}}</span>
                            </li>
                            <li>
                                <input id="ordermoney" min="0" placeholder="请输入金额" step="any" type="number" v-model="ordermoney" @input="ordermoneychange">
                                <span>CNY</span>
                            </li>
                        </ul>
                        <v-select v-if='!c2cdata.direction' multiple v-model="selected" :options="options" placeholder='请选择付款方式'>
                            <div slot="no-options">请添加付款方式!</div>
                        </v-select>
                        <div class="prom-whole">
                            <button @click='buyall'>全部{{c2citem.direction==1?'买入':'卖出'}}</button>
                        </div>
                    </div>
                    <div class="prom-but">
                        <ul>
                            <li @click.stop="popup=false">{{btntext}}</li>
                            <li @click.stop="order()">确认</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 下拉选择币种 -->
        <div class="drop-down" v-if="dropdown">
            <div class="drop-tab">
                <ul class="clear">
                    <li class="drop-active">CNY</li>
                </ul>
            </div>
            <div class="drop-nav">
                <ul class="clearfix">
                    <li v-for="(i,index) in currency" :key="index" @click="currencyitem=i;c2cdata.currency=i.code">
                        <i class="iconfont" :class="i.iconfont"></i>
                        <p>{{i.code}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div  v-if="mloading" class="m">
             <van-loading class="loading" color="white" />
            <div class="mask"></div>
         </div>
    </div>
</template>

<script type="">
export default {
    name: "c2c",
    data() {
        return {
            tabactive: 1, //tab选项
            popup: false, //弹出交易显示
            dropdown: false, //下拉显示 切换币种
            c2clist: [], //c2c广告列表
            c2ctotal:0,//广告总数
            c2citem:{},
            c2cdata: {
                start: 0,
                rows: 10,
                direction: 1, //方向 1 买入 0 卖出
                currency: "", //币种
                payType:''//支付方式
            },
            currency: [//选择货比
                // { name: "BTC", iconfont: "icon-icon5" },
                // { name: "ETH", iconfont: "icon-icon6" },
                // { name: "USDT", iconfont: "icon-icon8" },
                
            ],
            paylist:[//付款方式列表
                {name:'全部' ,type:''},
                {name:'银行卡' ,type:'2'},
                {name:'支付宝' ,type:'0'},
                {name:'微信' ,type:'1'},
            ],
            payactive:{name:'全部' ,type:''},//当前付款方式
            currencyitem:{},//当前选择货比
            ordernum:0,//交易数量
            ordermoney:0,//交易金额
            unreadmsg:0,//未读消息
            popuptimer:null,//交易定时器
            btntext:'40秒取消',//按钮文字
            options: [//select选项
            // {id: '1', label: '支付宝'},
            // {id: '2', label: '微信'},
            // {id: '3', label: '银行卡'},
            ],
            selected:[],//select选中
            loading:false,
            finished:true,//停止加载
            paylistshow:false,//显示付款方式
            mloading:false,//loading 是否显示
        };
    },
    components: {},
    computed: {
    },
    watch: {
        tabactive(v) {//监测买入还是卖出
            this.c2clist=[]
            this.c2cdata.start=0
            this.getc2clist();
            this.c2cdata.direction = v;
        },
        'c2cdata.currency'(){//监测币种
        this.dropdown=false
        this.c2clist=[]
            this.getc2clist();
        },
        ordernum(v){//监视交易数量
            // this.ordermoney=this.tofixed(v*this.c2citem.price,2)
            // this.ordermoney=v*this.c2citem.price
        //    this.ordermoney= this.accMul(v,this.c2citem.price)
        },
        ordermoney(v){//监测交易金额
            // this.ordernum=this.tofixed(v/this.c2citem.price,6)
            // this.ordernum=v/this.c2citem.price
            // this.ordernum=this.accDiv(v,this.c2citem.price)
        }
    },
    created() {
        // this.getc2clist();
        this.getusermsg()
        this.getcurrency()
        
    },
    methods: {
        // 交易数量改变
        ordernumchange(){
            // this.ordermoney=this.tofixed(this.ordernum*this.c2citem.price,2)
            // this.ordermoney=this.accMul(this.ordernum,this.c2citem.price)
            var num = "" + this.ordernum;
                var result = num.substring(0, num.indexOf(".") + 7);
                var str = num.split(".");
                if (str.length == 2 && str[1] != undefined && str[1] != "" && str[1].length >= 6) {
                    // var inputElement = document.getElementById("ordernum");
                    // inputElement.value = result;
                    this.ordernum = parseFloat(result);
                }
                //计算金额四舍五入保留两位小数
                this.ordermoney = (this.ordernum * this.c2citem.price).toFixed(2);
        },
        //交易金额改变
        ordermoneychange(){
            // this.ordernum=this.tofixed(this.ordermoney/this.c2citem.price,6)            
            // this.ordernum=this.accDiv(this.ordermoney,this.c2citem.price)
                var charge = "" + this.ordermoney;
                var result = charge.substring(0, charge.indexOf(".") + 3);
                var str = charge.split(".");
                if (str.length == 2 && str[1] != undefined && str[1] != "" && str[1].length >= 2) {
                    // var inputElement = document.getElementById("ordermoney");
                    // inputElement.value = result;
                    this.ordermoney = parseFloat(result);
                }
                this.ordernum = this.ordermoney / this.c2citem.price;
                var num = this.ordernum + "";
                num = num.substring(0, num.indexOf(".") + 7);
                this.ordernum = parseFloat(num);

        },
         accMul(arg1, arg2) {//精确乘法
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        accDiv(arg1, arg2) {//精确除法
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
            }
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * Math.pow(10, t2 - t1);
        },
        loaded(){//加载完成
            this.finished=true
            //this.$toast('没有更多了')
        },
        onLoad(){//滚动加载
            // setTimeout(() => {
            //     this.c2cdata.start+=this.c2cdata.rows
            //     this.getc2clist()
            // }, 500);
        },
        getPayList() { //获取支付列表
        // if (!this.$cookie.get('_auth')) {
        //     return
        // }
        this.$axios({
          url: "/api/user/paymentreceived",
          method: "post",
          params: {
            start: 0,
            rows: 100,
          }
        }).then(res => {
          if(res.data.errorCode === 0) {
            for(var i=0; i<res.data.page.data.length;i++) {
              switch (res.data.page.data[i].type) {
                case '0':
                  res.data.page.data[i].type = '支付宝'
                    break;
                case '1':
                  res.data.page.data[i].type = '微信'
                  break;
                case '2':
                  res.data.page.data[i].type = '银行卡'
                  break;
              }
              this.options.push({
                id: res.data.page.data[i].id,
                label: res.data.page.data[i].type + ':' + res.data.page.data[i].account,
              })
            }
          }
        })
      },
        getc2clist() {
            //获取c2c广告列表
            if (this.c2cdata.payType=='') {
                this.c2cdata.payType=undefined
            }
            this.$axios({
                url: "api/trade/c2c/advertisement_list",
                method: "post",
                data: this.c2cdata,
            })
                .then(res => {
                    if (!res.data.errorCode) {
                        this.mloading=false
                        this.c2clist =  [...this.c2clist , ...res.data.page.data];
                        this.c2ctotal= res.data.page.total
                        // this.loading=false
                        // if (!res.data.page.data.length) {
                        //     this.loaded()
                        // }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        ordershow(i){//显示预交易  
            if (!this.$cookie.get('_auth')) {
                this.$router.push('/login')
                return
            }  
            this.getPayList()
            this.ordermoney=0
            this.ordernum=0
            this.countdown()    
            this.c2citem=i
            console.log(i);
            this.popup=true
        },
         tofixed(num,x){//保留x位小数
        //   console.log(Number(num).toFixed(2));
          return Number(num).toFixed(x)
      },
      buyall(){//全部买入
        this.ordernum=this.c2citem.practicalNum
        this.ordernumchange()
      },
      order(){//下单
      if (!this.ordermoney||!this.ordernum) {
          this.$toast('订单小于最小限额')
      }
      var payType=''
      if (!this.c2cdata.direction) {
          payType=[]
          this.selected.forEach((val,index) => {
            console.log(val.id);
              payType.push(val.id)
          });
          console.log(payType.join(','));
          payType=payType.join(',')
      }
        this.$axios.post('api/trade/c2c/place_order',{
            advertisementId:this.c2citem.id,
            money:parseInt(this.ordermoney) ,
            payType
        }).then(res=>{
            console.log(res);
            if (!res.data.errorCode) {
                this.$toast('下单成功!')
                this.$router.push(`/buy/${res.data.data}`)
            }
        }).catch(err=>{

        })
      },
      getusermsg(){//获取未读消息
        if (this.$cookie.get('_auth')) {
            this.$axios.post('api/user/user_unread_message_total').then(res=>{
            if (!res.data.errorCode) {
                this.unreadmsg=res.data.data
            }
          }).catch(err=>{

          })
        }
          
      },
        countdown() {
            //倒计时
            console.log(this.popuptimer);
            clearInterval(this.popuptimer)
            this.popuptimer=null
            var text = this.btntext;
            var num = 40;
            // this.codedisable = true;
            this.btntext = `${num--}秒取消`;
            this.popuptimer = setInterval(() => {
                this.btntext = `${num--}秒取消`;
                if (num < 0) {
                    this.btntext = text;
                    this.popup = false;
                    clearInterval(this.popuptimer);
                }
            }, 1000);
        },
        getcurrency(){//获取货比列表
            this.$axios.post('api/trade/currency_list').then(res=>{
                if (!res.data.errorCode) {
                    this.currency=res.data.data
                    this.currencyitem=res.data.data[0]
                    this.c2cdata.currency=this.currencyitem.code
                }
            }).catch(err=>{

            })
        },
        changepaytype(i){//切换付款方式
            console.log();
            this.payactive=i
            this.c2cdata.start=0
            this.c2cdata.payType=i.type
            this.c2clist=[]
            this.getc2clist()
        },
        headstr(str='--'){//获取头像字符串
           return str.substr(0,1)
        },
        // 加载更多
        loadmore(){
            if (this.c2ctotal==this.c2clist.length) {
                return
            }
            this.mloading=true
            this.c2cdata.start+=this.c2cdata.rows
            this.getc2clist()
        }
    }
};
</script>

<style scoped lang="less">
div {
    position: relative;
    // 头
    .cc-head {
        height: 3.6rem;
        background: #0088f1;
        padding: 0 0.5rem 0 1rem;
        color: #fff;
        position: relative;
        z-index: 3;
        display: flex;
        .head-left {
            width: 40%;
            font-size: 1.6rem;
            display: flex;
            height: 3.6rem;
            line-height: 3.6rem;
            > i {
                font-size: 1.6rem;
                padding-left: 1rem;
            }
        }
        .head-right {
            display: flex;
            justify-content: space-between;
            width: 60%;
            padding: 0 0.56rem;
            .c1 {
                display: flex;
                line-height: 3.6rem;
                height: 3.6rem;
                width: 70%;
                justify-content: space-around;
                > p {
                    padding-right: 1rem;
                    font-size: 1.3rem;
                }
            }
            .icon-bg {
                background: url(../../../../static/images/c2cnote.png) no-repeat;
                background-size: 25px 25px;
                background-position: 10px;
                width: 3rem;
                height: auto;
                .notenum {
                    width: 1.4rem;
                    height: 1.4rem;
                    background-color: red;
                    border-radius: 50%;
                    margin-top: .4rem;
                    margin-left: 25px;
                    line-height: 1.4rem;
                    display: inline-block;
                }
            }
        }
    }
    // 买入卖出tabbar
    .cc-tab {
        margin-top: 0.5rem;
        background: #fff;
        .cc-tab-top {
            border-bottom: 0.6666666667px solid #c8c8c8;
            height: 2.8rem;
            line-height: 2.8rem;
            > ul {
                display: flex;
                > li {
                    flex: 1;
                    text-align: center;
                    > span {
                        color: #0088f1;
                        line-height: 2.67rem;
                        box-sizing: border-box;
                        display: inline-block;
                        padding: 0 0.8rem;
                        font-size: 1.3rem;
                    }
                }
                .tab-act > span {
                    border-bottom: 1.3333333333px solid #0088f1;
                }
            }
        }
        .cc-tab-down {
            height: 2.5rem;
            line-height: 2.5rem;
            color: #b4b4b4;
            > ul {
                display: flex;
                > li {
                    font-size: 12px;
                    flex: 1;
                    text-align: center;
                    position: relative;
                    > i {
                        font-size: 12px;
                    }
                    // 付款方式菜单
                    .pay-list {
                        position: absolute;
                        top: 2.8rem;
                        left: 50%;
                        z-index: 2;
                        -webkit-box-shadow: 0 0.3rem 0.6rem #c4d5ed;
                        box-shadow: 0 0.3rem 0.6rem #c4d5ed;
                        border-radius: 0.3rem;
                        background: #fff;
                        margin-left: -3rem;
                        li {
                            text-align: center;
                            line-height: 2.8rem;
                            width: 6rem;
                        }
                    }
                }
            }
        }
    }
    // 主要内容
    .cc-cont {
        .more{
            text-align: center;
            margin-top: 6px;
            font-size: 1rem;
        }
        .cc-cont-li {
            background: #fff;
            margin-top: 0.2rem;
            // padding: 1rem 2rem;
            line-height: 20px;
            > ul {
                display: flex;
                > li:first-child,
                li:nth-child(2) {
                    flex: 2;
                }
                > li:nth-child(3) {
                    flex: 0.9;
                }
                li {
                    > * {
                        font-size: 10px;
                    }
                    > p {
                        color: #9a9aaa;
                        // padding: 0.5rem 0;
                    }
                    .li-img > img {
                        width: 15px;
                        height: 15px;
                    }
                    > h5 {
                        font-size: 1.1rem;
                        color: #000;
                        font-weight: bolder;
                        // padding: 0.5rem 0;
                    }
                    > em {
                        color: #b4b4b4;
                    }
                    b {
                        color: #b4b4b4;
                        display: block;
                        // padding-top: 0.5rem;
                        font-weight: normal;
                    }
                    button {
                        width: 4.5rem;
                        height: 2rem;
                        border-radius: 5px;
                        background: #ff3b3b;
                        outline: none;
                        color: #fff;
                        border: 0;
                        margin-top: 1.5rem;
                    }
                    .lan {
                        background: #0088f1 !important;
                    }
                    .cont-he {
                        > span {
                            color: #9a9aaa;
                            font-weight: bolder;
                        }
                        > i {
                            display: inline-block;
                            width: 1.8rem;
                            height: 1.8rem;
                            border-radius: 50%;
                            background: #0088f1;
                            color: #fff;
                            line-height: 1.8rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    // 下单弹出窗口
    .cc-prompt {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 8;
        background: rgba(0, 0, 0, 0.4);
        .prom-cont {
            width: 22.85rem;
            background: #fff;
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -11.42rem;
            margin-top: -13.3rem;
            padding: 0 1.2rem;
            box-sizing: border-box;
            transform: scale(1);
            transition-duration: 0.2s;
            animation: popup 0.2s linear;
            .prom-head {
                color: #000;
                font-weight: bolder;
                height: 2.89rem;
                line-height: 2.89rem;
                border-bottom: 0.66px solid #c8c8c8;
            }
            .prom-content {
                .content-top {
                    padding-top: 1.9rem;
                    text-align: right;
                    > span {
                        font-weight: bolder;
                    }
                    > p {
                        color: #b4b4b4;
                        padding-top: 1rem;
                    }
                }
                .c2c {
                    background: url(../../../../static/images/cc1.png) no-repeat 0.5rem
                        2.14rem;
                    background-size: 2.14rem 2.1rem;
                }
                .content-list {
                    padding-top: 1.7rem;
                    li {
                        height: 2.3rem;
                        overflow: hidden;
                        line-height: 2.3rem;
                        margin-bottom: 0.7rem;
                        border: 0.66px solid #e5e5e5;
                        border-radius: 5px;
                        box-sizing: border-box;
                        > input {
                            padding-left: 0.8rem;
                            border: 0;
                            height: 2.19rem;
                            outline: none;
                            float: left;
                        }
                        > span {
                            float: right;
                            padding: 0 1rem;
                            font-weight: bolder;
                            border-left: 1px solid #c8c8c8;
                            display: inline-block;
                            height: 1rem;
                            line-height: 1rem;
                            margin-top: 0.5rem;
                        }
                    }
                    .prom-whole {
                        height: 2.6rem;
                        text-align: right;
                        > button {
                            outline: none;
                            background: #fff;
                            color: #0088f1;
                            border: 0;
                            margin-top: 0.4rem;
                        }
                    }
                }
                .prom-but {
                    padding: 0.7rem 0 1rem;
                    > ul {
                        display: flex;
                        li {
                            flex: 1;
                            height: 2.7rem;
                            text-align: center;
                            color: #939393;
                            border-top: 0.66px solid #c8c8c8;
                            border-right: 0.66px solid #c8c8c8;
                            line-height: 2.7rem;
                            box-sizing: border-box;
                        }
                        li:last-child {
                            border-right: 0;
                        }
                    }
                }
            }
        }
    }

    @keyframes popup {
        0% {
            -webkit-transform: scale(0.2);
            transform: scale(0.2);
        }
        to {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    .drop-down {
        background: rgba(255, 255, 255, 0.9);
        padding-top: 1.15rem;
        position: absolute;
        top: 3.7rem;
        left: 0;
        width: 100%;
        z-index: 2;
        -webkit-box-shadow: 0 7px 7px #d3d1d2;
        box-shadow: 0 7px 7px #d3d1d2;
        transition-duration: 0.2s;
        .drop-tab {
            background: rgba(0, 180, 255, 0.1);
            height: 2.3rem;
            > ul {
                padding: 0 1.15rem;
                > li {
                    line-height: 2.3rem;
                    float: left;
                    width: 3.76rem;
                    font-size: 1.1rem;
                    color: #9eaab8;
                    text-align: center;
                }
                .drop-active {
                    color: #0088f1 !important;
                }
            }
        }
        .drop-nav li {
            width: 33.3%;
            float: left;
            text-align: center;
            color: #9eaab8;
            padding-top: 2rem;
            > i {
                font-size: 3.5rem;
            }
            > p {
                font-size: 1rem;
                padding: 0.5rem 0;
            }
        }
    }
}
</style>
