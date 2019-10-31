// var async = require('async');
const knex = require('../mainfunc/db');

module.exports.initOtpReportsV2 = async function () {
  var ddReportType = $('#reportType');
  $('#singles').hide();

  let dateMinMax = async () => {
    var strDate = $('#startMonth')
    var endDate = $('#endMonth')

    var minDate = await knex.select('otp_id', 'reg_date').from('tblOtpAdd').limit(1).orderBy('otp_id', 'asc').where({
      is_deleted: 0
    });
    var maxDate = await knex.select('interim_id', 'created_at').from('tblInterimOtp').limit(1).orderBy('interim_id', 'desc').where({
      is_deleted: 0
    });
    console.log({
      minDate,
      maxDate
    })
    // let date_min = new Date(minDate[0].regDate);
    // date_min.toJSON();

    strDate.prop('min', new Date(minDate[0].reg_date.substring(0, 7)).toISOString().substring(0, 7));
    endDate.prop('min', new Date(minDate[0].reg_date.substring(0, 7)).toISOString().substring(0, 7));
    // console.log( strDate.min)
    // endDate.min =  maxDate[0].created_at.substring(0,7);
    // let date_max = new Date(maxDate[0].created_at);
    // date_max.toJSON();
    // date_max.substring(0,7); 
    strDate.prop('max', new Date(maxDate[0].created_at.substring(0, 7)).toISOString().substring(0, 7));
    endDate.prop('max', new Date(maxDate[0].created_at.substring(0, 7)).toISOString().substring(0, 7));

    // console.log(maxDate[0].created_at.substring(0,7))

    console.log(strDate.max)
    // var maxDate = await knex('tblOtp').limit(1).orderBy('otp_id', 'desc').where({id_deleted:0});
  }

  dateMinMax();

  ddReportType.on('change', (e) => {
    var strDate = $('#strDateDiv')
    var endDate = $('#endDateDiv')
    var btn = $('#btnIntervalDiv')
    var rptDate = $('#rptMonthDiv')
    // var exp = $('#btnExportDiv')
    var show = $('#btnShowDiv')
    var table = $('#addmisionReport')
    var tableInerval = $('#myId')
    if (ddReportType.val() == 'interval') {
      strDate.css('display', '')
      endDate.css('display', '')
      btn.css('display', '')
      rptDate.css('display', 'none')
      // exp.css('display', 'none')
      show.css('display', 'none')
      table.css('display', 'none')
      tableInerval.css('display', '')
      $('#startMonth').attr('required', true)
      $('#endMonth').attr('required', true)
      $('#report_month').attr('required', false)


    } else {
      strDate.css('display', 'none')
      endDate.css('display', 'none')
      btn.css('display', 'none')
      tableInerval.css('display', 'none')
      rptDate.css('display', '')
      // exp.css('display', '')
      show.css('display', '')
      table.css('display', '')
      $('#startMonth').attr('required', false)
      $('#endMonth').attr('required', false)
      $('#report_month').attr('required', true)
      // $('#example').DataTable().destroy();

      // table1
      // $('#tableDestroy').on( 'click', function () {
      // } );
    }
  })
  ipc.send("getProvince");
  ipc.on("province", function (evt, province) {
    $("#ddProvince")
      .children("option:not(:first)")
      .remove();
    prov(province);
  });
  $("#ddProvince").on("change", function () {
    var prov = $(this).val();
    ipc.send("getDistrict", prov);
    ipc.on("district", function (evt, district) {
      $("#ddDistrict")
        .children("option:not(:first)")
        .remove();

      dist(district);
    });
  });
  $("#ddDistrict").on("change", function () {
    var dist = $(this).val();
    ipc.send("getTehsil", dist);
    ipc.on("tehsil", function (evt, tehsil) {
      $("#ddTehsil")
        .children("option:not(:first)")
        .remove();

      teh(tehsil);
    });
  });
  $("#ddTehsil").on("change", function () {
    var tehs = $(this).val();
    ipc.send("getUC", tehs);
    ipc.on("uc", function (evt, uc) {
      $("#ddUC")
        .children("option:not(:first)")
        .remove();

      ucListener(uc);
    });
  });
  var ucForHH;
  $("#ddUC").on("change", function () {
    var ucs = $(this).val();
    ucForHH = ucs;
    ipc.send("getHealthHouse", ucs);
    ipc.on("hh", function (evt, hh) {
      $("#ddHealthHouse")
        .children("option:not(:first)")
        .remove();
      hhListener(hh);
    });
  });

  $('#ddProgramType').on('change', function () {
    var prog_type = $(this).val();
    if (prog_type == 'sc') {
      $('#ddUc').attr('disabled', true)
      $('#ddHealthHouse').attr('disabled', true)
      $('#nsc_report').css('display', 'block')
      $('#otp_report').css('display', 'none')
    } else {
      $('#ddUc').attr('disabled', false)
      $('#ddHealthHouse').attr('disabled', false)
      $('#nsc_report').css('display', 'none')
      $('#otp_report').css('display', 'block')
    }
  })

  async function beginMonth(data) {
    console.log(data)
    var x = await knex('v_otpNotExitInterval').select('gender', 'age_group').count({
        a: 'otp_id'
      }).where('reg_date', '<', data.report_month)
      .where('site_id', 'like', `%${data.site_id}%`)
      .where('province_id', 'like', `%${data.province_id}%`)
      .where('district_id', 'like', `%${data.district_id}%`)
      .where('tehsil_id', 'like', `%${data.tehsil_id}%`)
      .where('uc_id', 'like', `%${data.uc_id}%`)
      .groupBy('age_group', 'gender');

    var y = await knex('v_otpNotExitInterval').select('gender', 'age_group').count({
        a: 'otp_id'
      }).where('reg_date', '<', data.report_month)
      .where('site_id', 'like', `%${data.site_id}%`)
      .where('province_id', 'like', `%${data.province_id}%`)
      .where('district_id', 'like', `%${data.district_id}%`)
      .where('tehsil_id', 'like', `%${data.tehsil_id}%`)
      .where('uc_id', 'like', `%${data.uc_id}%`)
      .groupBy('age_group', 'gender').toSQL().toNative();
    console.log({
      x,
      y
    })
  }
  $("#showAddExitReport").on("click", async function (e) {
    var _x = prepareQry();
    console.log(await beginMonth(_x))
    e.preventDefault();
    ipc.send("getReport", prepareQry());
    $('#tblMonthCol').empty()
    $('#tblMonthCol').text($('#report_month').val())
    $('#reportMonthT').empty();
    $('#reportMonthT').text(`Province:${$('#ddProvince option:selected').text()},District:${$('#ddDistrict option:selected').text()},Tehsil:${$('#ddTehsil option:selected').text()},UC:${$('#ddUC option:selected').text()},Reporting Site:${$('#ddHealthHouse option:selected').text()}`);
    ipc.on("getReport", (e, data) => {
      myPushData(data);
      //   $('#DataTable').DataTable( {
      //     dom: 'Bfrtip',
      //     buttons: [
      //         'copy', 'csv', 'excel'
      //     ]
      // } );
      // $("#addExitSummary td:empty").each(function(el, y) {
      //   $(y).text("0");
      // });
      // createTblAdd(data.addTable, "tblAdd");
      // createTblExit(data.exitTable, "tblExit");
      ipc.removeAllListeners('getReport');
    });
  });

  function myPushData(x) {
    console.log(x)
    var a_male_623 = (x.result.last.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.last.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].a : 0;
    var a_female_623 = (x.result.last.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.last.filter(el => el.age_group == "6_23" && el.gender == "female")[0].a : 0;
    var a_male_24_59 = (x.result.last.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.last.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].a : 0;
    var a_female_24_59 = (x.result.last.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.last.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].a : 0;
    var total_a = a_male_623 + a_female_623 + a_male_24_59 + a_female_24_59;
    $('#6_23-male-a').empty()
    $('#6_23-male-a').text(a_male_623)
    $('#6_23-female-a').empty()
    $('#6_23-female-a').text(a_female_623)
    $('#24_59-male-a').empty()
    $('#24_59-male-a').text(a_male_24_59)
    $('#24_59-female-a').empty()
    $('#24_59-female-a').text(a_female_24_59)
    $('#total-a').empty();
    $('#total-a').text(total_a);
    var b1_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].b1 : 0;
    var b1_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].b1 : 0;
    var b1_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].b1 : 0;
    var b1_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].b1 : 0;
    var total_b1 = b1_male_623 + b1_female_623 + b1_male_24_59 + b1_female_24_59;
    $("#6_23-male-b1").empty();
    $("#6_23-male-b1").text(b1_male_623);
    $("#6_23-female-b1").empty();
    $("#6_23-female-b1").text(b1_female_623);
    $("#24_59-male-b1").empty();
    $("#24_59-male-b1").text(b1_male_24_59);
    $("#24_59-female-b1").empty();
    $("#24_59-female-b1").text(b1_female_24_59);
    $("#total-b1").empty();
    $("#total-b1").text(total_b1);
    var b2_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].b2 : 0;
    var b2_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].b2 : 0;
    var b2_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].b2 : 0;
    var b2_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].b2 : 0;
    var total_b2 = b2_male_623 + b2_female_623 + b2_male_24_59 + b2_female_24_59;
    $("#6_23-male-b2").empty();
    $("#6_23-male-b2").text(b2_male_623);
    $("#6_23-female-b2").empty();
    $("#6_23-female-b2").text(b2_female_623);
    $("#24_59-male-b2").empty();
    $("#24_59-male-b2").text(b2_male_24_59);
    $("#24_59-female-b2").empty();
    $("#24_59-female-b2").text(b2_female_24_59);
    $("#total-b2").empty();
    $("#total-b2").text(total_b2);
    var b_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].b : 0;
    var b_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].b : 0;
    var b_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].b : 0;
    var b_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].b : 0;
    var total_b = b_male_623 + b_female_623 + b_male_24_59 + b_female_24_59;
    $("#6_23-male-b").empty();
    $("#6_23-male-b").text(b_male_623);
    $("#6_23-female-b").empty();
    $("#6_23-female-b").text(b_female_623);
    $("#24_59-male-b").empty();
    $("#24_59-male-b").text(b_male_24_59);
    $("#24_59-female-b").empty();
    $("#24_59-female-b").text(b_female_24_59);
    $("#total-b").empty();
    $("#total-b").text(total_b);
    var c1_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].c1 : 0;
    var c1_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].c1 : 0;
    var c1_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].c1 : 0;
    var c1_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].c1 : 0;
    var total_c1 = c1_male_623 + c1_female_623 + c1_male_24_59 + c1_female_24_59;
    $("#6_23-male-c1").empty();
    $("#6_23-male-c1").text(c1_male_623);
    $("#6_23-female-c1").empty();
    $("#6_23-female-c1").text(c1_female_623);
    $("#24_59-male-c1").empty();
    $("#24_59-male-c1").text(c1_male_24_59);
    $("#24_59-female-c1").empty();
    $("#24_59-female-c1").text(c1_female_24_59);
    $("#total-c1").empty();
    $("#total-c1").text(total_c1);
    var c2_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].c2 : 0;
    var c2_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].c2 : 0;
    var c2_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].c2 : 0;
    var c2_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].c2 : 0;
    var total_c2 = c2_male_623 + c2_female_623 + c2_male_24_59 + c2_female_24_59;
    $("#6_23-male-c2").empty();
    $("#6_23-male-c2").text(c2_male_623);
    $("#6_23-female-c2").empty();
    $("#6_23-female-c2").text(c2_female_623);
    $("#24_59-male-c2").empty();
    $("#24_59-male-c2").text(c2_male_24_59);
    $("#24_59-female-c2").empty();
    $("#24_59-female-c2").text(c2_female_24_59);
    $("#total-c2").empty();
    $("#total-c2").text(total_c2);
    var c3_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].c3 : 0;
    var c3_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].c3 : 0;
    var c3_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].c3 : 0;
    var c3_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].c3 : 0;
    var total_c3 = c3_male_623 + c3_female_623 + c3_male_24_59 + c3_female_24_59;
    $("#6_23-male-c3").empty();
    $("#6_23-male-c3").text(c3_male_623);
    $("#6_23-female-c3").empty();
    $("#6_23-female-c3").text(c3_female_623);
    $("#24_59-male-c3").empty();
    $("#24_59-male-c3").text(c3_male_24_59);
    $("#24_59-female-c3").empty();
    $("#24_59-female-c3").text(c3_female_24_59);
    $("#total-c3").empty();
    $("#total-c3").text(total_c3);
    var cc_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].cc : 0;
    var cc_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].cc : 0;
    var cc_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].cc : 0;
    var cc_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].cc : 0;
    var total_cc = cc_male_623 + cc_female_623 + cc_male_24_59 + cc_female_24_59;
    $("#6_23-male-cc").empty();
    $("#6_23-male-cc").text(cc_male_623);
    $("#6_23-female-cc").empty();
    $("#6_23-female-cc").text(cc_female_623);
    $("#24_59-male-cc").empty();
    $("#24_59-male-cc").text(cc_male_24_59);
    $("#24_59-female-cc").empty();
    $("#24_59-female-cc").text(cc_female_24_59);
    $("#total-cc").empty();
    $("#total-cc").text(total_cc);
    var c_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].c : 0;
    var c_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].c : 0;
    var c_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].c : 0;
    var c_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].c : 0;
    var total_c = c_male_623 + c_female_623 + c_male_24_59 + c_female_24_59;
    $("#6_23-male-c").empty();
    $("#6_23-male-c").text(c_male_623);
    $("#6_23-female-c").empty();
    $("#6_23-female-c").text(c_female_623);
    $("#24_59-male-c").empty();
    $("#24_59-male-c").text(c_male_24_59);
    $("#24_59-female-c").empty();
    $("#24_59-female-c").text(c_female_24_59);
    $("#total-c").empty();
    $("#total-c").text(total_c);
    var d_male_623 = (x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].d : 0;
    var d_female_623 = (x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0) ? x.result.add.filter(el => el.age_group == "6_23" && el.gender == "female")[0].d : 0;
    var d_male_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].d : 0;
    var d_female_24_59 = (x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female').length > 0) ? x.result.add.filter(el => el.age_group == '24_59' && el.gender == 'female')[0].d : 0;
    d_female_623 = d_female_623 + a_female_623;
    d_male_623 = d_male_623 + a_male_623;
    d_male_24_59 = d_male_24_59 + a_male_24_59;
    d_female_24_59 = d_female_24_59 + a_female_24_59;
    var total_d = d_male_623 + d_female_623 + d_male_24_59 + d_female_24_59;
    $("#6_23-male-d").empty();
    $("#6_23-male-d").text(d_male_623);
    $("#6_23-female-d").empty();
    $("#6_23-female-d").text(d_female_623);
    $("#24_59-male-d").empty();
    $("#24_59-male-d").text(d_male_24_59);
    $("#24_59-female-d").empty();
    $("#24_59-female-d").text(d_female_24_59);
    $("#total-d").empty();
    $("#total-d").text(total_d);

    var e1_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].e1 : 0;
    var e1_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].e1 : 0;
    var e1_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].e1 : 0;
    var e1_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].e1 : 0;
    var total_e1 = e1_male_623 + e1_female_623 + e1_male_24_59 + e1_female_24_59;
    $("#6_23-male-e1").empty();
    $("#6_23-male-e1").text(e1_male_623);
    $("#6_23-female-e1").empty();
    $("#6_23-female-e1").text(e1_female_623);
    $("#24_59-male-e1").empty();
    $("#24_59-male-e1").text(e1_male_24_59);
    $("#24_59-female-e1").empty();
    $("#24_59-female-e1").text(e1_female_24_59);
    $("#total-e1").empty();
    $("#total-e1").text(total_e1);
    var e2_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].e2 : 0;
    var e2_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].e2 : 0;
    var e2_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].e2 : 0;
    var e2_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].e2 : 0;
    var total_e2 = e2_male_623 + e2_female_623 + e2_male_24_59 + e2_female_24_59;
    $("#6_23-male-e2").empty();
    $("#6_23-male-e2").text(e2_male_623);
    $("#6_23-female-e2").empty();
    $("#6_23-female-e2").text(e2_female_623);
    $("#24_59-male-e2").empty();
    $("#24_59-male-e2").text(e2_male_24_59);
    $("#24_59-female-e2").empty();
    $("#24_59-female-e2").text(e2_female_24_59);
    $("#total-e2").empty();
    $("#total-e2").text(total_e2);
    var e3_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].e3 : 0;
    var e3_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].e3 : 0;
    var e3_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].e3 : 0;
    var e3_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].e3 : 0;
    var total_e3 = e3_male_623 + e3_female_623 + e3_male_24_59 + e3_female_24_59;
    $("#6_23-male-e3").empty();
    $("#6_23-male-e3").text(e3_male_623);
    $("#6_23-female-e3").empty();
    $("#6_23-female-e3").text(e3_female_623);
    $("#24_59-male-e3").empty();
    $("#24_59-male-e3").text(e3_male_24_59);
    $("#24_59-female-e3").empty();
    $("#24_59-female-e3").text(e3_female_24_59);
    $("#total-e3").empty();
    $("#total-e3").text(total_e3);
    var e4_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].e4 : 0;
    var e4_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].e4 : 0;
    var e4_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].e4 : 0;
    var e4_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].e4 : 0;
    var total_e4 = e4_male_623 + e4_female_623 + e4_male_24_59 + e4_female_24_59;
    $("#6_23-male-e4").empty();
    $("#6_23-male-e4").text(e4_male_623);
    $("#6_23-female-e4").empty();
    $("#6_23-female-e4").text(e4_female_623);
    $("#24_59-male-e4").empty();
    $("#24_59-male-e4").text(e4_male_24_59);
    $("#24_59-female-e4").empty();
    $("#24_59-female-e4").text(e4_female_24_59);
    $("#total-e4").empty();
    $("#total-e4").text(total_e4);
    var e_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].e : 0;
    var e_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].e : 0;
    var e_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].e : 0;
    var e_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].e : 0;
    var total_e = e_male_623 + e_female_623 + e_male_24_59 + e_female_24_59;
    $("#6_23-male-e").empty();
    $("#6_23-male-e").text(e_male_623);
    $("#6_23-female-e").empty();
    $("#6_23-female-e").text(e_female_623);
    $("#24_59-male-e").empty();
    $("#24_59-male-e").text(e_male_24_59);
    $("#24_59-female-e").empty();
    $("#24_59-female-e").text(e_female_24_59);
    $("#total-e").empty();
    $("#total-e").text(total_e);
    var f1_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].f1 : 0;
    var f1_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].f1 : 0;
    var f1_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].f1 : 0;
    var f1_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].f1 : 0;
    var total_f1 = f1_male_623 + f1_female_623 + f1_male_24_59 + f1_female_24_59;
    $("#6_23-male-f1").empty();
    $("#6_23-male-f1").text(f1_male_623);
    $("#6_23-female-f1").empty();
    $("#6_23-female-f1").text(f1_female_623);
    $("#24_59-male-f1").empty();
    $("#24_59-male-f1").text(f1_male_24_59);
    $("#24_59-female-f1").empty();
    $("#24_59-female-f1").text(f1_female_24_59);
    $("#total-f1").empty();
    $("#total-f1").text(total_f1);
    var f2_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].f2 : 0;
    var f2_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].f2 : 0;
    var f2_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].f2 : 0;
    var f2_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].f2 : 0;
    var total_f2 = f2_male_623 + f2_female_623 + f2_male_24_59 + f2_female_24_59;
    $("#6_23-male-f2").empty();
    $("#6_23-male-f2").text(f2_male_623);
    $("#6_23-female-f2").empty();
    $("#6_23-female-f2").text(f2_female_623);
    $("#24_59-male-f2").empty();
    $("#24_59-male-f2").text(f2_male_24_59);
    $("#24_59-female-f2").empty();
    $("#24_59-female-f2").text(f2_female_24_59);
    $("#total-f2").empty();
    $("#total-f2").text(total_f2);
    var f3_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].f3 : 0;
    var f3_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].f3 : 0;
    var f3_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].f3 : 0;
    var f3_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].f3 : 0;
    var total_f3 = f3_male_623 + f3_female_623 + f3_male_24_59 + f3_female_24_59;
    $("#6_23-male-f3").empty();
    $("#6_23-male-f3").text(f3_male_623);
    $("#6_23-female-f3").empty();
    $("#6_23-female-f3").text(f3_female_623);
    $("#24_59-male-f3").empty();
    $("#24_59-male-f3").text(f3_male_24_59);
    $("#24_59-female-f3").empty();
    $("#24_59-female-f3").text(f3_female_24_59);
    $("#total-f3").empty();
    $("#total-f3").text(total_f3);
    var f_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].f : 0;
    var f_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].f : 0;
    var f_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].f : 0;
    var f_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].f : 0;
    var total_f = f_male_623 + f_female_623 + f_male_24_59 + f_female_24_59;
    $("#6_23-male-f").empty();
    $("#6_23-male-f").text(f_male_623);
    $("#6_23-female-f").empty();
    $("#6_23-female-f").text(f_female_623);
    $("#24_59-male-f").empty();
    $("#24_59-male-f").text(f_male_24_59);
    $("#24_59-female-f").empty();
    $("#24_59-female-f").text(f_female_24_59);
    $("#total-f").empty();
    $("#total-f").text(total_f);

    var g_male_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "male")[0].g : 0;
    var g_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].g : 0;
    var g_male_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "male")[0].g : 0;
    var g_female_24_59 = x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "24_59" && el.gender == "female")[0].g : 0;
    var total_g = g_male_623 + g_female_623 + g_male_24_59 + g_female_24_59;
    $("#6_23-male-g").empty();
    $("#6_23-male-g").text(g_male_623);
    $("#6_23-female-g").empty();
    $("#6_23-female-g").text(g_female_623);
    $("#24_59-male-g").empty();
    $("#24_59-male-g").text(g_male_24_59);
    $("#24_59-female-g").empty();
    $("#24_59-female-g").text(g_female_24_59);
    $("#total-g").empty();
    $("#total-g").text(total_g);

    var h_male_623 = (d_male_623 - g_male_623) ? (d_male_623 - g_male_623) : 0;
    var h_female_623 = (d_female_623 - g_female_623) ? (d_female_623 - g_female_623) : 0;
    var h_male_24_59 = d_male_24_59 - g_male_24_59;
    var h_female_24_59 = d_female_24_59 - g_female_24_59;
    var total_h = h_male_623 + h_female_623 + h_male_24_59 + h_female_24_59;
    $("#6_23-male-h").empty();
    $("#6_23-male-h").text(h_male_623);
    $("#6_23-female-h").empty();
    $("#6_23-female-h").text(h_female_623);
    $("#24_59-male-h").empty();
    $("#24_59-male-h").text(h_male_24_59);
    $("#24_59-female-h").empty();
    $("#24_59-female-h").text(h_female_24_59);
    $("#total-h").empty();
    $("#total-h").text(total_h);


    // var lastKeys = Object.keys(x.result.last[0]);
    // var LastArray = [];
    // x.result.last.forEach(function (el, i) {
    //   var myElements = [];
    //   var temp = [];
    //   Object.keys(el).forEach((fl, j) => {
    //     temp.push(fl);
    //     if (temp.length - 1 == j) {

    //     }
    //   })
    //   lastKeys.forEach(function (fl, j) {
    //     temp.push(el)
    //   })

    // })
    // x.add.forEach(el => {
    //   if (el.age == "range6to23" && el.gender == "male") {
    //     console.log("range6to23" + "male")
    //     for (add in el) {
    //       $(`#623_boys_add_${add}`).empty();
    //       $(`#623_boys_add_${add}`).text(el[add] ? el[add] : 0);
    //     }

    //   } else if ((el.age == "range6to23" && el.gender == "female")) {
    //     console.log("range6to23" + "female")

    //     for (add in el) {
    //       $(`#623_girls_add_${add}`).empty();
    //       $(`#623_girls_add_${add}`).text(el[add] ? el[add] : 0);
    //     }
    //   } else if ((el.age == "range24-59" && el.gender == "male")) {
    //     console.log("range24-59" + "male")

    //     for (add in el) {
    //       $(`#2459_boys_add_${add}`).empty();
    //       $(`#2459_boys_add_${add}`).text(el[add] ? el[add] : 0);
    //     }
    //   } else if ((el.age == "range24-59" && el.gender == "female")) {
    //     console.log("range24-59" + "female")

    //     for (add in el) {
    //       $(`#2459_girls_add_${add}`).empty();
    //       $(`#2459_girls_add_${add}`).text(el[add] ? el[add] : 0);
    //     }
    //   } else {
    //     console.log(el);
    //   }
    // });
    // x.exit.forEach(el => {
    //   if (el.eAge == "range6to23" && el.eGender == "male") {
    //     for (exit in el) {
    //       $(`#623_boys_exit_${exit}`).empty();
    //       $(`#623_boys_exit_${exit}`).text(el[exit] ? el[exit] : 0);
    //     }

    //   } else if ((el.eAge == "range6to23" && el.eGender == "female")) {
    //     for (exit in el) {
    //       $(`#623_girls_exit_${exit}`).empty();
    //       $(`#623_girls_exit_${exit}`).text(el[exit] ? el[exit] : 0);
    //     }
    //   } else if ((el.eAge == "range24-59" && el.eGender == "male")) {
    //     for (exit in el) {
    //       $(`#2459_boys_exit_${exit}`).empty();
    //       $(`#2459_boys_exit_${exit}`).text(el[exit] ? el[exit] : 0);
    //     }
    //   } else if ((el.eAge == "range24-59" && el.eGender == "female")) {
    //     for (exit in el) {
    //       $(`#2459_girls_exit_${exit}`).empty();
    //       $(`#2459_girls_exit_${exit}`).text(el[exit] ? el[exit] : 0);
    //     }
    //   } else {
    //     console.log(el);
    //   }
    // });

  }


  function prepareQry() {
    var qry = {};
    $("#ddProvince").val() ? (qry.province_id = $("#ddProvince").val()) : qry.province_id = "";
    $("#ddDistrict").val() ? (qry.district_id = $("#ddDistrict").val()) : qry.district_id = "";
    $("#ddTehsil").val() ? (qry.tehsil_id = $("#ddTehsil").val()) : qry.tehsil_id = "";
    $("#ddUc").val() ? (qry.uc_id = $("#ddTehsil").val()) : qry.uc_id = "";
    $("#ddHealthHouse").val() ? (qry.site_id = $("#ddHealthHouse").val()) : qry.site_id = "";
    $("#report_month").val() ? (qry.report_month = $("#report_month").val()) : qry.report_month = "";
    // $("#prog_type").val() ? (qry.prog_type = $("#ddProgramType").val()) : "";
    // console.log(qry);
    return qry;
  }

  function prepareQryInterval() {
    var qry = {};
    $("#ddProvince").val() ? (qry.province_id = $("#ddProvince").val()) : qry.province_id = "";
    $("#ddDistrict").val() ? (qry.district_id = $("#ddDistrict").val()) : qry.district_id = "";
    $("#ddTehsil").val() ? (qry.tehsil_id = $("#ddTehsil").val()) : qry.tehsil_id = "";
    $("#ddUc").val() ? (qry.uc_id = $("#ddTehsil").val()) : qry.uc_id = "";
    $("#ddHealthHouse").val() ? (qry.site_id = $("#ddHealthHouse").val()) : qry.site_id = "";
    $("#startMonth").val() ? (qry.startMonth = $("#startMonth").val()) : qry.startMonth = "";
    $("#endMonth").val() ? (qry.endMonth = $("#endMonth").val()) : qry.endMonth = "";
    // $("#prog_type").val() ? (qry.prog_type = $("#ddProgramType").val()) : "";
    // console.log(qry);
    // if(qry.startMonth == ""|| qry.endMonth ==""){

    // }
    return qry;
  }

  // function toArrayData(data, month){
  //   var returnData = [];


  // }
  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months + 1;
  }

  function prepareMonth(start, end, cb) {
    // console.log(start, end)
    // return new Promise(resolve =>{
    var x = [];
    var totalMonth = monthDiff(new Date(start), new Date(end));
    // console.log(totalMonth)
    if (totalMonth == 0) {
      alert('To view report there should be difference of atleast one month b/w Start and End Month')
      cb(0)
    } else {

      var i = 0;
      while (i < totalMonth) {
        var dt = new Date(start);
        dt.setMonth(dt.getMonth() + i)
        x.push(`${dt.getFullYear()+ '-' + (dt.getMonth() < 9 ? '0'+(dt.getMonth()+1) : dt.getMonth()+1) }`)
        i++;
        // console.log(i)
        if (totalMonth - 1 == i) {
          // console.log(x)
          cb(null, x)
        }
      }
    }

    // })
    // console.log(totalMonth)  
  }
  let prepareMonthPromise = (start, end) => {
    return new Promise((resolve, reject) => {
      prepareMonth(start, end, (err, test) => {
        if (err) {
          reject()
        } else {
          resolve(test)
        }
      })
    })
  }



  async function IntervalReportData(qry, month) {
    var last = await knex("v_otpNotExitInterval")
      .select('age_group', 'gender')
      .count({
        a: 'otp_id'
      })
      .where('reg_date', '<', month)
      .where('site_id', 'like', `%${qry.site_id}%`)
      .where('province_id', 'like', `%${qry.province_id}%`)
      .where('district_id', 'like', `%${qry.district_id}%`)
      .where('tehsil_id', 'like', `%${qry.tehsil_id}%`)
      .where('uc_id', 'like', `%${qry.uc_id}%`)
      .groupBy("age_group", "gender")

    var otpAdd = await knex("v_otpAddInterval")
      .select(knex.raw(`(case when age > 23 then '24_59' when age <24 then '6_23' end) as age_group,
gender,
count(case when muac < 11.5  and ent_reason = 'no_prv_pro' then 1 end) as b1,  
count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end) as b2,
( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) as b,
count(case when ent_reason = 'return_def' then 1 end) as c1,
count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) as c2,
count(case when (ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro') then 1 end) as c3,
count(case when ent_reason = 'relapse' then 1 end) as cc,
(  count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro' then 1 end) )  as c,
(( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) + (count(case when ent_reason = 'relapse' then 1 end)) + (count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro' then 1 end))) as d`))
      .where("reg_date", "like", `${month}%`)
      .where('site_id', 'like', `%${qry.site_id}%`)
      .where('province_id', 'like', `%${qry.province_id}%`)
      .where('district_id', 'like', `%${qry.district_id}%`)
      .where('tehsil_id', 'like', `%${qry.tehsil_id}%`)
      .where('uc_id', 'like', `%${qry.uc_id}%`)
      .groupBy("age_group", "gender")

    // console.log(otpAdd)

    var otpExit = await knex('v_exitOtpReportInterval')
      .select(knex.raw(`(case when age > 23 then '24_59' when age <24 then '6_23' end) as age_group,
gender,
count(case when exit_reason = 'cured' then 1 end) as e1,
count(case when exit_reason = 'death' then 1 end) as e2,
count(case when exit_reason = 'defaulter' then 1 end) as e3,
count(case when exit_reason = 'non_respondent' then 1 end) as e4,
(count(case when exit_reason = 'cured' then 1 end)+ count(case when exit_reason = 'death' then 1 end) + count(case when exit_reason = 'defaulter' then 1 end) + count(case when exit_reason = 'non_respondent' then 1 end)) as e,
count(case when exit_reason = 'medical_transfer' then 1 end) as f1,
count(case when exit_reason = 'medical_transfer_sc' then 1 end) as f2,
count(case when exit_reason <> 'cured' and exit_reason <> 'death' and exit_reason <> 'defaulter' and exit_reason <> 'non_respondent' and exit_reason <> 'medical_transfer' and exit_reason <> 'medical_transfer_sc' then 1 end) as f3,
(count(case when exit_reason = 'medical_transfer' then 1 end) + count(case when exit_reason = 'medical_transfer_sc' then 1 end) + count(case when exit_reason <> 'cured' and exit_reason <> 'death' and exit_reason <> 'defaulter' and exit_reason <> 'non_respondent' and exit_reason <> 'medical_transfer' and exit_reason <> 'medical_transfer_sc' then 1 end)) as f,
((count(case when exit_reason = 'medical_transfer' then 1 end) + count(case when exit_reason = 'medical_transfer_sc' then 1 end) + count(case when exit_reason <> 'cured' and exit_reason <> 'death' and exit_reason <> 'defaulter' and exit_reason <> 'non_respondent' and exit_reason <> 'medical_transfer' and exit_reason <> 'medical_transfer_sc' then 1 end)) +(count(case when exit_reason = 'cured' then 1 end)+ count(case when exit_reason = 'death' then 1 end) + count(case when exit_reason = 'defaulter' then 1 end) + count(case when exit_reason = 'non_respondent' then 1 end))) as g `))
      .where("exit_date", "like", `${month}%`)
      .where('site_id', 'like', `%${qry.site_id}%`)
      .where('province_id', 'like', `%${qry.province_id}%`)
      .where('district_id', 'like', `%${qry.district_id}%`)
      .where('tehsil_id', 'like', `%${qry.tehsil_id}%`)
      .where('uc_id', 'like', `%${qry.uc_id}%`)
      .groupBy('age_group', 'gender')
    // console.log(last, otpAdd, otpExit)
    return ({
      month,
      last,
      otpAdd,
      otpExit
    })
  }

  async function reFormateArray(data, cb) {
    var intervalData = await IntervalReportData();
    console.log(intervalData)
  }
  async function runReport(qry) {
    //  console.log(qry)
    var months = await prepareMonthPromise(qry.startMonth, qry.endMonth)
    console.log(months)

  }

  async function SingleEntriesMonthly(qry) {
    const addDataSingle = await knex('v_otpAdd_full')
      .where('site_id', 'like', `%${qry.site_id}%`)
      .where('province_id', 'like', `%${qry.province_id}%`)
      .where('district_id', 'like', `%${qry.district_id}%`)
      .where('tehsil_id', 'like', `%${qry.tehsil_id}%`)
      .where('uc_id', 'like', `%${qry.uc_id}%`)
      .where('reg_date', 'like', `%${qry.report_month}%`)
    const exitDataSingle = await knex('v_otpExit_full')
      .where('site_id', 'like', `%${qry.site_id}%`)
      .where('province_id', 'like', `%${qry.province_id}%`)
      .where('district_id', 'like', `%${qry.district_id}%`)
      .where('tehsil_id', 'like', `%${qry.tehsil_id}%`)
      .where('uc_id', 'like', `%${qry.uc_id}%`)
      .where('exit_date', 'like', `%${qry.report_month}%`)

    return {
      addDataSingle,
      exitDataSingle
    }
  }
  async function SingleEntriesInterval(qry) {
    // console.log(qry)
    $('#otpReportFilerForm').validate();
    if ($('#otpReportFilerForm').valid()) {
      try {
        const addDataSingle = await knex('v_otpAdd_full')
          .where('site_id', 'like', `%${qry.site_id}%`)
          .where('province_id', 'like', `%${qry.province_id}%`)
          .where('district_id', 'like', `%${qry.district_id}%`)
          .where('tehsil_id', 'like', `%${qry.tehsil_id}%`)
          .where('uc_id', 'like', `%${qry.uc_id}%`)
          .whereBetween('reg_date', [qry.startMonth, qry.endMonth])
        // .where('reg_date', 'like', `%${qry.report_month}%`)
        const exitDataSingle = await knex('v_otpExit_full')
          .where('site_id', 'like', `%${qry.site_id}%`)
          .where('province_id', 'like', `%${qry.province_id}%`)
          .where('district_id', 'like', `%${qry.district_id}%`)
          .where('tehsil_id', 'like', `%${qry.tehsil_id}%`)
          .where('uc_id', 'like', `%${qry.uc_id}%`)
          .whereBetween('reg_date', [qry.startMonth, qry.endMonth])
        // console.log({addDataSingle, exitDataSingle})
        return {
          addDataSingle,
          exitDataSingle
        }

      } catch (error) {
        console.log(error)
      }
    } else {

    }
  }

  function prepareDataForTable(data, cb) {
    // console.log(data)
    // var lines = 4;
    var genders = ['male', 'female'];
    var age_groups = ['6_23', '24_59'];
    // var totalMonths = data.length;
    var y = [];
    if (data.length == 0) {
      cb(0)
    } else {
      for (month of data) {
        var last = month.last;
        var otpAdd = month.otpAdd;
        var otpExit = month.otpExit;
        for (age of age_groups) {
          for (gender of genders) {
            var z = {};
            z.month = month.month;
            z.age_group = age;
            z.gender = gender;
            if (last.length > 0) {
              var newLast = last.filter(el => el.gender == gender && el.age_group == age)[0];
              if (newLast) {
                z.a = newLast.a;
              } else {
                z.a = 0;
              }
            } else {
              z.a = 0;
            }

            if (otpAdd.length > 0) {
              var newOtp = otpAdd.filter(el => el.gender == gender && el.age_group == age)[0];
              // console.log(newOtp)
              if (newOtp) {
                z.b = newOtp.b,
                  z.b1 = newOtp.b1
                z.b2 = newOtp.b2
                z.c = newOtp.c
                z.c1 = newOtp.c1
                z.c2 = newOtp.c2
                z.c3 = newOtp.c3
                z.cc = newOtp.cc
                z.d = newOtp.d
              } else {
                z.b = 0,
                  z.b1 = 0
                z.b2 = 0
                z.c = 0,
                  z.c1 = 0,
                  z.c2 = 0,
                  z.c3 = 0,
                  z.cc = 0,
                  z.d = 0
              }
            } else {
              z.b = 0,
                z.b1 = 0
              z.b2 = 0
              z.c = 0,
                z.c1 = 0,
                z.c2 = 0,
                z.c3 = 0,
                z.cc = 0,
                z.d = 0

            }
            if (otpExit.length > 0) {
              var newExit = otpAdd.filter(el => el.gender == gender && el.age_group == age)[0];
              if (newExit) {
                z.e = newExit.e;
                z.e1 = newExit.e1;
                z.e2 = newExit.e2;
                z.e3 = newExit.e3;
                z.e4 = newExit.e4;
                z.f = newExit.f;
                z.f1 = newExit.f1;
                z.f2 = newExit.f2;
                z.f3 = newExit.f3;
                z.g = newExit.g
              } else {
                z.e = 0;
                z.e1 = 0;
                z.e2 = 0;
                z.e2 = 0;
                z.e3 = 0;
                z.e4 = 0;
                z.f = 0;
                z.f1 = 0;
                z.f2 = 0;
                z.f3 = 0;
                z.g = 0;
              }
            } else {
              z.e = 0;
              z.e1 = 0;
              z.e2 = 0;
              z.e2 = 0;
              z.e3 = 0;
              z.e4 = 0;
              z.f = 0;
              z.f1 = 0;
              z.f2 = 0;
              z.f3 = 0;
              z.g = 0;
            }
            y.push(z)
          }
        }
        if (y.length / 4 == data.length) {
          cb(null, y);
        }
      }
    }

  }

  function prepareDataForTablePromise(data) {
    return new Promise((resolve, reject) => {
      prepareDataForTable(data, (err, data) => {
        if (err) {
          reject()
        } else {
          resolve(data);
        }
      })
    })
  }

  const singleTables = (data) => {
    if ($.fn.DataTable.isDataTable('#tblAdd')) {
      $('#tblAdd').DataTable().destroy();
    }
    $('#tblAdd tbody').empty();
    $('#tblAdd').DataTable({
      data: data.addDataSingle,
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
          title: 'UC',
          data: 'uc_name'
        },
        {
          title: 'Site Name',
          data: 'site_name'
        },
        {
          title: 'Registration Date',
          data: 'reg_date'
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
          title: 'Age',
          data: 'age'
        },
        {
          title: 'Gender',
          data: 'gender'
        },
        {
          title: 'Father/Husband Name',
          data: 'f_or_h_name'
        },
        {
          title: 'CNIC',
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
          data: 'ent_reason'
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
          title: 'Height',
          data: 'height'
        },
        {
          title: 'Diarrhoea',
          data: 'diarrhoea'
        },
        {
          title: 'vomiting',
          data: 'vomiting'
        },
        {
          title: 'cough',
          data: 'cough'
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
          data: 'pass_urine'
        },
        {
          title: 'Breast Fed',
          data: 'b_Feeding'
        }
      ]
    })

    if ($.fn.DataTable.isDataTable('#tblExit')) {
      $('#tblExit').DataTable().destroy();
    }
    $('#tblExit tbody').empty();
    $('#tblExit').DataTable({
      data: data.exitDataSingle,
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
          title: 'UC',
          data: 'uc_name'
        },
        {
          title: 'Site Name',
          data: 'site_name'
        },
        {
          title: 'Exir Date',
          data: 'reg_date'
        },
        {
          title: 'Registration Date',
          data: 'reg_date'
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
          title: 'Gender',
          data: 'gender'
        },
        {
          title: 'Father/Husband Name',
          data: 'f_or_h_name'
        },
        {
          title: 'Exit Reason',
          data: 'exit_reason'
        }
      ]
    })
  }




  $('#exportScrChReportInterval').on('click', async (e) => {
    var qry = prepareQryInterval()
    var singleData = await SingleEntriesInterval(qry);
    singleTables(singleData);
    // console.log(singleData)
    var x = await prepareMonthPromise(qry.startMonth, qry.endMonth);
    var g = [];
    for (i of x) {
      var a = await IntervalReportData(qry, i)
      g.push(a);
      // console.log(g)
      if (x.length == g.length) {
        const tableData = await prepareDataForTablePromise(g);
        // console.log(tableData)

        if ($.fn.DataTable.isDataTable('#example')) {
          $('#example').DataTable().destroy();
        }
        $('#example tbody').empty();
        $('#example').DataTable({
          data: tableData,
          dom: 'Bfrtip',
          buttons: [
            'copy', {
              extend: 'csv',
              title: `OTP Addministion and Exit Report_${Date.now()}`
            }, {
              extend: 'excel',
              title: `OTP Addministion and Exit Report_${Date.now()}`
            }
          ],
          "scrollY": 380,
          "scrollX": true,
          columns: [{
              title: 'Month',
              data: 'month'
            },
            {
              title: 'Age Group',
              data: null,
              render: function (data, type, row) {
                return ((data.age_group == '6_23' ? '6-23 Months' : '24-59 Months'))
              }
            },
            {
              title: 'Gender',
              data: null,
              render: function (data, type, row) {
                return data.gender.toUpperCase();
              }
            },
            {
              title: `Total in OTP beginning of the month (A)`,
              data: 'a'
            },
            {
              title: `MUAC < 11.5 cm (B1)`,
              data: 'b1'
            },
            {
              title: `ODEMA(B2)`,
              data: 'b2'
            },
            {
              title: 'Total New Admission (B=B1+B2)',
              data: 'b'
            },
            {
              title: 'Return After Default(C1)',
              data: 'c1'
            },
            {
              title: 'Transfer from SC (C2)',
              data: 'c2'
            },
            {
              title: 'Other (C3)',
              data: 'c3'
            },
            {
              title: 'Relapse After Cure (CC)',
              data: 'cc'
            },
            {
              title: 'Total Moved In (C=C2+C2+C3)',
              data: 'c3'
            },
            {
              title: 'Total In (D=A+B+C+CC)',
              data: null,
              render: function (data, type, row) {
                return (data.a + data.d)
              }
            },
            {
              title: 'Cured (E1)',
              data: 'e1'
            },
            {
              title: 'Death (E2)',
              data: 'e2'
            },
            {
              title: 'Defaulter (E3)',
              data: 'e3'
            },
            {
              title: 'No Recovered (E4)',
              data: 'e4'
            },
            {
              title: 'Total Discharged (E=E1+E2+E3+E4)',
              data: 'e'
            },
            {
              title: 'Medical Transfer (F1)',
              data: 'f1'
            },
            {
              title: 'Transfer to In patient (F2)',
              data: 'f2'
            },
            {
              title: 'Other (F3)',
              data: 'f3'
            },
            {
              title: 'Total Moved Out (F=F1+F2+F3)',
              data: 'f'
            },
            {
              title: 'Total Exit (G=E+F)',
              data: 'g'
            },
            {
              title: 'Total In OTP end of the month (H=D-G)',
              data: null,
              render: function (data, type, row) {
                // console.log(data);
                return ((data.a + data.d) - data.g)
              }
            },
          ]
        });
        // mydataTable.clear().draw();
      }
    }

  })




  $("#exportScrChReport").on("click", async (e) => {
    e.preventDefault();
    const monthlySingleData = await SingleEntriesMonthly(prepareQry())
    singleTables(monthlySingleData)
    export_xlsx();
  });
  var XLSX = require("xlsx");
  var electron = require("electron").remote;

  var export_xlsx = (function () {
    // var HTMLOUT = document.getElementById('htmlout');
    var XTENSION = "xls|xlsx|xlsm|xlsb|xml|csv|txt|dif|sylk|slk|prn|ods|fods|htm|html".split(
      "|"
    );
    return function () {
      var addExitReport = XLSX.utils.book_new();
      var addExitSumary = ($('#reportType').val() == 'monthly') ? XLSX.utils.table_to_sheet(document.getElementById("addmisionReport")) : XLSX.utils.table_to_sheet(document.getElementById("example"))
      XLSX.utils.book_append_sheet(addExitReport, addExitSumary, "Summary");
      // console.log(addExitSumary);

      /* convert table 'table2' to worksheet named "Sheet2" */
      var Addmissions = XLSX.utils.table_to_sheet(document.getElementById("tblAdd"));
      XLSX.utils.book_append_sheet(addExitReport, Addmissions, "Addmisions");
      var Exits = XLSX.utils.table_to_sheet(document.getElementById("tblExit"));
      XLSX.utils.book_append_sheet(addExitReport, Exits, "Exits");
      // var wb = XLSX.utils.table_to_book(HTMLOUT);
      var o = electron.dialog.showSaveDialog({
        title: "Save file as",
        filters: [{
          name: "Spreadsheets",
          extensions: XTENSION
        }]
      });
      // console.log(o);
      XLSX.writeFile(addExitReport, o);
      electron.dialog.showMessageBox({
        message: "Exported data to " + o,
        buttons: ["OK"]
      });
    };
  })();
  void export_xlsx;
};