const knex = require('./mainfunc/db');

  
  // create tblGeoProvince
  knex.schema.hasTable('tblGeoProvince').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('tblGeoProvince', function (table) {
        table.increments();
        table.string('provinceName');
        table.timestamps();
      });
    }
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
  
  // create tblGeoDistrict
  knex.schema.hasTable('tblGeoDistrict').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('tblGeoDistrict', function (table) {
        table.increments();
        table.string('districtName');
        table.integer('province_id');
        table.timestamps();
      });
    }
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
  
  // create tblGeoTehsil
  knex.schema.hasTable('tblGeoTehsil').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('tblGeoTehsil', function (table) {
        table.increments();
        table.string('tehsilName');
        table.integer('district_id');
        table.timestamps();
      });
    }
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
  
  // create tblGeoUC
  knex.schema.hasTable('tblGeoUC').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('tblGeoUC', function (table) {
        table.increments();
        table.string('ucName');
        table.integer('tehsil_id');
        table.timestamps();
      });
    }
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
  
  // create tblGeoNutSite
  knex.schema.hasTable('tblGeoNutSite').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('tblGeoNutSite', function (table) {
        table.increments();
        table.string('siteName');
        table.integer('province_id');
        table.integer('district_id');
        table.integer('tehsil_id');
        table.integer('uc_id');
        table.integer('OTP');
        table.integer('SFP');
        table.integer('SC');
        table.timestamps();
      });
    }
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
  
  // create tblDemo
  knex.schema.hasTable('tblDemo').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('tblDemo', function (table) {
        table.increments();
        table.string('yourName');
        table.integer('client_id');      
      });
    }
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
  
  
  knex.schema.hasTable('Screening').then(function(exists){
    if (!exists){
      return knex.schema.createTable('Screening', function(table){
        table.increments('screening_id').primary();
        table.unique('client_scr_id', 'client_scr_id');
        table.integer('client_scr_id');
        table.integer('client_id');
        table.integer('screening_type');
        table.integer('screening_date');
        table.integer('data_entry_date');
        table.integer('site_id');
        table.integer('site_village');
        table.integer('staff_name');
        table.integer('name');
        table.integer('f_or_h_name');
        table.integer('address');
        table.integer('age');
        table.integer('gender');
        table.integer('muac');
        table.integer('oedema');
        table.integer('no_mm_sch');
        table.integer('deworming');
        table.integer('status');
        table.integer('is_plw');
        table.integer('plw_type');
        table.integer('no_mm_tabs');
      });
    }
  })
  .then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
  