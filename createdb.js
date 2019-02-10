const knex = require('./mainfunc/db');

// create tblGeoProvince
knex.schema.hasTable('tblGeoProvince').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblGeoProvince', function (table) {
      table.increments('id').primary();
      table.unique('id');
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
      table.increments('id').primary();
      table.unique('id');
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
      table.increments('id').primary();
      table.unique('id');
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
      table.increments('id').primary();
      table.unique('id');
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
      table.increments('id').primary();
      table.unique('id');
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
      table.unique('screening_id');
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
      // upload status
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

// create tblOtpAdd
knex.schema.hasTable('tblOtpAdd').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblOtpAdd', function (table) {
      table.increments('otp_id').primary().unique();
      table.integer('client_id');
      table.integer('site_id');
      table.string('site_village');
      table.date('reg_date');
      table.string('reg_id');
      table.string('p_name');
      table.string('f_or_h_name');
      table.integer('cnic');
      table.string('address');
      table.string('cnt_number');
      table.string('age');
      table.string('gender');
      table.string('plw_type');
      table.string('ent_reason');
      table.string('ref_type');
      table.string('oedema');
      table.integer('muac');
      table.integer('diarrhoea');
      table.integer('vomiting');
      table.integer('cough');
      table.string('appetite');
      table.string('daily_stool');
      table.integer('pass_urine');
      table.integer('b_Feeding');
      table.string('od_swol_time');
      table.integer('weight');
      table.string('ration1');
      table.integer('quantity1');
      table.string('ration2');
      table.integer('quantity2');
      table.string('ration3');
      table.integer('quantity3');
      table.string('prog_type');
      table.integer('upload_status');
      table.timestamps();
    });
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

// create tblVillage
knex.schema.hasTable('tblVillage').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblVillage', function (table) {
      table.increments('vill_id').primary();
      table.unique('vill_id');
      table.integer('site_id');
      table.string('village')
      table.timestamps();
    });
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

// create tblInterimOtp (iterim table for OTP follow up)
knex.schema.hasTable('tblInterimOtp').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblInterimOtp', function (table) {
      table.increments('interim_id').primary().unique();
      table.integer('otp_id');
      table.integer('client_id');
      table.integer('muac');
      table.integer('weight');
      table.string('ration1');
      table.integer('quantity1');
      table.string('ration2');
      table.integer('quantity2');
      table.string('ration3');
      table.integer('quantity3');
      table.string('prog_type')
      table.date('curr_date');
      table.string('status');
      table.date('next_followup');
      table.timestamps();
    });
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

// create tblOtpFollowup (iterim table for OTP follow up)
knex.schema.hasTable('tblOtpFollowup').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblOtpFollowup', function (table) {
      table.increments('followup_id').primary().unique();
      table.integer('otp_id');
      table.integer('client_id');
      table.integer('muac');
      table.integer('weight');
      table.string('ration1');
      table.integer('quantity1');
      table.string('ration2');
      table.integer('quantity2');
      table.string('ration3');
      table.integer('quantity3');
      table.string('prog_type')
      table.date('curr_date');
      table.string('status');
      table.integer('upload_status');
      table.date('next_followup');
      table.timestamps();
    });
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

// create tblOtpExit (iterim table for OTP follow up)
knex.schema.hasTable('tblOtpExit').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblOtpExit', function (table) {
      table.increments('exit_id').primary().unique();
      table.integer('otp_id');
      table.integer('client_id');
      table.integer('exit_muac');
      table.integer('exit_weight');
      table.string('exit_ration1');
      table.integer('exit_quantity1');
      table.string('exit_ration2');
      table.integer('exit_quantity2');
      table.string('exit_ration3');
      table.integer('exit_quantity3');
      table.string('exit_prog_type')
      table.date('exit_date');
      table.string('exit_reason');
      table.integer('upload_status');
      table.timestamps();
    });
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});



// create tblSessions (iterim table for OTP follow up)
knex.schema.hasTable('tblSessions').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblSessions', function (table) {
      table.increments('session_id').primary().unique();
      table.integer('site_id');
      table.string('client_id');
      table.date('session_date');
      table.string('session_type');
      table.string('participants');
      table.string('session_location');
      table.integer('upload_status');
      table.timestamps();
    });
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

// create tblSessions (iterim table for OTP follow up)
knex.schema.hasTable('tblSessions').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('tblSessions', function (table) {
      table.increments('session_id').primary().unique();
      table.integer('site_id');
      table.string('client_id');
      table.date('session_date');
      table.string('session_type');
      table.string('participants');
      table.string('session_location');
      table.integer('upload_status');
      table.timestamps();
    });
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

// create v_otpExit_knex (iterim table for OTP follow up)
knex.schema.hasTable('v_otpExit_knex').then(function (exists) {
  if (!exists) {
    return knex.raw(`create view v_otpExit_knex as
    SELECT 
           [v_geo].*, 
           [v_OtpExit].*
    FROM   [main].[v_geo]
           INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id]`)
  }
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

