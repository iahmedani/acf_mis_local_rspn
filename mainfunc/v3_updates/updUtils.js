

const updateDatabase = async function (knex,x) {
    var y = x.split(';');
    //   try {
          
            for (one of y){
                if(one.length > 1){
                    await knex.raw(one)
                    console.log(one.substring(0,30))
                }

            }
            // process.exit();
    //   } catch (error) {
    //       console.log({msg:'sqlError',error})
          
    //   }
    

  }

  module.exports = updateDatabase