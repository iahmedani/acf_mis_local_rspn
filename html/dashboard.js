const knex = require('../mainfunc/db');
var Highcharts = require('../js/charts/highcharts');
// require('highcharts/highcharts-more')(Highcharts)
// require('../js/charts/exporting')(Highcharts);
// require('../js/charts/export-data')(Highcharts);
    
module.exports.initDashboard = function () {
  async function plwData (){
    var _plwData = await knex('tblScrPlw')
                              .sum({muac_gt_21_pragnent:'muac_gt_21_pragnent'})
                              .sum({muac_gt_21_lactating:'muac_gt_21_lactating'})
                              .sum({muac_le_21_pragnent:'muac_le_21_pragnent'})
                              .sum({muac_le_21_lactating:'muac_le_21_lactating'})
                              .where({is_deleted: 0})
    return _plwData;
  }
  async function _exitData(){
    var data = await knex('tblOtpExit')
                        .select('exit_reason')
                        .count({total: 'exit_reason'})
                        .where({is_deleted:0})
                        .groupBy('exit_reason')
    // console.log(data)
    return data;
  } 
async function _exitChart (){
  var _g = await _exitData();
  var cured = (_g.filter(el=> el.exit_reason=='cured').length > 0) ? _g.filter(el=> el.exit_reason=='cured')[0].total : 0;
  var defaulter = (_g.filter(el=> el.exit_reason=='defaulter').length > 0) ? _g.filter(el=> el.exit_reason=='defaulter')[0].total : 0;
  var death = (_g.filter(el=> el.exit_reason=='death').length > 0) ? _g.filter(el=> el.exit_reason=='death')[0].total : 0;
  var non_respondent = (_g.filter(el=> el.exit_reason=='non_respondent').length > 0) ? _g.filter(el=> el.exit_reason=='non_respondent')[0].total : 0;

  var indicatorsChart = new Highcharts.chart("indicators-Chart", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: { text: 'Performance Indicators' },
    // exporting: true,
    credits: false,
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          style: {
            color:
              (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              "black"
          },
          connectorColor: "silver"
        }
      }
    },
    series: [
      {
        name: "Share",
        data: [
          { name: "Cured", y:  cured},
          { name: "Death", y: death },
          { name: "Defaulter", y: defaulter},
          { name: "Non Respondent", y: non_respondent },
        ]
      }
    ]
  });

} 
_exitChart();

async function _session (){
  var data = await knex('tblSessions')
                      .select('session_type')
                      .sum({male_participants: 'male_participants'})
                      .sum({female_participants: 'female_participants'})
                      .sum({pragnent: 'pragnent'})
                      .sum({lactating: 'lactating'})
                      .where({is_deleted:0})
                      .groupBy('session_type');
 

  var _thisChartData = await _sessionData(data)
  // var sessions = data.map(el=> el.session_type);
  // var _subCat = ['Male Participants','Female Participants', 'Pragnent', 'Lactating']
  // var _subCat = ['Male Participants','Female Participants', 'Pragnent', 'Lactating']
  // // console.log(data);
  // var _mySessionData = (data.length > 0 ) ? [{
  //   name:'Male Participants',
  //   data:[data.filter(el=> el.session_type == "cooking")[0].male_participants,   data.filter(el=> el.session_type == "iycf")[0].male_participants,  data.filter(el=> el.session_type == "nut_health_hygene")[0].male_participants,]
  // },{
  //   name:'Female Participants',
  //   data:[data.filter(el=> el.session_type == "cooking")[0].female_participants,   data.filter(el=> el.session_type == "iycf")[0].female_participants,  data.filter(el=> el.session_type == "nut_health_hygene")[0].female_participants,]
  // },
  //   {
  //     name:'Pragnent',

  //     data:[data.filter(el=> el.session_type == "cooking")[0].pragnent,   data.filter(el=> el.session_type == "iycf")[0].pragnent,  data.filter(el=> el.session_type == "nut_health_hygene")[0].pragnent,]
  //   },
  //   {
  //     name:'Lactating',
  //   data:[data.filter(el=> el.session_type == "cooking")[0].lactating,   data.filter(el=> el.session_type == "iycf")[0].lactating,  data.filter(el=> el.session_type == "nut_health_hygene")[0].lactating,]

  // }   
  // ]: [];
  // var seriesData = []
  // for (session of sessions){
  //   var x = {};
  //   x.name= session;
  //   var y = data.filter(el => el.session_type === session)[0];
  //   x.data = [y.male_participants, y.female_participants, y.pragnent, y.lactating]
  //   // console.log(x)
  //   seriesData.push(x);

  // }
  var stockChart = new Highcharts.chart('stock-Chart', {
    chart: {
      type: 'column'
    },
    

    title: { text: 'Sessions Participants Summary' },
    // exporting: true,
    credits: false,
    // subtitle: false,
    xAxis: {
      categories: _thisChartData.cat,
      // crosshair: true
    },
    yAxis: {
      min: 0,
      title: false,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          crop: false,
          overflow: 'none'
      },
      }
    },
    series: _thisChartData.serries
  });
  
}
_session();

  $(() => {
    // var exporting = {
    //   buttons: {
    //     contextButton: {
    //       menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.filter(item => item !== 'openInCloud')
    //     }
    //   }
    // };
    
    ipc.send("newDashboard", '')
    ipc.on("newDashboard", (event, data) => {
      // console.log(data)
      var scrChild = data.result.scrChildren[0];
      var ScreeningChart = new Highcharts.chart("screening-Chart", {
        chart: {
          type: "column"
        },
        title: { text: "Screening Children" },
        // exporting: true,
        credits: false,
        xAxis: {
          categories: [
            "Female Children 6-23",
            "Male Children 6-23",
            "Female Children 24-59",
            "Male Children 24-59"
          ]
        },
        yAxis: {
          min: 0,
          title: false,
          // title: {
          //   text: "Total fruit consumption"
          // },
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: "bold",
              color:
                (Highcharts.theme && Highcharts.theme.textColor) || "gray"
            }
          }
        },
        legend: {
          align: "center",
          // x: -30,
          verticalAlign: "bottom",
          // y: 25,
          width: 400,
          itemStyle: {
            color: '#000000',
            fontSize: '8px',
            width: 150
            
        },
          floating: false,
          backgroundColor:
            (Highcharts.theme && Highcharts.theme.background2) || "white",
          // borderColor: "#CCC",
          // borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: "<b>Session Type: {point.x}</b><br/>",
          pointFormat:
            "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
              color:
                (Highcharts.theme && Highcharts.theme.dataLabelsColor) ||
                "white"
            }
          }
        },
        series: [
          {
            name: "Normal MUAC>12.5cm",
            data: [
              scrChild.normal_boys_623,
              scrChild.normal_girls_623,
              scrChild.normal_boys_2459,
              scrChild.normal_girls_2459
            ]
          },
          {
            name: "MUAC<11.5cm SAM with complication",
            data: [
              scrChild.sam_without_comp_boys_623,
              scrChild.sam_with_comp_girls_623,
              scrChild.sam_with_comp_boys_2459,
              scrChild.sam_with_comp_girls_2459
            ]
          },
          {
            name: "MUAC<11.5cm SAM without complication",
            data: [
              scrChild.sam_without_comp_boys_623,
              scrChild.sam_without_comp_girls_623,
              scrChild.sam_without_comp_boys_2459,
              scrChild.sam_without_comp_girls_2459
            ]
          },
          {
            name: "MUAC  11.5 - 12.4 cm (MAM)",
            data: [
              scrChild.mam_boys_623,
              scrChild.mam_girls_623,
              scrChild.mam_boys_2459,
              scrChild.mam_girls_2459
            ]
          }
        ]
      });
      // var regByProgChart = new Highcharts.chart("regByProg-Chart", {
      //   chart: {
      //     type: "line"
      //   },
      //   title: { text: 'Monthly Registration by Program' },
      //   exporting: false,
      //   credits: false,
      //   subtitle: false,
      //   xAxis: {
      //     categories: [
      //       "Jan",
      //       "Feb",
      //       "Mar",
      //       "Apr",
      //       "May",
      //       "Jun",
      //       "Jul",
      //       "Aug",
      //       "Sep",
      //       "Oct",
      //       "Nov",
      //       "Dec"
      //     ]
      //   },
      //   yAxis: {
      //     title: false,
      //   },
      //   plotOptions: {
      //     line: {
      //       dataLabels: {
      //         enabled: true
      //       },
      //       enableMouseTracking: false
      //     }
      //   },
      //   series: [
      //     {
      //       name: "Tokyo",
      //       data: [
      //         7.0,
      //         6.9,
      //         9.5,
      //         14.5,
      //         18.4,
      //         21.5,
      //         25.2,
      //         26.5,
      //         23.3,
      //         18.3,
      //         13.9,
      //         9.6
      //       ]
      //     },
      //     {
      //       name: "London",
      //       data: [
      //         3.9,
      //         4.2,
      //         5.7,
      //         8.5,
      //         11.9,
      //         15.2,
      //         17.0,
      //         16.6,
      //         14.2,
      //         10.3,
      //         6.6,
      //         4.8
      //       ]
      //     }
      //   ]
      // });
    
      
      // ipc.removeAllListeners("newDashboard");
    });
    // ipc.send('test')
    // ipc.on('test', (event, data) => {
    //   console.log(data)
    // })

    
  })


  async function _plwScrChart (){
    var _plwData = await plwData();
    // console.log(_plwData)
    _plwData = _plwData[0]
    var PlwChart = new Highcharts.chart("regByProg-Chart", {
      chart: {
        type: 'column'
    },
    title: {
        text: 'PLW Screening'
    },
      // title: { text: "PLW Children" },
      // exporting: true,
      credits: false,
      // yAxis:false,
      yAxis: {
        title:false,
        min:0,
      },
      xAxis: {
        categories: [
          "Pragnent MUAC >21 cm",
          "Lactating MUAC >21 cm",
          "Pragnent MUAC <21 cm",
          "Lactating MUAC <21 cm",
        ]},
      series: [{
        name: 'Total Screened',
        data: [
            ["Pragnent MUAC >21 cm", _plwData.muac_gt_21_pragnent],
            ['Lactating MUAC >21 cm', _plwData.muac_gt_21_lactating],
            ['Pragnent MUAC <21 cm', _plwData.muac_le_21_pragnent],
            ['Lactating MUAC <21 cm', _plwData.muac_le_21_lactating],
            
        ],
        dataLabels: {
            enabled: true,
            // rotation: -90,
            color: '#FFFFFF',
            align: 'center',
            // format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      
    });
  }

  _plwScrChart();
  
}


let _sessionData = async function(sessions){
  var _data ={
    cat:[],
    serries:[]
   }
  
  for (session of sessions){
    _data.cat.push(session.session_type.toUpperCase().replace(/_/g, ' '))
    var keys = Object.keys(session);
    keys = await keys.filter(el=> el != 'session_type' )
    for (key of keys){
      var x = {};
      x.name = key.toUpperCase().replace(/_/g, ' ');
      var xData = []; 
      for ( n of sessions){
          xData.push(n[key])
      }
      x.data = xData;
      if(_data.cat.length == sessions.length){

        _data.serries.push(x)
      }
    }
  }
  return _data;
}

