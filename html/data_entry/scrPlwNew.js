let fs = require('fs')
var uuid = require('uuid/v4');

module.exports.initScrPlwNew = function () {
  const {
    client,
    mac
  } = JSON.parse(
    fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
  );
  $(() => {
    $('input[type="number"]').attr('min', 0);
    var p = $('.p')
    var l = $('.l')
    var plw = $('.plw')
    var pt = $('#total_scr_pragnent')
    var lt = $('#total_scr_lactating')
    var plwt = $('#total_scr_plw')

    p.change(() => {
      var total = 0;
      p.each(function () {
        total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val())
        pt.val(total);
      })
    })
    l.change(() => {
      var total = 0;
      l.each(function () {
        total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val())


        lt.val(total);
      })
    })
    plw.change(() => {
      var total = 0;
      plw.each(function () {
        total += isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val())


        plwt.val(total);
      })
    })

  })

  function totalCheck() {
    var pt = $('#total_scr_pragnent')
    var lt = $('#total_scr_lactating')
    var plwlt = $('#total_scr_plw')
    var p1 = $('.p1')
    var l1 = $('.l1')
    var plw1 = $('.plw1')
    var ltotal = parseInt(lt.val());
    var ptotal = parseInt(pt.val());
    var plwtotal = parseInt(plwlt.val());
    var p1Val = 0;
    var l1Val = 0;
    var plw1Val = 0;
    p1.each(function () {
      p1Val += ($(this).val()) ? parseInt($(this).val()) : 0;
    })
    l1.each(function () {
      l1Val += ($(this).val()) ? parseInt($(this).val()) : 0;
    })
    plw1.each(function () {
      plw1Val += ($(this).val()) ? parseInt($(this).val()) : 0;
    })
    if (ltotal != l1Val) {
      l1.addClass('highlightInput')
    } else {
      l1.removeClass('highlightInput')
    }
    if (ptotal != p1Val) {
      p1.addClass('highlightInput')
    } else {
      p1.removeClass('highlightInput')
    }
    if (plwtotal != plw1Val) {
      plw1.addClass('highlightInput')
    } else {
      plw1.removeClass('highlightInput')
    }
  }
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
      // ipc.send('getHealthHouse', ucs )
      // ipc.on('hh', function(evt, hh){
      //   $('#ddHealthHouse').children('option:not(:first)').remove();
      // hhListener(hh);
      // })
    })
    // $("#ddHealthHouse").on("change", function () {
    //   var siteId = $(this).val();
    //   // ucForHH = ucs;
    //   ipc.send("getStaff", siteId);
    //   ipc.send("getSups", siteId);

    //   ipc.on("haveStaff", function (evt, staffs) {
    //     $("#ddStaff_code")
    //       .children("option:not(:first)")
    //       .remove();
    //     staffListener(staffs);
    //   });
    //   ipc.on("haveSups", function (evt, _sups) {
    //     $("#ddSup_code")
    //       .children("option:not(:first)")
    //       .remove();
    //     supListener(_sups);
    //   });
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
  })
  $('#submitScrPlwNew').on('click', (e) => {
    e.preventDefault();
    // console.log(data);
    $('#scrPlwNewForm').validate();
    totalCheck();
    if ($('#scrPlwNewForm').valid() && $('.highlightInput').length == 0) {
      var scrPlwNewData = $('#scrPlwNewForm').serializeFormJSON();
      scrPlwNewData.plw_scr_id = uuid();
      var appConfig = JSON.parse(window.sessionStorage.getItem('config'));
      scrPlwNewData.org_name = appConfig.org_name;
      // console.log(scrPlwNewData);
      scrPlwNewData.sup_name = $("#ddSup_name option:selected").text();
      scrPlwNewData.staff_name = $("#ddStaff_name option:selected").text();
      scrPlwNewData.client_id = client
      ipc.send('scrPlwNewAdd', scrPlwNewData);
      ipc.removeAllListeners('scrPlwNewAdd');
      // $('#scrPlwNewForm').get(0).reset();
      $('.clr').val("");
      $('.cld').val("");
      $('input[type="number"]').attr('min', 0);
    }
  })
  $('#resetScrChildForm').on('click', () => {
    $('#scrChildrenForm').get(0).reset();
  })

  // $('#ent_type').on('change', function () {
  //   if ($(this).val() == 'new') {
  //     $('.newscreen').attr('disabled', false)
  //     $('.rescreen').attr('disabled', true)
  //   } else {
  //     $('.newscreen').attr('disabled', true)
  //     $('.rescreen').attr('disabled', false)
  //   }
  // })
  // $('.rescreen').attr('disabled', true)
}