let fs = require('fs')
const knex = require('../../mainfunc/db');
var uuid = require('uuid/v4');
module.exports.initGrid = function () {
  const {
    client,
    mac
  } = JSON.parse(
    fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
  );
  $(() => {
    $('#other_site').select2();
    $('input[type="number"]').attr('min', 0);
  })
  $(function () {
    var datePickerId = document.getElementById('txtScrChildDate');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
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
        $('#site_two').children('option:not(:first)').remove();
        ipc.send('getAddSitesByDistrict', dist);
        ipc.on('getAddSitesByDistrict', (e, r) => {

          for (site of r.r) {
            $('#site_two').append(`<option value="${site.site_name}">${site.site_name}</option>`);
          }
        })

        // knex('v_geo_active')
        // .columns('site_name')
        // .where({district_id: dist})
        // .then(result=>{
        //   // $('#other_site').children('option:not(:first)').remove();
        //   // console.log(result)
        //   var xlist = []
        //   for (__site of result){
        //     // console.log(__site)
        //     // $('#other_site').append(`<option value="${__site.site_name}" data-subtext="${__site.site_name}">UC:${__site.uc_name}, Site:${__site.site_name}</option>`); 
        //     xlist.push(__site.site_name)
        //     // $('#other_site').append(`<option `)
        //   }
        //   $('#other_site').select2({
        //     data:xlist
        //   });
        //   })
        //   .catch(e=>{
        //     console.log(e)
        //   })
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
    $('#ddUC').on('change', function () {
      var ucs = $(this).val();
      ucForHH = ucs
      ipc.send('getHealthHouse', ucs)
      ipc.on('hh', async function (evt, hh) {
        // console.log(hh)
        $('#site_one').children('option:not(:first)').remove();
        // if (hh.hh.length > 1) {
        //   $('.secondSite').css('display', '')
        //   $('#site_two').children('option:not(:first)').remove();
        //   await asyncForEach(hh.hh, async (el) => {
        //     $('#site_two').append(`<option value="${el.siteName}">${el.siteName}</option>`);
        //   })
        // } else {
        //   $('.secondSite').css('display', 'none')

        // }
        hhListener_siteOne(hh);

      });
      ipc.send("getStaffuc", ucs);
      ipc.send("getSupsuc", ucs);

      ipc.on("haveStaffuc", function (evt, staffs) {
        $("#ddStaff_code")
          .children("option:not(:first)")
          .remove();
        staffListeneruc(staffs);
      });
      ipc.on("haveSupsuc", function (evt, _sups) {
        $("#ddSup_code")
          .children("option:not(:first)")
          .remove();
        supListeneruc(_sups);
      });
    })
    // $("#ddHealthHouse").on("change", function() {
    //   var siteId = $(this).val();
    //   // ucForHH = ucs;

    // });
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
        (($("#normal_boys_623").val()) ? parseInt($("#normal_boys_623").val()) : 0) +
        (($("#normal_boys_2459").val()) ? parseInt($("#normal_boys_2459").val()) : 0);
      $("#total_normal_boys").empty();
      $("#total_normal_boys").val(sum);
    });
    $(".sum_normal_girls").on("change", function () {
      var sum = (($("#normal_girls_623").val()) ? parseInt($("#normal_girls_623").val()) : 0) +
        (($("#normal_girls_2459").val()) ? parseInt($("#normal_girls_2459").val()) : 0);
      $("#total_normal_girls").empty();
      $("#total_normal_girls").val(sum);
    });
    $('.mam_boys').on('change', function () {
      var sum =
        (($("#mam_boys_623").val()) ? parseInt($("#mam_boys_623").val()) : 0) +
        (($("#mam_boys_2459").val()) ? parseInt($("#mam_boys_2459").val()) : 0);
      $("#total_mam_boys").empty();
      $("#total_mam_boys").val(sum);
    });
    $(".mam_girls").on("change", function () {
      var sum = (($("#mam_girls_623").val()) ? parseInt($("#mam_girls_623").val()) : 0) +
        (($("#mam_girls_2459").val()) ? parseInt($("#mam_girls_2459").val()) : 0);
      $("#total_mam_girls").empty();
      $("#total_mam_girls").val(sum);
    });
    $('.sam_boys').on('change', function () {
      var sum =
        (($("#sam_without_comp_boys_623").val()) ? parseInt($("#sam_without_comp_boys_623").val()) : 0) +
        (($("#sam_without_comp_boys_2459").val()) ? parseInt($("#sam_without_comp_boys_2459").val()) : 0);
      $("#total_sam_boys").empty();
      $("#total_sam_boys").val(sum);
    });
    $(".sam_girls").on("change", function () {
      var sum = (($("#sam_without_comp_girls_623").val()) ? parseInt($("#sam_without_comp_girls_623").val()) : 0) +
        (($("#sam_without_comp_girls_2459").val()) ? parseInt($("#sam_without_comp_girls_2459").val()) : 0);
      $("#total_sam_girls").empty();
      $("#total_sam_girls").val(sum);
    });
    $('.comp_boys').on('change', function () {
      var sum =
        (($("#sam_with_comp_boys_623").val()) ? parseInt($("#sam_with_comp_boys_623").val()) : 0) +
        (($("#sam_with_comp_boys_2459").val()) ? parseInt($("#sam_with_comp_boys_2459").val()) : 0);
      $("#total_comp_boys").empty();
      $("#total_comp_boys").val(sum);
    });
    $(".comp_girls").on("change", function () {
      var sum = (($("#sam_with_comp_girls_623").val()) ? parseInt($("#sam_with_comp_girls_623").val()) : 0) +
        (($("#sam_with_comp_girls_2459").val()) ? parseInt($("#sam_with_comp_girls_2459").val()) : 0);
      $("#total_comp_girls").empty();
      $("#total_comp_girls").val(sum);
    });
  })
  $('#submitScrChildForm').on('click', (e) => {
    // console.log(data);
    $('#scrChildrenForm').validate();
    // var totalScrB = parseInt($("#total_scr_boys").val());
    // var totalScrG = parseInt($("#total_scr_girls").val());
    // totalCheck(totalScrB, totalScrG);
    // console.log(totalCheck(totalScrB, totalScrG))
    totalCheck();
    samTotalCheck();
    if ($('#scrChildrenForm').valid() && $('.highlightInput').length == 0) {
      var scrChildrenData = $('#scrChildrenForm').serializeFormJSON();
      scrChildrenData.ch_scr_id = uuid();
      // console.log(scrChildrenData);
      scrChildrenData.reffer_otp_boys = parseInt(scrChildrenData.reffer_otp_boys_s1) + ((parseInt(scrChildrenData.reffer_otp_boys_s2)) ? parseInt(scrChildrenData.reffer_otp_boys_s2) : 0);
      scrChildrenData.reffer_otp_girls = parseInt(scrChildrenData.reffer_otp_girls_s1) + ((parseInt(scrChildrenData.reffer_otp_girls_s2)) ? parseInt(scrChildrenData.reffer_otp_girls_s2) : 0);
      scrChildrenData.reffer_tsfp_boys = parseInt(scrChildrenData.reffer_tsfp_boys_s1) + ((parseInt(scrChildrenData.reffer_tsfp_boys_s2)) ? parseInt(scrChildrenData.reffer_tsfp_boys_s2) : 0);
      scrChildrenData.reffer_tsfp_girls = parseInt(scrChildrenData.reffer_tsfp_girls_s1) + ((parseInt(scrChildrenData.reffer_tsfp_girls_s2)) ? parseInt(scrChildrenData.reffer_tsfp_girls_s2) : 0);
      scrChildrenData.sup_name = $("#ddSup_name option:selected").text();
      scrChildrenData.staff_name = $("#ddStaff_name option:selected").text();
      // console.log(scrChildrenData)
      scrChildrenData.client_id = client;
      ipc.send('scrChildren', scrChildrenData);
      ipc.removeAllListeners('scrChildren');
      // $('#scrChildrenForm').get(0).reset();
      $('.clr').val("");
      $('.cld').val("");
      $('input[type="number"]').attr('min', 0);
    }
    e.preventDefault();
  })
  $('#resetScrChildForm').on('click', () => {
    $('#scrChildrenForm').get(0).reset();
  })
  $('.tb').on('change', function () {
    // console.log($(this))
  })
  $(".tg").on("change", function () {
    // console.log($(this));
  });

  $('#site_one').on('change', function () {
    var that = $(this)
    $('#site_two option').each(function () {
      if ($(this).val() == that.val()) {
        $(this).prop('disabled', true)
      } else {
        $(this).prop('disabled', false)

      }
    })
  })

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

  let samTotalCheck = () => {
    var samTotalB = parseInt($('#total_sam_boys').val()) + parseInt($('#plus12_oedema_boys').val()) + parseInt($('#plus3_oedema_boys').val()) + parseInt($('#total_comp_boys').val())
    var samTotalG = parseInt($('#total_sam_girls').val()) + parseInt($('#plus12_oedema_girls').val()) + parseInt($('#plus3_oedema_girls').val()) + parseInt($('#total_comp_girls').val())
    var mamTotalB = parseInt($('#total_mam_boys').val())
    var mamTotalG = parseInt($('#total_mam_girls').val())

    var s_sam_g = 0
    $('.s_sam_g').each(function (i, el) {
      s_sam_g = s_sam_g + ($(el).val() ? parseInt($(el).val()) : 0);
      if ($(".s_sam_g").length - 1 == i) {
        if (s_sam_g != samTotalG) {
          $(".s_sam_g").addClass('highlightInput');
          // $("#plus12_oedema_girls").addClass('highlightInput');
          // $("#plus3_oedema_girls").addClass('highlightInput');
          // alert('Value not allowed')
        } else {
          $(".s_sam_g").removeClass('highlightInput');
          // $("#plus12_oedema_girls").removeClass('highlightInput');
          // $("#plus3_oedema_girls").removeClass('highlightInput');
        }
      }
    })

    var s_sam_b = 0
    $('.s_sam_b').each(function (i, el) {
      s_sam_b = s_sam_b + ($(el).val() ? parseInt($(el).val()) : 0);
      if ($(".s_sam_b").length - 1 == i) {
        if (s_sam_b != samTotalB) {
          $(".s_sam_b").addClass('highlightInput');
          // $("#plus12_oedema_boys").addClass('highlightInput');
          // $("#plus3_oedema_boys").addClass('highlightInput');
          // alert('Value not allowed')
        } else {
          $(".s_sam_b").removeClass('highlightInput');
          // $("#plus12_oedema_boys").addClass('highlightInput');
          // $("#plus3_oedema_boys").addClass('highlightInput');
        }
      }
    })
    // var s_mam_g = 0
    // $('.s_mam_g').each(function (i, el) {
    //   s_mam_g = s_mam_g + ($(el).val() ? parseInt($(el).val()) : 0);
    //   if ($(".s_mam_g").length - 1 == i) {
    //     if (s_mam_g != mamTotalG) {
    //       $(".s_mam_g").addClass('highlightInput');
    //       // alert('Value not allowed')
    //     } else {
    //       $(".s_mam_g").removeClass('highlightInput');
    //     }
    //   }
    // })

    // var s_mam_b = 0
    // $('.s_mam_b').each(function (i, el) {
    //   s_mam_b = s_mam_b + ($(el).val() ? parseInt($(el).val()) : 0);
    //   if ($(".s_mam_b").length - 1 == i) {
    //     if (s_mam_b != mamTotalB) {
    //       $(".s_mam_b").addClass('highlightInput');
    //       // alert('Value not allowed')
    //     } else {
    //       $(".s_mam_b").removeClass('highlightInput');
    //     }
    //   }
    // })



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

  // $('.secondSite').css('display', 'none')
  $('#ent_type').on('change', function () {
    if ($(this).val() == 'new') {
      $('.newscreen').attr('disabled', false)
      $('.rescreen').attr('disabled', true)
    } else {
      $('.newscreen').attr('disabled', true)
      $('.rescreen').attr('disabled', false)
    }
  })
  $('.rescreen').attr('disabled', true)

  var $table = $('#tablePreview');
  $table.floatThead({
    position: 'absolute',
    scrollContainer: true,
    responsiveContainer: function ($table) {
      return $table.closest('.table-responsive');
    }
  });

}