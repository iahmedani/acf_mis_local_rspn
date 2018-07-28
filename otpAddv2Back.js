function otpAddDataSave(event, otpAddData){
  //console.log(addFormOtp);
  delete addOtpData.province;
  delete addOtpData.Tehsil;
  delete addOtpData.district;
  delete addOtpData.province;
  delete addOtpData.ddHealthHouseOTP;
  delete addOtpData.uc;
  addOtpData.client_id = imran.client;
  addOtpData.username = username;
  addOtpData.org_name = org_name;
  addOtpData.project_name = project_name;
  const addFormOtp = addOtpData;
  console.log(addFormOtp);
  knex('tblOtpAdd')
    .insert(addFormOtp)
    .then(result => {
      console.log(result + 'OTP addmision added')
      sucMsg(event,'','OTP admission added successfully')
      // addOtp.webContents.send("resultSentOtpAdd", {
      //   'msg': 'records added'
      // });
      var interimData = {
        otp_id: result[0],
        client_id: imran.client,
        muac: addFormOtp.muac,
        weight: addFormOtp.weight,
        ration1: addFormOtp.ration1,
        quantity1: addFormOtp.quantity1,
        ration2: addFormOtp.ration2,
        quantity2: addFormOtp.quantity2,
        ration3: addFormOtp.ration3,
        quantity3: addFormOtp.quantity3,
        curr_date: localDate(),
        created_at: localDate(),
        status: 'open',
        next_followup: function () {
          var myDate = new Date();
          myDate.setDate(myDate.getDate() + 15)
          return myDate.toLocaleDateString();
        }()
      }
      console.log(interimData)
      return knex('tblInterimOtp')
        .insert(interimData)
    })
    .then(result => {
      console.log('interim ID: ', result);
    })
    .catch(e => {
      console.log(e + 'OTP add error');
      errMsg(event, '', 'OTP Addmision not added, plz try again or contact admin');
      // addOtp.webContents.send("resultSentOtpAdd", {
      //   'err': 'records not added, plz try again'
      // });
    })
    // addFormOtp = null;
}

ipcMain.on('submitOtpAdd', function (event, addOtpData) {
  //console.log(addFormOtp);
  delete addOtpData.province;
  delete addOtpData.Tehsil;
  delete addOtpData.district;
  delete addOtpData.province;
  delete addOtpData.ddHealthHouseOTP;
  delete addOtpData.uc;
  addOtpData.client_id = imran.client;
  addOtpData.username = username;
  addOtpData.org_name = org_name;
  addOtpData.project_name = project_name;
  const addFormOtp = addOtpData;
  console.log(addFormOtp);
  knex('tblOtpAdd')
    .insert(addFormOtp)
    .then(result => {
      console.log(result + 'OTP addmision added')
      addOtp.webContents.send("resultSentOtpAdd", {
        'msg': 'records added'
      });
      var interimData = {
        otp_id: result[0],
        client_id: imran.client,
        muac: addFormOtp.muac,
        weight: addFormOtp.weight,
        ration1: addFormOtp.ration1,
        quantity1: addFormOtp.quantity1,
        ration2: addFormOtp.ration2,
        quantity2: addFormOtp.quantity2,
        ration3: addFormOtp.ration3,
        quantity3: addFormOtp.quantity3,
        curr_date: localDate(),
        created_at: localDate(),
        status: 'open',
        next_followup: function () {
          var myDate = new Date();
          myDate.setDate(myDate.getDate() + 15)
          return myDate.toLocaleDateString();
        }()
      }
      console.log(interimData)
      return knex('tblInterimOtp')
        .insert(interimData)
    })
    .then(result => {
      console.log('interim ID: ', result);
    })
    .catch(e => {
      console.log(e + 'OTP add error');
      addOtp.webContents.send("resultSentOtpAdd", {
        'err': 'records not added, plz try again'
      });
    })
    // addFormOtp = null;
})