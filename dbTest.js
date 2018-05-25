var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "acf_mis_local.sqlite3"
  }
});

module.exports.test = function(cond, cb){
  knex('scr_report_final')
  .where({province_id: cond})
  .then(result=>{
    cb(null, result);
  })
  .catch(err=>{
    cb(err);
    console.log(err);
  })
}

module.exports.scrSummary= function (cond, callback) {
  console.log(cond)
  
  if (!cond) {
    knex('scr_report_final')
      .sum({
        tChildScrActive_M: 'tChildScrActive_M'
      })
      .sum({
        tChildScrActive_F: 'tChildScrActive_F'
      })
      .sum({
        tPlwScrActive_P: 'tPlwScrActive_P'
      })
      .sum({
        tPlwScrActive_L: 'tPlwScrActive_L'
      })
      .sum({
        tChildScrPassive_M: 'tChildScrPassive_M'
      })
      .sum({
        tChildScrPassive_F: 'tChildScrPassive_F'
      })
      .sum({
        tPlwScrPassive_P: 'tPlwScrPassive_P'
      })
      .sum({
        tPlwScrPassive_L: 'tPlwScrPassive_L'
      })
      .sum({
        ChildScrActive_M115: 'ChildScrActive_M115'
      })
      .sum({
        ChildScrActive_F115: 'ChildScrActive_F115'
      })
      .sum({
        ChildScrActive_M115124: 'ChildScrActive_M115124'
      })
      .sum({
        ChildScrActive_F115124: 'ChildScrActive_F115124'
      })
      .sum({
        PlwScrActive_P21: 'PlwScrActive_P21'
      })
      .sum({
        PlwScrActive_L21: 'PlwScrActive_L21'
      })
      .sum({
        ChildScrPassive_M115: 'ChildScrPassive_M115'
      })
      .sum({
        ChildScrPassive_F115: 'ChildScrPassive_F115'
      })
      .sum({
        ChildScrPassive_M115124: 'ChildScrPassive_M115124'
      })
      .sum({
        tChildScrPassive_F115124: 'tChildScrPassive_F115124'
      })
      .sum({
        PlwScrPassive_P21: 'PlwScrPassive_P21'
      })
      .sum({
        PlwScrPassive_L21: 'PlwScrPassive_L21'
      })
      .then(result => {
        // resp.json(result);
        callback(null, result);
      })
      .catch(err => {
        callback(err);
        // resp.json(err);
      })
  } else {
    knex('scr_report_final')
    .sum({
      tChildScrActive_M: 'tChildScrActive_M'
    })
    .sum({
      tChildScrActive_F: 'tChildScrActive_F'
    })
    .sum({
      tPlwScrActive_P: 'tPlwScrActive_P'
    })
    .sum({
      tPlwScrActive_L: 'tPlwScrActive_L'
    })
    .sum({
      tChildScrPassive_M: 'tChildScrPassive_M'
    })
    .sum({
      tChildScrPassive_F: 'tChildScrPassive_F'
    })
    .sum({
      tPlwScrPassive_P: 'tPlwScrPassive_P'
    })
    .sum({
      tPlwScrPassive_L: 'tPlwScrPassive_L'
    })
    .sum({
      ChildScrActive_M115: 'ChildScrActive_M115'
    })
    .sum({
      ChildScrActive_F115: 'ChildScrActive_F115'
    })
    .sum({
      ChildScrActive_M115124: 'ChildScrActive_M115124'
    })
    .sum({
      ChildScrActive_F115124: 'ChildScrActive_F115124'
    })
    .sum({
      PlwScrActive_P21: 'PlwScrActive_P21'
    })
    .sum({
      PlwScrActive_L21: 'PlwScrActive_L21'
    })
    .sum({
      ChildScrPassive_M115: 'ChildScrPassive_M115'
    })
    .sum({
      ChildScrPassive_F115: 'ChildScrPassive_F115'
    })
    .sum({
      ChildScrPassive_M115124: 'ChildScrPassive_M115124'
    })
    .sum({
      tChildScrPassive_F115124: 'tChildScrPassive_F115124'
    })
    .sum({
      PlwScrPassive_P21: 'PlwScrPassive_P21'
    })
    .sum({
      PlwScrPassive_L21: 'PlwScrPassive_L21'
    })
    .where((builder)=>{
      if(!cond.date){
        builder.where(cond);
      } else {
        var newCond = cond;
        var date;
        if(newCond.date){
          date = newCond.date;
          delete newCond.date;
        } 
        if(date && isEmpty(newCond)){
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
    })

  }
}

module.exports.scrPlw= function (cond, callback){
  console.log(cond)
  if(!cond){
    knex('v_screening')
      .where({is_plw: true})
      .then(result=>{
        callback(null, result);
      })
      .catch(err=>{
        callback(err);
      })
  } else {
    knex('v_screening')
      .where({is_plw: true})
      .where((builder)=>{
        if(!cond.date){
          builder.where(cond);
        } else {
          var newCond = cond;
          var date;
          if(newCond.date){
            date = newCond.date;
            delete newCond.date;
          } 
          if(date && isEmpty(newCond)){
            builder.whereBetween(date.x, date.y);
          } else {
            console.log(date);
            builder.where(newCond).whereBetween(date.x, date.y);
          }
        }
      })  
      .then(result=>{
        callback(null, result);
      })
      .catch(err=>{
        callback(err);
      })
    }
}

module.exports.scrChild= function (cond, callback){
  if(!cond){
    knex('v_screening')
      .where({is_plw: false})
      .then(result=>{
        callback(null, result);
      })
      .catch(err=>{
        callback(err);
      })
  } else {
    knex('v_screening')
    .where({is_plw: false})
    .where((builder)=>{
      if(!cond.date){
        builder.where(cond);
      } else {
        var newCond = cond;
        var date;
        if(newCond.date){
          date = newCond.date;
          delete newCond.date;
        } 
        if(date && isEmpty(newCond)){
          builder.whereBetween(date.x, date.y);
        } else {
          console.log(date);
          builder.where(newCond).whereBetween(date.x, date.y);
        }
      }
    })      
    .then(result=>{
      callback(null, result);
    })
    .catch(err=>{
      callback(err);
    })

}}

 function isEmpty (obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

module.exports.updScr = function(data, cb){
  knex('Screening')
  .where({screening_id:data.screening_id})
  .update(data)
  .then(res=>{
    if(res ===1){
     return knex('v_screening')
        .where({screening_id:data.screening_id})
    }
  })
  .then(result=>{
    cb(null, result)
  })
  .catch(err=>{
    cb(err);
  })
}
