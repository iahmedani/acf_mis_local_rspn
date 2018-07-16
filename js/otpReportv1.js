const ipc = require('electron').ipcRenderer;
  

$(function(){
  ipc.send('otpRpt_getProvince');
  ipc.on('province', function(evt, province){
    $('#ddProvince').children('option:not(:first)').remove();
    
    // $('#ddProvince').find('option:gt(0)').remove();
    province.province.forEach(el=>{
      $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);
    })
    })
    $('#ddProvince').on('change', function(){
      var prov = $(this).val();
      ipc.send('otpRpt_getDistrict', prov )
      ipc.on('district', function(evt, district){
        $('#ddDistrict').children('option:not(:first)').remove();
        district.district.forEach(el=>{
      $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);              
        })
      })
    })
    $('#ddDistrict').on('change', function(){
      var dist = $(this).val();
      ipc.send('otpRpt_getTehsil', dist )
      ipc.on('tehsil', function(evt, tehsil){
        $('#ddTehsil').children('option:not(:first)').remove();
        tehsil.tehsil.forEach(el=>{
      $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);              
        })
      })
    })
    $('#ddTehsil').on('change', function(){
      var tehs = $(this).val();
      ipc.send('otpRpt_getUC', tehs )
      ipc.on('uc', function(evt, uc){
        $('#ddUC').children('option:not(:first)').remove();
        uc.uc.forEach(el=>{
      $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);              
        })
      })
    })
    var ucForHH;
    $('#ddUC').on('change', function(){
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('otpRpt_getHealthHouse', ucs )
      ipc.on('hh', function(evt, hh){
        $('#ddHealthHouse').children('option:not(:first)').remove();
        hh.hh.forEach(el=>{
      $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);              
        })
      })
    })
  })
  // ipc.send('data', 0);
  // ipc.on('data',(e,data)=>{
  //   pushData(data.data);
  // })
  $('#addFilter').on('click', function(e){
    ipc.send('data', prepareQry());
    ipc.on('data',(e,data)=>{
    pushData(data.data);
  })
})

function pushData(x) {
      var data = x.add;
      var exit = x.exit;
      $('#tDist').empty()
      $('#tDist').append(data[0].district_name);
      $('#tAddRelapse').empty()
      $('#tAddRelapse').append(data[0].Relapse);
      $('#tAddNew').empty()
      $('#tAddNew').append(data[0].New_Addmision);
      $('#tAddReturnDef').empty()
      $('#tAddReturnDef').append(data[0].Def_SFP + data[0].Def_OTP);
      $('#tAddAbonded').empty()
      $('#tAddAbonded').append(data[0].Abbondon);
      $('#tAddProSc').empty()
      $('#tAddProSc').append(data[0].Pro_in_from_SC);
      $('#tTransferOtp').empty()
      $('#tTransferOtp').append(data[0].Trasfer_in_from_other_OTP);
      $('#tTransferSfp').empty()
      $('#tTransferSfp').append(data[0].Transfer_in_from_SFP);
      $('#tAddOther').empty()
      $('#tAddOther').append(data[0].Other);
      $('#tTotalAdd').empty()
      $('#tTotalAdd').append(data[0].add_Total);
      $('#exit_cured').empty()
      $('#exit_cured').append(exit[0].cured);
      $('#exit_death').empty()
      $('#exit_death').append(exit[0].death);
      $('#exit_defaulter').empty()
      $('#exit_defaulter').append(exit[0].defaulter);
      $('#exit_nonResponder').empty()
      $('#exit_nonResponder').append(exit[0].non_responder);
      $('#exit_medicalToSc').empty()
      $('#exit_medicalToSc').append(exit[0].medical_transfer_SC);
      $('#exit_toOtp').empty()
      $('#exit_toOtp').append(exit[0].transfer_out_other_OTP);
      $('#exit_other').empty()
      $('#exit_other').append(exit[0].Other);
      $('#exit_total').empty()
      $('#exit_total').append(exit[0].exit_total);
      createTblAdd(x.AddTable, 'tblAdd');
      createTblExit(x.ExitTable, 'tblExit');
    
}
function daysInMonth (month, year) {
return new Date(year, month, 0).getDate();
}
function prepareQry(){
  var qry = {};
($('#ddProvince').val()) ? qry.province_id = $('#ddProvince').val() : '';
($('#ddDistrict').val()) ? qry.district_id = $('#ddDistrict').val() : '';
($('#ddTehsil').val()) ? qry.tehsil_id = $('#ddTehsil').val() : '';
($('#ddUC').val()) ? qry.uc_id = $('#ddUC').val() : '';
if($('#ddInterval').val() === 'monthly'){
  var yr = $('#year').val();
  var mth = $('#month').val();
  if(mth <10){
    mth = '0'+mth;
  }
  var lastDay = daysInMonth(mth, yr);
  qry.date = {
    x:'reg_date',
    y: [
      `${yr}-${mth}-01`,`${yr}-${mth}-${lastDay}`
    ]
  };
} else if($('#ddInterval').val() === 'quarterly'){
  var yr = $('#year').val();
  var qtr = $('#quarter').val();
  var range = [
    [`${yr}-01-01`, `${yr}-03-31`],
    [`${yr}-04-01`, `${yr}-06-30`],
    [`${yr}-07-01`, `${yr}-09-30`],
    [`${yr}-10-01`, `${yr}-12-31`],
  ];
  qry.date = {
    x: 'reg_date',
    y: range[qtr]
  };
}else if($('#ddInterval').val() === 'yearly'){
  var yr = $('#year').val();
  qry.date = {
    x: 'reg_date',
    y: [`${yr}-01-01`, `${yr}-12-31`]
  } ;
}

  console.log(qry);
  return qry;
}

function createTblExit(data, table){
  var head = ["OTP_id",'Province','District','Tehsil','UC','Nutrition Site','Village','Name','Father Name','Gender','Registration No','Admission Date','Exit Date', 'Exit Reason']
 
var keys =  [            
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
        'reg_id',
        "reg_date",
        "exit_date",
        "exit_reason",                 
        
]
var html = '<tr>';
    head.forEach(el=>{
      html+= '<th>'+el+'</th>'
    })
    html+='</tr>'
  data.forEach(el=>{
    html+= '<tr>'
    keys.forEach(key=>{

        html+= '<td>'+el[key]+'</td>'
      
    })
    html +='</tr>'
  })
  console.log(html);
  $('#'+table).empty();
  $('#'+table).append(html);

}
function createTblAdd(data, table){
  var head = ["OTP_id",'Province','District','Tehsil','UC','Nutrition Site','Village','Name','Father Name','Contact Number', 'Addmision Date', 'Gender','Age','Address','Admision Reason','Refferal Type','Oedema','MUAC','Weight','Diarrhoea','Vomiting','Cough','Appetite','Daily Stool','Urine','Breast Feeding' ]
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
        "diarrhoea",
        "vomiting",
        "cough",
        "appetite",
        "daily_stool",
        "pass_urine",
        "b_Feeding"
]

  var yN = ['No','Yes'];
  var html = '<tr>';
    head.forEach(el=>{
      html+= '<th>'+el+'</th>'
    })
    html+='</tr>'
  data.forEach(el=>{
    html+= '<tr>'
    keys.forEach(key=>{
      if(key === 'diarrhoea' || key === 'vomiting' || key === 'cough' || key === 'pass_uring' || key === 'b_Feeding'){
        html+= '<td>'+yN[el[key]]+'</td>'
      } else{

        html+= '<td>'+el[key]+'</td>'          
      }
    })
    html +='</tr>'
  })
  console.log(html);
  $('#'+table).empty();
  $('#'+table).append(html);
}

$(function () {
  $('#ddInterval').on('change', function () {
    var value = $(this).val();
    console.log(value);
    if (value === 'quarterly') {
      
      $('#year').attr("disabled", false)
      $('#quarter').attr("disabled", false)
      $('#month').attr("disabled", true)
    } else if (value === 'monthly') {
  // prepareQry();
      
      $('#year').attr("disabled", false)
      $('#quarter').attr("disabled", true)
      $('#month').attr("disabled", false)
    } else if (value === 'yearly') {
      $('#year').attr("disabled", false);
      $('#quarter').attr("disabled", true)
      $('#month').attr("disabled", true)

    } else {
      $('#year').attr("disabled", true);
      $('#quarter').attr("disabled", true)
      $('#month').attr("disabled", true)
    }
  })
})
