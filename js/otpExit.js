function ex_pushData(x) {
  var data = x.summary;
  $('#ex_chMale623').empty()
  $('#ex_chMale623').append(data[0].ex_chMale623);
  $('#ex_chMale2459').empty()
  $('#ex_chMale2459').append(data[0].ex_chMale2459);
  $('#ex_chMaleTotal').empty()
  $('#ex_chMaleTotal').append(data[0].ex_chMaleTotal);
  $('#ex_chFemale623').empty()
  $('#ex_chFemale623').append(data[0].ex_chFemale623);
  $('#ex_chFemale2459').empty()
  $('#ex_chFemale2459').append(data[0].ex_chFemale2459);
  $('#ex_chFemaleTotal').empty()
  $('#ex_chFemaleTotal').append(data[0].ex_chFemaleTotal);
  $('#ex_chT623').empty()
  $('#ex_chT623').append(data[0].ex_chT623);
  $('#ex_chT2459').empty()
  $('#ex_chT2459').append(data[0].ex_chT2459);
  $('#ex_chTTotal').empty()
  $('#ex_chTTotal').append(data[0].ex_chTTotal);
  $('#ex_pTotal').empty()
  $('#ex_pTotal').append(data[0].ex_pTotal);
  $('#ex_plwTotal').empty()
  $('#ex_plwTotal').append(data[0].ex_plwTotal);
  ex_createTblCh(x.child, 'ex_tblChild');
  ex_createTblPlw(x.plw, 'ex_tblPlw');

}

function ex_createTblPlw(data, table) {
  var headPLW = ["id", 'Province', 'District', 'Tehsil', 'UC', 'Nutrition Site', 'Screening Type', 'Screening Date', 'Entry Date', 'Village', 'Staff Name', 'Name', 'H Name', 'Type', 'Age(years)', 'Address', 'MUAC', '# of MM Tabs', 'status']

  var keysPlw = [
    "screening_id",
    "province",
    "district_name",
    "tehsil_name",
    "uc_name",
    "site_name",
    "screening_type",
    "screening_date",
    "data_entry_date",
    "site_village",
    "staff_name",
    "name",
    "f_or_h_name",
    "plw_type",
    "age",
    "address",
    "muac",
    "no_mm_tabs",
    "status",

  ]
  var scrType = ['Passive', 'Active'];
  var plw_type = ['', 'Pragnent', 'Lactacting']
  var Status = ['', 'Normal', 'MAM', 'SAM'];
  var yN = ['No', 'Yes'];
  var html = '<tr>';
  headPLW.forEach(el => {
    html += '<th>' + el + '</th>'
  })
  html += '</tr>'
  data.forEach(el => {
    html += '<tr>'
    keysPlw.forEach(key => {
      if (key === 'plw_type') {
        html += '<td>' + plw_type[el[key]] + '</td>'
      } else
      if (key === 'screening_type') {
        html += '<td>' + scrType[el[key]] + '</td>'
      } else
      if (key === 'status') {
        html += '<td>' + Status[el[key]] + '</td>'
      } else {

        html += '<td>' + el[key] + '</td>'
      }

    })
    html += '</tr>'
  })
  console.log(html);
  $('#' + table).empty();
  $('#' + table).append(html);

}

function ex_createTblCh(data, table) {
  var headChild = ["id", 'Province', 'District', 'Tehsil', 'UC', 'Nutrition Site', 'Screening Type', 'Screening Date', 'Entry Date', 'Village', 'Staff Name', 'Name', 'Father Name', 'Gender', 'Age(months)', 'Address', 'MUAC', 'OEDEMA', 'Deworming', '# of MM Sch', 'Status']
  var keysChild = [
    "screening_id",
    "province",
    "district_name",
    "tehsil_name",
    "uc_name",
    "site_name",
    "screening_type",
    "screening_date",
    "data_entry_date",
    "site_village",
    "staff_name",
    "name",
    "f_or_h_name",
    "gender",
    "age",
    "address",
    "muac",
    "oedema",
    "deworming",
    "no_mm_sch",
    "status"
  ]

  var scrType = ['Passive', 'Active'];
  var gender = ['', 'Male', 'Female'];
  var Status = ['', 'Normal', 'MAM', 'SAM'];
  var yN = ['No', 'Yes'];
  var html = '<tr>';
  headChild.forEach(el => {
    html += '<th>' + el + '</th>'
  })
  html += '</tr>'
  data.forEach(el => {
    html += '<tr>'
    keysChild.forEach(key => {
      if (key === 'gender') {
        html += '<td>' + gender[el[key]] + '</td>'
      } else
      if (key === 'screening_type') {
        html += '<td>' + scrType[el[key]] + '</td>'
      } else
      if (key === 'status') {
        html += '<td>' + Status[el[key]] + '</td>'
      } else
      if (key === 'oedema') {
        html += '<td>' + yN[el[key]] + '</td>'
      } else
      if (key === 'deworming') {
        html += '<td>' + yN[el[key]] + '</td>'
      } else {

        html += '<td>' + el[key] + '</td>'
      }
    })
    html += '</tr>'
  })
  console.log(html);
  $('#' + table).empty();
  $('#' + table).append(html);
}

function prepareQry() {
  var qry = {};
  ($('#ddProvince').val()) ? qry.province_id = $('#ddProvince').val(): '';
  ($('#ddDistrict').val()) ? qry.district_id = $('#ddDistrict').val(): '';
  ($('#ddTehsil').val()) ? qry.tehsil_id = $('#ddTehsil').val(): '';
  ($('#ddUC').val()) ? qry.uc_id = $('#ddUC').val(): '';
  if ($('#ddInterval').val() === 'monthly') {
    var yr = $('#year').val();
    var mth = $('#month').val();
    if (mth < 10) {
      mth = '0' + mth;
    }
    var lastDay = daysInMonth(mth, yr);
    qry.date = {
      x: 'screening_date',
      y: [
        `${yr}-${mth}-01`, `${yr}-${mth}-${lastDay}`
      ]
    };
  } else if ($('#ddInterval').val() === 'quarterly') {
    var yr = $('#year').val();
    var qtr = $('#quarter').val();
    var range = [
      [`${yr}-01-01`, `${yr}-03-31`],
      [`${yr}-04-01`, `${yr}-06-30`],
      [`${yr}-07-01`, `${yr}-09-30`],
      [`${yr}-10-01`, `${yr}-12-31`],
    ];
    qry.date = {
      x: 'screening_date',
      y: range[qtr]
    };
  } else if ($('#ddInterval').val() === 'yearly') {
    var yr = $('#year').val();
    qry.date = {
      x: 'screening_date',
      y: [`${yr}-01-01`, `${yr}-12-31`]
    };
  }

  console.log(qry);
  return qry;
}