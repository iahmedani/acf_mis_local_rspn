

module.exports.initOtpExit = function (){

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
      
    });
  $(function(){
      $('#ddHealthHouse').on('change', function () {
        var site_id = $(this).val();
        // 
        $("#jsGrid").jsGrid({
          height: "500px",
          width: "100%",
          autoload:true,
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
            loadData: function (filter) {
              console.log(filter)
              console.log('loaddata', site_id)
              return xx(site_id);
            },
            updateItem: function (item) {
              console.log('update')
              console.log(item);
              return addFollowup(item);
            }
          },
          fields: [{
              name: "reg_id",
              title: "Reg #",
              type: "text",
              width: 50,
              editing: false
            }, {
              name: "p_name",
              title: "Name",
              type: "text",
              width: 100,
              editing: false
            }, {
              name: "f_or_h_name",
              title: "Husband Name",
              type: "text",
              width: 100,
              editing: false
            }, {
              name: "site_village",
              title: "Village",
              type: "text",
              width: 100,
              editing: false
            } 
          ],
          rowClick: function(args){
            this.editItem(args.item);
            var data = args.item;
            $('#p_name').val(data.p_name);
            $('#gender').val(data.gender);
            $('#village').val(data.site_village);
            $('#otp_id').val(data.otp_id);
            console.log(args.item);
          }
          // ,
          // onDataLoaded: function (data) {
          //   console.log(data);
          // },
          // onItemUpdating: function (args) {
          //   console.log('on Updating', args)
          // }, // before controller.updateItem
          // onItemUpdated: function (args) {
          //   console.log('on Updated', args)
  
          // }, // on done of controller.updateItem
        });
      })
    })
    let xx = (site_id)=>{
      return new Promise((resolve, reject)=>{
        ipc.send('getOtpAll', site_id);
        ipc.on('getOtpAll', (e, result)=>{
          var s = {
            data: result.result,
            itemsCount: result.result.length
          }
          if(result.err){
            reject(result.err)
            ipc.removeAllListeners('getOtpAll')
          }else{
            resolve(s)
            ipc.removeAllListeners('getOtpAll')
          }
        })
      })
    }
    $('#otpExitAddSubmit').on('click',  (e)=> {
      $('#exitAddForm').validate();
      if ($('#exitAddForm').valid() ) {
        var formData = $('#exitAddForm').serializeFormJSON();
        var exit_date = $('#exit_date').val();
        formData.exit_date = exit_date;
        delete formData.p_name;
        delete formData.gender;
        delete formData.village;
        ipc.send('otpExitAdd', formData);
        ipc.removeAllListeners('otpExitAdd');
        $('#exitAddForm').get(0).reset();
        $("#jsGrid").jsGrid("render").done(function() {
          console.log("rendering completed and data loaded");
      });
        // $("#jsGrid").jsGrid("refresh")     
      }
      e.preventDefault();
    })

}
  