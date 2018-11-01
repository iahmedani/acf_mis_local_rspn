module.exports.initOtpAddUpdV2 = function() {
  (function($) {
    $.fn.serializeFormJSON = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || "");
        } else {
          o[this.name] = this.value || "";
        }
      });
      return o;
    };
  })(jQuery);
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
    ipc.send("getProvince");
    ipc.on("province", function(evt, province) {
      $("#ddProvince")
        .children("option:not(:first)")
        .remove();

      // province.province.forEach(el=>{
      // $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);

      // })
      prov(province);
    });
    $("#ddProvince").on("change", function() {
      var prov = $(this).val();
      ipc.send("getDistrict", prov);
      ipc.on("district", function(evt, district) {
        $("#ddDistrict")
          .children("option:not(:first)")
          .remove();

        //   district.district.forEach(el=>{
        // $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);
        //   })
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

        //   tehsil.tehsil.forEach(el=>{
        // $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);
        //   })
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

        //   uc.uc.forEach(el=>{
        // $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);
        //   })
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
        //   hh.hh.forEach(el=>{
        // $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);
        //   })
        hhListener(hh);
      });
    });
  });
  $(function() {
    $("#ddHealthHouse").on("change", function() {
      let getOtp = site_id => {
        return new Promise((resolve, reject) => {
          ipc.send("allOtp", site_id);
          ipc.on("allOtp", (e, result) => {
            var s = {
              data: result.result,
              itemsCount: result.result.length
            };
            if (result.err) {
              reject(result.err);
              ipc.removeAllListeners("allOtp");
            } else {
              resolve(s);
              ipc.removeAllListeners("allOtp");
            }
          });
        });
      };
      var site_id = $(this).val();
      // var age = [{
      //     Name: '',
      //     value: ''
      //   },
      //   {
      //     Name: '<6 Months',
      //     value: 'below_6'
      //   },
      //   {
      //     Name: '6 to 23 Months',
      //     value: 'range6to23'
      //   },
      //   {
      //     Name: '24 to 59 Months',
      //     value: 'range24-59'
      //   },
      //   {
      //     Name: '> 59 Months',
      //     value: 'above59'
      //   }
      // ]
      // var oedema = [{
      //     Name: '',
      //     value: ''
      //   }, {
      //     Name: 'Absent',
      //     value: 'absent'
      //   }, {
      //     Name: '+(1)',
      //     value: 'plus_1'
      //   },
      //   {
      //     Name: '++(2)',
      //     value: 'plus_2'
      //   }, {
      //     Name: '+++(2)',
      //     value: 'plus_3'
      //   }
      // ]
      // var yNo = [{
      //   Name: '',
      //   value: ''
      // }, {
      //   Name: 'Yes',
      //   value: 1
      // }, {
      //   Name: 'No',
      //   value: 0
      // }]
      // var appetite = [{
      //     Name: 'Good',
      //     value: 'good'
      //   },
      //   {
      //     Name: 'Poor',
      //     value: 'poor'
      //   },
      //   {
      //     Name: 'None',
      //     value: 'none'
      //   }
      // ]
      // var stool = [{
      //   Name: '',
      //   value: ''
      // }, {
      //   Name: '1 to 3',
      //   value: 'bet1_3'
      // }, {
      //   Name: '4 to 5',
      //   value: 'bet4_5'
      // }, {
      //   Name: '>5',
      //   value: 'gt5'
      // }]
      // var gender = [{
      //   Name: '',
      //   value: ''
      // }, {
      //   Name: 'Male',
      //   value: 'male'
      // }, {
      //   Name: 'Female',
      //   value: 'female'
      // }]
      // var plwType = [{
      //   Name: '',
      //   value: ''
      // }, {
      //   Name: 'Pragnant',
      //   value: 'p'
      // }, {
      //   Name: 'Lactacting',
      //   value: 'l'
      // }]
      // var commodity = [{
      //   Name: '',
      //   value: ''
      // }, {
      //   Name: 'RUTF Sachets',
      //   value: 'RUTF Sachets'
      // }, {
      //   Name: 'Amoxicillin',
      //   value: 'Amoxicillin'
      // }, {
      //   Name: 'Folic Acid',
      //   value: 'Folic Acid'
      // }, {
      //   Name: 'MM Sachets',
      //   value: 'MM Sachets'
      // }, {
      //   Name: 'MM Tablets',
      //   value: 'MM Tablets'
      // }, {
      //   Name: 'Mebendazole',
      //   value: 'Mebendazole'
      // }, {
      //   Name: 'Meteronidazole',
      //   value: 'Meteronidazole'
      // }, {
      //   Name: 'Paracetamol',
      //   value: 'Paracetamol'
      // }, {
      //   Name: 'Chloroquine',
      //   value: 'Chloroquine'
      // }, {
      //   Name: 'Zinc',
      //   value: 'Zinc'
      // }, {
      //   Name: 'Tertacycline',
      //   value: 'Tertacycline'
      // }, {
      //   Name: 'Benzyl Benzoate',
      //   value: 'Benzyl Benzoate'
      // }, {
      //   Name: 'IYCF Cups & Spoons',
      //   value: 'IYCF_Cups_and_Spoons'
      // }]
      // var entReason = [{
      //     Name: '',
      //     value: ''
      //   },
      //   {
      //     Name: 'New Admission',
      //     value: 'no_prv_pro'
      //   },
      //   {
      //     Name: 'Replapse',
      //     value: 'relapse'
      //   },
      //   {
      //     Name: 'Def SFP',
      //     value: 'def_sfp'
      //   },
      //   {
      //     Name: 'Def OTP',
      //     value: 'def_otp'
      //   },
      //   {
      //     Name: 'Abbondon INP',
      //     value: 'abb_inp'
      //   },
      //   {
      //     Name: 'Moved In',
      //     value: 'moved_in'
      //   },
      //   {
      //     Name: 'Other',
      //     value: 'other'
      //   }
      // ]
      // var refType = [{
      //     Name: 'Self',
      //     value: 'self'
      //   },
      //   {
      //     Name: 'CHW',
      //     value: 'chw'
      //   },
      //   {
      //     Name: 'Parent',
      //     value: 'parent'
      //   },
      //   {
      //     Name: 'Community Org',
      //     value: 'com_org'
      //   },
      //   {
      //     Name: 'By SC Care',
      //     value: 'by_sc_care'
      //   },
      //   {
      //     Name: 'By OTP',
      //     value: 'by_otp'
      //   },
      //   {
      //     Name: 'By SFP',
      //     value: 'by_sfp'
      //   }
      // ]
      $("#jsGrid").jsGrid({
        width: "100%",
        height: "680px",
        // filtering: true,
        // inserting: true,
        editing: true,
        // sorting: true,
        paging: true,
        autoload: true,
        pageLoading: true, // this is the clue
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        controller: {
          loadData: function(filter) {
            console.log("loaddata", site_id);
            return getOtp(site_id);
          }
        },
        fields: [
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
            editing: false
          },
          {
            name: "site_village",
            title: "Village",
            type: "text",
            editing: false
          }
          // }, {
          //   name: 'address',
          //   title: 'Address',
          //   type: 'text'
          // }, {
          //   name: 'cnt_number',
          //   title: 'Contact Number',
          //   type: 'text'
          // }, {
          //   name: 'age',
          //   title: 'Age',
          //   type: 'select',
          //   items: age,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'gender',
          //   title: 'Gender',
          //   type: 'select',
          //   items: gender,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'plw_type',
          //   title: 'PLW Type',
          //   type: 'select',
          //   items: plwType,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'ent_reason',
          //   title: 'Entry Reason',
          //   type: 'select',
          //   items: entReason,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'ref_type',
          //   title: 'Refferal Type',
          //   type: 'select',
          //   items: refType,
          //   valueField: 'value',
          //   textField: 'Name'
          // },
          // {
          //   name: "weight",
          //   title: "Weight",
          //   type: "number"
          // }, {
          //   name: 'oedema',
          //   title: 'Oedema',
          //   type: 'select',
          //   items: oedema,
          //   valueField: 'value',
          //   textField: 'Name'
          // },
          // {
          //   name: "muac",
          //   title: "MUAC",
          //   type: "number"
          // }, {
          //   name: 'diarrhoea',
          //   title: 'Diarrhoea',
          //   type: 'select',
          //   items: yNo,
          //   valueField: 'value',
          //   textField: 'Name'
          // },
          // {
          //   name: 'vomiting',
          //   title: 'Vomiting',
          //   type: 'select',
          //   items: yNo,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'cough',
          //   title: 'Cough',
          //   type: 'select',
          //   items: yNo,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'appetite',
          //   title: 'Appetite',
          //   type: 'select',
          //   items: appetite,
          //   valueField: 'value',
          //   textField: 'Name'

          // }, {
          //   name: 'daily_stool',
          //   title: 'Daily Stool',
          //   type: 'select',
          //   items: stool,
          //   valueField: 'value',
          //   textField: 'Name'

          // }, {
          //   name: 'pass_urine',
          //   title: 'Passing Urine',
          //   type: 'select',
          //   items: yNo,
          //   valueField: 'value',
          //   textField: 'Name'

          // }, {
          //   name: 'b_Feeding',
          //   title: 'Breast Feeding',
          //   type: 'select',
          //   items: yNo,
          //   valueField: 'value',
          //   textField: 'Name'

          // },
          // {
          //   name: 'od_swol_time',
          //   title: 'If Oedema, how long swollen?',
          //   type: 'select',
          //   items: oedema,
          //   valueField: 'value',
          //   textField: 'Name'

          // }, {
          //   name: 'ration1',
          //   title: 'Ration-1',
          //   type: 'select',
          //   items: commodity,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'quantity1',
          //   title: 'Qty-1',
          //   type: 'number',
          // }, {
          //   name: 'ration2',
          //   title: 'Ration-2',
          //   type: 'select',
          //   items: commodity,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'quantity2',
          //   title: 'Qty-2',
          //   type: 'number'
          // }, {
          //   name: 'ration3',
          //   title: 'Ration-3',
          //   type: 'select',
          //   items: commodity,
          //   valueField: 'value',
          //   textField: 'Name'
          // }, {
          //   name: 'quantity3',
          //   title: 'Qty-3',
          //   type: 'number'
          // },
          // ,{
          //   type: "control",
          //   deleteButton: false,
          // }
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
          console.log(args.item);
        }
      });
    });
  });

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
