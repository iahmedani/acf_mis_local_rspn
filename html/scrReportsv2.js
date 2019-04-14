module.exports.initScrReportsV2 = function(){
  
  $(function(){
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
        ipc.send('getHealthHouseType', h_id )
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
    })
    ipc.send('data', 0);
    ipc.on('data',(e,data)=>{
      pushData(data.data);
    })
    $('#addFilter').on('click', function(e){
      ipc.send('data', prepareQry());
      ipc.on('data',(e,data)=>{
      pushData(data.data);
      
    })
    e.preventDefault();
    })
    
    function pushData(x) {
        var data = x.summary;
        $('#tChildScrActive_M').empty()
        $('#tChildScrActive_M').append(data[0].tChildScrActive_M);
        $('#tChildScrActive_F').empty()
        $('#tChildScrActive_F').append(data[0].tChildScrActive_F);
        $('#tPlwScrActive_P').empty()
        $('#tPlwScrActive_P').append(data[0].tPlwScrActive_P);
        $('#tPlwScrActive_L').empty()
        $('#tPlwScrActive_L').append(data[0].tPlwScrActive_L);
        $('#tChildScrPassive_M').empty()
        $('#tChildScrPassive_M').append(data[0].tChildScrPassive_M);
        $('#tChildScrPassive_F').empty()
        $('#tChildScrPassive_F').append(data[0].tChildScrPassive_F);
        $('#tPlwScrPassive_P').empty()
        $('#tPlwScrPassive_P').append(data[0].tPlwScrPassive_P);
        $('#tPlwScrPassive_L').empty()
        $('#tPlwScrPassive_L').append(data[0].tPlwScrPassive_L);
        $('#ChildScrActive_M115').empty()
        $('#ChildScrActive_M115').append(data[0].ChildScrActive_M115);
        $('#ChildScrActive_F115').empty()
        $('#ChildScrActive_F115').append(data[0].ChildScrActive_F115);
        $('#ChildScrActive_M115124').empty()
        $('#ChildScrActive_M115124').append(data[0].ChildScrActive_M115124);
        $('#ChildScrActive_F115124').empty()
        $('#ChildScrActive_F115124').append(data[0].ChildScrActive_F115124);
        $('#PlwScrActive_P21').empty()
        $('#PlwScrActive_P21').append(data[0].PlwScrActive_P21);
        $('#PlwScrActive_L21').empty()
        $('#PlwScrActive_L21').append(data[0].PlwScrActive_L21);
        $('#ChildScrPassive_M115').empty()
        $('#ChildScrPassive_M115').append(data[0].ChildScrPassive_M115);
        $('#ChildScrPassive_F115').empty()
        $('#ChildScrPassive_F115').append(data[0].ChildScrPassive_F115);
        $('#ChildScrPassive_M115124').empty()
        $('#ChildScrPassive_M115124').append(data[0].ChildScrPassive_M115124);
        $('#ChildScrPassive_F115124').empty()
        $('#ChildScrPassive_F115124').append(data[0].tChildScrPassive_F115124);
        $('#PlwScrPassive_P21').empty()
        $('#PlwScrPassive_P21').append(data[0].PlwScrPassive_P21);
        $('#PlwScrPassive_L21').empty()
        $('#PlwScrPassive_L21').append(data[0].PlwScrPassive_L21);
        createTblCh(x.child, 'tblChild');
        createTblPlw(x.plw, 'tblPlw');
      
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
      x:'screening_date',
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
      x: 'screening_date',
      y: range[qtr]
    };
    }else if($('#ddInterval').val() === 'yearly'){
    var yr = $('#year').val();
    qry.date = {
      x: 'screening_date',
      y: [`${yr}-01-01`, `${yr}-12-31`]
    } ;
    }
    
    console.log(qry);
    return qry;
    }
    
    
    function createTblPlw(data, table){
    var headPLW = ["id",'Province','District','Tehsil','UC','Nutrition Site','Screening Type','Screening Date','Entry Date','Village','Staff Name','Name','H Name','Type','Age(years)','Address','MUAC','# of MM Tabs','status' ]
    
    var keysPlw =  [            
    "screening_id",
          "province",
          "district_name",
          "tehsil_name",
          "uc_name",
          "site_name",
          "screening_type",
          "screening_date",
          "data_entry_date",
          "site_village",
          "staff_name",
          "name",
          "f_or_h_name",
          "plw_type",
          "age",
          "address",
          "muac",
          "no_mm_tabs",
          "status",                 
          
    ]
    var scrType = ['Passive','Active'];
    var plw_type = ['','Pragnent', 'Lactacting']
    var Status = ['','Normal','MAM','SAM'];
    var yN = ['No','Yes'];
    var html = '<tr>';
      headPLW.forEach(el=>{
        html+= '<th>'+el+'</th>'
      })
      html+='</tr>'
    data.forEach(el=>{
      html+= '<tr>'
      keysPlw.forEach(key=>{
        if(key === 'plw_type'){
          html+= '<td>'+plw_type[el[key]]+'</td>'
        } else
        if(key === 'screening_type'){
          html+= '<td>'+scrType[el[key]]+'</td>'
        }else 
        if(key === 'status'){
          html+= '<td>'+Status[el[key]]+'</td>'
        }else{
    
          html+= '<td>'+el[key]+'</td>'
        }
        
      })
      html +='</tr>'
    })
    console.log(html);
    $('#'+table).empty();
    $('#'+table).append(html);
    
    }
    function createTblCh(data, table){
    var headChild = ["id",'Province','District','Tehsil','UC','Nutrition Site','Screening Type','Screening Date','Entry Date','Village','Staff Name','Name','Father Name','Gender','Age(months)','Address','MUAC','OEDEMA','Deworming','# of MM Sch', 'Status' ]
    var keysChild = [            
      "screening_id",
          "province",
          "district_name",
          "tehsil_name",
          "uc_name",
          "site_name",
          "screening_type",
          "screening_date",
          "data_entry_date",
          "site_village",
          "staff_name",
          "name",
          "f_or_h_name",
          "gender",
          "age",
          "address",
          "muac",
          "oedema",
          "deworming",
          "no_mm_sch",
          "status"
    ]
    
    var scrType = ['Passive','Active'];
    var gender = ['','Male','Female'];
    var Status = ['','Normal','MAM','SAM'];
    var yN = ['No','Yes'];
    var html = '<tr>';
      headChild.forEach(el=>{
        html+= '<th>'+el+'</th>'
      })
      html+='</tr>'
    data.forEach(el=>{
      html+= '<tr>'
      keysChild.forEach(key=>{
        if(key === 'gender'){
          html+= '<td>'+gender[el[key]]+'</td>'
        } else
        if(key === 'screening_type'){
          html+= '<td>'+scrType[el[key]]+'</td>'
        } else
        if(key === 'status'){
          html+= '<td>'+Status[el[key]]+'</td>'
        } else
        if(key === 'oedema'){
          html+= '<td>'+yN[el[key]]+'</td>'
        }else
        if(key === 'deworming'){
          html+= '<td>'+yN[el[key]]+'</td>'
        }else{
    
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
    
    
    
}
