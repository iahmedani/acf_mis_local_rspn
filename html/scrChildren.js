module.exports.initGrid = function (){
  $(()=>{
    $('input[type="number"]').attr('min',0);
  })
  $(function () {
    var datePickerId = document.getElementById('txtScrChildDate');
    datePickerId.max = new Date().toISOString().split("T")[0];
  });
  $(function(){
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
    })
  $('#submitScrChildForm').on('click', (e)=>{
    // console.log(data);
    $('#scrChildrenForm').validate();
    if($('#scrChildrenForm').valid()){
      var scrChildrenData = $('#scrChildrenForm').serializeFormJSON();
      console.log(scrChildrenData);
      ipc.send('scrChildren', scrChildrenData);
      ipc.removeAllListeners('scrChildren');
      $('#scrChildrenForm').get(0).reset();
    $('input[type="number"]').attr('min',0);
    } 
    e.preventDefault();
  })
  $('#resetScrChildForm').on('click',()=>{
    $('#scrChildrenForm').get(0).reset();
  })
}