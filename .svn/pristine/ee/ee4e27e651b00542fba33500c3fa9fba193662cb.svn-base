class datafeeds {
  constructor(vue) {
    this.self = vue
  }

  /**
   * 
   * @param {*Function} callback 回调函数
   */
  onReady(callback) {
    // setTimeout(() => {
    //   callback(this.defaultConfiguration())
    // }, 0);
    return new Promise((resolve, reject) => {
      let configuration = this.defaultConfiguration()
      if (this.self.getConfig) {
        configuration = Object.assign(this.defaultConfiguration(), this.self.getConfig())
      }
      resolve(configuration)
    }).then(data => callback(data))
  }


  /**
   * @param {*String} symbolName  商品名称或ticker
   * @param {*Function} onSymbolResolvedCallback 成功回调 
   * @param {*Function} onResolveErrorCallback   失败回调
   * `resolveSymbol` should return result asynchronously.
   */
  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    return new Promise((resolve, reject) => {
      let symbolInfo = this.defaultSymbol()
      if (this.self.getSymbol) {
        symbolInfo = Object.assign(this.defaultSymbol(), this.self.getSymbol())
      }
      // this.self.resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback)
      // console.log(this.self.market.code, 111111111111);
      
      resolve(symbolInfo)
    }).then(data => onSymbolResolvedCallback(data)).catch(err => onResolveErrorCallback(err))
  }

  /**
   * 通过日期范围获取历史K线数据。 图表库希望通过onDataCallback仅一次调用， 接收所有的请求历史。 而不是被多次调用
   * @param {*Object} symbolInfo  商品信息对象
   * @param {*String} resolution  （周期）
   * @param {*Number} rangeStartDate  unix时间戳、最左边请求的K线时间
   * @param {*Number} rangeEndDate  unix时间戳、最右边请求的K线时间
   * @param {*Function} onDataCallback  回调函数
   * @param {*Function} onErrorCallback  回调函数
   */
  getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
    console.log(rangeStartDate, rangeEndDate);

    const onLoadedCallback = data => {
      console.log('onLoadedCallback',data);
      // setTimeout(() => {
      //   data && data.length ? onDataCallback([], { noData: true }) : onDataCallback(data, { noData: false })
      // }, 0);
      // data && data.length ? onDataCallback([], { noData: true }) : onDataCallback(data, { noData: false })
      onDataCallback(data, { noData: false }  )
      
    }

    onDataCallback([], {
      noData: true
    });
    this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)

  }

  /**
   * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
   * @param {*Object} symbolInfo 商品信息
   * @param {*String} resolution 分辨率
   * @param {*Function} onRealtimeCallback 回调函数 
   * @param {*String} subscriberUID 监听的唯一标识符
   * @param {*Function} onResetCacheNeededCallback (从1.7开始): 将在bars数据发生变化时执行
   */
  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    
    // onRealtimeCallback({ time: Date.now(), close: 6444.7, open: 6444.03, high: 6444.2, low: 6444.95 })
    // this.self.getmarket().then(()=>{
    //   console.log(this.self.data);
      
    // })
    
    // this.self.data.map((val) => {
    //   // console.log(val);
    //   onRealtimeCallback(val)
    // })

    // onResetCacheNeededCallback()

    this.self.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
  }

  /**
   * 取消订阅K线数据
   * @param {*String} subscriberUID 监听的唯一标识符
   */
  unsubscribeBars(subscriberUID) {
    console.log(subscriberUID);
    
    // this.barsUpdater.unsubscribeBars(subscriberUID)
  }

  /**
   * 默认配置
   */
  defaultConfiguration() {
    return {
      supports_search: false,
      supports_group_request: false,
      supported_resolutions: ['1', '5', '15', '30', '60', '1D'],
      supports_marks: true, //是否支持在K线上显示标记
      supports_timescale_marks: true, //是否支持时间刻度标记。
      // exchanges: [{ //一个交易所数组。 Exchange是一个对象{value, name, desc}
      //   value: "BTC",
      //   name: "BTC",
      //   desc: "1"
      // }, {
      //   value: "ETH",
      //   name: "ETH",
      //   desc: "2"
      // }],
      // symbolsTypes: [{
      //   name: "BTC",
      //   value: "stock"
      // }, {
      //   name: "ETH",
      //   value: "stock"
      // }]
    }
  }

  /**
   * 默认商品信息
   */
  defaultSymbol() {
    return {
      'name': this.self.code, //商品名称
      'timezone': 'Asia/Shanghai', //交易时区
      'minmov': 1, //最小波动
      'minmov2': 0, //这是一个神奇的数字
      'pointvalue': 1, //精度
      'fractional': false, //分数价格
      'session': '24x7', //交易时段
      'has_intraday': true, //是否具有日内（分钟）历史数据
      'has_no_volume': false, //是否拥有成交量数据
      'description': '', //说明
      'pricescale': +'1'.padEnd(+this.self.market.precision+1, '0'), //价格精度
      'ticker': this.self.code, //商品的唯一标识符
      "type": "bitcoin", //仪表的可选类型
      'supported_resolutions': ['1', '5', '15', '30', '60', '1D'], //周期数组
      // "intraday_multipliers": ['60'], //日内周期(分钟单位)的数组，datafeed将会自行构建它 有什么用?
      "has_weekly_and_monthly": false, //是否具有以W和M为单位的历史数据
      //   has_empty_bars: true, //没有数据返回时,library是否会生成空的K柱

    }
  }
}
export default datafeeds
