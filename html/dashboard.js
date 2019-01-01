module.exports.initDashboard = function () {
 
  $(() => {
    var exporting = {
      buttons: {
        contextButton: {
          menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems.filter(item => item !== 'openInCloud')
        }
      }
    };
    
    ipc.send("newDashboard", '')
    ipc.on("newDashboard", (event, data) => {
      console.log(data)
      var scrChild = data.result.scrChildren[0];
      var ScreeningChart = new Highcharts.chart("screening-Chart", {
        chart: {
          type: "column"
        },
        title: { text: "Screening Children" },
        exporting: false,
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
          headerFormat: "<b>{point.x}</b><br/>",
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
      var regByProgChart = new Highcharts.chart("regByProg-Chart", {
        chart: {
          type: "line"
        },
        title: { text: 'Monthly Registration by Program' },
        exporting: false,
        credits: false,
        subtitle: false,
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        yAxis: {
          title: false,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        series: [
          {
            name: "Tokyo",
            data: [
              7.0,
              6.9,
              9.5,
              14.5,
              18.4,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6
            ]
          },
          {
            name: "London",
            data: [
              3.9,
              4.2,
              5.7,
              8.5,
              11.9,
              15.2,
              17.0,
              16.6,
              14.2,
              10.3,
              6.6,
              4.8
            ]
          }
        ]
      });
      var indicatorsChart = new Highcharts.chart("indicators-Chart", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        title: { text: 'Performance Indicators' },
        exporting: false,
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
              { name: "Chrome", y: 61.41 },
              { name: "Internet Explorer", y: 11.84 },
              { name: "Firefox", y: 10.85 },
              { name: "Edge", y: 4.67 },
              { name: "Safari", y: 4.18 },
              { name: "Other", y: 7.05 }
            ]
          }
        ]
      });
      var stockChart = new Highcharts.chart('stock-Chart', {
        chart: {
          type: 'column'
        },
        title: { text: 'Monthly Stock Distribution' },
        exporting: false,
        credits: false,
        subtitle: false,
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: false,
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Tokyo',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
          name: 'New York',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
          name: 'London',
          data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
          name: 'Berlin',
          data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
      });
      // ipc.removeAllListeners("newDashboard");
    });
    ipc.send('test')
    ipc.on('test', (event, data) => {
      console.log(data)
    })

    
  })
  // Highcharts.setOptions({
  //   colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
  //     return {
  //       radialGradient: {
  //         cx: 0.5,
  //         cy: 0.3,
  //         r: 0.7
  //       },
  //       stops: [
  //         [0, color],
  //         [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
  //       ]
  //     };
  //   })
  // });

  // Build the chart
  
}