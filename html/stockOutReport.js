const knex = require('../mainfunc/db');
module.exports.stockOutReport = function () {
  $('#ddProgramType').change(()=>{
    $('.prgChange').val("")
  })
  $(function () {
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
    $('#ddTehsil').on('change', function () {
      var tehs = $(this).val();
      ipc.send('getUC', tehs)
      ipc.on('uc', function (evt, uc) {
        $('#ddUC').children('option:not(:first)').remove();

        ucListener(uc);
      })
    })
    var ucForHH;
    $('#ddUC').on('change', function(){
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('getHealthHouse', ucs )
      ipc.on('hh', async function(evt, hh){
        // console.log(hh)
        $('#site_one').children('option:not(:first)').remove();
        if(hh.hh.length > 1){
          $('.secondSite').css('display', '')  
          $('#site_two').children('option:not(:first)').remove();
          await asyncForEach(hh.hh, async(el)=>{
            $('#site_two').append(`<option value="${el.siteName}">${el.siteName}</option>`);              
          })            
        }else{
          $('.secondSite').css('display', 'none')  

        }
        hhListener_siteOne(hh);

      });
    ipc.send("getStaffuc", ucs);
    ipc.send("getSupsuc", ucs);

    ipc.on("haveStaffuc", function(evt, staffs) {
      $("#ddStaff_code")
        .children("option:not(:first)")
        .remove();
      staffListeneruc(staffs);
    });
    ipc.on("haveSupsuc", function(evt, _sups) {
      $("#ddSup_code")
        .children("option:not(:first)")
        .remove();
      supListeneruc(_sups);
    });
  })
    $('#ddUC').on('change', function () {
      var ucs = $(this).val();
      ucForHH = ucs
      if($('#ddProgramType').val() == 'otp'){
        ipc.send('getHealthHouse', ucs)
        ipc.on('hh', function (evt, hh) {
          $('#ddHealthHouse').children('option:not(:first)').remove();
          hhListener(hh);
        })

      }
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
  })
  $(() => {
    // $('.outreach').hide();
    $('#ddProgramType').on('change', function () {
      var val = $(this).val();
      // console.log(val)
      if (val == 'outreach') {
        $('.outreach').show();
        $('.outreach input').attr('required', true);
        $('.nsc').show();
        $('.noOutreach').hide();

        $('.nsc input').attr('required', true);
      } else if (val == 'sc') {
        $('.nsc').hide();
        $('.nsc input').attr('required', false);
        $('.outreach').hide();
        $('.outreach input').attr('required', false);
      } else {
        $('.outreach').hide();
        $('.nsc').show();
        $('.nsc input').attr('required', true);
        $('.outreach input').attr('required', false);

      }
    })
  })
  let stockReportsData = async (filter)=>{
    filter.prog_type = (filter.prog_type) ? filter.prog_type : '';
    filter.province_id = (filter.province_id) ? filter.province_id : '';
    filter.district_id = (filter.district_id) ? filter.district_id : '';
    filter.tehsil_id = (filter.tehsil_id) ? filter.tehsil_id : '';
    filter.uc_id = (filter.uc_id) ? filter.uc_id : '';
    filter.staff_code  = (filter.staff_code ) ? filter.staff_code  : '';
    filter.sup_code  = (filter.sup_code ) ? filter.sup_code  : '';
    filter.stock_release_date  = (filter.stock_release_date ) ? filter.stock_release_date  : '';
    try {
      const __reports = await knex('v_stockReport')
                                  .where('program_type', 'like', `%${filter.prog_type}%`)
                                  .where('province_id', 'like', `%${filter.province_id}%`)
                                  .where('district_id', 'like', `%${filter.district_id}%`)
                                  .where('tehsil_id', 'like', `%${filter.tehsil_id}%`)
                                  .where('uc_id', 'like', `%${filter.uc_id}%`)
                                  .where('staff_code', 'like', `%${filter.staff_code}%`)
                                  .where('sup_code', 'like', `%${filter.sup_code}%`)
                                  .where('stock_release_date', 'like', `%${filter.stock_release_date}%`)
                                  .where({is_deleted:0});
      return __reports;                             

    } catch (error) {
      // console.log(error);
      return [];
    }
  }

  var __currentFilter = () => {
    var x = {};
    x.prog_type = $("#ddProgramType").val() ? $("#ddProgramType").val() : '';
    x.province_id = $("#ddProvince").val()? $("#ddProvince").val() : "";
    x.district_id = $("#ddDistrict").val()? $("#ddDistrict").val() : "";
    x.tehsil_id = $("#ddTehsil").val()? $("#ddTehsil").val() : "";
    x.uc_id = $("#ddUC").val()? $("#ddUC").val() : "";
    x.site_id = $("#ddHealthHouse").val()? $("#ddHealthHouse").val() : "";
    x.staff_code = $("#ddStaff_code").val()? $("#ddStaff_code").val() : '';
    x.sup_code = $("#ddSup_code").val()? $("#ddSup_code").val() : '';
    x.stock_release_date = $("#stock_release_date").val() ? $("#stock_release_date").val() : '';
    return x;
  }

  let __getStockOutReports =  async (filter) => {
    if ($.fn.DataTable.isDataTable("#__stockOutReport")) {
      $("#__stockOutReport")
        .DataTable()
        .destroy();
    }
      const __reports = await stockReportsData(filter);
      $("#__stockOutReport").DataTable({
        data: __reports,
        dom: "Bfrtip",
        buttons: ["copy", {
          extend: "csv",
          filename: 'Stock out Report'+ new Date().toLocaleDateString()
        }, {
          extend: "excel",
          filename: 'Stock out Report'+ new Date().toLocaleDateString()
        }],
        retrieve: true,
        paging: true,
        columns: [
          {
            title: "Stock ID",
            data: "stockOutID"
          },
          {
            title: "Stock Release Date",
            data: "stock_release_date"
          },
          {
            title: "Program Type",
            data: "program_type",
            render: function (data, type, row) {
              if (data == 'sc') {
                return 'NSC'
              } else {
                return data.toUpperCase();
              }
            }
          },
          {
            title: "District",
            data: "districtName",            
          },
          {
            title: "Tehsil",
            data: "tehsilName"
          },
          {
            title: "UC",
            data: "ucName"
          },
          {
            title: "Health House",
            data: "siteName"
          },
          {
            title: "CHW",
            data: "staff_name"
          },
          {
            title: "CHS",
            data: "sup_name"
          },
          {
            title: "Item",
            data: "item_name"
          },
          {
            title: "Quantity Released",
            data: "quantity_released"
          },
          // {
          //   title: "Created At", data: "Created",
          //   render: function (data, type, row) {
          //     var x = new Date(data);
          //     return x.toDateString();
          //   }
          // },
          {
            title: "Upload Status",
            data: "upload_status",
            render: function (data, type, row) {
              // console.log(data)
              if (data == 0) {
                return 'Not Uploaded'
              } else if (data == 2) {
                return 'Edited'
              } else {
                return 'Uploaded'
              }
            }
          },
        ]
      });
  }
  
  __getStockOutReports(__currentFilter());

  $('.__filter').change(async ()=>{
    __getStockOutReports(__currentFilter());
  
    })

}