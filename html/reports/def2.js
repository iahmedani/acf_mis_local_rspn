const knex = require('../../mainfunc/db');

module.exports.initDefaulterv2 = async function () {
  var defProg = JSON.parse(window.localStorage.getItem('defaults'))['defProg']
  await setFormDefualts('ddProgramType','ddProvince','ddDistrict','ddTehsil')
  await updatGeoElonChange('ddProvince','ddDistrict','ddTehsil', 'ddUC','ddHealthHouse',defProg )
  function prepareQry() {
    var qry = {};
    $("#ddProvince").val() ? (qry.province = $("#ddProvince option:selected").text()) : qry.province = "";
    $("#ddDistrict").val() ? (qry.district = $("#ddDistrict option:selected").text()) : qry.district = "";
    $("#ddTehsil").val() ? (qry.tehsil = $("#ddTehsil option:selected").text()) : qry.tehsil = "";
    $("#ddUc").val() ? (qry.uc = $("#ddTehsil option:selected").text()) : qry.uc = "";
    $("#ddHealthHouse").val() ? (qry.site = $("#ddHealthHouse option:selected").text()) : qry.site = "";
    // $("#report_month").val() ? (qry.report_month = $("#report_month").val())  : qry.report_month ="";
    // $("#prog_type").val() ? (qry.prog_type = $("#ddProgramType").val()) : "";
    // console.log(qry);
    return qry;
  }
  async function retiveData(qry) {
    var data = await knex('v_defaulter')
      .where('province', 'like', `%${qry.province}%`)
      .where('district_name', 'like', `%${qry.district}%`)
      .where('tehsil_name', 'like', `%${qry.tehsil}%`)
      .where('uc_name', 'like', `%${qry.uc}%`)
      .where('site_name', 'like', `%${qry.site}%`)
    // console.log(data)
    return data;
  }

  async function makeTable() {
    var data = await retiveData(prepareQry())
    // console.log(data);
    if ($.fn.DataTable.isDataTable('#defaulter')) {
      $('#defaulter').DataTable().destroy();
    }
    $('#defaulter tbody').empty();
    $('#defaulter').DataTable({
      data: data,
      dom: 'Bfrtip',
      buttons: [
        'copy', {
          extend: 'csv',
          title: `Defaulter List_${Date.now()}`,
          // className: 'btn btn-secondary btn-sm'
        }, {
          extend: 'excel',
          title: `Defaulter List_${Date.now()}`,
          // className: 'btn btn-secondary btn-sm'
        }
      ],
      initComplete: function () {
        var btns = $('.dt-button');
        btns.addClass('btn btn-success btn-sm');
        btns.removeClass('dt-button');

      },
      "scrollY": 380,
      "scrollX": true,
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
          title: 'U C',
          data: 'uc_name'
        },
        {
          title: 'Site Name',
          data: 'site_name'
        },
        {
          title: 'Village Name',
          data: 'site_village'
        },
        {
          title: 'Reg Date',
          data: 'reg_date'
        },
        {
          title: 'Patient Name',
          data: 'Patient Name'
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
          title: 'MUAC',
          data: 'MUAC'
        },
        {
          title: 'Guardian Name',
          data: 'Father/Husband Name'
        },
        {
          title: 'Guardian CNIC',
          data: 'cnic'
        },
        {
          title: 'Address',
          data: 'address'
        },
        {
          title: 'Contact Number',
          data: 'Contact number'
        },
        {
          title: 'Last Followup',
          data: 'Last followup date'
        },
        {
          title: '# days since last followup',
          data: 'Days since last follow up'
        },

      ]
    });
  }

  // $('#makeDefTable').click(makeTable())
  $('#makeDefTable').on('click', (e) => {
    makeTable();
  })
  makeTable();
}