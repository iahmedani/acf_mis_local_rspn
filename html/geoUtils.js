const knex = require('../mainfunc/db');

const getSetGeo = async function(){
    var isActive = true
    try {
        var provinceList = await knex('tblGeoProvince').where({isActive});
        var districtList = await knex('tblGeoDistrict').where({isActive});
        var tehsilList = await knex('tblGeoTehsil').where({isActive});
        var ucList = await knex('tblGeoUC').where({isActive});
        var siteList = await knex('tblGeoNutSite').where({isActive});
        var geoList = {provinceList,districtList,tehsilList,ucList,siteList};
        window.sessionStorage.setItem('geoList', JSON.stringify(geoList));
    } catch (error) {
        window.sessionStorage.setItem('geoList', 'error')
    }
    
}

$(async ()=>{
    await getSetGeo();
    await appendItems('defProvince','provinceList',false,'id','provinceName');
    
})

const appendItems = async function(appendToId, geoListName, isName,valCol, NameCol, filterId, filterColName){
    // remove already available items;
    $(`#${appendToId}`)
        .children("option:not(:first)")
        .remove();
    var __list = JSON.parse(window.sessionStorage.getItem('geoList'));
    var _geoLists = __list[geoListName]
    if(_geoLists){

        let _pushList = []
        if(filterId){
           for (x of _geoLists){
              if( x[filterColName] == filterId){
                  _pushList.push(x)
              }
           }
        //    console.log(_pushList)
        }else{
            _pushList = _geoLists;
        }
    
        if(isName){
            for (one of _pushList ){
                $(`#${appendToId}`).append(`<option value="${one[NameCol]}">${one[NameCol]}</option>`);
            }
        }else{
            for (one of _pushList ){
                $(`#${appendToId}`).append(`<option value="${one[valCol]}">${one[NameCol]}</option>`);
            }
        }
    }
}

const appendItemsNsc = async function(appendToId, geoListName, isName,valCol, NameCol, filterId, filterColName, type){
    // remove already available items;
    $(`#${appendToId}`)
        .children("option:not(:first)")
        .remove();
    var __list = JSON.parse(window.sessionStorage.getItem('geoList'));
    var _geoLists = __list[geoListName]
    if(_geoLists){

        let _pushList = []
        if(filterId){
           for (x of _geoLists){
              if( x[filterColName] == filterId && x[type]){
                  _pushList.push(x)
              }
           }
        }else{
            _pushList = _geoLists;
        }
    
        if(isName){
            for (one of _pushList ){
                $(`#${appendToId}`).append(`<option value="${one[NameCol]}">${one[NameCol]}</option>`);
            }
        }else{
            for (one of _pushList ){
                $(`#${appendToId}`).append(`<option value="${one[valCol]}">${one[NameCol]}</option>`);
            }
        }
    }
}

// setting defaults function

const setDefault = ()=>{
    var defProg = $('#defPType').val();
    var defProvince = $('#defProvince').val()
    var defProvinceText = $('#defProvince option:selected').text()
    var defDistrict = $('#defDistrict').val()
    var defDistrictText = $('#defDistrict option:selected').text()
    

    var defaultOptions = {};
    var defDist = {
      value: defDistrict,
      name: defDistrictText
    }
    var defProv = {
      value: defProvince,
      name: defProvinceText
    }
    if(defDist.value !== ''){
        defaultOptions.defDist = defDist
    }
    if(defProv.value !== ''){
        defaultOptions.defProv = defProv
    }
    if(defProg !== ''){
        defaultOptions.defProg = defProg
    }
    if(defaultOptions.defProg || defaultOptions.defDist || defaultOptions.defProv){
        // console.log(defaultOptions)
        window.localStorage.setItem('defaults', JSON.stringify(defaultOptions))
    }
}

// setting default evenTriger
$('#setDefaultOptionsBtn').on('click', function(){
    setDefault();
    $('#defaults').modal('hide')
})

$('#defProvince').on('change', async function(){
    var _id = $(this).val();
    // console.log({_id})
    await appendItems('defDistrict','districtList',false,'id','districtName',_id,'province_id');
})
// $('._def').on('change', async()=>{
// })


  const chooseDefault = function(elID, type){
    var _defaults = JSON.parse(window.localStorage.getItem('defaults'))[type];
    if(type == 'defProg'){
        $(`#${elID} option[value="${_defaults}"]`).prop("selected", true);

    } else{
        $(`#${elID} option[value="${_defaults.value}"]`).prop("selected", true);
    }
    // $(`#${elID}`).trigger('change')
  }



  // form Setting default

  const setFormDefualts = async function(progElId, provElId, distElId, tehElId){      
    await appendItems(provElId,'provinceList',false,'id','provinceName');
    if(progElId){
        chooseDefault(progElId, 'defProg');
        $(`#${progElId}`).trigger('change')
    }
    chooseDefault(provElId, 'defProv');
    $(`#${provElId}`).trigger('change')
    var DefProvince = JSON.parse(window.localStorage.getItem('defaults'))['defProv']['value'];
    await appendItems(distElId,'districtList',false,'id','districtName',DefProvince,'province_id');
    chooseDefault(distElId, 'defDist');
    var DefDistrict = JSON.parse(window.localStorage.getItem('defaults'))['defDist']['value'];
    await appendItems(tehElId,'tehsilList',false,'id','tehsilName',DefDistrict,'district_id');
  }


  const updatGeoElonChange = async function(provElId, distElId, tehElId, ucElId, siteId, progType){
    //   if(provElId != 'fitlerProvince'){
    //       await appendItems(provElId,'provinceList',false,'id','provinceName');
    //   }
      if(provElId){
          $(`#${provElId}`).on('change', async function(){
              var _id = $(this).val();
              await appendItems(distElId,'districtList',false,'id','districtName',_id,'province_id');
            })
      }
      if(distElId){
          $(`#${distElId}`).on('change', async function(){
            var _id = $(this).val();
            await appendItems(tehElId,'tehsilList',false,'id','tehsilName',_id,'district_id');
          })

      }
      if(tehElId){
          $(`#${tehElId}`).on('change', async function(){
            var _id = $(this).val();
            // console.log({_id})
            if(progType == 'otp' || !progType){
                await appendItems(ucElId,'ucList',false,'id','ucName',_id,'tehsil_id');
            }else if(progType == 'sc'){
                await appendItemsNsc(siteId,'siteList',false,'id','siteName',_id,'tehsil_id','SC');
            }
          })
      }
      if(siteId){
          $(`#${ucElId}`).on('change', async function(){
            var _id = $(this).val();
            // console.log({_id})
            await appendItems(siteId,'siteList',false,'id','siteName',_id,'uc_id');
          })
      }
  }



  const createExternalFilter = function(filter){
    var __province =  $('#filterProvince option:selected').text();
    var __district =  $('#filterDistrict option:selected').text();
    var __tehsil =  $('#filterTehsil option:selected').text();
    var __uc =  $('#filterUC option:selected').text();
    filter.prog_type = filter.prog_type ? filter.prog_type : $('#filterProgramType').val();
    filter.province = __province == 'Choose' ? '' : __province
    filter.district_name = __district == 'Choose' ? '': __district
    filter.tehsil_name = __tehsil == 'Choose' ? '' : __tehsil
    filter.uc_name= __uc == 'Choose' ? '' : __uc
  }

  const createExternalFilterValue = function(filter){
    var __province =  $('#filterProvince option:selected').val();
    var __district =  $('#filterDistrict option:selected').val();
    var __tehsil =  $('#filterTehsil option:selected').val();
    var __uc =  $('#filterUC option:selected').val();
    var __site =  $('#filterHealthHouse option:selected').val() 
    filter.prog_type = filter.prog_type ? filter.prog_type : $('#filterProgramType').val();
    filter.province = __province == 'Choose' ? '' : __province
    filter.district_name = __district == 'Choose' ? '': __district
    filter.tehsil_name = __tehsil == 'Choose' ? '' : __tehsil
    filter.uc_name= __uc == 'Choose' ? '' : __uc
    if(__site){
        filter.site_name =  __site == 'Choose' ? '' : __site

    }
  }

 var changeLogMsg = `<h3>Added Features</h3>
 <ul class="list-group">
   <li class="list-group-item">Added Support for default Program, Province and District</li>
   <li class="list-group-item">Added Filters for CHS/LHS, CHW/LHS and Village List</li>
   <li class="list-group-item">Improved overall performance by 40%</li>
   <li class="list-group-item">Added new fields in OTP exit single entry (Exit MUAC, Exit Weight, Length of Stay)</li>
   <li class="list-group-item"><strong>Application Changelog Message :</strong> Now! each update will provide user a feedback (like this window)</li>
 </ul>
 <h3>Bug Fixes</h3>
 <ul class="list-group">
   <li class="list-group-item">Duplication issue in OTP report removed</li>
   <li class="list-group-item">Duplicate Exit Issue in Exit Update view removed</li>
   <li class="list-group-item">Fixed issues in outreach report (Children and PLW Screening)</li>
   <li class="list-group-item">Synchronization feedback Fixed</li>
 </ul>
 <h3>Know Issues</h3>
 <ul class="list-group" >
   <li class="list-group-item">Stock In report - Fix will be launched next week (30th Nov 2020)</li>
 </ul>`;
 var changelogCheck = window.localStorage.getItem('changeLog');
 if(!changelogCheck){
     $('#log_details').html(changeLogMsg);
     $('#ImranAliAhmedani').modal('show');
     changelogCheck = [{version:400}]
     window.localStorage.setItem('changeLog', JSON.stringify(changelogCheck));
     
 }
 var _defaultOptions = window.localStorage.getItem('defaults');
  if(!_defaultOptions && changeLogMsg){
    $('#defaults').modal('show')

  }

  module.exports = {
    chooseDefault,
    appendItems,
    setFormDefualts,
    updatGeoElonChange,
    createExternalFilter,
    createExternalFilterValue
}