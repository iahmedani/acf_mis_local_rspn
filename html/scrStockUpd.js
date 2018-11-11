module.exports.ScrStockUpd = function () {
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

  function _scrStockList(cb) {
    // return new Promise((resolve, reject) => {
    ipc.send("scrstocklist");
    ipc.on("scrstocklist", (evt, scrStocks) => {
      console.log(scrStocks);
      // supervisors = data;
      ipc.send("geoList");
      ipc.on("geoList", (evt, data) => {
        console.log(data);
        var _scrStocks = scrStocks;
        var province = data.province;
        var district = data.district;
        var tehsil = data.tehsil;
        var uc = data.uc;
        var site = data.site;
        cb(null, { _scrStocks, province, district, tehsil, uc, site });
      });
    });
    // })
  }
  _scrStockList((x, result) => {
    // console.log(result);
    console.log(result);
    var _supData = {
      loadData: function (filter) {
        return $.grep(result._scrStocks, function(client) {
          return (!filter.villageName || client.villageName.indexOf(filter.villageName) > -1) && (!filter.provinceName || client.provinceName.indexOf(filter.provinceName) > -1) && (!filter.districtName || client.districtName === filter.districtName) && (!filter.tehsilName || client.tehsilName === filter.tehsilName) && (!filter.ucName || client.ucName === filter.ucName) && (!filter.siteName || client.siteName === filter.siteName);
          // && (filter.Married === undefined || client.Married === filter.Married);
        });
      },

      insertItem: function (insertingClient) {
        // this.clients.push(insertingClient);
      },

      updateItem: function (updatingClient) { },

      deleteItem: function (deletingClient) {
        // var clientIndex = $.inArray(deletingClient, this.clients);
        // this.clients.splice(clientIndex, 1);
      }
    };
    if (!result.province.filter(el => el.id == 0).length > 0) {
      result.province.unshift({ provinceName: '', id: 0 })
      result.district.unshift({ districtName: '', id: 0 })
      result.tehsil.unshift({ tehsilName: '', id: 0 })
      result.uc.unshift({ ucName: '', id: 0 })
      result.site.unshift({ siteName: '', id: 0 })
    }
    $("#tblVillageList").jsGrid({
      height: "400px",
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
      fields: [
        { name: "id", type: "number", visible: false },
        {
          title: "Province",
          name: "provinceName",
          type: "select",
          items: result.province,
          valueField: "id",
          textField: "provinceName",
          width: 50
        },
        {
          title: "District",
          name: "districtName",
          type: "select",
          items: result.district,
          valueField: "id",
          textField: "districtName",
          width: 50
        },
        {
          title: "Tehsil",
          name: "tehsilName",
          type: "select",
          items: result.tehsil,
          valueField: "id",
          textField: "tehsilName",
          width: 50
        },
        {
          title: "UC",
          name: "ucName",
          type: "select",
          items: result.uc,
          valueField: "id",
          textField: "ucName",
          width: 50
        },
        {
          title: "Site",
          name: "siteName",
          type: "select",
          items: result.site,
          valueField: "id",
          textField: "siteName"
        },
        { title: "Village Name", name: "villageName", type: "text" },
        {
          type: "control",
          modeSwitchButton: false,
          editButton: false,
          deleteButton: false
        }
      ],
      rowClick: function (args) {
        var getData = args.item;
        $("#ddProvince").val(item.provinceName);
        $("#ddDistrict").val(item.districtName);
        $("#ddTehsil").val(item.tehsilName);
        $("#ddUC").val(item.ucName);
        $("#villageName").val(item.villageName);
        $("#ddsite").val(item.siteName);
        // $("#staff_name").val(item.staff_name);
        $("#id").val(item.id);
      }
    });
  });

}