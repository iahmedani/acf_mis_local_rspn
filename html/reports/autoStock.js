module.exports.autoStock = function () { 

  const nodemailer = require('nodemailer');
  const uuid = require('uuidv4');
  (function ($) {
    $.fn.serializeFormJSON = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || "");
        } else {
          o[this.name] = this.value || "";
        }
      });
      return o;
    };
  })(jQuery);

  ipc.send('stocks')
  ipc.on('stocks', (e, stocks) => {
    // console.table(stocks)
    // var ration = $.uniqueSort(stocks.map(el => el.ration));
    var test = [];
    var rem = {};
    var previous = {};
    var dist = {}
    var rec = {}
    stocks.forEach((el, i) => {
      if (i == 0) {        
        rem[el.item] = el.recQty - el.dist_qty;
        previous[el.item] = (el.dist_qty + rem[el.item]) - el.recQty;
      } else if (Object.keys(rem)[Object.keys(rem).indexOf(el.item)] == el.item) {
        rem[el.item] = (el.recQty + rem[el.item]) - el.dist_qty;
        previous[el.item] = (el.dist_qty + rem[el.item]) - el.recQty;
      } else {
        rem[el.item] = el.recQty - el.dist_qty;
        previous[el.item] = (el.dist_qty + rem[el.item]) - el.recQty;
      }
      dist[el.item] = (isNaN(dist[el.item]) ? 0 : dist[el.item]) + el.dist_qty;
      rec[el.item] = (isNaN(rec[el.item]) ? 0 : rec[el.item]) + el.recQty;
      el.totalDist = dist[el.item];
      el.totalRec = rec[el.item];
      el.remaining = rem[el.item];
      el.prev = previous[el.item];
      test.push(el);
      if (test.length == stocks.length) {
        // console.table(test);
        // console.log(dist)
        // console.log(rec)
        
        var avgItems = $.uniqueSort(test.map(el => el.item));
        var avg = [];
        avgItems.forEach((avgRow, w) => {
          var rr =  {
            item : avgRow,
            months: test.filter(f => f.item == avgRow).length
          }
          var dists = 0;
          var recs = 0;
          var id = 0;
          test.forEach((avgRowChild, q) => {
            if (avgRowChild.item == avgRow) {
              dists += avgRowChild.dist_qty;
              recs += avgRowChild.recQty;
              rr._id = id;
            }
            id++;
            if (test.length - 1 == q) {
              rr.dist = dists;
              rr.rec = recs;
              rr._avg = parseFloat((dists / rr.months).toFixed(2))
              rr.precent = parseFloat((((recs - dists) / recs) * 100).toFixed(2))
              rr.nextReq = (rr.precent <= 25) ? parseFloat((rr._avg * 3) + (rr._avg * 0.15).toFixed(2)) : 0;
              avg.push(rr);
            }
          })
          if (avgItems.length - 1 == w) {
            // console.log(avg)
            // $(() => {
            // console.table(avg)
            var newReq = avg.filter(_el => _el.precent <= 25);
            // console.log({msg:'New Req', els: newReq.length})
            if (newReq.length > 0) {
              $('#btnStockRequest').attr("hidden",true)
            }
            $(() => {
              if ($.fn.DataTable.isDataTable("#example")) {
                $("#example")
                  .DataTable()
                  .clear()
                  .destroy();
              }
              if ($.fn.DataTable.isDataTable("#avgs")) {
                $("#avgs")
                  .DataTable()
                  .clear()
                  .destroy();
              }
              if ($.fn.DataTable.isDataTable("#reqTable")) {
                $("#reqTable")
                  .DataTable()
                  .clear()
                  .destroy();
              }


              $('#example').DataTable({
                data: test,
                dom: 'Bfrtip',
                buttons: [
                  'copy', { extend:'csv', title:`Stock Movement Report_${Date.now()}`}, {extend:'excel', title:`Stock Movement Report_${Date.now()}`}
                ],
                columns: [
                  { title: "Year", data: 'year' },
                  { title: "Month", data: 'month' },
                  { title: "Item", data: 'item' },
                  { title: "Opening", data: 'prev' },
                  { title: "Recieved", data: 'recQty' },
                  { title: "Distributed", data: 'dist_qty' },
                  { title: "Remaining", data: 'remaining' }
                ]
              });
              $('#avgs').DataTable({
                data: avg,
                columns: [
                  { title: "Item", data: 'item' },
                  { title: "Average Monthly Consumption (AMC)", data: '_avg' },
                  { title: "Stock Available %", data: 'precent' },
                  { title: 'Next Request', data: 'nextReq'}
                ]
                // })
              })
              var _reqTable =  $('#reqTable').DataTable({
                data: newReq,
                columns: [
                  {data: '_id' },
                  { data: 'item' },
                  {data:'nextReq'}
                  
                ],
                'columnDefs': [
                  {
                    'targets': 0,
                    'checkboxes': {
                      'selectRow': true
                    }
                  }
                ],
                'select': {
                  'style': 'multi'
                },
                'order': [[1, 'asc']]
              })
              $('#avgs td:nth-child(3)').filter(function () {
                return $(this).text() <= 25
              }).addClass('bg-danger');
              $('#avgs td:nth-child(3)').filter(function () {
                return $(this).text() > 25 && $(this).text() <= 40
              }).addClass('bg-warning');
              $('#avgs td:nth-child(3)').filter(function () {
                return $(this).text() > 40
              }).addClass('bg-success');

              // Handle form submission event 
              $('#stockReqForm').on('submit', function (e) {
                var form = this;
                // var table = $('#reqTable');

                var rows_selected = _reqTable.column(0).checkboxes.selected();

                // Iterate over all selected checkboxes
                $.each(rows_selected, function (index, rowId) {
                  // Create a hidden element 
                  $(form).append(
                    $('<input>')
                      .attr('type', 'hidden')
                      .attr('name', 'id[]')
                      .val(rowId)
                  );
                });
                $('#req_date').val(new Date().toISOString().split('T')[0]);
                // FOR DEMONSTRATION ONLY
                // The code below is not needed in production

                // Output form data to a console     
                $('#example-console-rows').text(rows_selected.join(","));

                // Output form data to a console     
                $('#example-console-form').text($(form).serialize());
                var _reqItemsId = rows_selected.join(",").split(',')
                console.log(_reqItemsId);
                var _formData = $(form).serializeFormJSON()
                console.log(_formData);
                
                var _reqItems = new Array;
                _reqItemsId.forEach(_reqItem => {
                  _reqItems.push(newReq.filter(_pl => _pl._id == _reqItem)[0]);
                  if (_reqItemsId.length == _reqItems.length) {
                    var _addReqToDB = {
                      req_date: _formData.req_date,
                      req_district: _formData.req_district,
                      req_email: _formData.req_email,
                      req_sender: _formData.req_sender,
                      req_data: JSON.stringify(_reqItems),
                      req_id: uuid()
                    }
                    console.log(_reqItems);
                    var html = `<style>tr, th, td { border: 1px black solid;} table {border-collapse: collapse;}</style><p>Dear ACF Team, </p> <p>You are hereby requested to dispatch commodities as per following table</p><table><tr><th>Item</th><th>Quantity</th></tr>`;
                    _reqItems.forEach(_itemList => {
                      html += `<tr><td>${_itemList.item}</td><td>${_itemList.nextReq}</td></tr>`
                    })
                    html += `</table><p><b>Dispatch Location</b></p><p>District: ${_addReqToDB.req_district},</p><p>Requested By: ${_addReqToDB.req_sender},</p><p>Requester's Email: ${_addReqToDB.req_email},</p><p>Request Date: ${_addReqToDB.req_date},</p><p>Request Id: ${_addReqToDB.req_id}</p>`;
                    var transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'pm.pins2.dadu@gmail.com',
                        pass: 'pmpins2dadu'
                      }
                    });

                    const mailOptions = {
                      from: 'PM PINS2 Dadu', // sender address
                      to: 'imm.pk@acf-international.org; shumaila.db@gmail.com',
                      cc: _addReqToDB.req_email,
                      // cc: 'logco.pk@acf-international.org; dcd.pk@acf-international.org', // list of receivers
                      subject: 'Stock Request', // Subject line
                      html: html, // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        console.log('ERROR!\n\n' + error);
                        return;
                      } else {
                        console.log('email sent')
                        ipc.send('enterRequest', _addReqToDB);
                        setTimeout(location.reload(), 1500);
                      }
                    });
                  }
                })
                
                // location.reload()
                
                // Remove added elements
                $('input[name="id\[\]"]', form).remove();

                // Prevent actual form submission
                e.preventDefault();
              });   

            })

            
            // var stockNeeded = avgItems.filter(el => el.precent < )
          }
        })
       
      }
    })
    ipc.removeAllListeners('stocks')
  })
}