<template>
    <div class="">
        <div id="trade-view" :style="{height:height}">
        </div>
    </div>
</template>

<script type="">
import { widget as TvWidget } from "../../../static/tradeview/charting_library/charting_library.min.js";
import datafeeds from "./datafeeds/datafeeds";

console.log(TvWidget);

export default {
    name: "tradingView",
    props: {
        code: {
            //
            default: "",
            type: String
        },
        height: {
            default: "600px",
            type: String
        },
        market: {
            type: Object
        },
        interval: {
            default: 1
        },
        study: {
            default: () => {
                return { code: null };
            },
            type: Object
        }
    },
    data() {
        return {
            widget: null, //构造器对象
            datafeeds: new datafeeds(this),
            data: [], //数据存放
            // interval:1,
            timer: null, //定时器
            chartType: null, //图表类型
            t: false,
            lastMarket: null, //上次价格
            studyinstance: null //指标实例
        };
    },
    components: {},
    created() {
        this.setTimer();
        //   setInterval(()=>{
        //       this.getChartData()
        //   },3000)
    },
    mounted() {
        this.init();
    },
    destroyed() {
        clearInterval(this.timer);
        this.timer = null;
        //    this.widget.remove()
        //    this.widget=null
    },
    watch: {
        // 货物代码
        code(v) {
           
            // console.warn(this.market.code);
            this.setTimer();
            // this.widget.onChartReady(() => {
            //     this.widget.chart().setSymbol(v);
            //     this.lastMarket = null;
            // });
            
        },
        //图表周期
        interval(v) {
            this.setTimer();
            console.log(v);
            if (this.interval === 1) {
                //分时线
                this.widget.onChartReady(() => {
                    this.widget.chart().setChartType(2);
                });
                return;
            }
            this.widget.onChartReady(() => {
                this.widget.chart().setChartType(1);
            });
            this.widget.onChartReady(() => {
                this.widget.chart().setResolution(v);
            });
            this.lastMarket = null;
        },
        market(v, o) {
            // console.warn("tv", v.code);
            this.widget.onChartReady(() => {
                if (v.price != o.price) {
                    this.widget.chart().resetData();
                }
            });
        },
        'market.code'(v,o){
            // console.warn(this.market.code);
            if (v!=o) {
                // alert(v)
                this.lastMarket = null;
                this.widget.onChartReady(() => {
                    this.widget.chart().setSymbol(v);
                    this.lastMarket = null;
                });
            }
        },
        "study.code"(v, o) {
            if (!v) {
                return;
            }
            this.widget.onChartReady(() => {
                this.widget.chart().removeEntity(this.studyinstance);
                this.studyinstance = this.widget
                    .chart()
                    .createStudy(v, false, false, [], null, {});
            });
        }
    },
    methods: {
        init() {
            if (!this.widet) {
                this.widget = new TvWidget({
                    datafeed: this.datafeeds,
                    fullscreen: false, //显示图表是否占用窗口中所有可用的空间。
                    library_path: `${process.env.LIBRARYPATH}static/tradeview/charting_library/`, //static文件夹的路径 
                    locale: "zh",
                    autosize: true, // 显示图表是否应使用容器中的所有可用空间 并在调整容器本身大小时自动调整大小
                    symbol: "BTC/USD", //图表的初始商品
                    container_id: "trade-view", //widget的DOM元素id
                    timezone: "Asia/Shanghai", //交易时区
                    charts_storage_api_version: "1.1", //后台版本
                    debug: false,
                    interval: "1", //周期
                    toolbar_bg: "#000", //工具栏背景颜色
                    allow_symbol_change: true, //?
                    drawings_access: {
                        //???
                        type: "black",
                        tools: [
                            {
                                name: "Trend Line",
                                grayed: true
                            },
                            {
                                name: "Trend Angle",
                                grayed: true
                            }
                        ]
                    },
                    disabled_features: [
                        //禁用列表
                        "header_symbol_search", //搜索
                        "header_resolutions", //周期按钮
                        "header_screenshot", //截图
                        // "header_chart_type",
                        "header_compare", //一个天平
                        // "header_undo_redo",
                        "date-range-list",
                        "control_bar", //前进后退的按钮
                        "timeframes_toolbar", //底栏
                        // "hide_last_na_study_output",
                        // "legend_context_menu",
                        // "display_market_status" //右上角正在加载
                        "header_interval_dialog_button", //周期输入
                        "go_to_date", //底部跳转到某个日期
                        "header_fullscreen_button", //全屏
                        "header_widget_dom_node", //顶部工具条
                        'context_menus',//右键菜单
                        'property_pages',//禁用所有属性页
                        // 'use_localstorage_for_settings',//禁用本地存储
                        'save_chart_properties_to_local_storage',//禁止把属性存到本地存储
                        // 'chart_zoom',//禁用缩放
                    ],
                    enabled_features: [
                        //启用列表
                        "disable_resolution_rebuild",
                        "hide_left_toolbar_by_default"
                    ],
                    studies_overrides: {}, //自定义默认指标的样式及输入值
                    overrides: {
                        //对Widget对象的默认属性进行覆盖
                        "paneProperties.background": "#fff",
                        "scalesProperties.lineColor": "#989a9c", //边框颜色
                        "scalesProperties.textColor": "#989a9c", //y轴文字颜色
                        // "scalesProperties.fontSize": 12,
                        "paneProperties.legendProperties.showLegend": false,
                        // "mainSeriesProperties.candleStyle.upColor": "#ec0000",
                        // "mainSeriesProperties.candleStyle.downColor": "#00802b",
                        // "mainSeriesProperties.candleStyle.borderUpColor":"#ec0000",
                        // "mainSeriesProperties.candleStyle.borderDownColor":"#00802b",
                        // "mainSeriesProperties.candleStyle.wickUpColor":"#ec0000",
                        // "mainSeriesProperties.candleStyle.wickDownColor":"#0c8d2a",
                        // "mainSeriesProperties.areaStyle.color1": "#606090",
                        // "mainSeriesProperties.areaStyle.color2": "#3c78d8"
                        "mainSeriesProperties.style":this.interval === 1 ? 2 : 1, //k线类型
                        //网络样式
                        "paneProperties.vertGridProperties.style": 0,
                        "paneProperties.horzGridProperties.color": "#ccc", //x
                        "paneProperties.vertGridProperties.color": "#fff", //y
                        "mainSeriesProperties.lineStyle.linewidth": 3 //线宽
                    },
                    toolbar_bg: "#fff" //最外面的边框颜色
                    // overrides: {
                    // 	"paneProperties.background": "#222222",
                    // 	"paneProperties.vertGridProperties.color": "#454545",
                    // 	"paneProperties.horzGridProperties.color": "#454545",
                    // 	"symbolWatermarkProperties.transparency": 90,
                    // 	"scalesProperties.textColor" : "#AAA"
                    // },
                    // custom_css_url: `./charts.css`
                });
                console.log(this.widget);
                this.widget.onChartReady(() => {
                    // this.widget.chart().createStudy('MA Cross', false, false, [30, 120])
                    this.chartType = this.widget.chart().chartType();
                    this.createStudy();
                    this.widget.subscribe("chart_style", this.chartchange); //订阅
                    if (!this.study.code) {
                        return;
                    }
                    this.widget.chart().removeEntity(this.studyinstance);
                    this.studyinstance = this.widget
                        .chart()
                        .createStudy(
                            this.study.code,
                            false,
                            false,
                            [],
                            null,
                            {}
                        );
                });
            }
        },
        // 图表类型变化
        chartchange() {
            console.log(this.widget.chart().chartType());
            this.chartType = this.widget.chart().chartType();
            this.createStudy();
        },
        //创建指标线
        createStudy() {
            if (
                this.chartType == 2 ||
                this.chartType == 3 ||
                this.chartType == 10
            ) {
                this.widget.chart().removeAllStudies();
                return;
            }
            var ma = {
                MA5: {"Plot.color": "rgb(179,144,211)",},
                MA10: {"Plot.color": "rgb(149,174,202)",},
                MA30: {"Plot.color": "rgb(137,199,148)",},
                MA60: {"Plot.color": "rgb(201,106,174)", }
            };
            for (const key in ma) {
                 this.widget.chart().createStudy("Moving Average", false, false, [+key.replace("MA", "")], null, ma[key]);
            }
        },
        // 获取数据
        getBars(
            symbolInfo,
            resolution,
            rangeStartDate,
            rangeEndDate,
            onLoadedCallback,
            onErrorCallback
        ) {
            // onLoadedCallback(arr)
            // var interval=this.interval
            // this.interval==60?interval='1h':this.interval
            // this.interval=='1D'?interval='1d':this.interval
            // this.$axios.post(`api/market/kline_data?code=${this.code}&interval=${interval}&beginTime=${String(new Date(rangeStartDate*1000)).replace('+','%2B')}&endTime=${String(new Date(rangeEndDate*1000)).replace('+','%2B')}`).then(res=>{
            //     var arr=[]
            //     console.log(res.data.data);
            //     // this.$emit('getPrice',res.data.data)
            //     if(!res.data.data){
            //         return
            //     }
            //     res.data.data.forEach(i => {
            //         arr.push( {
            //         time: +i.timestamp,
            //         close: +i.close,
            //         open: +i.open,
            //         high: +i.high,
            //         low: +i.low,
            //         // volume: 18500
            //     })
            //     })
            //     onLoadedCallback(arr)
            // })
        },
        // 订阅数据
        subscribeBars(
            symbolInfo,
            resolution,
            onRealtimeCallback,
            subscriberUID,
            onResetCacheNeededCallback
        ) {
            this.data.map(val => {
                // console.log(val);
                onRealtimeCallback(val);
            });
            console.log();
            if (!this.t) {
                this.update(onRealtimeCallback);
            }
            console.log(resolution);
            // this.interval=resolution
            onResetCacheNeededCallback();
            // console.log(this.widget.chart().chartType());
        },
        //设置定时器
        setTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            this.getChartData();
            this.timer = setInterval(() => {
                this.getChartData();
            }, 1000 * 60);
        },
        // 获取图表数据
        getChartData() {
            var interval = this.interval;
            this.interval == 60 ? (interval = "1h") : this.interval;
            this.interval == "1D" ? (interval = "1d") : this.interval;
            if (!this.code) {
                return;
            }
            this.t = true;
            this.$axios
                .post(
                    `api/market/kline_data?code=${
                        this.code
                    }&interval=${interval}`
                )
                .then(res => {
                    // console.log(this.data);
                    
                    var arr = [];
                    console.log(res.data.data);
                    this.$emit("getPrice", res.data.data);
                    if (!res.data.data) {
                        return;
                    }
                    res.data.data.forEach(i => {
                        arr.push({
                            time: +i.timestamp,
                            close: +i.close,
                            open: +i.open,
                            high: +i.high,
                            low: +i.low
                            // volume: 18500
                        });
                    });
                    this.data = arr;
                    // console.log(new Date(rangeStartDate * 1000),new Date(rangeEndDate * 1000));
                    this.widget.onChartReady(() => {
                        this.widget.chart().resetData();
                    });
                    this.t = false;
                    console.log(arr.length);
                });
        },
        //更新数据
        update(onRealtimeCallback) {
            if (!this.data.length) {
                return;
            }
            var interval = this.interval;
            this.interval == "1d" ? (interval = 24 * 60) : interval;
            this.interval == "1h" ? (interval = 60) : interval;
            console.log(
                this.data[this.data.length - 1].time + interval * 60 * 1000
            );
            if (!this.lastMarket) {
                this.lastMarket = {
                    time:
                        +this.data[this.data.length - 1].time +
                        interval * 60 * 1000,
                    close: +this.market.price,
                    open: +this.data[this.data.length - 1].close,
                    high: +this.market.price,
                    low: +this.market.price
                };
            } else {
                Object.assign(this.lastMarket, {
                    high: Math.max(
                        this.lastMarket.high,
                        this.market.price,
                        +this.data[this.data.length - 1].close
                    ),
                    low: Math.min(
                        this.lastMarket.low,
                        this.market.price,
                        +this.data[this.data.length - 1].close
                    ),
                    open: +this.data[this.data.length - 1].close,
                    close: +this.market.price,
                    time:
                        +this.data[this.data.length - 1].time +
                        interval * 60 * 1000
                });
            }

            onRealtimeCallback(this.lastMarket);
        }
    }
};
</script>

<style scoped lang="">
</style>
