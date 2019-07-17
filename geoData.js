const knex = require('./mainfunc/db');

module.exports.provincev2 = (event)=>{
  knex('tblGeoProvince')
  .where({isActive: true})
  .then(result => {
    event.sender.send('province', ({
      province: result
    }));
    // console.log(event)
    // event.removeAllListeners('province');
  })
  .catch(err => {
    console.log(err);
  })
}
module.exports.commodityv2 = (event, prog_type) => {
  knex('tblCommodity')
    .where({prog_type})
    .then(result => {
      event.sender.send('commodity', ({
        commodity: result
      }));
      // console.log(event)
      // event.removeAllListeners('province');
    })
    .catch(err => {
      console.log(err);
    })
}
module.exports.commodity = (event)=>{
  knex('tblCommodity')
  .then(result => {
    event.sender.send('commodityAll', ({
      commodity: result
    }));
    // console.log(event)
    // event.removeAllListeners('province');
  })
  .catch(err => {
    console.log(err);
  })
}
module.exports.districtv2 = (province, event)=>{
  knex('tblGeoDistrict')
    .where({isActive: true})
    .where({
      province_id: province
    })
    .then(result => {
      event.sender.send('district', ({
        district: result
      }));
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports.tehsilv2 = (dist, event)=>{
  knex('tblGeoTehsil')
    .where({isActive: true})
    .where({
      district_id: dist
    })
    .then(result => {
      event.sender.send('tehsil', ({
        tehsil: result
      }));
    })
    .catch(err => {
      console.log(err);
    })
}
module.exports.ucv2 = (tehsil, event)=>{
  knex('tblGeoUC')
  .where({isActive: true})
  .where({
    tehsil_id: tehsil
  })
  .then(result => {
    event.sender.send('uc', ({
      uc: result
    }));
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports.healthHousev2 = (uc, event)=>{
  knex('tblGeoNutSite')
  .where({isActive: true})
  .where({
    uc_id: uc
  })
  .then(result => {
    event.sender.send('hh', ({
      hh: result
    }));
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports.healthHouseTypev2 = (h_id, event)=>{
  knex('tblGeoNutSite')
  .where({isActive: true})
  .where({
    id: h_id
  })
  .then(result => {
    event.sender.send('hhType', ({
      hh: result
    }));
  })
  .catch(err => {
    console.log(err);
  })
}


module.exports.province = (winName)=>{
  knex('tblGeoProvince')
  .then(result => {
    winName.webContents.send('province', ({
      province: result
    }));
  })
  .catch(err => {
    console.log(err);
  })
}
module.exports.district = (province, winName)=>{
  knex('tblGeoDistrict')
    .where({
      province_id: province
    })
    .then(result => {
      winName.webContents.send('district', ({
        district: result
      }));
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports.tehsil = (dist, winName)=>{
  knex('tblGeoTehsil')
    .where({
      district_id: dist
    })
    .then(result => {
      winName.webContents.send('tehsil', ({
        tehsil: result
      }));
    })
    .catch(err => {
      console.log(err);
    })
}
module.exports.uc = (tehsil, winName)=>{
  knex('tblGeoUC')
  .where({
    tehsil_id: tehsil
  })
  .then(result => {
    winName.webContents.send('uc', ({
      uc: result
    }));
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports.healthHouse = (uc, winName)=>{
  knex('tblGeoNutSite')
  .where({
    uc_id: uc
  })
  .then(result => {
    winName.webContents.send('hh', ({
      hh: result
    }));
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports.healthHouseType = (h_id, winName)=>{
  knex('tblGeoNutSite')
  .where({
    id: h_id
  })
  .then(result => {
    winName.webContents.send('hhType', ({
      hh: result
    }));
  })
  .catch(err => {
    console.log(err);
  })
}
