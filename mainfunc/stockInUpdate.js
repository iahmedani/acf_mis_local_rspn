module.exports = (ipcMain, knex, fs, sndMsg, async) => {
  ipcMain.on('getStockInNotUsed', (event)=>{
    knex('tblSiteStock')
      .select('stock_release_date')
      .limit(1)
      .where('is_deleted', 0)
      .orderBy('stock_release_date', 'desc')
      .then(result=>{
        console.log(result)
        return knex('tblStock')
        .select('dn_number', 'dn_date')
        .sum({total_recieved: 'rec_qty'})        
        .where((builder)=>{
          if(result.length){
            builder.where('dn_date', '>', result[0].stock_release_date)
          }
        })
        .groupBy('dn_number', 'dn_date')
      })
      .then(result=>{
        console.log(result)
        event.returnValue = result
      })
      .catch(e=>{
        sndMsg.errMsg(event, '', 'Unable to send list')
      })
    
  })
  ipcMain.on('getStockInReportForUpdate', (event, data)=>{
    // console.log(data)
    knex('tblStock')
      .where('dn_number', data)
      .then(result=>{
        // console.log(result)
        event.returnValue = result
      })
      .catch(e=>{
        sndMsg.errMsg(event, '', `Unable to fetch Stock In with DN Number ${data}`)
      })
  })
  ipcMain.on('updateStockInItem', (event, data)=>{
    data.upload_status = 2;
    knex('tblStock')
      .where('id', data.id)
      .update(data)
      .then(result=>{
        return knex('tblStock')        
        .where('id', result)
      })
      .then(result=>{
        // console.log(result)
        
        event.returnValue = result[0]
      })
      .catch(e=>{
        sndMsg.errMsg(event, '', `Unable to update that record`)
      })

  })
  ipcMain.on('deleletStockInItem', (event,data)=>{
    knex('tblStock')
      .where('id', data)
      .del()
      .then(result=>{
        event.returnValue = true
      })
      .catch(e=>{
        console.log(e)
        event.returnValue = false;
        sndMsg.errMsg(event, '', `Unable to delete that record`)

      })
  })
};
