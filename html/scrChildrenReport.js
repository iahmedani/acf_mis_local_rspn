module.exports.initScrChildrenReport= function(){
  $(function () {
    // var datePickerId_end = document.getElementById('end_date');
    // datePickerId_end.max = new Date().toISOString().split("T")[0];
    // var datePickerId_start = document.getElementById('start_date');
    // datePickerId_start.min = new Date(2018,07,01).toISOString().split("T")[0];

    $('#ddInterval').on('change', function () {
      var value = $(this).val();
      console.log(value);
      if (value == 1) {
        $('#start_date').attr('disabled', false);
        $('#end_date').attr('disabled', false);
      } else {
        $('#start_date').attr('disabled', true);
        $('#end_date').attr('disabled', true);
      }
    })

    ipc.send('getProvince');
    ipc.on('province', function(evt, province){
      $('#ddProvince').children('option:not(:first)').remove();   
      prov(province);
      })
      $('#ddProvince').on('change', function(){
        var prov = $(this).val();
        ipc.send('getDistrict', prov )
        ipc.on('district', function(evt, district){
          $('#ddDistrict').children('option:not(:first)').remove();

        dist(district);
        })
      })
      $('#ddDistrict').on('change', function(){
        var dist = $(this).val();
        ipc.send('getTehsil', dist )
        ipc.on('tehsil', function(evt, tehsil){
          $('#ddTehsil').children('option:not(:first)').remove();
  
        teh(tehsil);
        })
      })
      $('#ddTehsil').on('change', function(){
        var tehs = $(this).val();
        ipc.send('getUC', tehs )
        ipc.on('uc', function(evt, uc){
          $('#ddUC').children('option:not(:first)').remove();
        
        ucListener(uc);
        })
      })
      var ucForHH;
      $('#ddUC').on('change', function(){
        var ucs = $(this).val();
        ucForHH = ucs
        ipc.send('getHealthHouse', ucs )
        ipc.on('hh', function(evt, hh){
          $('#ddHealthHouse').children('option:not(:first)').remove();
        hhListener(hh);
        })
      })
  });
  function prepareQry() {
    var qry = {};
    ($('#ddProvince').val()) ? qry.province_id = $('#ddProvince').val(): '';
    ($('#ddDistrict').val()) ? qry.district_id = $('#ddDistrict').val(): '';
    ($('#ddTehsil').val()) ? qry.tehsil_id = $('#ddTehsil').val(): '';
    ($('#ddUC').val()) ? qry.uc_id = $('#ddUC').val(): '';
    ($('#ddInterval').val() == 1) ? qry.date = {
      x: 'screening_date',
      y: [$('#start_date').val(), $('#end_date').val()]
    }: '';
    console.log(qry);
    return qry;
  }
  $(function () {
    function putSummaryDataToTable(table, array) {
      $(`#${table} td`).each(function () {
        $(this).empty();
      })
      var keys = Object.keys(array[0]);
      keys.forEach(el => {
        $(`#${el}`).text(array[0][el]);
      })
    }
  function createSingleEntryTable(table, array, headerObj, headerKeys) {
    var html = `<tr>`
    headerObj.forEach(el => {
      html += `<th>${el}</th>`
    })
    html += '</tr>'
    array.forEach(el => {
      html += '<tr>'
      headerKeys.forEach(h => {
        html += `<td>${el[h]}</td>`
      })
      html += '</tr>'
    })
    $(`#${table}`).empty();
    $(`#${table}`).append(html);
  }
    
    function scrChildReport(qry){
      return new Promise((resolve,reject)=>{
        ipc.send('scrChildReport', (qry));
        ipc.on('scrChildReport', (e, result)=>{
          if(result.err){
            reject(result.err)
            ipc.removeAllListeners('scrChildReport')
          } else {
              resolve(result.result);
          }
      })
      })      
    }
$('#showDataScrReport').on('click', function(e){
  e.preventDefault();
  var fullTextCh = ['Province','District','Tehsil','UC','Village','Nutrition Site','Screening Date','Staff Name','Staff Code','Supervisor Name','Supervisor Code','Total Screened (Girls)','Total Screened (Boys)','First time Screened (Girls)','First time screened (Boys)','Normal (6 to 23 Girls)','Normal (6 to 23 Boys)','Normal (24 to 59 Girls)','Normal (24 to 59 Boys)','MAM (6 to 23 Girls)','MAM (6 to 23 Boys)','MAM (24 to 59 Girls)','MAM (24 to 59 Boys)','SAM without complication (6 to 23 Girls)','SAM without complication (6 to 23 Boys)','SAM without complication (24 to 59 Girls)','SAM without complication (24 to 59 Boys)','SAM with complication (6 to 23 Girls)','SAM with complication (6 to 23 Boys)','SAM with complication (24 to 59 Girls)','SAM with complication (24 to 59 Boys)','No Oedema (Girls)','No Oedema (Boys)','+,++ Oedema (Girls)','+,++ Oedema (Boys)','+++ Oedema (Girls)','+++ Oedema (Boys)','Refered TSFP (Girls)','Refered TSFP (Boys)','Refeedr OTP (Girls)','Refered OTP (Boys)','Refered SC (Girls)','Refered SC (Boys)','Deworming Girls','Deworming Boys','MNP Sachet distributed (Girls)','MNP Sachet distributed (Boys)']
var colNameCh = ['province','district_name','tehsil_name','uc_name','village','site_name','screening_date','staff_name','staff_code','sup_name','sup_code','total_scr_girls','total_scr_boys','new_girls','new_boys','normal_girls_623','normal_boys_623','normal_girls_2459','normal_boys_2459','mam_girls_623','mam_boys_623',,'mam_girls_2459','mam_boys_2459','sam_without_comp_girls_623','sam_without_comp_boys_623','sam_without_comp_girls_2459','sam_without_comp_boys_2459','sam_with_comp_girls_623','sam_with_comp_boys_623','sam_with_comp_girls_2459','sam_with_comp_boys_2459','no_oedema_girls','no_oedema_boys','plus12_oedema_girls','plus12_oedema_boys','plus3_oedema_girls','plus3_oedema_boys','reffer_tsfp_girls','reffer_tsfp_boys','reffer_otp_girls','reffer_otp_boys','reffer_sc_girls','reffer_sc_boys','deworming_girls','deworming_boys','mnp_30_girls','mnp_30_boys']
// $('#filterDate').validate();
if($('#filterDate').valid()){

  scrChildReport(prepareQry())
    .then(result=>{
      putSummaryDataToTable('scrChildNewSum', result.summary)
      createSingleEntryTable('scrChildNewSingle', result.single, fullTextCh, colNameCh)

    })
    .catch(e=>{
      console.log('error occured during summary table creation')
    })
}
  });
$('#exportScrChReport').on('click', function(){  
  export_xlsx();
})
})

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
    var ws1 = XLSX.utils.table_to_sheet(document.getElementById('scrChildNewSum'));
XLSX.utils.book_append_sheet(workbook, ws1, "Summary");

/* convert table 'table2' to worksheet named "Sheet2" */
var ws2 = XLSX.utils.table_to_sheet(document.getElementById('scrChildNewSingle'));
XLSX.utils.book_append_sheet(workbook, ws2, "Screening Detail");
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