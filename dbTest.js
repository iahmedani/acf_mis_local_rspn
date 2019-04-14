const knex = require('./mainfunc/db');

module.exports.test = function(cond, cb) {
  knex("scr_report_final")
    .where({
      province_id: cond
    })
    .then(result => {
      cb(null, result);
    })
    .catch(err => {
      cb(err);
      console.log(err);
    });
};
module.exports.knex = knex;
module.exports.scrSummary = function(cond, callback) {
  console.log(cond);

  if (!cond) {
    knex("scr_report_final")
      .sum({
        tChildScrActive_M: "tChildScrActive_M"
      })
      .sum({
        tChildScrActive_F: "tChildScrActive_F"
      })
      .sum({
        tPlwScrActive_P: "tPlwScrActive_P"
      })
      .sum({
        tPlwScrActive_L: "tPlwScrActive_L"
      })
      .sum({
        tChildScrPassive_M: "tChildScrPassive_M"
      })
      .sum({
        tChildScrPassive_F: "tChildScrPassive_F"
      })
      .sum({
        tPlwScrPassive_P: "tPlwScrPassive_P"
      })
      .sum({
        tPlwScrPassive_L: "tPlwScrPassive_L"
      })
      .sum({
        ChildScrActive_M115: "ChildScrActive_M115"
      })
      .sum({
        ChildScrActive_F115: "ChildScrActive_F115"
      })
      .sum({
        ChildScrActive_M115124: "ChildScrActive_M115124"
      })
      .sum({
        ChildScrActive_F115124: "ChildScrActive_F115124"
      })
      .sum({
        PlwScrActive_P21: "PlwScrActive_P21"
      })
      .sum({
        PlwScrActive_L21: "PlwScrActive_L21"
      })
      .sum({
        ChildScrPassive_M115: "ChildScrPassive_M115"
      })
      .sum({
        ChildScrPassive_F115: "ChildScrPassive_F115"
      })
      .sum({
        ChildScrPassive_M115124: "ChildScrPassive_M115124"
      })
      .sum({
        tChildScrPassive_F115124: "tChildScrPassive_F115124"
      })
      .sum({
        PlwScrPassive_P21: "PlwScrPassive_P21"
      })
      .sum({
        PlwScrPassive_L21: "PlwScrPassive_L21"
      })
      .then(result => {
        // resp.json(result);
        callback(null, result);
      })
      .catch(err => {
        callback(err);
        // resp.json(err);
      });
  } else {
    knex("scr_report_final")
      .sum({
        tChildScrActive_M: "tChildScrActive_M"
      })
      .sum({
        tChildScrActive_F: "tChildScrActive_F"
      })
      .sum({
        tPlwScrActive_P: "tPlwScrActive_P"
      })
      .sum({
        tPlwScrActive_L: "tPlwScrActive_L"
      })
      .sum({
        tChildScrPassive_M: "tChildScrPassive_M"
      })
      .sum({
        tChildScrPassive_F: "tChildScrPassive_F"
      })
      .sum({
        tPlwScrPassive_P: "tPlwScrPassive_P"
      })
      .sum({
        tPlwScrPassive_L: "tPlwScrPassive_L"
      })
      .sum({
        ChildScrActive_M115: "ChildScrActive_M115"
      })
      .sum({
        ChildScrActive_F115: "ChildScrActive_F115"
      })
      .sum({
        ChildScrActive_M115124: "ChildScrActive_M115124"
      })
      .sum({
        ChildScrActive_F115124: "ChildScrActive_F115124"
      })
      .sum({
        PlwScrActive_P21: "PlwScrActive_P21"
      })
      .sum({
        PlwScrActive_L21: "PlwScrActive_L21"
      })
      .sum({
        ChildScrPassive_M115: "ChildScrPassive_M115"
      })
      .sum({
        ChildScrPassive_F115: "ChildScrPassive_F115"
      })
      .sum({
        ChildScrPassive_M115124: "ChildScrPassive_M115124"
      })
      .sum({
        tChildScrPassive_F115124: "tChildScrPassive_F115124"
      })
      .sum({
        PlwScrPassive_P21: "PlwScrPassive_P21"
      })
      .sum({
        PlwScrPassive_L21: "PlwScrPassive_L21"
      })
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween(date.x, date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween(date.x, date.y);
          }
        }
      })
      .then(result => {
        // resp.json(result);
        callback(null, result);
      })
      .catch(err => {
        callback(err);
        // resp.json(err);
      });
  }
};

module.exports.scrPlw = function(cond, callback) {
  console.log(cond);
  if (!cond) {
    knex("v_screening")
      .where({
        is_plw: true
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex("v_screening")
      .where({
        is_plw: true
      })
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween(date.x, date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween(date.x, date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};

module.exports.scrChild = function(cond, callback) {
  if (!cond) {
    knex("v_screening")
      .where({
        is_plw: false
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex("v_screening")
      .where({
        is_plw: false
      })
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween(date.x, date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween(date.x, date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

module.exports.updScr = function(data, cb) {
  knex("Screening")
    .where({
      screening_id: data.screening_id
    })
    .update(data)
    .then(res => {
      if (res === 1) {
        return knex("v_screening").where({
          screening_id: data.screening_id
        });
      }
    })
    .then(result => {
      cb(null, result);
    })
    .catch(err => {
      cb(err);
    });
};

module.exports.otpAdd = function(cond, callback) {
  console.log(cond);
  knex("v_otpAddFull_report_v2")
    .sum({
      New_Addmision: "New_Addmision"
    })
    .sum({
      Relapse: "Relapse"
    })
    .sum({
      Def_SFP: "Def_SFP"
    })
    .sum({
      Def_OTP: "Def_OTP"
    })
    .sum({
      Abbondon: "Abbondon"
    })
    .sum({
      Pro_in_from_SC: "Pro_in_from_SC"
    })
    .sum({
      Trasfer_in_from_other_OTP: "Trasfer_in_from_other_OTP"
    })
    .sum({
      Transfer_in_from_SFP: "Transfer_in_from_SFP"
    })
    .sum({
      Other: "Other"
    })
    .sum({
      add_Total: "add_Total"
    })
    .groupBy(["age", "gender"])
    .where(builder => {
      if (!cond.date) {
        builder.where(cond);
      } else {
        var newCond = cond;
        var date;
        if (newCond.date) {
          date = newCond.date;
          delete newCond.date;
        }
        if (date && isEmpty(newCond)) {
          builder.whereBetween(date.x, date.y);
        } else {
          console.log(date);
          builder.where(newCond).whereBetween(date.x, date.y);
        }
      }
    })
    .then(result => {
      // resp.json(result);
      console.log(result);
      callback(null, result);
    })
    .catch(err => {
      callback(err);
      // resp.json(err);
    });
};

module.exports.otpExit = function(cond, callback) {
  console.log(cond);

  knex("v_otpExitFull_report")
    .sum({
      cured: "cured"
    })
    .sum({
      defaulter: "defaulter"
    })
    .sum({
      non_responder: "non_responder"
    })
    .sum({
      death: "death"
    })
    .sum({
      medical_transfer_SC: "medical_transfer_SC"
    })
    .sum({
      transfer_out_other_OTP: "transfer_out_other_OTP"
    })
    .sum({
      Other: "Other"
    })
    .sum({
      exit_total: "exit_total"
    })
    .groupBy(["age", "gender"])
    .where(builder => {
      if (!cond.date) {
        builder.where(cond);
      } else {
        var newCond = cond;
        var date;
        if (newCond.date) {
          date = newCond.date;
          delete newCond.date;
        }
        if (date && isEmpty(newCond)) {
          builder.whereBetween("exit_date", date.y);
        } else {
          console.log(date);
          builder.where(newCond).whereBetween("exit_date", date.y);
        }
      }
    })
    .then(result => {
      // resp.json(result);
      callback(null, result);
    })
    .catch(err => {
      callback(err);
      // resp.json(err);
    });
};

module.exports.otpAddTable = function(cond, callback) {
  console.log(cond);
  if (!cond) {
    knex("v_otpAdd_full")
      .where({ is_deleted: 0 })
      .whereNull('plw_type')
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex("v_otpAdd_full")
      // .whereRaw("muac < 11.5")
      .where({ is_deleted: 0 })
      .whereNull("plw_type")
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween("reg_date", date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween("reg_date", date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};

module.exports.otpExitTable = function(cond, callback) {
  if (!cond) {
    knex("v_otpExit_full")
      .whereNull('plw_type')
      .where({ is_deleted: 0 })     
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex("v_otpExit_full")
      .whereNull("plw_type")
      .where({ is_deleted: 0 })
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween("exit_date", date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween("exit_date", date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};
module.exports.allScrChildrenData = function(cond, callback) {
  if (!cond) {
    knex("v_ScrChildUpd")
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex("v_ScrChildUpd")
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween("screening_date", date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween("screening_date", date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};
module.exports.allScrPlwNewData = function(cond, callback) {
  if (!cond) {
    knex("v_ScrPlwUpd")
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex("v_ScrPlwUpd")
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween("screening_date", date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween("screening_date", date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};

module.exports.scrChildReport = function(cond, callback) {
  if (!cond) {
    knex
      .select(
        knex.raw(`SUM(total_scr_girls + total_scr_boys) as total_scr,
      SUM(new_boys + new_girls) as total_new,
      SUM(reScreened_boys + reScreened_girls) as total_reScreened,
      sum(normal_boys_623 + normal_girls_623) as total_normal_623,
      sum(mam_girls_623 + mam_boys_623) as total_mam_623,     
      sum(sam_without_comp_girls_623 + sam_without_comp_boys_623) as total_sam_without_comp_623,
      sum(sam_with_comp_girls_623 + sam_with_comp_boys_623) as total_sam_with_comp_623,
      sum(normal_boys_2459 + normal_girls_2459) as total_normal_2459,
      sum(mam_girls_2459 + mam_boys_2459) as total_mam_2459,
      sum(sam_without_comp_girls_2459 + sam_without_comp_boys_2459) as total_sam_without_comp_2459,
      sum(sam_with_comp_girls_2459 + sam_with_comp_boys_2459) as total_sam_with_comp_2459,
      sum(no_oedema_girls + no_oedema_boys) as total_no_oedema,
      sum(plus12_oedema_girls + plus12_oedema_boys) as total_plus12_oedema,
      sum(plus3_oedema_girls + plus3_oedema_boys) as total_plus3_oedema,
      sum(reffer_tsfp_girls + reffer_tsfp_boys) as total_tsfp,
      sum(reffer_otp_girls + reffer_otp_boys) as total_otp,
      sum(mnp_girls + mnp_boys) as total_mnp,
    sum(deworming_girls + deworming_boys) as total_deworming,
    sum(total_followup) as total_followup,
    sum(total_exits) as total_exits`)
      )
      .from("v_ScrChildUpd")
      .sum({
        total_scr_boys: "total_scr_boys"
      })
      .sum({
        new_boys: "new_boys"
      })
      .sum({
        reScreened_boys: "reScreened_boys"
      })
      .sum({
        normal_boys_623: "normal_boys_623"
      })
      .sum({
        mam_boys_623: "mam_boys_623"
      })
      .sum({
        sam_without_comp_boys_623: "sam_without_comp_boys_623"
      })
      .sum({
        sam_with_comp_boys_623: "sam_with_comp_boys_623"
      })
      .sum({
        normal_boys_2459: "normal_boys_2459"
      })
      .sum({
        mam_boys_2459: "mam_boys_2459"
      })
      .sum({
        sam_without_comp_boys_2459: "sam_without_comp_boys_2459"
      })
      .sum({
        sam_with_comp_boys_2459: "sam_with_comp_boys_2459"
      })
      .sum({
        no_oedema_boys: "no_oedema_boys"
      })
      .sum({
        plus12_oedema_boys: "plus12_oedema_boys"
      })
      .sum({
        plus3_oedema_boys: "plus3_oedema_boys"
      })
      .sum({
        reffer_tsfp_boys: "reffer_tsfp_boys"
      })
      .sum({
        reffer_otp_boys: "reffer_otp_boys"
      })
      .sum({
        mnp_boys: "mnp_boys"
      })
      .sum({
        mnp_girls: "mnp_girls"
      })
      // .sum({
      //   second_mnp_30_boys: "second_mnp_30_boys"
      // })
      // .sum({
      //   second_mnp_30_girls: "second_mnp_30_girls"
      // })
      // .sum({
      //   third_mnp_30_boys: "third_mnp_30_boys"
      // })
      // .sum({
      //   third_mnp_30_girls: "third_mnp_30_girls"
      // })
      // .sum({
      //   fourth_mnp_30_boys: "fourth_mnp_30_boys"
      // })
      // .sum({
      //   fourth_mnp_30_girls: "fourth_mnp_30_girls"
      // })
      // .sum({
      //   fifth_mnp_30_boys: "fifth_mnp_30_boys"
      // })
      // .sum({
      //   fifth_mnp_30_girls: "fifth_mnp_30_girls"
      // })
      // .sum({
      //   sixth_mnp_30_boys: "sixth_mnp_30_boys"
      // })
      // .sum({
      //   sixth_mnp_30_girls: "sixth_mnp_30_girls"
      // })
      .sum({
        total_scr_girls: "total_scr_girls"
      })
      .sum({
        new_girls: "new_girls"
      })
      .sum({
        reScreened_girls: "reScreened_girls"
      })
      .sum({
        normal_girls_623: "normal_girls_623"
      })
      .sum({
        mam_girls_623: "mam_girls_623"
      })
      .sum({
        sam_without_comp_girls_623: "sam_without_comp_girls_623"
      })
      .sum({
        sam_with_comp_girls_623: "sam_with_comp_girls_623"
      })
      .sum({
        normal_girls_2459: "normal_girls_2459"
      })
      .sum({
        mam_girls_2459: "mam_girls_2459"
      })
      .sum({
        sam_without_comp_girls_2459: "sam_without_comp_girls_2459"
      })
      .sum({
        sam_with_comp_girls_2459: "sam_with_comp_girls_2459"
      })
      .sum({
        no_oedema_girls: "no_oedema_girls"
      })
      .sum({
        plus12_oedema_girls: "plus12_oedema_girls"
      })
      .sum({
        plus3_oedema_girls: "plus3_oedema_girls"
      })
      .sum({
        reffer_tsfp_girls: "reffer_tsfp_girls"
      })
      .sum({
        reffer_otp_girls: "reffer_otp_girls"
      })
      .sum({
        deworming_boys: "deworming_boys"
      })
      .sum({
        deworming_girls: "deworming_girls"
      })
      // .sum({
      //   followedup_boys: "followedup_boys"
      // })
      // .sum({
      //   followedup_girls: "followedup_girls"
      // })
      // .sum({
      //   exits_boys: "exits_boys"
      // })
      // .sum({
      //   exits_girls: "exits_girls"
      // })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex
    .select(
      knex.raw(`SUM(total_scr_girls + total_scr_boys) as total_scr,
    SUM(new_boys + new_girls) as total_new,
    SUM(reScreened_boys + reScreened_girls) as total_reScreened,
    sum(normal_boys_623 + normal_girls_623) as total_normal_623,
    sum(mam_girls_623 + mam_boys_623) as total_mam_623,     
    sum(sam_without_comp_girls_623 + sam_without_comp_boys_623) as total_sam_without_comp_623,
    sum(sam_with_comp_girls_623 + sam_with_comp_boys_623) as total_sam_with_comp_623,
    sum(normal_boys_2459 + normal_girls_2459) as total_normal_2459,
    sum(mam_girls_2459 + mam_boys_2459) as total_mam_2459,
    sum(sam_without_comp_girls_2459 + sam_without_comp_boys_2459) as total_sam_without_comp_2459,
    sum(sam_with_comp_girls_2459 + sam_with_comp_boys_2459) as total_sam_with_comp_2459,
    sum(no_oedema_girls + no_oedema_boys) as total_no_oedema,
    sum(plus12_oedema_girls + plus12_oedema_boys) as total_plus12_oedema,
    sum(plus3_oedema_girls + plus3_oedema_boys) as total_plus3_oedema,
    sum(reffer_tsfp_girls + reffer_tsfp_boys) as total_tsfp,
    sum(reffer_otp_girls + reffer_otp_boys) as total_otp,
    sum(mnp_girls + mnp_boys) as total_mnp,
  sum(deworming_girls + deworming_boys) as total_deworming,
  sum(total_followup) as total_followup,
  sum(total_exits) as total_exits`)
    )
    .from("v_ScrChildUpd")
    .sum({
      total_scr_boys: "total_scr_boys"
    })
    .sum({
      new_boys: "new_boys"
    })
    .sum({
      reScreened_boys: "reScreened_boys"
    })
    .sum({
      normal_boys_623: "normal_boys_623"
    })
    .sum({
      mam_boys_623: "mam_boys_623"
    })
    .sum({
      sam_without_comp_boys_623: "sam_without_comp_boys_623"
    })
    .sum({
      sam_with_comp_boys_623: "sam_with_comp_boys_623"
    })
    .sum({
      normal_boys_2459: "normal_boys_2459"
    })
    .sum({
      mam_boys_2459: "mam_boys_2459"
    })
    .sum({
      sam_without_comp_boys_2459: "sam_without_comp_boys_2459"
    })
    .sum({
      sam_with_comp_boys_2459: "sam_with_comp_boys_2459"
    })
    .sum({
      no_oedema_boys: "no_oedema_boys"
    })
    .sum({
      plus12_oedema_boys: "plus12_oedema_boys"
    })
    .sum({
      plus3_oedema_boys: "plus3_oedema_boys"
    })
    .sum({
      reffer_tsfp_boys: "reffer_tsfp_boys"
    })
    .sum({
      reffer_otp_boys: "reffer_otp_boys"
    })
    .sum({
      mnp_boys: "mnp_boys"
    })
    .sum({
      mnp_girls: "mnp_girls"
    })
    // .sum({
    //   second_mnp_30_boys: "second_mnp_30_boys"
    // })
    // .sum({
    //   second_mnp_30_girls: "second_mnp_30_girls"
    // })
    // .sum({
    //   third_mnp_30_boys: "third_mnp_30_boys"
    // })
    // .sum({
    //   third_mnp_30_girls: "third_mnp_30_girls"
    // })
    // .sum({
    //   fourth_mnp_30_boys: "fourth_mnp_30_boys"
    // })
    // .sum({
    //   fourth_mnp_30_girls: "fourth_mnp_30_girls"
    // })
    // .sum({
    //   fifth_mnp_30_boys: "fifth_mnp_30_boys"
    // })
    // .sum({
    //   fifth_mnp_30_girls: "fifth_mnp_30_girls"
    // })
    // .sum({
    //   sixth_mnp_30_boys: "sixth_mnp_30_boys"
    // })
    // .sum({
    //   sixth_mnp_30_girls: "sixth_mnp_30_girls"
    // })
    .sum({
      total_scr_girls: "total_scr_girls"
    })
    .sum({
      new_girls: "new_girls"
    })
    .sum({
      reScreened_girls: "reScreened_girls"
    })
    .sum({
      normal_girls_623: "normal_girls_623"
    })
    .sum({
      mam_girls_623: "mam_girls_623"
    })
    .sum({
      sam_without_comp_girls_623: "sam_without_comp_girls_623"
    })
    .sum({
      sam_with_comp_girls_623: "sam_with_comp_girls_623"
    })
    .sum({
      normal_girls_2459: "normal_girls_2459"
    })
    .sum({
      mam_girls_2459: "mam_girls_2459"
    })
    .sum({
      sam_without_comp_girls_2459: "sam_without_comp_girls_2459"
    })
    .sum({
      sam_with_comp_girls_2459: "sam_with_comp_girls_2459"
    })
    .sum({
      no_oedema_girls: "no_oedema_girls"
    })
    .sum({
      plus12_oedema_girls: "plus12_oedema_girls"
    })
    .sum({
      plus3_oedema_girls: "plus3_oedema_girls"
    })
    .sum({
      reffer_tsfp_girls: "reffer_tsfp_girls"
    })
    .sum({
      reffer_otp_girls: "reffer_otp_girls"
    })
    .sum({
      deworming_boys: "deworming_boys"
    })
    .sum({
      deworming_girls: "deworming_girls"
    })
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween("report_month", date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween("report_month", date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};

module.exports.scrPlwNewReport = function(cond, callback) {
  if (!cond) {
    knex
      .select(knex.raw(`SUM(total_scr_pragnent + total_scr_lactating) as total_scr,
      Sum(new_scr_pragnent + new_scr_lactating) as total_new,
      Sum(reScreened_scr_pragnent + reScreened_scr_lactating) as total_reScreened,
      sum(muac_le_21_pragnent + muac_le_21_lactating) as total_muac_le_21,
      sum(muac_gt_21_pragnent + muac_gt_21_lactating) as total_muac_gt_21,
      sum(ifa_first_time_pragnent + ifa_first_time_lactating ) as total_ifa_first_time,
      sum(total_followup ) as total_followup,
      sum(total_exits) as total_exits`))
      .from("v_ScrPlwUpd")
      .sum({ total_scr_pragnent: "total_scr_pragnent" })
      .sum({ total_scr_lactating: "total_scr_lactating" })
      .sum({ new_scr_pragnent: "new_scr_pragnent" })
      .sum({ reScreened_scr_pragnent: "reScreened_scr_pragnent" })
      .sum({ new_scr_lactating: "new_scr_lactating" })
      .sum({ reScreened_scr_lactating: "reScreened_scr_lactating" })
      .sum({ ifa_first_time_pragnent: "ifa_first_time_pragnent" })
      .sum({ ifa_first_time_lactating: "ifa_first_time_lactating" })      
      .sum({ muac_gt_21_pragnent: "muac_gt_21_pragnent" })
      .sum({ muac_gt_21_lactating: "muac_gt_21_lactating" })
      .sum({ muac_le_21_pragnent: "muac_le_21_pragnent" })
      .sum({ muac_le_21_lactating: "muac_le_21_lactating" })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  } else {
    knex
    .select(knex.raw(`SUM(total_scr_pragnent + total_scr_lactating) as total_scr,
    Sum(new_scr_pragnent + new_scr_lactating) as total_new,
    Sum(reScreened_scr_pragnent + reScreened_scr_lactating) as total_reScreened,
    sum(muac_le_21_pragnent + muac_le_21_lactating) as total_muac_le_21,
    sum(muac_gt_21_pragnent + muac_gt_21_lactating) as total_muac_gt_21,
    sum(ifa_first_time_pragnent + ifa_first_time_lactating ) as total_ifa_first_time,
    sum(total_followup ) as total_followup,
    sum(total_exits) as total_exits`))
    .from("v_ScrPlwUpd")
    .sum({ total_scr_pragnent: "total_scr_pragnent" })
    .sum({ total_scr_lactating: "total_scr_lactating" })
    .sum({ new_scr_pragnent: "new_scr_pragnent" })
    .sum({ reScreened_scr_pragnent: "reScreened_scr_pragnent" })
    .sum({ new_scr_lactating: "new_scr_lactating" })
    .sum({ reScreened_scr_lactating: "reScreened_scr_lactating" })
    .sum({ ifa_first_time_pragnent: "ifa_first_time_pragnent" })
    .sum({ ifa_first_time_lactating: "ifa_first_time_lactating" })      
    .sum({ muac_gt_21_pragnent: "muac_gt_21_pragnent" })
    .sum({ muac_gt_21_lactating: "muac_gt_21_lactating" })
    .sum({ muac_le_21_pragnent: "muac_le_21_pragnent" })
    .sum({ muac_le_21_lactating: "muac_le_21_lactating" })
      .where(builder => {
        if (!cond.date) {
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if (newCond.date) {
            date = newCond.date;
            delete newCond.date;
          }
          if (date && isEmpty(newCond)) {
            builder.whereBetween("report_month", date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween("report_month", date.y);
          }
        }
      })
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err);
      });
  }
};

module.exports.AdmissionsReport = function(cond, callback) {
  knex("v_otpAddNewReport")
    .select(knex.raw(`count( case when ent_reason = 'no_prv_pro' then '' END ) as newAdmision,
  count( case when ent_reason = 'relapse' then '' END ) as 'Relapse',
  count( case when ent_reason = 'return_def' then '' END) as 'default',
  count( case when ent_reason = 'abb_inp' then '' END ) as 'Abbondon',
  count( case when ent_reason = 'promotion_in_from_sc' then '' END ) as 'Pro_in_from_SC',
  count( case when ent_reason = 'tranfer_in_other_otp' then '' END ) as 'Trasfer_in_from_other_OTP',
  count( case when ent_reason = 'tranfer_in_from_sfp' then '' END ) as 'Transfer_in_from_SFP',
  count( case when ent_reason = 'other' then '' END ) as 'Other',
  (case when age BETWEEN 6 AND 23  then 'range6to23' ELSE 'range24-59' END) as age`))
    .count({ totalAd: "otp_id" })
    .select("gender")
    .whereNull("plw_type")
    .where({ is_deleted: 0 })
    // .andWhereNotBetween("age", ["above59", "below_6"])
    .where(builder => {
      if (!cond.date) {
        builder.where(cond);
      } else {
        var newCond = cond;
        var date;
        if (newCond.date) {
          date = newCond.date;
          delete newCond.date;
        }
        if (date && isEmpty(newCond)) {
          builder.whereBetween("reg_date", date.y);
        } else {
          console.log(date);
          builder.where(newCond).whereBetween("reg_date", date.y);
        }
      }
    })
    .groupBy("gender", "age")
    .then(result => {
      callback(null, result);
    })
    .catch(e => {
      callback(e);
    });
};

module.exports.ExitReport = function(cond, callback) {
  knex("v_otpExitReportNew")
    .select({ eGender: "gender" })
    // .whereIn(kne)
    .select(knex.raw(`count( case when exit_reason = 'cured' then '' END ) as 'cured',
  count( case when exit_reason = 'death' then '' END ) as 'death',
  count( case when exit_reason = 'defaulter' then '' END ) as 'defaulter',
  count( case when exit_reason = 'non_responder' then '' END ) as 'non_responder',
  count( case when exit_reason = 'medical_transfer_sc' then '' END ) as 'medical_transfer_SC',
  count( case when exit_reason = 'transfer_out_to_other_otp' then '' END ) as 'transfer_out_other_OTP',
  count( case when exit_reason = 'other' then '' END ) as 'Other',
  (case when age BETWEEN 6 AND 23  then 'range6to23' ELSE 'range24-59' END) as eAge`))
    .count({ totalExit: "exit_id" })
    .whereNull("plw_type")
    .where({ is_deleted: 0 })
    .where(builder => {
      if (!cond.date) {
        builder.where(cond);
      } else {
        var newCond = cond;
        var date;
        if (newCond.date) {
          date = newCond.date;
          delete newCond.date;
        }
        if (date && isEmpty(newCond)) {
          builder.whereBetween("exit_date", date.y);
        } else {
          console.log(date);
          builder.where(newCond).whereBetween("exit_date", date.y);
        }
      }
    })
    .groupBy("gender", "age")
    .then(result => callback(null, result))
    .catch(e => callback(e));
};
