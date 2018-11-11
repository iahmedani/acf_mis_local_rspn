module.exports.initScrChildrenUpd = function (){
  $(()=>{
    $('input[type="number"]').attr('min',0);
  })
  $(function () {
    var datePickerId = document.getElementById('txtScrChildDate');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  $(function(){
    ipc.send('getProvince');
    ipc.on('province', function(evt, province){
      $('#ddProvince').children('option:not(:first)').remove();   
      prov(province);
      })
      $('#ddProvince').on('change', function(){
        var prov = $(this).val();
        ipc.send('getDistrict', prov )
        ipc.on('district', function(evt, district){
          $('#ddDistrict').children('option:not(:first)').remove();

        dist(district);
        })
      })
      $('#ddDistrict').on('change', function(){
        var dist = $(this).val();
        ipc.send('getTehsil', dist )
        ipc.on('tehsil', function(evt, tehsil){
          $('#ddTehsil').children('option:not(:first)').remove();
  
        teh(tehsil);
        })
      })
      $('#ddTehsil').on('change', function(){
        var tehs = $(this).val();
        ipc.send('getUC', tehs )
        ipc.on('uc', function(evt, uc){
          $('#ddUC').children('option:not(:first)').remove();
        
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
        hhListener(hh);
        })
    })
    $("#ddHealthHouse").on("change", function () {
      var siteId = $(this).val();
      // ucForHH = ucs;
      ipc.send("getStaff", siteId);
      ipc.send("getSups", siteId);

      ipc.on("haveStaff", function (evt, staffs) {
        $("#ddStaff_code")
          .children("option:not(:first)")
          .remove();
        staffListener(staffs);
      });
      ipc.on("haveSups", function (evt, _sups) {
        $("#ddSup_code")
          .children("option:not(:first)")
          .remove();
        supListener(_sups);
      });
    });
    $("#ddStaff_code").on("change", function () {
      var staff_code = $(this).val();
      $("#ddStaff_name").val(staff_code);
    });
    $("#ddStaff_name").on("change", function () {
      var staff_code = $(this).val();
      $("#ddStaff_code").val(staff_code);
    });
    $("#ddSup_code").on("change", function () {
      var sup_code = $(this).val();
      $("#ddSup_name").val(sup_code);
    });
    $("#ddSup_name").on("change", function () {
      var sup_code = $(this).val();
      $("#ddSup_code").val(sup_code);
    });
    $('.sum_normal_boys').on('change', function () {
      var sum =
        (($("#normal_boys_623").val()) ? parseInt($("#normal_boys_623").val()) : 0)
        + (($("#normal_boys_2459").val()) ? parseInt($("#normal_boys_2459").val()) : 0);
      $("#total_normal_boys").empty();
      $("#total_normal_boys").val(sum);
    });
    $(".sum_normal_girls").on("change", function () {
      var sum = (($("#normal_girls_623").val()) ? parseInt($("#normal_girls_623").val()) : 0)
        + (($("#normal_girls_2459").val()) ? parseInt($("#normal_girls_2459").val()) : 0);
      $("#total_normal_girls").empty();
      $("#total_normal_girls").val(sum);
    });
    $('.mam_boys').on('change', function () {
      var sum =
        (($("#mam_boys_623").val()) ? parseInt($("#mam_boys_623").val()) : 0)
        + (($("#mam_boys_2459").val()) ? parseInt($("#mam_boys_2459").val()) : 0);
      $("#total_mam_boys").empty();
      $("#total_mam_boys").val(sum);
    });
    $(".mam_girls").on("change", function () {
      var sum = (($("#mam_girls_623").val()) ? parseInt($("#mam_girls_623").val()) : 0)
        + (($("#mam_girls_2459").val()) ? parseInt($("#mam_girls_2459").val()) : 0);
      $("#total_mam_girls").empty();
      $("#total_mam_girls").val(sum);
    });
    $('.sam_boys').on('change', function () {
      var sum =
        (($("#sam_without_comp_boys_623").val()) ? parseInt($("#sam_without_comp_boys_623").val()) : 0)
        + (($("#sam_without_comp_boys_2459").val()) ? parseInt($("#sam_without_comp_boys_2459").val()) : 0);
      $("#total_sam_boys").empty();
      $("#total_sam_boys").val(sum);
    });
    $(".sam_girls").on("change", function () {
      var sum = (($("#sam_without_comp_girls_623").val()) ? parseInt($("#sam_without_comp_girls_623").val()) : 0)
        + (($("#sam_without_comp_girls_2459").val()) ? parseInt($("#sam_without_comp_girls_2459").val()) : 0);
      $("#total_sam_girls").empty();
      $("#total_sam_girls").val(sum);
    });
    $('.comp_boys').on('change', function () {
      var sum =
        (($("#sam_with_comp_boys_623").val()) ? parseInt($("#sam_with_comp_boys_623").val()) : 0)
        + (($("#sam_with_comp_boys_2459").val()) ? parseInt($("#sam_with_comp_boys_2459").val()) : 0);
      $("#total_comp_boys").empty();
      $("#total_comp_boys").val(sum);
    });
    $(".comp_girls").on("change", function () {
      var sum = (($("#sam_with_comp_girls_623").val()) ? parseInt($("#sam_with_comp_girls_623").val()) : 0)
        + (($("#sam_with_comp_girls_2459").val()) ? parseInt($("#sam_with_comp_girls_2459").val()) : 0);
      $("#total_comp_girls").empty();
      $("#total_comp_girls").val(sum);
    });
    })
  $(()=>{
    function prepareQry() {
      var qry = {};
      ($('#ddProvince').val()) ? qry.province_id = $('#ddProvince').val(): '';
      ($('#ddDistrict').val()) ? qry.district_id = $('#ddDistrict').val(): '';
      ($('#ddTehsil').val()) ? qry.tehsil_id = $('#ddTehsil').val(): '';
      ($('#ddUC').val()) ? qry.uc_id = $('#ddUC').val(): '';
      ($('#ddInterval').val() == 1) ? qry.date = {
        x: 'screening_date',
        y: [$('#start_date').val(), $('#end_date').val()]
      }: '';
      console.log(qry);
      return qry;
    }
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
    $(function () {
      $('#ddInterval').on('change', function () {
        var value = $(this).val();
        console.log(value);
        if (value == 1) {
          $('#start_date').attr('disabled', false);
          $('#end_date').attr('disabled', false);
        } else {
          $('#start_date').attr('disabled', true);
          $('#end_date').attr('disabled', true);
        }
      })
    })
    function scrChilrenData(qry){
      return new Promise((resolve,reject)=>{
        ipc.send('allScrChildren', (qry));
        ipc.on('allScrChildren', (e, result)=>{
          var s = {
            data: result.result,
            itemsCount: result.result.length
          }
          if(result.err){
            reject(result.err)
            ipc.removeAllListeners('allScrChildren')
          } else {
              resolve(s);
          }
      })
      })
      
    };
    // var allData = scrChilrenData(prepareQry());
    $('#showDataScrChildren').on('click', (e)=>{
      console.log(prepareQry())
      $('#jsGrid').jsGrid({
        width:'auto',
        height:'auto',
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageLoading: true,
        // data: allData,
        controller:{
          loadData:()=>{
           return scrChilrenData(prepareQry()); 
          }
        },
        fields:[{
          name:'screening_date',
          title:'Entry Date',
          type:'text',
          editing: false
          // editing:false
        },{
          name:'village',
          title:'Village',
          type:'text',
          editing: false
        },{
          name:'total_scr_girls',
          title:'Total Screened Girls',
          type:'number',
          editing: false
        },{
          name:'total_scr_boys',
          title:'Total Screened Boys',
          type:'number',
          editing: false
        }],
        rowClick: function(args){
          this.editItem(args.item);
          var data = args.item;
          var dataKeys = Object.keys(data);
          console.log(dataKeys)
          dataKeys.forEach(el=>{
              $(`input[name="${el}"]`).val(data[el]);
              $(`select[name="${el}"]`).val(data[el]);
              // console.log(data[el])
            // }
          })
          var normal_boys = data.normal_boys_623 + data.normal_boys_2459;
          var normal_girls = data.normal_girls_623 + data.normal_girls_2459;
          var mam_boys = data.mam_boys_623 + data.mam_boys_2459;
          var mam_girls = data.mam_girls_623 + data.mam_girls_2459;
          var sam_comp_boys = data.sam_with_comp_boys_623 + data.sam_with_comp_boys_2459;
          var sam_comp_girls = data.sam_with_comp_girls_623 + data.sam_with_comp_girls_2459;
          var sam_boys = data.sam_without_comp_boys_623 + data.sam_without_comp_boys_2459;
          var sam_girls = data.sam_without_comp_girls_623 + data.sam_without_comp_girls_2459;
          $('#total_normal_boys').empty();
          $('#total_normal_boys').val(normal_boys);
          $('#total_normal_girls').empty();
          $('#total_normal_girls').val(normal_girls);
          $('#total_mam_boys').empty();
          $('#total_mam_boys').val(mam_boys);
          $('#total_mam_girls').empty();
          $('#total_mam_girls').val(mam_girls);
          $('#total_sam_boys').empty();
          $('#total_sam_boys').val(sam_boys);
          $('#total_sam_girls').empty();
          $('#total_sam_girls').val(sam_girls);
          $('#total_comp_boys').empty();
          $('#total_comp_boys').val(sam_comp_boys);
          $('#total_comp_girls').empty();
          $('#total_comp_girls').val(sam_comp_girls);
          
          // $('#p_name').val(data.p_name);
          // $('#gender').val(data.gender);
          // $('#village').val(data.site_village);
          // $('#otp_id').val(data.otp_id);
          console.log(args.item);
        }
      })
    })
  })
  $('#submitScrChildUpdForm').on('click', (e)=>{
    // console.log(data);
    $('#scrChildrenUpdForm').validate();
    if($('#scrChildrenUpdForm').valid()){
      var scrChildrenUpdData = $('#scrChildrenUpdForm').serializeFormJSON();
      console.log(scrChildrenUpdData);
      ipc.send('scrChildrenUpd', scrChildrenUpdData);
      ipc.removeAllListeners('scrChildrenUpd');
      $('#scrChildrenUpdForm').get(0).reset();
    $('input[type="number"]').attr('min',0);
    $('#jsGrid').jsGrid("render").done(()=>{
      console.log('js grid rendered')
    })
    } 
    e.preventDefault();
  })
}