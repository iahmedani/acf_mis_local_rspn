module.exports.initOtpAdd = function (){
  var knex = require('../mainfunc/db')
  $(":input").inputmask();
  // $("#phone").inputmask({ "mask": "(999) 999-9999" });
$(function () {
    var datePickerId = document.getElementById('reg_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  $(function () {
    // ipc.send('getCommodity');
    // ipc.on('commodity', function (evt, com) {
    //   $('#ration1').children('option:not(:first)').remove(); 
    //   $('#ration2').children('option:not(:first)').remove(); 
    //   $('#ration3').children('option:not(:first)').remove();
    //   commodity(com, 'ration1');
    //   commodity(com, 'ration2');
    //   commodity(com, 'ration3');
    // })
  ipc.send('getProvince');
  ipc.on('province', function(evt, province){
    $('#ddProvince').children('option:not(:first)').remove();   
    
    // province.province.forEach(el=>{
      // $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);

    // })
    prov(province);
    })
    $('#ddProvince').on('change', function(){
      var prov = $(this).val();
      ipc.send('getDistrict', prov )
      ipc.on('district', function(evt, district){
        $('#ddDistrict').children('option:not(:first)').remove();
        
      //   district.district.forEach(el=>{
      // $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);              
      //   })
      dist(district);
      })
    })
    $('#ddDistrict').on('change', function(){
      var dist = $(this).val();
      ipc.send('getTehsil', dist )
      ipc.on('tehsil', function(evt, tehsil){
        $('#ddTehsil').children('option:not(:first)').remove();
        
      //   tehsil.tehsil.forEach(el=>{
      // $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);              
      //   })
      teh(tehsil);
      })
    })
    $('#ddTehsil').on('change', function(){
      var tehs = $(this).val();
      ipc.send('getUC', tehs )
      ipc.on('uc', function(evt, uc){
        $('#ddUC').children('option:not(:first)').remove();
      
      //   uc.uc.forEach(el=>{
      // $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);              
      //   })
      ucListener(uc);
      })
    })
    var ucForHH;
    $('#ddUC').on('change', function(){
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('getHealthHouse', ucs )
      ipc.on('hh', function(evt, hh){
        $('#ddHealthHouse').children('option:not(:first)').remove();
      //   hh.hh.forEach(el=>{
      // $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);              
      //   })
      hhListener(hh);
      })
    })
    $('#ddHealthHouse').on('change', function(){
      // var ucs = $('#ddUC').val();
      var h_id = $(this).val();
      ipc.send("getVillage", h_id);
      ipc.on("haveVillage", (evt, _villages) => {
        $("#ddVillageName")
          .children("option:not(:first)")
          .remove();
        villListener(_villages);
        
      });
      ipc.send('getHealthHouseType', h_id)
      ipc.on('hhType', function(evt, hh){
        // var result = hh.hh.filter(el => el.id == $(this).val());
        // if(h_id === ""){
        //   $('#txtSiteType').val().empty();  
        // } else{

        //   $('#txtSiteType').val(function(){
        //     var site = [];
        //     if(hh.hh[0].OTP === 1){
        //       site.push('OTP')
        //     }
        //     if(hh.hh[0].SFP === 1){
        //       site.push('SFP')                
        //     }
        //     if(hh.hh[0].SC === 1){
        //       site.push('SC')                
        //     }
        //     return site;
        //   })  
        // }
        hhTypeListener(h_id,hh);
        
      })
    })
  });
  $("#ent_reason").change(function () {
    var entReason = $("#ent_reason").val();
    console.log(entReason)
    var prog = $("#ddProgramType").val();
    if (prog == "sc" && entReason == "transfer_in_from_otp") {
      $("#ddUC")
        .attr("disabled", false)
        .attr("required", true);
      $("#ddVillageName")
        .attr("disabled", false)
        .attr("required", true);
      $("#ddHealthHouse")
        .attr("disabled", false)
        .attr("required", true);
      $("#nsc_tranfer_from_otp_div").css("display", "");
      $('#nsc_otp_id').attr("required", true);
      // $('#ddUC').attr('disabled', false).attr('required', true);
    } else if (prog == "sc" && entReason != "transfer_in_from_otp"){
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

$(function(){
  $('#ddProgramType').on('change', function(){
    var prog = $(this).val();    
    ipc.send('getCommodity', prog)
    ipc.on('commodity', function (evt, com) {
        $('#ration1').children('option:not(:first)').remove();
        $('#ration2').children('option:not(:first)').remove();
        $('#ration3').children('option:not(:first)').remove();
      commodity(com, 'ration1');
      commodity(com, 'ration2');
      commodity(com, 'ration3');
    })
    if (prog !== 'sc') {
      $("#ent_reason").children('option:not(:first)').remove();
      $("#ent_reason").append(`
        <option value="no_prv_pro">New Admission</option>
                      <option value="relapse">Relapse</option>
                      <option value="return_def">Return After Defaulter</option>
                      <option value="in-patient_refusal">In-patient Refusal</option>
                      <!-- <option value="abb_inp">Abbondon INP</option> -->
                      <option value="transfer_in_from_nsc">Transfer in from NSC</option>
                      <option value="tranfer_in_other_otp">Transfer in
                        <small>From other OTP</small>
                      </option>
                      <option value="tranfer_in_from_sfp">Transfer in
                        <small>From TSFP</small>
                      </option>
                      <option value="moved_in">Moved In</option>

                      <option value="other">Other</option>
        `);
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
                      <option value="other">Other</option>
        `);
    }
    if (prog === 'otp' || prog === 'sc'){
      $('#age option[value="above59"]').attr('disabled', true)
      $('#age option[value="below_6"]').attr('disabled', false)      
      $('#plw_type').attr('disabled', true);
      $('#muac').attr('max','11.4');
      $('#muac').attr('min','0');
      $('#oedema').empty();
      $('#oedema').append(`<option selected disabled>Choose</option>
      <option value="absent">absent</option>
      <option value="plus_1">&plus;(1)</option>
      <option value="plus_2">&plus;&plus;(2)</option>
      <option value="plus_3">&plus;&plus;&plus;(3)</option>`)
                        if(prog === 'otp'){
                          $('#oedema').val('absent');
                        }
      $("#nsc_tranfer_from_otp_div").css("display", "none");
      $("#nsc_otp_id").attr("required", false);
      if (prog == 'sc') {
        $("#ent_reason").children('option:not(:first)').remove();
        $("#ent_reason").append(`
        <option value="new_add"> New Admission</option>
        <option value="transfer_in"> Transfer In</option>
        <option value="transfer_in_from_otp"> Transfer In From OTP </option>
        <option value="readnission"> Readmission</option>
        <option value="defaulted"> Defaulted</option> 
        `);
        $("#ref_type").children('option:not(:first)').remove();
        $("#ref_type").append(`
        <option value="ref_by_otp">OTP</option>
        <option value="opd">OPD</option>
        <option value="ped_wards">Pediatric Wards</option>
        <option value="other">Other</option>
        `);
      }
       
      

     } else if(prog === 'sfp'){
      $('#age option[value="above59"]').attr('disabled', true)
      $('#age option[value="below_6"]').attr('disabled', true)
       $('#plw_type').attr('disabled', true);
       $('#muac').attr('max','12.5');
       $('#muac').attr('min','11.5');
       $('#oedema').children('option:not(:eq(1))').remove();
      
      //  $('#oedema option:not(:second)').remove();
     } else {
      var age = $('#age').val();
      $('#age option[value="above59"]').attr('disabled', true)
       $('#plw_type').attr('disabled', false);
       $('#muac').attr('max','30');
       $('#muac').attr('min','0');
       $('#age option[value="above59"]').attr('disabled', false)
      $('#age option[value="below_6"]').attr('disabled', false)
      $('#oedema').empty();
      $('#oedema').append(`<option selected disabled>Choose</option>
                    <option value="absent">absent</option>
                    <option value="plus_1">&plus;(1)</option>
                    <option value="plus_2">&plus;&plus;(2)</option>
                    <option value="plus_3">&plus;&plus;&plus;(3)</option>`)

     }
  })
  

  // $('#ent_reason').on('change', function (e) {
  //   var progType = $('#ddProgramType');
  //   var muac = $('#muac');
  //   if(progType.val() == 'otp' & $(this).val() == 'moved_in'){
  //     muac.removeAttr('max')
  //     muac.attr('min', 0)
  //   }else{
  //     muac.attr('max', 11.4)
  //     muac.attr('min', 0)
  //   }
  // })
  $('#oedema').on('change', function (e) {
    var progType = $('#ddProgramType');
    var muac = $('#muac');
    if(progType.val() == 'otp' && $(this).val() !== 'absent'){
      muac.removeAttr('max')
      muac.attr('min', 0)
    }else{
      muac.attr('max', 11.4)
      muac.attr('min', 0)
    }
  })
  
})

$('#otpAddForm').on('submit', async (e)=>{
  e.preventDefault();
  $('#otpAddForm').validate();
  if($('#otpAddForm').valid() ){
    var otpAddFormData = $('#otpAddForm').serializeFormJSON();
    if( $('#ddProgramType').val() == 'otp'){
      
      var check = await knex('tblOtpAdd').where({site_id: otpAddFormData.site_id, reg_id: otpAddFormData.reg_id, is_deleted:0})
      if(check.length > 0){
        
        $('#regIdInfo').css('display', '')
      }else{
        $('#regIdInfo').css('display', 'none')
      console.log(otpAddFormData)

      ipc.send('submitOtpAdd', otpAddFormData);
      ipc.removeAllListeners('submitOtpAdd');
  
      $('.clr').val("");
      $(".cld").val("")
      }
    }else{
      $('#regIdInfo').css('display', 'none')
      console.log(otpAddFormData)

      ipc.send('submitOtpAdd', otpAddFormData);
      ipc.removeAllListeners('submitOtpAdd');
  
      $('.clr').val("");
      $(".cld").val("")
    }
    // if( $('#ddProgramType').val() == 'otp'){
      
    // }else{
    //   $('#regIdInfo').css('display', 'none')
    //   console.log(otpAddFormData)

    //   ipc.send('submitOtpAdd', otpAddFormData);
    //   ipc.removeAllListeners('submitOtpAdd');
  
    //   $('.clr').val("");
    //   $(".cld").val("")

    // }
    // setTimeout(otpAddTemplate, 3000);
  }

    // addScrChildTemplate()
  })
  
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
  $('#ddProgramType').on('change', function () {
    var progType = $(this).val();
    if (progType == 'sfp_Plw') {
      $("#labAge").empty();
      $("#labAge").text('(in years)');
      $("#age").attr('min', false);
      $("#age").attr('max', false);
      
    } else {
      $("#labAge").empty();
      $("#labAge").text('(in months)');
      $("#age").attr('min','6');
      $("#age").attr('max','59');
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
  // $('#ent_reason').on('change', function () {
   


  // })

  $("#ent_reason").on('change', function() {
    if ($(this).val() == 'other') {
      $("#entry_reason_other_div").css('display', '');
      $("#entry_reason_other").attr('required', true);
    } else {
      $("#entry_reason_other_div").css("display", "none");
      $("#entry_reason_other").attr("required", false);
    }

    var progType = $('#ddProgramType');
    var muac = $('#muac');
    if(progType.val() == 'otp' && ($(this).val() == 'moved_in' || $(this).val() == 'tranfer_in_other_otp' )){
      muac.removeAttr('max')
      muac.attr('min', 0)
    }else{
      muac.attr('max', 11.4)
      muac.attr('min', 0)
    }

    if ($(this).val() == "transfer_in_from_nsc") {
      $("#nsc_old_otp_id_div").css('display', '');
      $("#nsc_old_otp_id").attr("hidden", false);
    } else {
      $("#nsc_old_otp_id_div").css("display", "none");

      $("#nsc_old_otp_id").attr("hidden", true);
    }


  });
  $("#ref_type").on("change", function() {
    if ($(this).val() == "other") {
      $("#ref_type_other_div").css("display", "");
      $("#ref_type_other").attr("required", true);
    } else {
      $("#ref_type_other_div").css("display", "none");
      $("#ref_type_other").attr("required", false);
    }
  });
  $("#ddProgramType").on("change", function () {
    if ($(this).val() == "sc") {
      $("#ddHealthHouse").attr("disabled", true);
      $("#ddUC").attr("disabled", true);
      $("#ddVillageName").attr('disabled', true);
    } else {
      $("#ddHealthHouse").attr("disabled", false);
      $("#ddUC").attr("disabled", false);
      $("#ddVillageName").attr("disabled", false);

    }
  });
  $('#ddVillageName').on("change", function(){
    var village = $(this).val();
    $('#address').val(village);
  })
}