module.exports.initScrChUpdv2 = function(){

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
        })
      
    function prepareQry(){
      var qry = {};
    ($('#ddProvince').val()) ? qry.province_id = $('#ddProvince').val() : '';
    ($('#ddDistrict').val()) ? qry.district_id = $('#ddDistrict').val() : '';
    ($('#ddTehsil').val()) ? qry.tehsil_id = $('#ddTehsil').val() : '';
    ($('#ddUC').val()) ? qry.uc_id = $('#ddUC').val() : '';
    ($('#ddInterval').val() == 1) ? qry.date = {x:'screening_date',y:[$('#start_date').val(), $('#end_date').val()]} : '';    
      console.log(qry);
      return qry;
    }
  let getDataFilters = (filters)=>{
    return new Promise((resolve, reject) => { 
    ipc.send('getScrChAll', filters);
    ipc.on('getScrChAll',(e, result)=>{
      console.log(result)
      var s = {
        data: result.result,
        itemsCount: result.result.length
      }
      if(result.err){
        reject(result.err)
        ipc.removeAllListeners('getScrChAll')
      } else {
        resolve(s)
        ipc.removeAllListeners('getScrChAll')
      }
    })
  })
}
      const myUpdate = (data)=>{
        return new Promise((resolve, reject)=>{
          ipc.send('updScrChSingle', data);
          ipc.on('updScrChSingle', (e, result)=>{
            
      if(result.err){
        reject(result.err)
      } else {
        resolve(result.result[0])
      }
          })
        })
      }
    $(function() {
      var Gender = [{
        Name:'',
        id:0,
      },{Name:'Male',id:1},
      {Name:'Female', id:2}];
      var yNo = [{
        Name:'No',
        id:0,
      },{Name:'Yes',id:1}];

      var plStatus = [{
        Name:'',
        id:0,
      },{
        Name:'Normal',
        id:1
      },{
        Name:'MAM',
        id:2

      },{Name:'SAM', id:3}]
      var plStatus = [{
        Name:'',
        id:0,
      },{
        Name:'Normal',
        id:1
      },{
        Name:'MAM',
        id:2

      },{Name:'SAM', id:3}]
$('#addFilter').on('click', (e)=>{
e.preventDefault();
  $("#jsGrid").jsGrid({
    height: "500px",
    width: "100%",
    // filtering: true,
    // inserting: true,
    editing: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageLoading:true, // this is the clue
    pageSize: 10,
    pageButtonCount: 5,
    deleteConfirm: "Do you really want to delete client?",
    controller: {
      loadData: function(filter) {
        console.log('loaddata')
        return getDataFilters(prepareQry());
      },
      insertItem: function(item) {
        return $.ajax({
          type: "POST",
          url: "/clients",
          data: item
        });
      },
      updateItem: function(item) {
        console.log('update')
        return myUpdate(item);
      }
      // ,
      // deleteItem: function(item) {
      //   return $.ajax({
      //     type: "DELETE",
      //     url: "/clients",
      //     data: item
      //   });
      // }
    },
    fields: [{
        name: "screening_id",
        title:"ID",
        type: "number",
        width: 30,
        editing :false
      },{name:'site_name',title:'Nut: Site',editing:'false'},{
        name: "name",
        title:"Name",
        type: "text",
        width: 100
      },{name:'site_village',title:'Village',editing:'false'},{
        name: "name",
        title:"Name",
        type: "text",
        width: 100
      },{
        name: "f_or_h_name",
        title:"Husband Name",
        type: "text",
        width: 100
      },{
        name: "address",
        title:"Address",
        type: "text",
        width: 100
      },{
        name: "gender",
        title:"Gender",
        type: "select",
        items:Gender,
        valueField:'id',
        textField:'Name',
        width: 50
      },
      {
        name: "oedema",
        title:"Oedema",
        type: "select",
        items:yNo,
        valueField:'id',
        textField:'Name',
        width: 50
      },
      {
        name: "deworming",
        title:"Deworming",
        type: "select",
        items:yNo,
        valueField:'id',
        textField:'Name',
        width: 80
      }
      ,{
        name: "muac",
        title:"MUAC",
        type: "number",
        width: 50
      },{
        name: "no_mm_sch",
        title:"MM Sch",
        type: "number",
        width: 50
      },{
        name: "age",
        title:"Age",
        type: "number",
        width: 50
      },{
        name: "status",
        title:"Status",
        type: "select",
        items:plStatus,
        valueField:'id',
        textField:'Name',
        width: 80
      },
      {
        type: "control",
        deleteButton: false,
      }
    ],
    onDataLoaded: function(data) {
      console.log(data);
    },
    onItemUpdating: function(args) {
      console.log('on Updating', args)
    },   // before controller.updateItem
      onItemUpdated: function(args) {
      console.log('on Updated', args)
        
      },    // on done of controller.updateItem
  });
})


});
$(function () {
      $('#ddInterval').on('change', function () {
        var value = $(this).val();
        console.log(value);
          if(value == 1){
            $('#start_date').attr('disabled',false);
            $('#end_date').attr('disabled',false);
          } else {
            $('#start_date').attr('disabled',true);
            $('#end_date').attr('disabled',true);
          }
      })
    })


    
}