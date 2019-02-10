
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('tblOtpFollowup', t=>{
      t.integer('upload_status').defaultTo(0).alter();
  })
  .alterTable('tblOtpExit', t=>{
    t.integer('upload_status').defaultTo(0).alter();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('tblOtpFollowup', t=>{
        t.integer('upload_status').alter();
    })
    .alterTable('tblOtpExit', t=>{
      t.integer('upload_status').alter();
    })
};
