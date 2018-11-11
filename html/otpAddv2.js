module.exports.initOtpAdd = function (){
$(function () {
    var datePickerId = document.getElementById('reg_date');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
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
$(function(){
  $('#ddProgramType').on('change', ()=>{
     var prog = $('#ddProgramType').val();
     console.log(prog)
     if(prog === 'otp'){
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
})

$('#otpAddSubmit').on('click', (e)=>{
  $('#otpAddForm').validate();
  if($('#otpAddForm').valid()){
    var otpAddFormData = $('#otpAddForm').serializeFormJSON();
    ipc.send('submitOtpAdd', otpAddFormData);
    ipc.removeAllListeners('submitOtpAdd')
    setTimeout(otpAddTemplate, 3000);
  }

    // addScrChildTemplate()
  e.preventDefault();
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
}