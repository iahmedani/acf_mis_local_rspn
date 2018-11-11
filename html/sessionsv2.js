module.exports.initSessionsV2 = function (){
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
          // filtering: true,
          inserting: true,
          editing: true,
          sorting: true,
          // paging: true,
          autoload: true,
          pageLoading: true, // this is the clue
          // pageSize: 10,
          // pageButtonCount: 5,
          deleteConfirm: "Do you really want to delete client?",
          controller: {
            loadData: function (filter) {
              console.log(filter)
              console.log('loaddata', site_id)
              return loadData(site_id);
            },
            updateItem: function (item) {
              console.log('update')
              console.log(item);
              return updateData(item);
            },
            insertItem: function (item) {
              console.log(item);
              item.site_id = site_id
              return insertData(item)
            }
          },
          fields: [ {
            name:'session_date',
            title:'Date',
            type:'date',
              validate: 'required'
          },{
            name: "session_type",
            title: "Session Type",
            type: "select",
            items: [
              {Name:'',value:''},
              {Name:'Hygene',value:'hygene'},
              {Name:'IYCF',value:'iycf'},
              {Name:'Breast Feeding Counseling',value:'breastFeeding'},
              {Name:'Cooking Demonstration',value:'cooking'},
              {Name:'Other',value:'other'},
              ],
              valueField: "value",
              textField: "Name",
              validate: 'required'
          },{
            name:'session_location',
            title: 'Session Location',
            type:'select',
            items: [
              {Name:'',value:''},
              {Name:'In CMAM Site',value:'cmam_site'},
              {Name:'In Community',value:'community'}
            ],valueField: "value",
              textField: "Name",
              validate: 'required'
          }, {
            name: "male_participants",
            title: "Male Participants",
            type: "number",
            validate:{
              validator: 'min',
              param: 0
            }
          },
           {
            name: "female_participants",
            title: "Female Participants",
            type: "number",
            validate:{
              validator: 'min',
              param: 0
            }
            },
            {
              name: "pragnent",
              title: "Pragnent",
              type: "number",
              validate: {
                validator: 'min',
                param: 0
              }
            },
            {
              name: "lactating",
              title: "Lactating",
              type: "number",
              validate: {
                validator: 'min',
                param: 0
              }
            },
            {
            name:'upload_status',
            title:'Upload Status',
            type:'select',
            valueType: 'number',
            items:[{Name:'',value:''},{Name:'Uploaded',value:1},{Name:'Not Uploaded',value:0},{Name:'Edited',value:2}],
            readOnly: true,
            valueField: "value",
    textField: "Name",
    editing: false,
    inserting: false
          },{
            type: 'control',
            deleteButton: false,
          }]
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

    var MyDateField = function(config) {
      jsGrid.Field.call(this, config);
      };
    
    MyDateField.prototype = new jsGrid.Field({
    
    css: "date-field",            // redefine general property 'css'
    align: "center",              // redefine general property 'align'
    
     
    sorter: function(date1, date2) {
        return new Date(date1) - new Date(date2);
    },
    
    itemTemplate: function(value) {
        return new Date(value).toDateString();
    },
    
    insertTemplate: function(value) {
        return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
    },
    
    editTemplate: function(value) {
        return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
    },
    
    insertValue: function() {
        return this._insertPicker.datepicker("getDate").toISOString();
    },
    
    editValue: function() {
        return this._editPicker.datepicker("getDate").toISOString();
    }
    });
    jsGrid.fields.date = MyDateField;
    
    
  let loadData = (data) => {
    return new Promise((resolve, reject) => {
      ipc.send('getSessionsAll', data);
      ipc.on('getSessionsAll', (e, result) => {
        var s = {
          data: result.result,
          itemsCount: result.result.length
        }
        if (result.err) {
          reject(result.err)
          ipc.removeAllListeners('getSessionsAll')
        } else {
          resolve(s)
          ipc.removeAllListeners('getSessionsAll')
        }
      })
    })
  }

  let insertData = (item)=>{
    return new Promise((resolve, reject)=>{
      ipc.send('insertSessionsSingle', item);
      ipc.on('insertSessionsSingle', (e, result)=>{
        if(result.err){
          reject(result.err)
          ipc.removeAllListeners('insertSessionsSingle');
        } else {
          resolve(result.result[0])
          ipc.removeAllListeners('insertSessionsSingle');
        }
      })
    })
  }

  let updateData = (item)=>{
    return new Promise((resolve, reject)=>{
      ipc.send('updateSessionsSingle', item);
      ipc.on('updateSessionsSingle', (e, result)=>{
        if(result.err){
          reject(result.err)
          ipc.removeAllListeners('updateSessionsSingle')
        } else {
          resolve(result.result[0])
          ipc.removeAllListeners('updateSessionsSingle')
        }
      })
    })
  }
  

}

