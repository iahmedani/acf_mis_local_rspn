module.exports.initOtpAddUpdV2 = function () {
  $(":input").inputmask();
  function updateProvinceDD() {

    ipc.send("getProvince");
    ipc.on("province", function (evt, province) {
      $("#ddProvince")
        .children("option:not(:first)")
        .remove();

      // province.province.forEach(el=>{
      // $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);

      // })
      prov(province);
    });
  }
  // (function ($) {
  //   $.fn.serializeFormJSON = function () {
  //     var o = {};
  //     var a = this.serializeArray();
  //     $.each(a, function () {
  //       if (o[this.name]) {
  //         if (!o[this.name].push) {
  //           o[this.name] = [o[this.name]];
  //         }
  //         o[this.name].push(this.value || "");
  //       } else {
  //         o[this.name] = this.value || "";
  //       }
  //     });
  //     return o;
  //   };
  // })(jQuery);
  $(function () {
    ipc.send('getCommodity');
    ipc.on('commodity', function (evt, com) {
      $('#ration1').children('option:not(:first)').remove();
      $('#ration2').children('option:not(:first)').remove();
      $('#ration3').children('option:not(:first)').remove();
      commodity(com, 'ration1');
      commodity(com, 'ration2');
      commodity(com, 'ration3');
    })
    
    updateProvinceDD();
    $("#ddProvince").on("change", function () {
      var prov = $(this).val();
      ipc.send("getDistrict", prov);
      ipc.on("district", function (evt, district) {
        $("#ddDistrict")
          .children("option:not(:first)")
          .remove();

        //   district.district.forEach(el=>{
        // $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);
        //   })
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

        //   tehsil.tehsil.forEach(el=>{
        // $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);
        //   })
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

        //   uc.uc.forEach(el=>{
        // $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);
        //   })
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
        //   hh.hh.forEach(el=>{
        // $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);
        //   })
        hhListener(hh);
      });
    });
  });
  $(function () {
    let getOtp = filter => {
      return new Promise((resolve, reject) => {
        ipc.send("allOtpTest", filter);
        ipc.on("allOtpTest", (e, result) => {
          // console.log(result);
          var s = { data: result.result.data, itemsCount: result.result.itemsCount[0].total };
          if (result.err) {
            reject(result.err);
            ipc.removeAllListeners("allOtpTest");
          } else {
            resolve(s);
            ipc.removeAllListeners("allOtpTest");
          }
        });
      });
    };
    let delOtp = item => {
      return new Promise((resolve, reject) => {
        ipc.send("deleteOtpAdd", item.otp_id);
        ipc.on("deleteOtpAdd", (e, result) => {
          if (result.err) {
            reject(result.err);
            ipc.removeAllListeners("deleteOtpAdd");
          } else {
            resolve(result.result);
            $("#otpAddUpdForm")
              .get(0)
              .reset();
            $("#otpAddUpdForm select").val("");
            $("#jsGrid")
              .jsGrid("render")
              .done(function() {
                console.log("rendering completed and data loaded");
              });
            ipc.removeAllListeners("deleteOtpAdd");
          }
        });
      });
    }
    var MyDateField = function (config) {
      jsGrid.Field.call(this, config);
    };

    MyDateField.prototype = new jsGrid.Field({
      css: "date-field", // redefine general property 'css'
      align: "center", // redefine general property 'align'

      sorter: function(date1, date2) {
        return new Date(date1) - new Date(date2);
      },
      itemTemplate: function(value) {
        return new Date(value).toDateString();
      },
      
      // filterTemplate: function(value) {
      //   return (this._filterPicker = $("<input>")
      //     .datepicker()
      //     .datepicker("setDate", new Date(value)));
      // },
      insertTemplate: function(value) {
        return (this._insertPicker = $("<input>").datepicker({
          defaultDate: new Date()
        }));
      },

      editTemplate: function(value) {
        return (this._editPicker = $("<input>")
          .datepicker()
          .datepicker("setDate", new Date(value)));
      },

      insertValue: function() {
        return this._insertPicker.datepicker("getDate").toISOString();
      },

      editValue: function() {
        return this._editPicker.datepicker("getDate").toISOString();
      },
      // filterValue: function() {
      //   return this._filterPicker.datepicker("getDate").toISOString();
      // }
    });
    jsGrid.fields.date = MyDateField;
    var prog_type = [
      { name: 'All', value: '' },
      {
        name: 'TSFP', value: 'sfp'
      },
      {
        name: 'TSFP-PLW', value: 'sfp_plw'
      },
      {
        name: 'OTP', value: 'otp'
      }, {
        name: 'NSC', value: 'sc'
      }
    ];
    $("#jsGrid").jsGrid({
      width: "100%",
      height: "300px",
      filtering: true,
      // inserting: true,
      // editing: true,
      // sorting: true,
      paging: true,
      autoload: true,
      pageLoading: true, // this is the clue
      pageSize: 10,
      pageButtonCount: 5,
      confirmDeleting: true,
      deleteConfirm:
        "Do you really want to delete Patient Record? This will also delete all related information.",
      controller: {
        loadData: function(filter) {
          // console.log(filter);
          // console.log("loaddata", site_id);
          ipc.send("allOtpTest", filter);
          return getOtp(filter);
        },
        deleteItem: function(item) {
          return delOtp(item);
        }
      },
      fields: [
        {
          name: "prog_type",
          title: 'Program Type',
          type: 'select',
          items: prog_type,
          textField: 'name',
          valueField: 'value',
          width: 50
        },
        {
          name: "province",
          title: "Province",
          type: "text",
          width: 50
        },
        {
          name: "district_name",
          title: "District",
          type: "text",
          width: 50
        },
        {
          name: "tehsil_name",
          title: "Tehsil",
          type: "text",
          width: 50
        },
        {
          name: "uc_name",
          title: "Uion Council",
          type: "text",
          width: 50
        },
        {
          name: "site_village",
          title: "Village",
          type: "text",
          width: 50,
          editing: false
        },

        {
          name: "reg_id",
          title: "Reg #",
          type: "text",
          width: 50,
          editing: false
        },
        {
          name: "p_name",
          title: "Patient Name",
          type: "text",
          width: 50,
          editing: false
        },
        {
          name: "reg_date",
          title: "Reg: Date",
          type: "date",
          width: 50,
          filtering: false
          // editing: false
        },
        {
          type: "control",
          editButton: false,
          modeSwitchButton: false
        }
      ],
      rowClick: function(args) {
        this.editItem(args.item);
        var data = args.item;
        $("#ddProgramType").val(data.prog_type);
        $("#site_village").val(data.site_village);
        $("#reg_date").val(data.reg_date);
        $("#reg_id").val(data.reg_id);
        $("#f_or_h_name").val(data.f_or_h_name);
        $("#p_name").val(data.p_name);
        $("#cnic").val(data.cnic);
        $("#cnt_number").val(data.cnt_number);
        $("#address").val(data.address);
        $("#age").val(data.age);
        $("#gender").val(data.gender);
        $("#village").val(data.site_village);
        data.plw_type === null
          ? $("#plw_type").attr("disabled", true)
          : $("#plw_type").val(data.plw_type);
        // $('#plw_type').val(data.plw_type)
        $("#ent_reason").val(data.ent_reason);
        $("#ref_type").val(data.ref_type);
        $("#weight").val(data.weight);
        $("#height").val(data.height);
        $("#oedema").val(data.oedema);
        $("#muac").val(data.muac);
        $("#diarrhoea").val(data.diarrhoea);
        $("#vomiting").val(data.vomiting);
        $("#cough").val(data.cough);
        $("#appetite").val(data.appetite);
        $("#daily_stool").val(data.daily_stool);
        $("#pass_urine").val(data.pass_urine);
        $("#b_feeding").val(data.b_Feeding);
        $("#od_swol_time").val(data.od_swol_time);
        $("#ration1").val(data.ration1);
        $("#quantity1").val(data.quantity1);
        $("#ration2").val(data.ration2);
        $("#quantity2").val(data.quantity2);
        $("#ration3").val(data.ration3);
        $("#quantity3").val(data.quantity3);
        $("#otp_id").val(data.otp_id);
        $('#other_com_name').val(data.other_com_name);
        $('#other_com_qty').val(data.other_com_qty);
        $('#nsc_old_otp_id').val(data.nsc_old_otp_id);
        // updateProvinceDD();
        $("#ddProvince").val(data.province_id);
        if (data.ent_reason == "transfer_in_from_nsc") {
          $("#nsc_old_otp_id_div").css('display', '');
          $("#nsc_old_otp_id").attr("hidden", false);
        } else {
          $("#nsc_old_otp_id_div").css('display', 'none');

          $("#nsc_old_otp_id").attr("hidden", true);
        }

        $("#ddDistrict")
          .children("option:not(:first)")
          .remove();
        $("#ddDistrict").append(
          `<option value="${data.district_id}" selected>${
            data.district_name
          }</option>`
        );
        // $("#ddDistrict").val(data.district_id);
        $("#ddTehsil")
          .children("option:not(:first)")
          .remove();
        $("#ddTehsil").append(
          `<option value="${data.tehsil_id}" selected>${
            data.tehsil_name
          }</option>`
        );

        // $("#ddTehsil").val(data.tehsil_id);
        $("#ddUC")
          .children("option:not(:first)")
          .remove();
        $("#ddUC").append(
          `<option value="${data.uc_id}" selected>${data.uc_name}</option>`
        );

        // $("#ddUC").val(data.uc_id);
        $("#ddHealthHouse")
          .children("option:not(:first)")
          .remove();
        $("#ddHealthHouse").append(
          `<option value="${data.site_id}" selected>${
            data.site_name
          }</option>`
        );

        // $("#ddHealthHouse").val(data.site_id);
        // $("#ddDistrict")
        //   .children("option:not(:first)")
        //   .remove();
        console.log(args.item);
      }
    });
    

  })
  
  $("#otpAddUpdSubmit").on("click", e => {
    console.log("clicked");
    $("#otpAddUpdForm").validate();
    if ($("#otpAddUpdForm").valid()) {
      var otpAddUpdFormData = $("#otpAddUpdForm").serializeFormJSON();
      console.table(otpAddUpdFormData);
      ipc.send("submitOtpAddUpd", otpAddUpdFormData);
      ipc.removeAllListeners("submitOtpAddUpd");
      $("#otpAddUpdForm")
        .get(0)
        .reset();
      $("#otpAddUpdForm select").val('');
  
      $("#jsGrid")
        .jsGrid("render")
        .done(() => {
          console.log("js grid is rendered");
        });
    }
    // addScrChildTemplate()
    e.preventDefault();
  });
  // $('#otpAddSubmit').on('click', (e)=>{
  //   $('#otpAddForm').validate();
  //   if($('#otpAddForm').valid()){
  //     var otpAddFormData = $('#otpAddUpdForm').serializeFormJSON();
  //     ipc.send('submitOtpAddUpd', otpAddFormData);
  //     ipc.removeAllListeners('submitOtpAdd')
  //     setTimeout(otpAddTemplate, 3000);
  //   }
  //     // addScrChildTemplate()
  //   e.preventDefault();
  // })
  function rusfOnWeigth(_weight) {
    console.log(_weight);
    if ($('#ddProgramType').val() == 'otp') {
      $('#ration1').val('RUTF');
      var qty = $('#quantity1');
      if (_weight >= 3.5 && _weight <= 3.9) {
        qty.val(11);
      } else if (_weight >= 4 && _weight <= 5.4) {
        qty.val(14);
      } else if (_weight >= 5.5 && _weight <= 6.9) {
        qty.val(18)
      } else if (_weight >= 7 && _weight <= 8.4) {
        qty.val(21)
      } else if (_weight >= 8.5 && _weight <= 9.4) {
        qty.val(25)
      } else if (_weight >= 9.5 && _weight <= 10.4) {
        qty.val(28)
      } else if (_weight >= 10.5 && _weight <= 11.9) {
        qty.val(32)
      } else if (_weight >= 12) {
        qty.val(35)
      }
    }
  }

  $('#weight').on('change', function (e) {
    var _weight = $(this).val();
    rusfOnWeigth(_weight);
  })
};
