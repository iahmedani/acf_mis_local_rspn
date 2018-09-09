module.exports.initOtpReportsV2 = function() {
  $("#ddInterval").on("change", function() {
    var value = $(this).val();
    console.log(value);
    if (value == 1) {
      $("#start_date").attr("disabled", false);
      $("#end_date").attr("disabled", false);
    } else {
      $("#start_date").attr("disabled", true);
      $("#end_date").attr("disabled", true);
    }
  });
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
    ipc.send("addExitReport", prepareQry());
    ipc.on("addExitReport", (e, data) => {
      pushData(data);
      $("#addExitSummary td:empty").each(function(el, y) {
        $(y).text("0");
      });
      createTblAdd(data.addTable, "tblAdd");
      createTblExit(data.exitTable, "tblExit");
    });
  });

  function pushData(x) {
    console.log(x);
    var nArr = [];
    x.add.forEach(adEl => {
      // console.log(adEl)
      x.exit.forEach(exEl => {
        if (adEl.age == exEl.eAge && adEl.gender == exEl.eGender) {
          adEl.exit = exEl;
          // console.log(exEl);
          // var colname = adEl.age + '_' + 'adEl.gender'
          nArr.push(adEl);
          // console.log(adEl);
        } else if (adEl.age != exEl.eAge && adEl.gender != exEl.eGender) {
          nArr.push(adEl);
        }
      });
    });
    nArr.forEach(function(el) {
      if (el.age == "range6to23" && el.gender == "male") {
        console.log(true);
        delete el.age;
        delete el.gender;
        for (add in el) {
          if (add != "exit") {
            // console.log($(`#623_boys_add_${add}`).text());
            $(`#623_boys_add_${add}`).empty();

            $(`#623_boys_add_${add}`).text(el[add] ? el[add] : 0);
          } else {
            delete el.exit.eAge;
            delete el.exit.eGender;
            for (exit in el.exit) {
              $(`#623_boys_exit_${exit}`).empty();
              $(`#623_boys_exit_${exit}`).text(el[exit] ? el[exit] : 0);
            }
          }
        }
      } else if (el.age == "range6to23" && el.gender == "female") {
        delete el.age;
        delete el.gender;
        for (add in el) {
          if (add != "exit") {
            // console.log($(`#623_girls_add_${add}`).text());
            $(`#623_girls_add_${add}`).empty();

            $(`#623_girls_add_${add}`).text(el[add] ? el[add] : 0);
          } else {
            delete el.exit.eAge;
            delete el.exit.eGender;
            for (exit in el.exit) {
              $(`#623_girls_exit_${exit}`).empty();
              $(`#623_girls_exit_${exit}`).text(el[exit] ? el[exit] : 0);
            }
          }
        }
      } else if (el.age == "range24-59" && el.gender == "male") {
        delete el.age;
        delete el.gender;
        for (add in el) {
          if (add != "exit") {
            // console.log($(`#2459_boys_add_${add}`).text());
            $(`#2459_boys_add_${add}`).empty();

            $(`#2459_boys_add_${add}`).text(el[add] ? el[add] : 0);
          } else {
            delete el.exit.eAge;
            delete el.exit.eGender;
            for (exit in el.exit) {
              $(`#2459_boys_exit_${exit}`).empty();
              $(`#2459_boys_exit_${exit}`).text(el[exit] ? el[exit] : 0);
            }
          }
        }
      } else if (el.age == "range24-59" && el.gender == "female") {
        delete el.age;
        delete el.gender;
        for (add in el) {
          if (add != "exit") {
            // console.log($(`#2459_girls_add_${add}`).text());
            $(`#2459_girls_add_${add}`).empty();
            $(`#2459_girls_add_${add}`).text(el[add] ? el[add] : 0);
          } else {
            delete el.exit.eAge;
            delete el.exit.eGender;
            for (exit in el.exit) {
              $(`#2459_girls_exit_${exit}`).empty();
              $(`#2459_girls_exit_${exit}`).text(el[exit] ? el[exit] : 0);
            }
          }
        }
      } else {
        console.log(el);
      }
    });
  }

  function prepareQry() {
    var qry = {};
    $("#ddProvince").val() ? (qry.province_id = $("#ddProvince").val()) : "";
    $("#ddDistrict").val() ? (qry.district_id = $("#ddDistrict").val()) : "";
    $("#ddTehsil").val() ? (qry.tehsil_id = $("#ddTehsil").val()) : "";
    $("#ddUC").val() ? (qry.uc_id = $("#ddUC").val()) : "";
    $("#prog_type").val() ? (qry.prog_type = $("#ddProgramType").val()) : "";
    $("#ddInterval").val() == 1
      ? (qry.date = {
          x: "screening_date",
          y: [$("#start_date").val(), $("#end_date").val()]
        })
      : "";
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
      var addExitSumary = XLSX.utils.table_to_sheet(
        document.getElementById("addExitSummary")
      );
      XLSX.utils.book_append_sheet(addExitReport, addExitSumary, "Summary");
      // console.log(addExitSumary);

      /* convert table 'table2' to worksheet named "Sheet2" */
      var Addmissions = XLSX.utils.table_to_sheet(
        document.getElementById("tblAdd")
      );
      XLSX.utils.book_append_sheet(addExitReport, Addmissions, "Admissions");
      var Exits = XLSX.utils.table_to_sheet(document.getElementById("tblExit"));
      XLSX.utils.book_append_sheet(addExitReport, Exits, "Exits");
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
