var uuid = require('uuid/v4');
module.exports.VillageList = function () {
  ipc.send("getProvince");
  ipc.on("province", function (evt, province) {
    $("#ddProvince")
      .children("option:not(:first)")
      .remove();
    prov(province);
  });
  $("#ddProvince").on("change", function () {
    var prov = $(this).val();
    ipc.send("getDistrict", prov);
    ipc.on("district", function (evt, district) {
      $("#ddDistrict")
        .children("option:not(:first)")
        .remove();

      dist(district);
    });
  });
  $("#ddDistrict").on("change", function () {
    var dist = $(this).val();
    ipc.send("getTehsil", dist);
    ipc.on("tehsil", function (evt, tehsil) {
      $("#ddTehsil")
        .children("option:not(:first)")
        .remove();

      teh(tehsil);
    });
  });
  $("#ddTehsil").on("change", function () {
    var tehs = $(this).val();
    ipc.send("getUC", tehs);
    ipc.on("uc", function (evt, uc) {
      $("#ddUC")
        .children("option:not(:first)")
        .remove();

      ucListener(uc);
    });
  });
  var ucForHH;
  $("#ddUC").on("change", function () {
    var ucs = $(this).val();
    ucForHH = ucs;
    ipc.send("getHealthHouse", ucs);
    ipc.on("hh", function (evt, hh) {
      $("#ddHealthHouse")
        .children("option:not(:first)")
        .remove();
      hhListener(hh);
    });
  });

  // $(() => {
  function _villageList(cb) {
    // return new Promise((resolve, reject) => {
    ipc.send("villagelist");
    ipc.on("villagelist", (evt, villages) => {
      // console.log(villages);
      // supervisors = data;
      ipc.send("geoList");
      ipc.on("geoList", (evt, data) => {
        // console.log(data);
        var _village = villages;
        var province = data.province;
        var district = data.district;
        var tehsil = data.tehsil;
        var uc = data.uc;
        var site = data.site;
        cb(null, {
          _village,
          province,
          district,
          tehsil,
          uc,
          site
        });
        ipc.removeAllListeners('geoList')
      });
      ipc.removeAllListeners('villagelist')
    });
    // })
  }

  function initVillageListGrid() {

    _villageList((x, result) => {
      // console.log(result);
      // console.log(result);
      var _supData = {
        loadData: function (filter) {
          return $.grep(result._village, function (client) {
            return (!filter.villageName || client.villageName.indexOf(filter.villageName) > -1) && (!filter.province || client.province == filter.province) && (!filter.district || client.district === filter.district) && (!filter.tehsil || client.tehsil === filter.tehsil) && (!filter.uc || client.uc === filter.uc) && (!filter.site || client.site === filter.site);
            // && (filter.Married === undefined || client.Married === filter.Married);
          });
        },

        insertItem: function (insertingClient) {
          // this.clients.push(insertingClient);
        },

        updateItem: function (updatingClient) {},

        deleteItem: function (deletingClient) {
          // var clientIndex = $.inArray(deletingClient, this.clients);
          // this.clients.splice(clientIndex, 1);
        }
      };
      if (!result.province.filter(el => el.id == 0).length > 0) {
        result.province.unshift({
          provinceName: '',
          id: 0
        })
        result.district.unshift({
          districtName: '',
          id: 0
        })
        result.tehsil.unshift({
          tehsilName: '',
          id: 0
        })
        result.uc.unshift({
          ucName: '',
          id: 0
        })
        result.site.unshift({
          siteName: '',
          id: 0
        })
      }
      $("#tblVillageList").jsGrid({
        height: "450px",
        width: "100%",
        // inserting: true,
        filtering: true,
        // editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 15,
        pageButtonCount: 5,
        controller: _supData,
        fields: [{
            name: "id",
            type: "number",
            visible: false
          },
          {
            title: "Province",
            name: "province",
            type: "select",
            items: result.province,
            valueField: "id",
            textField: "provinceName",
            width: 50
          },
          {
            title: "District",
            name: "district",
            type: "select",
            items: result.district,
            valueField: "id",
            textField: "districtName",
            width: 50
          },
          {
            title: "Tehsil",
            name: "tehsil",
            type: "select",
            items: result.tehsil,
            valueField: "id",
            textField: "tehsilName",
            width: 50
          },
          {
            title: "UC",
            name: "uc",
            type: "select",
            items: result.uc,
            valueField: "id",
            textField: "ucName",
            width: 50
          },
          {
            title: "Site",
            name: "site",
            type: "select",
            items: result.site,
            valueField: "id",
            textField: "siteName"
          },
          {
            title: "Village Name",
            name: "villageName",
            type: "text"
          },
          // {
          //   type: "control",
          //   modeSwitchButton: false,
          //   editButton: false,
          //   deleteButton: false
          // }
        ],
        rowClick: function (args) {
          var getData = args.item;
          $("#ddProvince").val(getData.province);
          $("#ddDistrict")
            .children("option:not(:first)")
            .remove();
          $("#ddDistrict").append(`<option value="${getData.district}" selected>${result.district.filter(el => el.id == getData.district)[0].districtName}</option>`);
          $("#ddTehsil")
            .children("option:not(:first)")
            .remove();
          $("#ddTehsil").append(`<option value="${getData.tehsil}" selected>${result.tehsil.filter(el => el.id == getData.tehsil)[0].tehsilName}</option>`);

          // $('#ddTehsil').val(getData.tehsil);
          $("#ddUC")
            .children("option:not(:first)")
            .remove();
          $("#ddUC").append(`<option value="${getData.uc}" selected>${result.uc.filter(el => el.id == getData.uc)[0].ucName}</option>`);
          $("#ddHealthHouse")
            .children("option:not(:first)")
            .remove();
          $("#ddHealthHouse").append(`<option value="${getData.site}" selected>${result.site.filter(el => el.id == getData.site)[0].siteName}</option>`);
          var getData = args.item;

          $("#villageName").val(getData.villageName);
          if (getData.is_deleted) {
            $('#is_deleted').prop('checked', true)
          } else {
            $('#is_deleted').prop('checked', false)

          }
          // $("#ddsite").val(item.siteName);
          // $("#staff_name").val(item.staff_name);
          $("#id").val(getData.id);
        },
        rowClass: function (item, itemIndex) {
          return (item.is_deleted) ? 'bg-red' : '';
        },
      });
    });
  }
  initVillageListGrid();
  // _kamran.then(result => {

  // })
  // });
  $("#btnSaveVillage").on("click", e => {
    // console.log(data);
    $("#villageForm").validate();
    if ($("#villageForm").valid()) {
      var villData = $("#villageForm").serializeFormJSON();
      // villData.id = uuid();
      villData.is_deleted = $('#is_deleted').prop('checked');
      // console.log(villData);
      // console.log({
      // is_deleted: $('#is_deleted').prop('checked')
      // })
      ipc.send("addVillage", villData);
      ipc.removeAllListeners("addVillage");
      $("#villageForm")
        .get(0)
        .reset();
      // $('input[type="number"]').attr("min", 0);
      $("#tblVillageList").jsGrid("destroy");
      initVillageListGrid();
      // $('input[type="number"]').attr("min", 0);
      $('#ddDistrict').children('option:not(:first)').remove();
      $('#ddTehsil').children('option:not(:first)').remove();
      $('#ddUC').children('option:not(:first)').remove();
      $("#ddHealthHouse").children("option:not(:first)").remove();
    }
    e.preventDefault();
  });
};