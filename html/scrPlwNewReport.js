module.exports.initScrPlwNewReport = function () {

  $(function () {
    // var datePickerId_end = document.getElementById('end_date');
    // datePickerId_end.max = new Date().toISOString().split("T")[0];
    var datePickerId_start = document.getElementById('start_date');
    datePickerId_start.min = new Date(2018, 07, 01).toISOString().split("T")[0];

    $('#ddInterval').on('change', function () {
      var value = $(this).val();
      // console.log(value);
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
      ipc.send("getStaffuc", ucs);
      ipc.send("getSupsuc", ucs);

      ipc.on("haveStaffuc", function (evt, staffs) {
        $("#ddStaff_code")
          .children("option:not(:first)")
          .remove();
        staffListeneruc(staffs);
      });
      ipc.on("haveSupsuc", function (evt, _sups) {
        $("#ddSup_code")
          .children("option:not(:first)")
          .remove();
        supListeneruc(_sups);
      });
      // ipc.send('getHealthHouse', ucs)
      // ipc.on('hh', function (evt, hh) {
      //   $('#ddHealthHouse').children('option:not(:first)').remove();
      //   hhListener(hh);
      // })
    })
  });

  $("#ddStaff_code").on("change", function () {
    var staff_code = $(this).val();
    $("#ddStaff_name").val(staff_code);
  });
  $("#ddStaff_name").on("change", function () {
    var staff_code = $(this).val();
    $("#ddStaff_code").val(staff_code);
  });
  $("#ddSup_code").on("change", function () {
    var sup_code = $(this).val();
    $("#ddSup_name").val(sup_code);
  });
  $("#ddSup_name").on("change", function () {
    var sup_code = $(this).val();
    $("#ddSup_code").val(sup_code);
  });

  function prepareQry() {
    var qry = {};
    ($('#ddProvince').val()) ? qry.province_id = $('#ddProvince').val(): '';
    ($('#ddDistrict').val()) ? qry.district_id = $('#ddDistrict').val(): '';
    ($('#ddTehsil').val()) ? qry.tehsil_id = $('#ddTehsil').val(): '';
    ($('#ddUC').val()) ? qry.uc_id = $('#ddUC').val(): '';
    ($('#ddStaff_code').val()) ? qry.staff_code = $('#ddStaff_code').val(): '';
    ($('#ddSup_code').val()) ? qry.sup_code = $('#ddSup_code').val(): '';
    ($('#ddInterval').val() == 1) ? qry.date = {
      x: 'screening_date',
      y: [$('#start_date').val(), $('#end_date').val()]
    }: '';
    // console.log(qry);
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
            ipc.removeAllListeners('scrPlwNewReport')

          }
        })
      })
    }
    $('#showDataScrPlwReport').on('click', function (e) {
      e.preventDefault();
      var fullTextPlw = ["Province", "District", "Tehsil", "UC", "Total Catchement Population", "Total HH Visited", "Reporting Month", "Staff Name", "Staff Code", "Supervisor Name", "Supervisor Code", "Total Screened (Pragnent)", "Total Screened (Lectating)", "First time Screened (Pragnent)", "First time Screened (Lectating)", "Re-Screened (Pragnent)", "Re-Screened (Lactating)", "MUAC >=21 (Pragnent)", "MUAC >=21 (Lectating)", "MUAC <21 (Pragnent)", "MUAC <21 (Lectating)", "PLW Received IFA Tablets First Time (Pragnent)", "PLW Received IFA Tablets First Time (Lectating)", "Total Follow ups", "Total Exits"];
      var colNamePlw = ["province", "district_name", "tehsil_name", "uc_name", "catchment_population", "total_hh", "report_month", "staff_name", "staff_code", "sup_name", "sup_code", "total_scr_pragnent", "total_scr_lactating", "new_scr_pragnent", "new_scr_lactating", "reScreened_scr_pragnent", "reScreened_scr_lactating", "muac_gt_21_pragnent", "muac_gt_21_lactating", "muac_le_21_pragnent", "muac_le_21_lactating", "ifa_first_time_pragnent", "ifa_first_time_lactating", "total_followup", "total_exits"];
      if ($('#filterDate').valid()) {
        scrChildReport(prepareQry())
          .then(result => {
            // console.log(result)
            putSummaryDataToTable('scrPlwNewSum', result.summary)
            createSingleEntryTable('scrPlwNewSingle', result.single, fullTextPlw, colNamePlw)

          })
          .catch(e => {
            // console.log('error occured during summary table creation')
          })
      }
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
      // console.log(o);
      XLSX.writeFile(workbook, o);
      electron.dialog.showMessageBox({
        message: "Exported data to " + o,
        buttons: ["OK"]
      });
    };
  })();
  void export_xlsx;
}