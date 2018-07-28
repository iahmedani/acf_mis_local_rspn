module.exports.initDefaulterv2 = function(){
    ipc.send('data', 0);
      ipc.on('data',(e,data)=>{
        console.log(data);
        createTblCh(data.result, 'defaulter');
      })
    //   $('#addFilter').on('click', function(e){
    //     ipc.send('data', prepareQry());
    //     ipc.on('data',(e,data)=>{
    //     pushData(data.data);
    //   })
    // })

  function createTblCh(data, table){
      var header = Object.keys(data[0]);
      var html = '<tr>';
        header.forEach(el=>{
          html+= '<th>'+el+'</th>'
        })
        html+='</tr>'      
 
      data.forEach(el=>{
        html+= '<tr>'
        header.forEach(key=>{
            html+= '<td>'+el[key]+'</td>'          
          }
        )
        html +='</tr>'
      })
      console.log(html);
      $('#'+table).empty();
      $('#'+table).append(html);
  }
  
  /* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/*global Uint8Array, console */
/* exported export_xlsx */
/* eslint no-use-before-define:0 */
var XLSX = require('xlsx');
var electron = require('electron').remote;

var export_xlsx = (function() {
	// var HTMLOUT = document.getElementById('htmlout');
	var XTENSION = "xls|xlsx|xlsm|xlsb|xml|csv|txt|dif|sylk|slk|prn|ods|fods|htm|html".split("|")
	return function() {
    var workbook = XLSX.utils.book_new();
    var ws1 = XLSX.utils.table_to_sheet(document.getElementById('defaulter'));
XLSX.utils.book_append_sheet(workbook, ws1, "defaulter");

/* convert table 'table2' to worksheet named "Sheet2" */
// var ws2 = XLSX.utils.table_to_sheet(document.getElementById('tblChild'));
// XLSX.utils.book_append_sheet(workbook, ws2, "Child");
// var ws3 = XLSX.utils.table_to_sheet(document.getElementById('tblPlw'));
// XLSX.utils.book_append_sheet(workbook, ws3, "PLW");
		// var wb = XLSX.utils.table_to_book(HTMLOUT);
		var o = electron.dialog.showSaveDialog({
			title: 'Save file as',
			filters: [{
				name: "Spreadsheets",
				extensions: XTENSION
			}]
		});
		console.log(o);
		XLSX.writeFile(workbook, o);
		electron.dialog.showMessageBox({ message: "Exported data to " + o, buttons: ["OK"] });
	};
})();
void export_xlsx;


}