module.exports.initScrPlwNewReport = function () {

  $(function () {
    var datePickerId_end = document.getElementById('end_date');
    datePickerId_end.max = new Date().toISOString().split("T")[0];
    var datePickerId_start = document.getElementById('start_date');
    datePickerId_start.min = new Date(2018, 07, 01).toISOString().split("T")[0];

    $('#ddInterval').on('change', function () {
      var value = $(this).val();
      console.log(value);
      if (value == 1) {
        $('#start_date').attr('disabled', false);
        $('#end_date').attr('disabled', false);
      } else {
        $('#start_date').attr('disabled', true);
        $('#end_date').attr('disabled', true);
      }
    })

    ipc.send('getProvince');
    ipc.on('province', function (evt, province) {
      $('#ddProvince').children('option:not(:first)').remove();
      prov(province);
    })
    $('#ddProvince').on('change', function () {
      var prov = $(this).val();
      ipc.send('getDistrict', prov)
      ipc.on('district', function (evt, district) {
        $('#ddDistrict').children('option:not(:first)').remove();

        dist(district);
      })
    })
    $('#ddDistrict').on('change', function () {
      var dist = $(this).val();
      ipc.send('getTehsil', dist)
      ipc.on('tehsil', function (evt, tehsil) {
        $('#ddTehsil').children('option:not(:first)').remove();

        teh(tehsil);
      })
    })
    $('#ddTehsil').on('change', function () {
      var tehs = $(this).val();
      ipc.send('getUC', tehs)
      ipc.on('uc', function (evt, uc) {
        $('#ddUC').children('option:not(:first)').remove();

        ucListener(uc);
      })
    })
    var ucForHH;
    $('#ddUC').on('change', function () {
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('getHealthHouse', ucs)
      ipc.on('hh', function (evt, hh) {
        $('#ddHealthHouse').children('option:not(:first)').remove();
        hhListener(hh);
      })
    })
  });

  function prepareQry() {
    var qry = {};
    ($('#ddProvince').val()) ? qry.province_id = $('#ddProvince').val(): '';
    ($('#ddDistrict').val()) ? qry.district_id = $('#ddDistrict').val(): '';
    ($('#ddTehsil').val()) ? qry.tehsil_id = $('#ddTehsil').val(): '';
    ($('#ddUC').val()) ? qry.uc_id = $('#ddUC').val(): '';
    ($('#ddInterval').val() == 1) ? qry.date = {
      x: 'screening_date',
      y: [$('#start_date').val(), $('#end_date').val()]
    }: '';
    console.log(qry);
    return qry;
  }
  $(function () {
    function putSummaryDataToTable(table, array) {
      $(`#${table} td`).each(function () {
        $(this).empty();
      })
      var keys = Object.keys(array[0]);
      keys.forEach(el => {
        $(`#${el}`).text(array[0][el]);
      })
    }

    function createSingleEntryTable(table, array, headerObj, headerKeys) {
      var html = `<tr>`
      headerObj.forEach(el => {
        html += `<th>${el}</th>`
      })
      html += '</tr>'
      array.forEach(el => {
        html += '<tr>'
        headerKeys.forEach(h => {
          html += `<td>${el[h]}</td>`
        })
        html += '</tr>'
      })
      $(`#${table}`).empty();
      $(`#${table}`).append(html);
    }

    function scrChildReport(qry) {
      return new Promise((resolve, reject) => {
        ipc.send('scrPlwNewReport', (qry));
        ipc.on('scrPlwNewReport', (e, result) => {
          if (result.err) {
            reject(result.err)
            ipc.removeAllListeners('scrPlwNewReport')
          } else {
            resolve(result.result);
          }
        })
      })
    }
    $('#showDataScrPlwReport').on('click', function () {
      var fullTextPlw = ['Province', 'District', 'Tehsil', 'UC', 'Village', 'Nutrition Site', 'Screening Date', 'Staff Name', 'Staff Code', 'Supervisor Name', 'Supervisor Code', 'Total Screened (Pragnent)', 'Total Screened (Lectating)', 'First time Screened (Pragnent)', 'First time Screened (Lectating)', 'Re-Screened (Pragnent)', 'Re-Screened (Lactating)', 'MUAC >=21 (Pragnent)', 'MUAC >=21 (Lectating)', 'MUAC <21 (Pragnent)', 'MUAC <21 (Lectating)', 'IFA tablets recieved (Pragnent) (1st)', 'IFA tablets recieved (Lectating)(1st)', 'IFA tablets recieved (Pragnent)(2nd)', 'IFA tablets recieved (Lectating)(2nd)', 'IFA tablets recieved (Pragnent)(3rd)', 'IFA tablets recieved (Lectating)(3ed)', 'IFA tablets recieved (Pragnent)(4th)', 'IFA tablets recieved (Lectating)(4th)', 'IFA tablets recieved (Pragnent)(5th)', 'IFA tablets recieved (Lectating)(5th)', 'IFA tablets recieved (Pragnent)(6th)', 'IFA tablets recieved (Lectating)(6th)']
      var colNamePlw = ['province', 'district_name', 'tehsil_name', 'uc_name', 'village', 'site_name', 'screening_date', 'staff_name', 'staff_code', 'sup_name', 'sup_code', 'total_scr_pragnent', 'total_scr_lactating', 'new_scr_pragnent', 'new_scr_lactating', 'reScreened_scr_pragnent', 'reScreened_scr_lactating', 'muac_gt_21_pragnent', 'muac_gt_21_lactating', 'muac_le_21_pragnent', 'muac_le_21_lactating', 'first_ifa_tabs_rec_pragnent', 'first_ifa_tabs_rec_lactating', 'second_ifa_tabs_rec_pragnent', 'second_ifa_tabs_rec_lactating', 'third_ifa_tabs_rec_pragnent', 'third_ifa_tabs_rec_lactating', 'fourth_ifa_tabs_rec_pragnent', 'fourth_ifa_tabs_rec_lactating', 'fifth_ifa_tabs_rec_pragnent', 'fifth_ifa_tabs_rec_lactating', 'sixth_ifa_tabs_rec_pragnent', 'sixth_ifa_tabs_rec_lactating']

      scrChildReport(prepareQry())
        .then(result => {
          console.log(result)
          putSummaryDataToTable('scrPlwNewSum', result.summary)
          createSingleEntryTable('scrPlwNewSingle', result.single, fullTextPlw, colNamePlw)

        })
        .catch(e => {
          console.log('error occured during summary table creation')
        })
    });
    $('#exportScrPlwReport').on('click', function () {
      export_xlsx();
    })
  })

  /* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
  /*global Uint8Array, console */
  /* exported export_xlsx */
  /* eslint no-use-before-define:0 */
  var XLSX = require('xlsx');
  var electron = require('electron').remote;

  var export_xlsx = (function () {
    // var HTMLOUT = document.getElementById('htmlout');
    var XTENSION = "xls|xlsx|xlsm|xlsb|xml|csv|txt|dif|sylk|slk|prn|ods|fods|htm|html".split("|")
    return function () {
      var workbook = XLSX.utils.book_new();
      var ws1 = XLSX.utils.table_to_sheet(document.getElementById('scrPlwNewSum'));
      XLSX.utils.book_append_sheet(workbook, ws1, "Summary");

      /* convert table 'table2' to worksheet named "Sheet2" */
      var ws2 = XLSX.utils.table_to_sheet(document.getElementById('scrPlwNewSingle'));
      XLSX.utils.book_append_sheet(workbook, ws2, "Screening Detail");
      // var wb = XLSX.utils.table_to_book(HTMLOUT);
      var o = electron.dialog.showSaveDialog({
        title: 'Save file as',
        filters: [{
          name: "Spreadsheets",
          extensions: XTENSION
        }]
      });
      console.log(o);
      XLSX.writeFile(workbook, o);
      electron.dialog.showMessageBox({
        message: "Exported data to " + o,
        buttons: ["OK"]
      });
    };
  })();
  void export_xlsx;
}