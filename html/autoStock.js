module.exports.autoStock = function () {
  var amc_actual
  ipc.send('rusfStock')
  ipc.on('rusfStock', (e, data) => {
    var colName = ['year','month','commodity','stock_in','distribution','remaining']
    var totalStock = data.stockIn[0].rec_qty;
    var rem = totalStock;
    var html = ""
    var totalDist = 0
    data.dist.forEach((el, i) => {
      html += '<tr>'
      colName.forEach(x => {
        if (el[x]) {
          html+='<td>'+el[x]+'</td>'
        } else if (x == 'stock_in') {
          
          html+='<td>' + rem + '</td>'
        } else {
          html += '<td>' + (rem - el.distribution) + '</td>'
          totalDist += el.distribution;
          rem = rem - el.distribution;
        }
      })
      html += '</tr>'
      
    });
    $('#stockTab').append(html)
    var amc_val = amc_actual = (totalDist / data.dist.length)
    var stock_val = (rem / totalStock) * 100
    $('#amc_val').text(amc_val.toFixed(2))
    $('#stock_val').text(stock_val.toFixed(2))
    if (stock_val.toFixed(2) <= 25) {
      $('#stock_val').addClass('bg-danger')
      $('#reqBtn').attr('hidden', false);
      
    } else if (stock_val.toFixed(2) > 25 && stock_val.toFixed(2) <=40 ) {
      $('#stock_val').addClass('bg-warning')
    } else {
      $('#stock_val').addClass('bg-success')

    }
  })
  $('#reqBtn').on('click', (e) => {
    var req_val = ((amc_actual * 3) + (amc_actual * 0.15)).toFixed(2)
    var html = `<style>tr th td { border=0px solid black}</style><p>Dear ACF Team, </p> <p>You are hereby requested to dispatch commodities as per following table</p>
      <table ><tr ><th>Commodity</th><th>Qty</th></tr><tr><td>RUTF Sachets</td><td>${req_val}</td></tr></table><p>Regards, </p>`
    const nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pm.pins2.dadu@gmail.com',
        pass: 'pmpins2dadu'
      }
    });

    const mailOptions = {
      from: 'PM PINS2 Dadu', // sender address
      to: 'shumaila.db@gmail.com', // list of receivers
      subject: 'Stock Request', // Subject line
      html: html, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('ERROR!\n\n' + error);
        return;
      } else {
        console.log('email sent')
      }
    });
  })
}