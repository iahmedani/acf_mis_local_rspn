module.exports.initGrid = function (){
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
    $("#ddHealthHouse").on("change", function() {
      var siteId = $(this).val();
      // ucForHH = ucs;
      ipc.send("getStaff", siteId);
      ipc.send("getSups", siteId);

      ipc.on("haveStaff", function(evt, staffs) {
        $("#ddStaff_code")
          .children("option:not(:first)")
          .remove();
        staffListener(staffs);
      });
      ipc.on("haveSups", function(evt, _sups) {
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
    $("#ddStaff_name").on("change", function() {
      var staff_code = $(this).val();
      $("#ddStaff_code").val(staff_code);
    });
    $("#ddSup_code").on("change", function () {
      var sup_code = $(this).val();
      $("#ddSup_name").val(sup_code);
    });
    $("#ddSup_name").on("change", function() {
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
  $('#submitScrChildForm').on('click', (e)=>{
    // console.log(data);
    $('#scrChildrenForm').validate();
    // var totalScrB = parseInt($("#total_scr_boys").val());
    // var totalScrG = parseInt($("#total_scr_girls").val());
    // totalCheck(totalScrB, totalScrG);
    // console.log(totalCheck(totalScrB, totalScrG))
    totalCheck();
    if ($('#scrChildrenForm').valid() && $('.highlightInput').length == 0){
      var scrChildrenData = $('#scrChildrenForm').serializeFormJSON();
      console.log(scrChildrenData);
      ipc.send('scrChildren', scrChildrenData);
      ipc.removeAllListeners('scrChildren');
      // $('#scrChildrenForm').get(0).reset();
      $('.clr').val("");
      $('.cld').val("");
    $('input[type="number"]').attr('min',0);
    } 
    e.preventDefault();
  })
  $('#resetScrChildForm').on('click',()=>{
    $('#scrChildrenForm').get(0).reset();
  })
  $('.tb').on('change', function () {
    // console.log($(this))
  })
  $(".tg").on("change", function() {
    // console.log($(this));
  });

  // $('.tbb').on('change', function () {
  //   var total = 0;
  //   $('.tbb').each(function (i, el) {
  //     total = total + (($(el).val()) ? parseInt($(el).val()) : 0);
  //   })
  //   $("#total_scr_boys").empty();
  //   $("#total_scr_boys").val(total);
  // })
  // $(".tgg").on("change", function() {
  //   var total = 0;
  //   $(".tgg").each(function(i, el) {
  //     total = total + ($(el).val() ? parseInt($(el).val()) : 0);
  //   });
  //   $("#total_scr_girls").empty();
  //   $("#total_scr_girls").val(total);
  // });

  $('.tnew').on('change', function () {
    var total = 0;
    $('.tnew').each(function (i, el) {
      total = total + ($(el).val() ? parseInt($(el).val()) : 0);
    })
    $("#total_scr_boys").empty();
    $("#total_scr_boys").val(total);
  })
  $('.tgnew').on('change', function () {
    var total = 0;
    $('.tgnew').each(function (i, el) {
      total = total + ($(el).val() ? parseInt($(el).val()) : 0);
    })
    $("#total_scr_girls").empty();
    $("#total_scr_girls").val(total);
  })
  
  let totalCheck = () => {
    var totalScrB = parseInt($("#total_scr_boys").val());
    var x = 0;
    $(".tchkb").each(function (i, el) {
      x = x + ($(el).val() ? parseInt($(el).val()) : 0);
      if ($(".tchkb").length - 1 == i) {
        if (x != totalScrB) {
          $(".tchkb").addClass("highlightInput");
          // alert('Value not allowed')
        } else {
          $(".tchkb").removeClass("highlightInput");
        }
      }
    });
    var totalScrG = parseInt($("#total_scr_girls").val());
    var y = 0;
    $(".tchkg").each(function (i, el) {
      y = y + ($(el).val() ? parseInt($(el).val()) : 0);
      if ($(".tchkg").length - 1 == i) {
        if (y != totalScrG) {
          $(".tchkg").addClass('highlightInput');
          // alert('Value not allowed')
        } else {
          $(".tchkg").removeClass('highlightInput');
        }
      }
    });

  }

  // $('.tchkb').on('change', function () {
  //   var totalScrB = parseInt($("#total_scr_boys").val());
  //   // var totalScrG = parseInt($("#total_scr_girls").val());
  //   var x = 0;
  //   $(".tchkb").each(function(i, el) {
  //     x = x + ($(el).val() ? parseInt($(el).val()) : 0);
  //     if ($(".tchkb").length - 1 == i) {
  //       if (x != totalScrB) {
  //         $(".tchkb").addClass("highlightInput");
  //         // alert('Value not allowed')
  //       } else {
  //         $(".tchkb").removeClass("highlightInput");
  //       }
  //     }
  //   });
  // })
  // $('.tchkg').on('change', function () {
  //   // var totalScrB = parseInt($("#total_scr_boys").val());
  //   var totalScrG = parseInt($("#total_scr_girls").val());
  //   var x = 0;
  //   $(".tchkg").each(function(i, el) {
  //     x = x + ($(el).val() ? parseInt($(el).val()) : 0);
  //     if ($(".tchkg").length - 1 == i) {
  //       if (x != totalScrG) {
  //         $(".tchkg").addClass('highlightInput');
  //         // alert('Value not allowed')
  //       } else {
  //         $(".tchkg").removeClass('highlightInput');
  //       }
  //     }
  //   });
  // })

  

}