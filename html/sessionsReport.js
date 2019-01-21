module.exports.sessionsReport = () => {
  $(function () {
    // $("#tblSessionReport").DataTable({
    //   paging: false,
    //   searching:false
    // })
    
    ipc.send('getProvince');
    ipc.on('province', function (evt, province) {
      $('#ddProvince').children('option:not(:first)').remove();

      // province.province.forEach(el=>{
      // $('#ddProvince').append(`<option value="${el.id}">${el.provinceName}</option>`);

      // })
      prov(province);
    })
    $('#ddProvince').on('change', function () {
      var prov = $(this).val();
      ipc.send('getDistrict', prov)
      ipc.on('district', function (evt, district) {
        $('#ddDistrict').children('option:not(:first)').remove();

        //   district.district.forEach(el=>{
        // $('#ddDistrict').append(`<option value="${el.id}">${el.districtName}</option>`);              
        //   })
        dist(district);
      })
    })
    $('#ddDistrict').on('change', function () {
      var dist = $(this).val();
      ipc.send('getTehsil', dist)
      ipc.on('tehsil', function (evt, tehsil) {
        $('#ddTehsil').children('option:not(:first)').remove();

        //   tehsil.tehsil.forEach(el=>{
        // $('#ddTehsil').append(`<option value="${el.id}">${el.tehsilName}</option>`);              
        //   })
        teh(tehsil);
      })
    })
    $('#ddTehsil').on('change', function () {
      var tehs = $(this).val();
      ipc.send('getUC', tehs)
      ipc.on('uc', function (evt, uc) {
        $('#ddUC').children('option:not(:first)').remove();

        //   uc.uc.forEach(el=>{
        // $('#ddUC').append(`<option value="${el.id}">${el.ucName}</option>`);              
        //   })
        ucListener(uc);
      })
    })
    var ucForHH;
    $('#ddUC').on('change', function () {
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('getHealthHouse', ucs)
      ipc.on('hh', function (evt, hh) {
        $('#ddHealthHouse').children('option:not(:first)').remove();
        //   hh.hh.forEach(el=>{
        // $('#ddHealthHouse').append(`<option value="${el.id}">${el.siteName}</option>`);              
        //   })
        hhListener(hh);
      })
    })
    $(".sReportFilter").on('change', function () {
      console.log($(this).val())
      // if ($.fn.DataTable.isDataTable("#tblSessionReport")) {
      //   $("#tblSessionReport")
      //     .DataTable()
      //     .destroy();
      // }

      getSessionData(currentFilter());
      

    });
    var currentFilter = () => {
      var x = {};
      x.province_id = $("#ddProvince").val() ? $("#ddProvince").val() : "";
      x.district_id = $("#ddDistrict").val() ? $("#ddDistrict").val() : "";
      x.tehsil_id = $("#ddTehsil").val() ? $("#ddTehsil").val() : "";
      x.uc_id = $("#ddUC").val() ? $("#ddUC").val() : "";
      x.site_id = $("#ddHealthHouse").val() ? $("#ddHealthHouse").val() : "";
      if ($("#ddInterval").val() == 1 && $("#start_date").val() && $("#end_date").val()) {
        x.startDate = $("#start_date").val();
        x.endDate = $("#end_date").val();
      }
      return x;
    }

    let getSessionData = (filter) => {
      if ($.fn.DataTable.isDataTable("#tblSessionReport")) {
        $("#tblSessionReport")
          .DataTable()
          .destroy();
      }

      ipc.send("getSessionsAllReport", filter);
      ipc.on("getSessionsAllReport", (event, data) => {
        console.log(data.result.data);
        $("#tblSessionReport").DataTable({
          data: data.result.data,
          dom: "Bfrtip",
          buttons: ["copy", { extend: "csv", title: 'Sessions Report_' + new Date().toDateString() }, {
            extend: "excel", title: 'Sessions Report_' + new Date().toDateString() }],
          retrieve: true,
          paging: true,
          columns: [
            {
              title: "Date", data: "session_date", render: function (data, type, row) {
                var x = new Date(data)
                  return x.toDateString();

            } },
            { title: "Province", data: "province" },
            { title: "District", data: "district_name" },
            { title: "Tehsil", data: "tehsil_name" },
            { title: "UC", data: "uc_name" },
            { title: "Site", data: "site_name" },
            {
              title: "Session", data: "session_type", render: function (data, type, row) {
                var x = {
                  nut_health_hygene: 'Nutrition, Health and Hygene',
                  iycf: 'IYCF',
                  breastFeeding: 'Breast Feeding Counseling',
                  cooking: 'Cooking Demonstration',
                  other: 'Other'
                }
                return x[data];
              }
            },
            {
              title: "Location", data: "session_location", render: function (data, type, row) {
                return data.replace('_', ' ').toUpperCase();
            } },
            { title: "Females", data: "female_participants" },
            { title: "Males", data: "male_participants" },
            { title: "New Participants", data: "new_participants" },
            { title: "Old Participants", data: "old_participants" },
            { title: "Pragnent", data: "pragnent" },
            { title: "Lactating", data: "lactating" },
            { title: "Remarks", data: "remarks" }

          ]
        });
      });
    }
    getSessionData(currentFilter());
    $("#ddInterval").on("change", function () {
      var value = $(this).val();
      console.log(value);
      if (value == 1) {
        $("#start_date").attr("disabled", false);
        $("#end_date").attr("disabled", false);
        $("#showSessionReport").attr('disabled', false );
      } else {
        $("#start_date").attr("disabled", true);
        $("#end_date").attr("disabled", true);
        $("#showSessionReport").attr('disabled', true);
  
      }
    });
    
    $("#showSessionReport").on("click", function(e) {
      e.preventDefault();
      $("#filterDateSession").validate();
      if ($("#filterDateSession").valid()) {
        console.log('here')
        getSessionData(currentFilter());
      } 
    });
  });



  
}