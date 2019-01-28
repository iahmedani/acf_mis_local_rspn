var async = require('async');
module.exports.initOtpReportsV2 = function () {
  ipc.send("getProvince");
  ipc.on("province", function(evt, province) {
    $("#ddProvince")
      .children("option:not(:first)")
      .remove();
    prov(province);
  });
  $("#ddProvince").on("change", function() {
    var prov = $(this).val();
    ipc.send("getDistrict", prov);
    ipc.on("district", function(evt, district) {
      $("#ddDistrict")
        .children("option:not(:first)")
        .remove();

      dist(district);
    });
  });
  $("#ddDistrict").on("change", function() {
    var dist = $(this).val();
    ipc.send("getTehsil", dist);
    ipc.on("tehsil", function(evt, tehsil) {
      $("#ddTehsil")
        .children("option:not(:first)")
        .remove();

      teh(tehsil);
    });
  });
  $("#ddTehsil").on("change", function() {
    var tehs = $(this).val();
    ipc.send("getUC", tehs);
    ipc.on("uc", function(evt, uc) {
      $("#ddUC")
        .children("option:not(:first)")
        .remove();

      ucListener(uc);
    });
  });
  var ucForHH;
  $("#ddUC").on("change", function() {
    var ucs = $(this).val();
    ucForHH = ucs;
    ipc.send("getHealthHouse", ucs);
    ipc.on("hh", function(evt, hh) {
      $("#ddHealthHouse")
        .children("option:not(:first)")
        .remove();
      hhListener(hh);
    });
  });

  $("#showAddExitReport").on("click", function(e) {
    e.preventDefault();
    ipc.send("getReport", prepareQry());
    ipc.on("getReport", (e, data) => {
      myPushData(data);
      // $("#addExitSummary td:empty").each(function(el, y) {
      //   $(y).text("0");
      // });
      // createTblAdd(data.addTable, "tblAdd");
      // createTblExit(data.exitTable, "tblExit");
      ipc.removeAllListener('getReport');
    });
  });
  
  function myPushData(x) {
    console.log(x)
    var a_male_623 = (x.result.last.filter(el => el.age_group == '6_23' && el.gender == 'male').length > 0) ? x.result.last.filter(el => el.age_group == '6_23' && el.gender == 'male')[0].a : 0;
    var a_female_623 = (x.result.last.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 )? x.result.last.filter(el => el.age_group == "6_23" && el.gender == "female")[0].a : 0;
    var a_male_24_59 = (x.result.last.filter(el => el.age_group == '24_59' && el.gender == 'male').length > 0 )? x.result.last.filter(el => el.age_group == '24_59' && el.gender == 'male')[0].a : 0;
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
    var total_d = d_male_623  + d_female_623  + d_male_24_59  + d_female_24_59 ;
    $("#6_23-male-d").empty();
    $("#6_23-male-d").text(d_male_623);
    $("#6_23-female-d").empty();
    $("#6_23-female-d").text(d_female_623 );
    $("#24_59-male-d").empty();
    $("#24_59-male-d").text(d_male_24_59 );
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
    var f2_female_623 = x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female").length > 0 ? x.result.exit.filter(el => el.age_group == "6_23" && el.gender == "female")[0].f2: 0;
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
    // $("#ddProvince").val() ? (qry.province_id = $("#ddProvince").val()) : "";
    // $("#ddDistrict").val() ? (qry.district_id = $("#ddDistrict").val()) : "";
    // $("#ddTehsil").val() ? (qry.tehsil_id = $("#ddTehsil").val()) : "";
    $("#ddHealthHouse").val() ? (qry.site_id = $("#ddHealthHouse").val()) : "";
    $("#report_month").val() ? (qry.report_month = $("#report_month").val())  : "";
    // $("#prog_type").val() ? (qry.prog_type = $("#ddProgramType").val()) : "";
    // console.log(qry);
    return qry;
  }

  function createTblExit(data, table) {
    var head = [
      "OTP_id",
      "Province",
      "District",
      "Tehsil",
      "UC",
      "Nutrition Site",
      "Village",
      "Name",
      "Father Name",
      "Gender",
      "Registration No",
      "Admission Date",
      "Exit Date",
      "Exit Reason"
    ];

    var keys = [
      "otp_id",
      "province",
      "district_name",
      "tehsil_name",
      "uc_name",
      "site_name",
      "site_village",
      "p_name",
      "f_or_h_name",
      "gender",
      "reg_id",
      "reg_date",
      "exit_date",
      "exit_reason"
    ];
    var html = "<tr>";
    head.forEach(el => {
      html += "<th>" + el + "</th>";
    });
    html += "</tr>";
    data.forEach(el => {
      html += "<tr>";
      keys.forEach(key => {
        html += "<td>" + el[key] + "</td>";
      });
      html += "</tr>";
    });
    // console.log(html);
    $("#" + table).empty();
    $("#" + table).append(html);
  }

  function createTblAdd(data, table) {
    var head = [
      "OTP_id",
      "Province",
      "District",
      "Tehsil",
      "UC",
      "Nutrition Site",
      "Village",
      "Name",
      "Father Name",
      "Contact Number",
      "Addmision Date",
      "Gender",
      "Age",
      "Address",
      "Admision Reason",
      "Refferal Type",
      "Oedema",
      "MUAC",
      "Weight",
      "Height",
      "Diarrhoea",
      "Vomiting",
      "Cough",
      "Appetite",
      "Daily Stool",
      "Urine",
      "Breast Feeding"
    ];
    var keys = [
      "otp_id",
      "province",
      "district_name",
      "tehsil_name",
      "uc_name",
      "site_name",
      "site_village",
      "p_name",
      "f_or_h_name",
      "cnt_number",
      "reg_date",
      "gender",
      "age",
      "address",
      "ent_reason",
      "ref_type",
      "oedema",
      "muac",
      "weight",
      "height",
      "diarrhoea",
      "vomiting",
      "cough",
      "appetite",
      "daily_stool",
      "pass_urine",
      "b_Feeding"
    ];

    var yN = ["No", "Yes"];
    var html = "<tr>";
    head.forEach(el => {
      html += "<th>" + el + "</th>";
    });
    html += "</tr>";
    data.forEach(el => {
      html += "<tr>";
      keys.forEach(key => {
        if (
          key === "diarrhoea" ||
          key === "vomiting" ||
          key === "cough" ||
          key === "pass_uring" ||
          key === "b_Feeding"
        ) {
          html += "<td>" + yN[el[key]] + "</td>";
        } else {
          html += "<td>" + el[key] + "</td>";
        }
      });
      html += "</tr>";
    });
    // console.log(html);
    $("#" + table).empty();
    $("#" + table).append(html);
  }
  $("#exportScrChReport").on("click", e => {
    e.preventDefault();
    export_xlsx();
  });
  var XLSX = require("xlsx");
  var electron = require("electron").remote;

  var export_xlsx = (function() {
    // var HTMLOUT = document.getElementById('htmlout');
    var XTENSION = "xls|xlsx|xlsm|xlsb|xml|csv|txt|dif|sylk|slk|prn|ods|fods|htm|html".split(
      "|"
    );
    return function() {
      var addExitReport = XLSX.utils.book_new();
      var addExitSumary = XLSX.utils.table_to_sheet(document.getElementById("addmisionReport"));
      XLSX.utils.book_append_sheet(addExitReport, addExitSumary, "Addmision");
      // console.log(addExitSumary);

      /* convert table 'table2' to worksheet named "Sheet2" */
      var Addmissions = XLSX.utils.table_to_sheet(document.getElementById("exitReport"));
      XLSX.utils.book_append_sheet(addExitReport, Addmissions, "Exit");
      // var Exits = XLSX.utils.table_to_sheet(document.getElementById("tblExit"));
      // XLSX.utils.book_append_sheet(addExitReport, Exits, "Exits");
      // var wb = XLSX.utils.table_to_book(HTMLOUT);
      var o = electron.dialog.showSaveDialog({
        title: "Save file as",
        filters: [
          {
            name: "Spreadsheets",
            extensions: XTENSION
          }
        ]
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
