<template>
    <div class="" style="padding-bottom: 65px;">
        <van-nav-bar left-arrow class="bar" @click-left=back>
            <van-icon style="color:#fff;" class="iconfont icon-fanhui" slot="left" />
        </van-nav-bar>
        <!-- 卖家详情 头 -->
        <div class="det-head-down">
            <div class="down-left clear">
                <div class="down-portrait">
                    {{headstr(otherparty())}}
                </div>
                <div class="down-name">
                    <span>
                        <!-- 判断是否是买入 -->
                        {{otherparty()}}
                    </span>
                    <!-- <p>
                        近30日成交0
                    </p> -->
                </div>
            </div>
            <div class="down-right clear">
                <div class="down-eva">
                    <h4>
                    </h4>
                    <p>
                    </p>
                </div>
                <div class="down-eva">
                    <h4>
                    </h4>
                    <p>
                    </p>
                </div>
            </div>
        </div>
        <!-- 交易详情 -->
        <!-- 买家交易详情 -->
        <div class="det-money" v-if="buyer()">
            <div class="money-left">
                <span>交易金额</span>
                <h5>
                    {{order.orderPrice}}
                    <i>CNY</i>
                </h5>
                <em>交易价格：{{order.unitPrice}} CNY/{{order.currency }}</em>
                <p>交易数量：{{order.orderQuantity}} {{order.currency }}</p>
            </div>
            <div class="money-right">
                <span># {{order.serialNo}}</span>
                <h5>{{codeformat(order.status)}}</h5>
                <em>
                    付款参考号：
                    <i class="rem-red">
                        {{order.id }}
                    </i>
                </em>
                <!--  -->
                <p v-if="!timeout||order.status==0">
                    剩余付款时间
                    <i>{{minutes}}分{{seconds}}秒</i>
                </p>
            </div>
        </div>
        <!-- 卖家交易详情 -->
        <div class="det-money" v-else>
            <div class="money-left">
                <p>购买人:{{m(base64(order.direction==1?order.traderMobile:order.firstPartyMobile))}}</p>
                <span>交易金额</span>
                <h5>
                    {{order.orderPrice}}
                    <i>CNY</i>
                </h5>
                <em>交易价格：{{order.unitPrice}} CNY/{{order.currency }}</em>
                <p>交易数量：{{order.orderQuantity}} {{order.currency }}</p>

            </div>
            <div class="money-right">
                <span># {{order.serialNo}}</span>
                <h5>{{codeformat(order.status)}}</h5>
                <em>
                    付款参考号：
                    <i class="rem-red">
                        {{order.id }}
                    </i>
                </em>
                <p v-if="order.sellTime">付款时间:{{order.sellTime}}</p>
                <p>订单时间:{{order.createTime}}</p>
            </div>
        </div>
        <!-- 支付方式 -->
        <div class="det-payment" v-if="buyer()">
            <h6>
                支付方式
            </h6>
            <ul>

                <li v-if="order.aliPayAccount">
                    <img src="../../../../static/images/cc2.png">
                    <div class="pay-cont">
                        <input id="ali" readonly="readonly" type="text" v-model="order.aliPayAccount">
                        <span>
                            {{order.sellerName}}
                        </span>
                        <i class="iconfont icon-icon- alikey"  @click="copytxt('ali')">
                        </i>
                    </div>
                    <i class="iconfont icon-iconfonterweima" v-preview="imgurl(order.aliPayQrCode)">
                    </i>
                </li>

                <li v-if="order.wxPayAccount">
                    <img src="../../../../static/images/cc3.png">
                    <div class="pay-cont">
                        <input id="wx" readonly="readonly" type="text" v-model="order.wxPayAccount">
                        <span>
                            {{order.sellerName}}
                        </span>
                        <i class="iconfont icon-icon- wxkey" @click="copytxt('wx')">
                        </i>
                    </div>
                    <i class="iconfont icon-iconfonterweima" v-preview="imgurl(order.wxPayQrCode)"  preview-nav-enable="false">
                    </i>
                </li>

                <li v-if="order.bankNo">
                    <img src="../../../../static/images/cc4.png">
                    <div class="pay-cont">
                        <input id="bank" readonly="readonly" type="text" v-model="order.bankNo">
                        <span>
                            {{order.sellerName}}
                        </span>
                        <i class="iconfont icon-icon- bankkey" @click="copytxt('bank')">
                        </i>
                        <p>开户银行：{{order.bankName}} {{order.openBankName}}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 交易说明 -->
        <div class="det-remind" v-if="buyer()">
            <h6 style="font-size: 12px">
                交易说明:
            </h6>
            <p>
                ▪ 订单有效时间为15分钟，请您及时在有效期内付款并点击 【我已付款】 按钮 ，卖家确认后将会释放数字货币给您
            </p>
            <p>
                ▪ 如果买方当日取消订单达3次，将会被限制当日买入 功能
            </p>
            <p>
                ▪ 开始交易后数字货币由中心托管，请放心下单。
            </p>
            <h6 style="font-size: 12px;color:red">
                交易备注：
            </h6>
            <p class="rem-red">
                ▪ 付款时请备注（付款参考号）以加快确认速度
            </p>
            <p class="rem-red">
                ▪ 请勿在汇款备注内填写比特币、BTC、ETH、USDT等数字货币 有关字样，防止您的汇款被银行拦截，甚至账号被冻结
            </p>
            <!-- 如果买家是交易员 -->
            <p class="rem-red" v-if="order.firstPartyId!=JSON.parse($cookie.get('_auth')).userId">
              ▪ 您是交易员,实际支付{{order.orderPrice*0.98}}CNY。
            </p>
        </div>
        <div class="det-remind" v-else>
            <h6 style="font-size: 12px">
                交易备注:
            </h6>
            <!-- 如果卖家是交易员 -->
            <p v-if="order.firstPartyId==JSON.parse($cookie.get('_auth')).userId">
              ▪ 您需要支付2%的手续费,实际到账{{order.orderPrice*0.98}}CNY。
            </p>
            <!-- <p>
                ▪ 如果买方当日取消订单达3次，将会被限制当日买入 功能
            </p>
            <p>
                ▪ 开始交易后数字货币由中心托管，请放心下单。
            </p>
            <h6 style="font-size: 12px;color:red">
                交易备注：
            </h6>
            <p class="rem-red">
                ▪ 付款时请备注（付款参考号）以加快确认速度
            </p>
            <p class="rem-red">
                ▪ 请勿在汇款备注内填写比特币、BTC、ETH、USDT等数字货币 有关字样，防止您的汇款被银行拦截，甚至账号被冻结
            </p> -->
        </div>

        <!-- 底栏 -->
        <div class="det-foot">
            <ul>
                <li>
                    <i class="iconfont icon-icon-1">
                    </i>
                    <em style="display: none;">
                    </em>
                </li>
                <template v-if="buyer()">
                    <li  v-if="order.status==0" @click="cancelorder">
                        取消订单
                    </li>
                    <li  v-if="order.status==0" @click="pay">
                        已付款
                    </li>
                    <li  @click='back' v-if="order.status!=0">
                        返回
                    </li>
                </template>
                <template v-else>
                    <li  v-if="order.status==0" @click="cancelorder2">
                        取消订单
                    </li>
                    <li  v-if="order.status==1" @click="collect">
                        确认收款
                    </li>
                    <li  @click='back' v-if="order.status!=0">
                        返回
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script type="">
export default {
    name: "buy",
    data() {
        return {
            order:{},//订单
            minutes:0,//剩余付款时间
            seconds:0,
            timer:null,
            timeout:false,//付款是否超时
            timeouttimer:null,//超时定时器
            f:false,//是否弹出过
        };
    },
    components: {},
    created () {
      this.getorder() 
      console.log();
       
    },
    destroyed () {
        clearInterval(this.timer)
        this.timer=null
        clearInterval(this.timeouttimer)
        this.timeouttimer
    },
    methods: {
        headstr(str='--'){//获取头像字符串
           return str.substr(0,1)
        },
        otherparty(){//显示对方
            return this.buyer()?this.order.nickName:this.m(this.base64(this.order.traderMobile))
        },
        buyer(){//判断是否是买家
           var id=JSON.parse(this.$cookie.get('_auth')).userId //用户
            var orderid=this.order.firstPartyId //交易员id
            if (this.order.direction==0) {//对用户来说买入
                if (id==orderid) {//卖家==交易员
                    return true
                }else{//买家==用户
                    return false
                }
            }else{//对用户来说卖出
                if (id==orderid) {//买家==交易员
                    return false
                }else{//卖家==用户
                    return true
                }

            }
        },
        codeformat(status){//状态
            if (status==0) {
                return '未付款'
            }else if(status==1){
                return '已付款'
            }else if(status==2){
                return '已完成'
            }else if(status==3){
                return '已取消'
            }
        },
        settimer(){//设置定时器

            if (this.timer) {
                clearInterval(this.timer)
                this.timer=null
                this.gettime()
            }
            this.gettime()
           this.timer=setInterval(()=>{
                this.gettime()
            },1000)
        },
        gettime(){//获取剩余付款时间
            
           var t=(+(new Date(this.order.createTime.replace(/-/g, "/")).getTime()+ 15 * 60 * 1000))-new Date().getTime()
           console.log(t);
           if (t>0) {
               var hours = Math.floor( t / 3600000)
                this.minutes = Math.floor((t % 3600000) / 60000);
                this.seconds = Math.floor((t % 60000 ) / 1000);
                // console.log(hours,minutes,seconds);
           }else{
                clearInterval(this.timer)
               this.timer=null
               this.timeout=true
               this.timeouttimer=setInterval(()=>{
                    this.getorder()
               },1000)
               
           }   
        },
        getorder(){//获取订单
            this.$axios.post(`api/trade/c2c/get_order?tradeId=${this.$route.params.id}`).then(res=>{
                if (!res.data.errorCode) {
                    this.order=res.data.data
                    if (this.order.status==0&&this.buyer()) {
                        if (!this.f) {
                          this.alertid()  
                          this.f=true
                        }
                       
                   }
                    if (this.order.status==0&&this.buyer()&&!this.timeout) {
                        this.settimer()
                        return
                    }
                    if (this.timeouttimer&&this.order.status!=0&&this.buyer() ) {
                       clearInterval(this.timeouttimer)
                       this.timeouttimer
                    }
                    this.timeout=true
                   
                }else{
                    this.$router.push('/')
                }
            })
            
        },
         base64(str) {//解码base64
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },
        m(str){//加密中间四位
            return str.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2')
        },
        imgurl(id){//获取图片
            if (process.env.NODE_ENV == 'production') {
                return `${process.env.BASEURL}/api/image/display/${id}`
            }
            return `http://192.168.0.222:8080/gmq_front/api/image/display/${id}`
        },
        alertid(){//提示订单号
        
            this.$dialog.confirm({
                message: `付款时请备注付款订单号,确保您的订单可以快速确认!付款参考号为${this.order.id}`,
               title: '温馨提示',
               confirmButtonText:'确认',
            //    cancelButtonText:'取消'
            }).then(()=>{
                    // this.$dialog.close()
            }).catch(()=>{

            })
        },
        pay(){//付款
            this.$dialog.confirm({
                message: '请确认支付后,确认付款',
               title: '温馨提示',
               confirmButtonText:'确认付款',
               cancelButtonText:'取消'
            }).then(()=>{
                    this.$axios.post(`api/trade/c2c/user_payment?tradeId=${this.order.id}`).then(res=>{
                    if (!res.data.errorCode) {
                        this.$toast('确认付款成功')
                        this.getorder()
                    }
                }).catch(err=>{

                })
            }).catch(()=>{

            })
            
        },
        copytxt(id) { //复制
            try{
                if(document.execCommand('copy', false, null)){
                    //success info
                    var input = document.createElement("input");
                    input.value = document.getElementById(id).value;
                    document.body.appendChild(input);
                    input.select();
                    input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
                    document.body.removeChild(input);
                    this.$toast('已复制到剪贴板');
                } else{
                    //fail info
                    this.$toast('复制失败!请手动选择复制');
                }
            } catch(err){
                //fail info
                this.$toast('复制失败!请手动选择复制');
            }
      },
        cancelorder(){//取消订单
            this.$dialog.confirm({
                message: '如果您已向卖家付款,请不要取消订单!',
               title: '温馨提示',
               confirmButtonText:'我再想想',
               cancelButtonText:'确认取消'
            }).then(()=>{
                
            }).catch(()=>{
                this.$axios.post(`api/trade/c2c/cancel_order?tradeId=${this.order.id}`).then(res=>{
                    if (!res.data.errorCode) {
                        this.$toast('订单已取消')
                        this.getorder()
                    }
                })
            })

            
        },
        cancelorder2(){//取消订单2
            this.$dialog.confirm({
                message: '如果您已收款,请不要取消订单!',
               title: '温馨提示',
               confirmButtonText:'我再想想',
               cancelButtonText:'确认取消'
            }).then(()=>{
                
            }).catch(()=>{
                this.$axios.post(`api/trade/c2c/cancel_order?tradeId=${this.order.id}`).then(res=>{
                    if (!res.data.errorCode) {
                        this.$toast('订单已取消')
                        this.getorder()
                    }
                })
            })
        },
        back(){//返回
            // alert(this.buyer())
            if (this.order.status!=0){
                this.$back()
                return
            }
            if (this.order.status==0&&!this.buyer()) {
                this.$back()
                return
            }
            this.$dialog.confirm({
             message: '您有未付款订单,请及时处理',
               title: '温馨提示',
               confirmButtonText:'留在本页面',
               cancelButtonText:'离开'
            }).then(()=>{
                
            }).catch(()=>{
                this.$back()
            })
        },
        collect(){//完成订单 确认收款
            this.$dialog.confirm({
                message: '请确认到账后,确认收款',
               title: '温馨提示',
               confirmButtonText:'确认收款',
               cancelButtonText:'取消'
            }).then(()=>{
                    this.$axios.post(`api/trade/c2c/order_transaction?tradeId=${this.order.id}`).then(res=>{
                    if (!res.data.errorCode) {
                        this.$toast('确认收款款成功')
                        this.getorder()
                    }
                }).catch(err=>{

                })
            }).catch(()=>{

            })

        }
    }
};
</script>

<style scoped lang="less">
div {
    font-size: 1rem;
    .bar {
        //顶栏
        height: 33.33px;
        line-height: 33.33px;
        background: #0088f1;
        .van-icon {
            color: #fff;
        }
    }
    .det-head-down {
        height: 3.87rem;
        background: #0088f1;
        padding: 0 1rem;
        display: flex;
        .down-left {
            flex: 1;
            .down-portrait {
                display: inline-block;
                float: left;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                background: #fff;
                color: #0088f1;
                line-height: 2rem;
                text-align: center;
                margin-top: 0.8rem;
                margin-right: 0.8rem;
            }
            .down-name {
                display: inline-block;
                float: left;
                > span {
                    font-weight: bolder;
                    color: #fff;
                    line-height: 4rem;
                     font-size: 1.3rem;
                }
                > p {
                    font-size: 0.7rem;
                    color: #fff;
                }
            }
        }
        .down-right {
            flex: 1;
            text-align: right;
            .down-eva {
                display: inline-block;
                width: 5.32rem;
                text-align: center;
                > h4 {
                    color: #fff;
                    font-weight: bolder;
                    line-height: 2.48rem;
                }
                > p {
                    color: #fff;
                }
            }
        }
    }
    .det-money {
        background: #fff;
        padding: 1.33rem 1rem 1.73rem;
        display: flex;
        .money-left {
            -ms-flex: 1;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            line-height: 1.73rem;
            > span {
                color: #9a9aaa;
            }
            > h5 {
                color: #000;
                font-weight: bolder;
                > i {
                    font-weight: bolder;
                }
            }
            > em {
                color: #9a9aaa;
            }
            > p {
                color: #9a9aaa;
            }
        }
        .money-right {
            -ms-flex: 1;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            line-height: 1.73rem;
            text-align: right;
            > span {
                color: #9a9aaa;
            }
            > h5 {
                color: #ff3b3b;
            }
            > em {
                color: #9a9aaa;
                > i {
                    color: #0088f1;
                    padding-left: 5px;
                }
            }
            > p {
                color: #9a9aaa;
                > i {
                    color: #0088f1;
                    padding-left: 5px;
                }
            }
        }
    }
    // 支付方式
    .det-payment {
        margin-top: 0.5rem;
        background: #fff;
        padding: 0 1rem;
        h6 {
            line-height: 4rem;
            color: #000;
            text-indent: 0.7rem;
        }
        li {
            padding-bottom: 1.5rem;
            position: relative;
            > img {
                width: 2rem;
                height: 2rem;
                position: absolute;
                top: 0.1018518519rem;
                left: 0.5rem;
            }
            .pay-cont {
                background: #f9fafc;
                margin-left: 3.7rem;
                line-height: 2.48rem;
                text-indent: 1rem;
                color: #646565;
                #wx,
                #ali,
                #bank {
                    background-color: #f9fafc;
                    margin: 0;
                    padding: 0;
                    width: 50%;
                    display: inline-block;
                }
                i {
                    padding-left: 3px;
                }
            }
            > i {
                font-size: 20px;
                position: absolute;
                top: 0.376rem;
                right: 0.72rem;
                color: #919192;
            }
        }
    }
    // 交易说明
    .det-remind {
        padding: 0 1rem 0.86rem;
        background: #fff;
        margin-top: 0.75rem;
        > h6 {
            color: #000;
            line-height: 2rem;
            text-indent: 0.7rem;
        }
        > p {
            color: #9a9aaa;
            line-height: 1.5rem;
            padding-left: 1.25rem;
            font-size: 12px !important;
        }
    }
    // 底栏
    .det-foot {
        height: 3.76rem;
        line-height: 3.76rem;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        > ul {
            display: flex;
            li:first-child {
                flex: 1.2 !important;
                background-color: #fff;
            }
            > li {
                flex: 3;
                height: 3.76rem;
                text-align: center;
                position: relative;
                color: #9a9aaa;
            }
            li:nth-child(2) {
                border-left: 3px solid #f9fafc;
                box-sizing: border-box;
                background-color: #fff;
            }
            li:last-child {
                background: #0088f1 !important;
                color: #fff !important;
            }
        }
    }
    .rem-red {
        color: #ff3b3b !important;
    }
}
</style>
