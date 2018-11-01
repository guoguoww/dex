import * as echarts from "echarts";

class line {
  /**
   * 创建分时线
   * @param {Array} dataTime x轴数组
   * @param {*Array} dataValues y轴数组
   * @param {*String} ctx 图表id
   * @param {*Boolean} isClear 是否清空图表
   */
  fsline(dataTime, dataValues, ctx, isClear = false) {
    // var echarts=require('echarts') 
    var date = [];
    var categoryData = dataTime;
    var values = dataValues;

    var screenTypes = 1;
    var leng = values.length - 1;

    this.chart = echarts.init(document.getElementById(ctx));    
    if (isClear) {
      this.chart.clear();
    }
    this.chart.setOption({
      grid: {
        left: 0,
        top: 20 * screenTypes,
        right: 53 * screenTypes,
        bottom: 30 * screenTypes,
        containLabel: false,
        borderColor: "#d1d3d4"
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: '#fff',
          fontSize: 12 * screenTypes
        },
        axisPointer: {
          type: 'cross',
          label: {
            color: "#fff",
            fontSize: 12 * screenTypes,
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          },
          crossStyle: {
            color: '#ffb8a3',
            width: 1 * screenTypes,
            type: "solid"
          }
        }
      },
      xAxis: {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          lineStyle: {
            color: '#d1d3d4',
            width: 4 * screenTypes
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          margin: 7 * screenTypes,
          color: "#bebebe",
          align: "left",
          fontSize: 12 * screenTypes
        },
        splitLine: {
          show: false
        },
        data: categoryData,
      },
      yAxis: {
        type: 'value',
        position: "right",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#939598",
          fontSize: 12 * screenTypes,
          formatter: function (v) {
            return v.toFixed(2);
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#d1d3d4",
            width: 1 * screenTypes,
            type: "dashed"
          }
        },
        scale: '_max',
        splitNumber: 6,
        boundaryGap: [0.001, 0.001]
      },
      series: [{
        data: values,
        type: 'line',
        itemStyle: {
          color: "#0088f1",
        },
        lineStyle: {
          width: 2 * screenTypes
        },
        symbol: 'none',
        markLine: {
          lineStyle: {
            normal: {
              type: 'dotted',
              color: "#ffa990",
              width: 1 * screenTypes
            }
          },
          data: [
            [{
                coord: [0, values[leng]],
                symbol: 'none'
              },
              {
                coord: [leng, values[leng]],
                symbol: 'circle',
                symbolSize: [5, 5]
              }
            ]
          ]
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#fafdff',
            }, {
              offset: 1,
              color: '#fafdff'
            }],
            globalCoord: false
          }
        }
      }]
    });
  };
  /**
   * 格式化数组返回echarts需要的格式
   * @param {Array} rawData 二维数组 
   */
  splitData(rawData) {
    var categoryData = [];
    var values = [];

    for (var i = 0; i < rawData.length; i++) {
      //splice 返回每组数组中被删除的第一项，即返回数组中被删除的日期 
      //alert(rawData[i].splice(0, 1)[0]);
      //categoryData  日期  把返回的日期放到categoryData[]数组中
      categoryData.push(rawData[i].splice(0, 1)[0]);
      //alert(categoryData);

      //数据数组，即数组中除日期外的数据
      // alert(rawData[i]);      
      values.push(rawData[i]);
    }    
    return {
      categoryData: categoryData, //数组中的日期 x轴对应的日期
      values: values //数组中的数据 y轴对应的数据
    };
  }
  /**
   * 创建k线图
   * @param {String} rawData 
   * @param {String} ctx 容器名 id
   */
  kline(rawData, ctx) {
    console.log(arguments);
    var screenTypes = 1;
    // const dlist = eval("[" + rawData + "]");
    const dlist = rawData
    var data0 = this.splitData(dlist);

    // console.log("data0:", data0);

    this.chart = echarts.init(document.getElementById(ctx));
    this.chart.clear();

    this.chart.setOption({
      grid: {
        left: 0,
        top: 20 * screenTypes,
        right: 53 * screenTypes,
        bottom: 30 * screenTypes,
        containLabel: false,
        borderColor: "#d1d3d4"
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: '#fff',
          fontSize: 12 * screenTypes
        },
        formatter: function (params) {
          //console.log(params);
          var res = params[0].seriesName + ' ' + params[0].name;
          res += '<br/>  开盘 : ' + params[0].value[1] + '  最高 : ' + params[0].value[3];
          res += '<br/>  收盘 : ' + params[0].value[2] + '  最低 : ' + params[0].value[4];
          return res;
        }
      },
      xAxis: {
        type: 'category',
        data: data0.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
        axisTick: {
          lineStyle: {
            color: '#d1d3d4',
            width: 4 * screenTypes
          }
        },
        axisLabel: {
          show: true,
          margin: 7 * screenTypes,
          color: "#bebebe",
          align: "left",
          fontSize: 12 * screenTypes
        },
      },
      yAxis: {
        position: "right",
        scale: true,
        axisLine: {
          show: false
        },
        axisLabel: {
          color: "#939598",
          fontSize: 12 * screenTypes,
          formatter: function (v) {
            return v.toFixed(2)
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#d1d3d4",
            width: 1 * screenTypes,
            type: "dashed"
          }
        },
      },
      dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: false
        }
      ],
      series: [{
          name: '时间',
          type: 'candlestick',
          data: data0.values,
          itemStyle: {
            normal: {
              color: '#ec0000',
              color0: '#619edb',
              borderColor: '#ec0000',
              borderColor0: '#619edb'
            }
          }
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          },
          symbol: 'none'
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10),
          smooth: true,
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          },
          symbol: 'none'
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20),
          smooth: true,
          symbol: 'none',
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          }
        },
        {
          name: 'MA30',
          type: 'line',
          data: calculateMA(30),
          smooth: true,
          symbol: 'none',
          lineStyle: {
            normal: {
              opacity: 0.5
            }
          }
        }
      ]
    });


    //计算k线的MA；

    function calculateMA(dayCount) {
      var result = [];
      for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      
      return result;
    }

  }
}
export default line
