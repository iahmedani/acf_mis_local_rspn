var uuid = require('uuid/v4');

module.exports.initOtpAdd = function () {
  // import database for dropdown and other events
  var knex = require('../../mainfunc/db')
  // initiating inputmask on all input where it is defined
  $(":input").inputmask();


  // drop down selections
  $(function () {
    var datePickerId = document.getElementById('reg_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
    datePickerId.min = new Date('2018-01-01').toISOString().split("T")[0];
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
    $('#ddTehsil').on('change', async function () {
      var tehs = $(this).val();
      ipc.send('getUC', tehs)
      ipc.on('uc', function (evt, uc) {
        $('#ddUC').children('option:not(:first)').remove();
        ucListener(uc);
      })
      if ($('#ddProgramType').val() == 'sc') {
        try {
          var _listNsc = await knex('v_geo_active').where({
            tehsil_id: tehs,
            SC: 1
          })
          $('#nsc_old_otp_id').attr('data-inputmask', "'mask':'NSC-999999'")
          nscList(_listNsc, 'ddHealthHouse');
        } catch (error) {
          console.log(error)
        }
      }
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
    $('#ddHealthHouse').on('change', function () {

      var h_id = $(this).val();
      ipc.send("getVillage", h_id);
      ipc.on("haveVillage", (evt, _villages) => {
        $("#ddVillageName")
          .children("option:not(:first)")
          .remove();
        villListener(_villages);

      });
      ipc.send('getHealthHouseType', h_id)
      ipc.on('hhType', function (evt, hh) {
        hhTypeListener(h_id, hh);

      })
    })
  });

  // Conditionals 
  /**
    NSC Conditions
    1. Should not ask MUAC <6 month age take Z score additional field
    3. Should not calculate the RUTF and disable other commodity
    4. if EDEA present no MUAC restriction
    5. Disable tehsil, village
    6. Enable height/length ask what they taking?
    7. Disable PLW
    8. referral and admission type
      i. if admission is new and referral by OTP
      ii. if admission type is ward limit referral only ward 
      iii. if transfer in from otp, limit referral type OTP and and ask for OTP ID 
      iv. if LAMA limit referral type to ward otp and other, and ask for OLD ID 
      v. Relapse  referral OTP and ward
      vi.

    OTP Conditions
    1. Should not allow admission <6 months
    2. if EDEA present no MUAC restriction
    3. Re-calculate the RUTF
    4. Referral and admission based criteria
      i. if admission type is relapse, return after default, Transfer in from other OTP => ask for OLD OTP ID 
      ii. if admission  transfer in from NSC ask NSC ID and limit referral type by SC only
      iii. if admission is in-patient-refusal limit referral type only have information 
      iv. if admission type is new, moved in and Other we need full referral type
      v. if admission type are as of above iv and return after default,  and referral type is CHW or LHW ask their name contact details
      vi. if admission type is Transfer in from other OTP => referral type to limit only by otp
      vii. if relapse and return after default the referral type only limited to LHW/CHW
    5. Disable PLW
  */
  function nscBelow6(age) {
    if (age < 6) {
      $('#muac').removeAttr('min').removeAttr('max');
      $('#z_score').attr('disabled', false);
    } else {
      $('#z_score').attr('disabled', true);
      $('#muac').attr('min', 0).attr('max', 30);
    }
  }

  function changeAgeMinMax(prog) {
    var ageEl = $('#age');
    if (prog == 'sc') {
      age.min(0).max(59)
    } else {
      age.min(6).max(59)
    }
  }

  function nscRefType(addType) {
    if (addType == 'new_add' || addType == 'return_after_lama' || addType == "relapse") {
      $("#ref_type").children('option:not(:first)').remove();
      $("#ref_type").append(`
        <option value="ref_by_otp">OTP</option>
        <option value="opd">OPD</option>
        <option value="ward">Ward</option>
        <option value="other">Other</option>
        `);
      // oldOtpIdEl.attr('disabled', true)

    } else if (addType == 'transfer_from_ward') {
      $("#ref_type").children('option:not(:first)').remove();
      $("#ref_type").append(`
      <option value="ward">Ward</option>
    `);
      // oldOtpIdEl.attr('disabled', true)

    } else if (addType == 'transfer_in_from_otp') {
      $("#ref_type").children('option:not(:first)').remove();
      $("#ref_type").append(`
        <option value="opd">OPD</option>
        `);
      // oldOtpIdEl.attr('disabled', false)
    }
  }

  function nscAddType(type) {
    var oldOtpIdEl = $('#nsc_old_otp_id')
    var oldOtpDetailsEl = $('#old_otp_or_nsc_detail')
    if (type == 'ref_by_otp') {
      oldOtpIdEl.attr('disabled', false)
      oldOtpDetailsEl.attr('disabled', false)
    } else {
      oldOtpIdEl.attr('disabled', true)
      oldOtpDetailsEl.attr('disabled', true)

    }
  }




  // program change event
  $('#ddProgramType').on('change', function () {
    var prog = $(this).val();
    var msk = {
      sc: 'NSC',
      otp: 'OTP'
    }
    $('#nsc_old_otp_id').inputmask(`${msk[prog]}-999999`);
    ipc.send('getCommodity', prog)
    ipc.on('commodity', function (evt, com) {
      $('#ration1').children('option:not(:first)').remove();
      $('#ration2').children('option:not(:first)').remove();
      $('#ration3').children('option:not(:first)').remove();
      commodity(com, 'ration1');
      commodity(com, 'ration2');
      commodity(com, 'ration3');
    })
    if (prog == 'sc') {
      $("#ent_reason").children('option:not(:first)').remove();
      $("#ent_reason").append(`
      <option value="new_add">New Admission</option>
      <option value="transfer_from_ward"> Transfer from ward</option>
      <option value="transfer_in_from_otp"> Transfer In From OTP </option>
      <option value="return_after_lama"> Return after LAMA</option> 
      <option value="relapse">Relapse after cured</option>
      <option value="other">Other</option>
      `);
      $("#ref_type").children('option:not(:first)').remove();
      $("#ref_type").append(`
      <option value="ref_by_otp">OTP</option>
      <option value="opd">OPD</option>
      <option value="ward">Ward</option>
      <option value="other">Other</option>
      `);
      $('#plw_type').attr('disabled', true);
      $('#muac').attr('min', 0).attr('max', 30);
      $('#age').attr('min', 0);
      $('#age').attr('max', 59);
      $("#ddUC").attr("disabled", true);
      $("#ddVillageName").attr('disabled', true);
    }
    if (prog == 'otp') {
      $("#ent_reason").children('option:not(:first)').remove();
      $("#ent_reason").append(`
        <option value="no_prv_pro">New Admission</option>
        <option value="relapse">Relapse</option>
        <option value="return_def">Return After Defaulter</option>
        <option value="in-patient_refusal">In-patient Refusal</option>
        <option value="transfer_in_from_nsc">Transfer in from NSC</option>
        <option value="tranfer_in_other_otp">Transfer in<small>From other OTP</small></option>
        <option value="tranfer_in_from_sfp">Transfer in<small>From TSFP</small></option>
        <option value="moved_in">Moved In</option>
        <option value="other">Other</option>
        `);
      // $('#ddProgramType').attr('data-inputmask', "'mask':'OTP-999999'")
      $("#ref_type")
        .children("option:not(:first)")
        .remove();
      $("#ref_type").append(`
        <option value="self">Self</option>
        <option value="peer">Peer to Peer</option>
        <option value="chw">CHW</option>
        <option value="lhw">LHW</option>
        <option value="doh_staff">DOH Staff</option>
        <option value="com_org">Community Org</option>
        <option value="by_sc_care">By SC Care</option>
        <option value="by_otp">By OTP</option>
        <option value="from_opd">From OPD</option>
        <option value="by_tsfp">By TSFP</option>
        <option value="other">Other</option>`);
      $('#plw_type').attr('disabled', true);
      $('#muac').attr('min', 5).attr('max', 11.4);
      $('#age').attr('min', 6);
      $('#age').attr('max', 59);
      $("#ddUC").attr("disabled", false);
      $("#ddVillageName").attr("disabled", false);

    }
  })


  // form submission
  $('#otpAddForm').on('submit', async (e) => {
    e.preventDefault();
    $('#otpAddForm').validate();
    if ($('#otpAddForm').valid()) {
      var otpAddFormData = $('#otpAddForm').serializeFormJSON();
      otpAddFormData.otp_id = uuid();
      if ($('#ddProgramType').val() == 'otp') {
        var check = await knex('tblOtpAdd').where({
          site_id: otpAddFormData.site_id,
          reg_id: otpAddFormData.reg_id,
          is_deleted: 0
        })
        if (check.length > 0) {
          $('#regIdInfo').css('display', '')
        } else {
          $('#regIdInfo').css('display', 'none')
          console.log(otpAddFormData)

          ipc.send('submitOtpAdd', otpAddFormData);
          ipc.removeAllListeners('submitOtpAdd');

          $('.clr').val("");
          $(".cld").val("")
        }
      } else {
        $('#regIdInfo').css('display', 'none')
        console.log(otpAddFormData)

        ipc.send('submitOtpAdd', otpAddFormData);
        ipc.removeAllListeners('submitOtpAdd');

        $('.clr').val("");
        $(".cld").val("")
      }
    }
  })

  // RUTF calculation on weight
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
  // rutf on weight
  $('#weight').on('change', function (e) {
    var _weight = $(this).val();
    rusfOnWeigth(_weight);
  })

  // edema change

  $('#oedema').on('change', function (e) {
    var progType = $('#ddProgramType');
    var muac = $('#muac');
    if ((progType.val() == 'otp' || progType.val() == 'sc') && $(this).val() !== 'absent') {
      muac.removeAttr('max')
      muac.attr('min', 0)
    } else {
      muac.attr('max', 11.4)
      muac.attr('min', 0)
    }
  })
  $("#oedema").on('change', function () {
    var val = $(this).val();
    var muacEl = $('#muac');
    var progType = $("#ddProgramType").val();
    // var muacEl = $('#muac');
    if (val == 'absent') {
      if (progType == 'sc' || progType == 'otp') {
        muacEl.attr('max', "11.4");
        muacEl.attr('min', "1");
      } else if (progType == 'sfp') {
        muacEl.attr("max", "12.4");
        muacEl.attr("min", "11.5");
      } else {
        muacEl.attr("max", "21");
        muacEl.attr("min", "0");
      }
    } else {
      muacEl.attr('max', false);
      muacEl.attr('min', false);
    }
  });


  // ent_reason change
  $("#ent_reason").on('change', function () {
    if ($(this).val() == 'other') {
      $("#entry_reason_other_div").css('display', '');
      $("#entry_reason_other").attr('required', true);
    } else {
      $("#entry_reason_other_div").css("display", "none");
      $("#entry_reason_other").attr("required", false);
    }

    var progType = $('#ddProgramType');
    var muac = $('#muac');
    if (progType.val() == 'otp' && ($(this).val() == 'moved_in' || $(this).val() == 'tranfer_in_other_otp')) {
      muac.removeAttr('max')
      muac.attr('min', 0)
    } else {
      muac.attr('max', 11.4)
      muac.attr('min', 0)
    }

    if ($(this).val() == "transfer_in_from_nsc" || $(this).val() == "return_def") {
      $("#nsc_old_otp_id_div").css('display', '');
      $("#nsc_old_otp_id").attr("hidden", false);
    } else {
      $("#nsc_old_otp_id_div").css("display", "none");
      $("#nsc_old_otp_id").attr("hidden", true);
    }

    if (progType == 'sc' && $(this).val() != 'transfer_in_from_otp') {
      $('#ref_type option[value="ref_by_otp"]').attr('disabled', true);
    } else {
      $('#ref_type option[value="ref_by_otp"]').attr('disabled', false);
    }


  });
  // ent_reason change
  $("#ent_reason").change(function () {
    var entReason = $("#ent_reason").val();
    // console.log(entReason)
    var prog = $("#ddProgramType").val();
    var detail = $('#old_otp_or_nsc_detail');
    if (prog == 'otp') {
      if (entReason == 'no_prv_pro' || entReason == 'in-patient_refusal' || entReason == 'other') {
        detail.attr('disabled', true)
      } else {
        detail.attr('disabled', false)
      }
    } else if (prog == 'sc') {
      nscRefType(entReason);

    }

    if (prog == "sc" && (entReason == "transfer_in_from_otp" || entReason == 'readmission' || entReason == 'defaulted')) {
      // $("#ddUC")
      //   .attr("disabled", false)
      //   .attr("required", true);
      // $("#ddVillageName")
      //   .attr("disabled", false)
      //   .attr("required", true);
      // $("#ddHealthHouse")
      //   .attr("disabled", false)
      //   .attr("required", true);
      $("#nsc_tranfer_from_otp_div").css("display", "");
      $('#nsc_otp_id').attr("required", true);
    } else if (prog == "sc" && (entReason == "new_add" || entReason == 'ransfer_in')) {
      $("#ddUC")
        .attr("disabled", true)
        .attr("required", false);
      $("#ddVillageName")
        .attr("disabled", true)
        .attr("required", false);
      $("#ddHealthHouse")
        .attr("disabled", true)
        .attr("required", false);
      $("#nsc_tranfer_from_otp_div").css("display", "none");
      $("#nsc_otp_id").attr("required", false);
    } else if (prog != "sc") {
      $("#nsc_tranfer_from_otp_div").css("display", "none");
      $("#nsc_otp_id").attr("required", false);
    }
  });

  // referral type other
  $("#ref_type").on("change", function () {
    if ($(this).val() == "other") {
      $("#ref_type_other_div").css("display", "");
      $("#ref_type_other").attr("required", true);
    } else {
      $("#ref_type_other_div").css("display", "none");
      $("#ref_type_other").attr("required", false);
    }
  });

  //Placing automated address of the beneficiary
  $('#ddVillageName').on("change", function () {
    var village = $(this).val();
    var province = $('#ddProvince option:selected').text();
    var district = $('#ddDistrict option:selected').text();
    $('#adrProvince').val(province);
    $('#adrDistrict').val(district);
    $('#address').val(village);
  });
  // nsc age below 6
  $('#age').on('change', function () {
    var _age = $(this);
    var progType = $('#ddProgramType').val();
    var muac = $('#muac')
    if (progType == 'sc') {
      nscBelow6(_age.val())
    } else {
      _age.attr('min', 6).attr('max', 59)
      muac.attr('min', 6).attr('max', 30)
      $('#z_score').attr('disabled', true);
    }
  })
}