
exports.up = function(knex, Promise) {
  return knex.schema.hasColumn('tblSessions', 'prog_type')
    .then(exists=>{
        if(!exists){
            return knex.schema.alterTable('tblSessions', t=>{
                t.string('prog_type', 10);
            })
        }else{
            return
        }
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('tblSessions', t=>{
      t.dropColumn('prog_type')
  })
};
