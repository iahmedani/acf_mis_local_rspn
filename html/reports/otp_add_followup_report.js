// var async = require('async');
const knex = require('../../mainfunc/db');

module.exports.iniOtpAddFollowupReportV1 = async function () {
  var defProg = JSON.parse(window.localStorage.getItem('defaults'))['defProg']
    await setFormDefualts('ddProgramType','ddProvince','ddDistrict','ddTehsil')
    await updatGeoElonChange('ddProvince','ddDistrict','ddTehsil', 'ddUC','ddHealthHouse',defProg )

  $('#showAddFollowupReport').on('click', async (e) => {
    e.preventDefault();

    $("#otpAddFollowupReportFilerForm").validate();
    if ($("#otpAddFollowupReportFilerForm").valid()) {
      // console.log('here')
      var _qry = prepareQry();
      try {
        var data = await knex('v_otp_add_followup_report')
          .where('province_id', 'like', `%${_qry.province_id}%`)
          .where('district_id', 'like', `%${_qry.district_id}%`)
          .where('tehsil_id', 'like', `%${_qry.tehsil_id}%`)
          .where('uc_id', 'like', `%${_qry.uc_id}%`)
          .where('site_id', 'like', `%${_qry.site_id}%`)
          .whereBetween('date', [_qry.startDate, _qry.endDate]);
        singleTables(data);
        // var _x = $("#example").handsontable('getInstance');
        // if (_x) {
        //   _x.destroy();
        // }
        // _singleTable();
      } catch (error) {
        console.log(error)
      }
    }

  })

  function prepareQry() {
    var qry = {};
    $("#ddProvince").val() ? (qry.province_id = $("#ddProvince").val()) : qry.province_id = "";
    $("#ddDistrict").val() ? (qry.district_id = $("#ddDistrict").val()) : qry.district_id = "";
    $("#ddTehsil").val() ? (qry.tehsil_id = $("#ddTehsil").val()) : qry.tehsil_id = "";
    $("#ddUc").val() ? (qry.uc_id = $("#ddTehsil").val()) : qry.uc_id = "";
    $("#ddHealthHouse").val() ? (qry.site_id = $("#ddHealthHouse").val()) : qry.site_id = "";

    $("#startDate").val() ? (qry.startDate = $("#startDate").val()) : qry.startDate = "";
    $("#endDate").val() ? (qry.endDate = $("#endDate").val()) : qry.endDate = "";

    return qry;
  }

  // const _singleTable = () => {

  //   var data = [
  //     ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
  //     ['2017', 10, 11, 12, 13],
  //     ['2018', 20, 11, 14, 13],
  //     ['2019', 30, 15, 12, 13]
  //   ];

  //   var container = document.getElementById('example');
  //   // if ($("#example").handsontable()) {
  //   //   $("#example").destroy();
  //   // }
  //   // $('#example').handsontable('getInstance').destroy();
  //   var hot = new Handsontable(container, {
  //     data: data,
  //     rowHeaders: true,
  //     colHeaders: true,
  //     filters: true,
  //     dropdownMenu: true,
  //     licenseKey: 'non-commercial-and-evaluation'
  //   });

  //   console.log(hot)
  //   // console.log(hotInstance)
  // }

  const singleTables = (data) => {
    if ($.fn.DataTable.isDataTable('#tblOtpAddFollowup')) {
      $('#tblOtpAddFollowup').DataTable().destroy();
    }
    $('#tblOtpAddFollowup tbody').empty();
    $('#tblOtpAddFollowup')
      // .on('processing.dt', function (e, settings, processing) {
      //   $('.spinner-border').css('display', processing ? 'block' : 'none');
      // })
      .DataTable({
        "processing": true,
        responsive: true,
        data: data,
        pageLength: 8,
        dom: "Bfrtip",
        buttons: ["copy", {
          extend: "csv",
          title: 'OTP Admision and Followup Report' + new Date().toDateString()
        }, {
          extend: "excel",
          title: 'OTP Admision and Followup Report' + new Date().toDateString()
        }],
        retrieve: true,
        paging: true,
        // "paging":   true,
        "scrollY": false,
        "scrollX": true,
        "processing": true,
        responsive: true,
        "search": {
          "smart": false
        },
        columns: [{
            title: 'Province',
            data: 'province'
          },
          {
            title: 'District',
            data: 'district_name'
          },
          {
            title: 'Tehsil',
            data: 'tehsil_name'
          },
          {
            title: 'UC',
            data: 'uc_name'
          },
          {
            title: 'Site Name',
            data: 'site_name'
          },
          {
            title: 'Date',
            data: 'date'
          },
          {
            title: 'Registration ID',
            data: 'reg_id'
          },
          {
            title: 'Name',
            data: 'p_name'
          },
          {
            title: 'Father/Husband Name',
            data: 'f_or_h_name'
          },
          {
            title: 'Age',
            data: 'age'
          },
          {
            title: 'Gender',
            data: 'gender'
          },
          {
            title: 'Guardians CNIC',
            data: 'cnic'
          },
          {
            title: 'Contact Number',
            data: 'cnt_number'
          },
          {
            title: 'Address',
            data: 'address'
          },
          {
            title: 'Entry Reason',
            data: 'ent_reason',
            render: function (data, type, row) {
              if (data == 'no_prv_pro') {
                return 'New'
              } else {
                return data;
              }
            }
          },
          {
            title: 'Referral Type',
            data: 'ref_type'
          },
          {
            title: 'Oedema',
            data: 'oedema'
          },
          {
            title: 'MUAC',
            data: 'muac'
          },
          {
            title: 'Weight',
            data: 'weight'
          },
          {
            title: 'Ration 1',
            data: 'ration1'
          },
          {
            title: 'Quantity 1',
            data: 'quantity1'
          },
          {
            title: 'Ration 2',
            data: 'ration2'
          },
          {
            title: 'Quantity 2',
            data: 'quantity2'
          },
          {
            title: 'Ration 3',
            data: 'ration3'
          },
          {
            title: 'Quantity 3',
            data: 'quantity3'
          },
          {
            title: 'Mother Alive',
            data: 'is_mother_alive'
          },
          {
            title: 'Diarrhoea',
            data: 'diarrhoea',
            render: function (data, type, row) {
              var x = ['No', 'Yes']
              return x[data]
            }
          },
          {
            title: 'vomiting',
            data: 'vomiting',
            render: function (data, type, row) {
              var x = ['No', 'Yes']
              return x[data]
            }
          },
          {
            title: 'cough',
            data: 'cough',
            render: function (data, type, row) {
              var x = ['No', 'Yes']
              return x[data]
            }
          },
          {
            title: 'Appetite',
            data: 'appetite'
          },
          {
            title: 'Daily Stool',
            data: 'daily_stool'
          },
          {
            title: 'Urine',
            data: 'pass_urine',
            render: function (data, type, row) {
              var x = ['No', 'Yes']
              return x[data]
            }
          },
          {
            title: 'Breast Fed',
            data: 'b_Feeding',
            render: function (data, type, row) {
              var x = ['No', 'Yes']
              return x[data]
            }
          },
          {
            title: 'Status',
            data: 'status'
          },
          {
            title: 'Record Type',
            data: 'record_type'
          }
        ]
      })
  }
  $('.spinner-border').css('display', 'none');
};