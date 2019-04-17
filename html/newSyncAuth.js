const axios = require('axios');
const knex = require('../mainfunc/db');
const fs = require('fs');


module.exports.newSyncAuth = function () {
    axios.defaults.timeout = 200000;
    var _Errors = {
        register: true,
        requestError: false
    }

    const {
        client,
        mac
    } = JSON.parse(
        fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
    );
    var headers = {
        Authorization: `Bearer ${client} ${mac}`,
        'Content-Type': 'application/json'
    };
    var instance = axios.create({
        // baseUrl:surl,
        // timeout:10000,
        // timeout = 600000,
        headers
    })
    let elProgress = $('#progress')
    let elInfo = $('#information')


    var uploadBtn = $('#uploadData')
    var updateBtn = $('#updateDb')

    async function updateData(table, column, data, update_val) {
        var upload_date = new Date().toJSON().split('T')[0]
        for (datum of data) {
            try {
                await knex(table).update({
                    upload_status: update_val,
                    upload_date
                }).where(column, '=', datum)
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function uploadData(table, id_column, server_id_col, url, instance, title) {
        elInfo.text(`Preparing Data - ${title}`)
        var _tData = await knex(table).where({
            upload_status: 0
        });
        if (_tData.length) {
            var newData = [];
            for (data of _tData) {
                data[server_id_col] = data[id_column];
                delete data[id_column];
                newData.push(data);
            }
            elInfo.text(`Uploading Started - ${title}`);
            var _div = (newData.length > 100) ? Math.floor(newData.length / 100) : 1;
            var _sendData = splitToChunks(newData, _div);
            for (_data of _sendData){
                try {
                    var _x = await instance.post(url, _data)
                    if (!Array.isArray(_x.data) && _x.data.msg) {
                        _Errors.register = false;
                    } else if (Array.isArray(_x.data) && _x.data.length > 0) {
                        elInfo.text(`Uploading finished, updating NMIS - ${title}`)
                        await updateData(table, id_column, _x.data, 1)
                        elInfo.text(`NMIS updated - ${title}`)
                    }
                } catch (error) {
                    console.log(error)
                    _Errors.requestError = true;
                }
            }
        } else {
            elInfo.text(`No new data - ${title}`)
        }
    }

    async function uploadUpdatedData(table, id_column, server_id_col, url, instance, title) {
        elInfo.text(`Preparing updating data - ${title}`)
        var _tData = await knex(table).where({
            upload_status: 2
        });
        if (_tData.length) {
            var newData = [];
            for (data of _tData) {
                data[server_id_col] = data[id_column];
                delete data[id_column];
                newData.push(data);
            }
            var _div = (newData.length > 100) ? Math.floor(newData.length / 100) : 1;
            var _sendData = splitToChunks(newData, _div);
            elInfo.text(`Uploading updated data Started - ${title}`);
            for (_data of _sendData){
            try {
                var _x = await instance.put(url, _data)
                if ( !Array.isArray(_x.data) && _x.data.msg) {
                    _Errors.register = false;
                } else if (Array.isArray(_x.data) && _x.data.length > 0) {

                    elInfo.text(`Uploading updated data finished, updating NMIS - ${title}`)    
                    await updateData(table, id_column, _x.data, 1)
                    elInfo.text(`NMIS updated - ${title}`)
                }
            } catch (error) {
                console.log(error)
                _Errors.requestError = true;
            }
        }
        } else {
            elInfo.text(`No new data - ${title}`)
        }
    }

    async function uploadDataMultiple(table, id_column1, server_id_col1, id_column2, server_id_col2, url, instance, title) {
        elInfo.text(`Preparing data - ${title}`)
        var _tData = await knex(table).where({
            upload_status: 0
        });
        if (_tData.length) {
        var newData = [];
        for (data of _tData) {
            data[server_id_col1] = data[id_column1];
            data[server_id_col2] = data[id_column2];
            delete data[id_column1];
            delete data[id_column2];
            newData.push(data);
        }
        elInfo.text(`Uploading Started - ${title}`);
        var _div = (newData.length > 100) ? Math.floor(newData.length / 100) : 1;
        var _sendData = splitToChunks(newData, _div);
        // var _sendData = splitToChunks(newData, 30);
        for (_data of _sendData){
        try {
            var _x = await instance.post(url, _data)
            if (!Array.isArray(_x.data) &&  _x.data.msg) {
                _Errors.register = false;
            } else if (Array.isArray(_x.data) && _x.data.length > 0) {
            elInfo.text(`Uploading finished, updating NMIS - ${title}`)
            await updateData(table, id_column1, _x.data, 1)
            elInfo.text(`NMIS Updated - ${title}`)
            }
        } catch (error) {
            console.log(error)
            _Errors.requestError = true;
        }
    }
    } else {
        elInfo.text(`No new data - ${title}`)
    }
    }

    async function uploadUpdatedDataMultiple(table, id_column1, server_id_col1, id_column2, server_id_col2, url, instance, title) {
        elInfo.text(`Preparing updated data - ${title}`)
        var _tData = await knex(table).where({
            upload_status: 2
        });
        if (_tData.length) {
        var newData = [];
        for (data of _tData) {
            data[server_id_col1] = data[id_column1];
            data[server_id_col2] = data[id_column2];
            delete data[id_column1];
            delete data[id_column2];
            newData.push(data);
        }
        elInfo.text(`Uploading updated data started - ${title}`);
        var _div = (newData.length > 100) ? Math.floor(newData.length / 100) : 1;
            var _sendData = splitToChunks(newData, _div);
        for (_data of _sendData){
        try {
            var _x = await instance.put(url, _data)
            if (!Array.isArray(_x.data) && _x.data.msg) {
                _Errors.register = false;
            } else if (Array.isArray(_x.data) && _x.data.length > 0) {
            elInfo.text(`Uploading updated data finished, updating NMIS - ${title}`)
            await updateData(table, id_column1, _x.data, 1)
            elInfo.text(`NMIS Updated - ${title}`)
            }
        } catch (error) {
            console.log(error)
            _Errors.requestError = true;
        }
    }
    } else {
        elInfo.text(`No new data - ${title}`)
    }
    }

    async function getAndUpdateBasicData(table, id_column, url, instance, title) {
        elInfo.text(`Requesting server for data - ${title}`)
        console.log(url)
        try {            
            var _data = await instance.get(url);
            if(!Array.isArray(_data.data) && _data.data.msg){
                _Errors.register = false
            }else if(Array.isArray(_data.data) && _data.data.length > 0){
                _Errors.register = true

                console.log(_data)
                elInfo.text(`Updating NMIS - ${title}`)
                for (datum of _data.data) {
                    // console.log(datum)
                    // var _id = datum[id_column];
                    // delete datum[id_column]
                    delete datum.isActive;
                    try {
                        var _check = await knex(table).where(id_column, datum[id_column]);
                        if(_check.length == 0){
                            await knex(table).insert(datum);
                            elInfo.text(`NMIS updated - ${title}`)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } catch (error) {
            console.log(error)
            _Errors.requestError = true;
        }

    }

    uploadBtn.on('click', async () => {
        var surl = await knex("tblConfig");
        surl = surl[0].value;
        elProgress.show();
        updateBtn.attr('disabled', true)
        uploadBtn.attr('disabled', true)
        console.log(surl)

        try {
            // Scr Children block
            await uploadData('tblScrChildren', 'ch_scr_id', 'client_scr_ch_id', `${surl}/newScrBulk`, instance, 'Children Screening');
            await uploadUpdatedData('tblScrChildren', 'ch_scr_id', 'client_scr_ch_id', `${surl}/newScrBulk`, instance, 'Children Screening');
            // Scr Plw block          
            await uploadData('tblScrPlw', 'plw_scr_id', 'client_scr_plw_id', `${surl}/newScrPlwBulk`, instance, 'Plw Screening');
            await uploadUpdatedData('tblScrPlw', 'plw_scr_id', 'client_scr_plw_id', `${surl}/newScrPlwBulk`, instance, 'Plw Screening');
            //  OtpFollowup Block
            await uploadDataMultiple('tblOtpFollowup', 'followup_id', 'client_followup_id','otp_id', 'client_otp_id', `${surl}/otpFollowupBulk`, instance, 'Followup');
            await uploadUpdatedDataMultiple('tblOtpFollowup', 'followup_id', 'client_followup_id', 'otp_id', 'client_otp_id',`${surl}/otpFollowupBulk`, instance, 'Followup');

            // Stock Out
            await uploadData('tblSiteStock', 'stock_out_id', 'client_stock_out_id', `${surl}/stockOutBulk`, instance, 'Stock Out');
            await uploadUpdatedData('tblSiteStock', 'stock_out_id', 'client_stock_out_id', `${surl}/stockOutBulk`, instance, 'Stock Out');

            // Stock Distribution
            await uploadData('tblStokDistv2', 'dist_id', 'client_dist_id', `${surl}/stockDistBulk`, instance, 'Distributions');
            await uploadUpdatedData('tblStokDistv2', 'dist_id', 'client_dist_id', `${surl}/stockDistBulk`, instance, 'Distributions');

            // Villages Block
            await uploadData('tblVillages', 'id', 'client_village_id', `${surl}/villagesBulk`, instance, 'Villages');
            await uploadUpdatedData('tblVillages', 'id', 'client_village_id', `${surl}/villagesBulk`, instance, 'Villages');

            // LHW Block
            await uploadData('tblLhw', 'id', 'client_lhw_id', `${surl}/lhwBulk`, instance, 'LHW/CHW');
            await uploadUpdatedData('tblLhw', 'id', 'client_lhw_id', `${surl}/lhwBulk`, instance, 'LHW/CHW');

            // Supervisors Block
            await uploadData('tblSupervisors', 'id', 'client_sup_id', `${surl}/supsBulk`, instance, 'LHS');
            await uploadUpdatedData('tblSupervisors', 'id', 'client_sup_id', `${surl}/supsBulk`, instance, 'LHS');

            // Admisions Block
            await uploadData('tblOtpAdd', 'otp_id', 'client_otp_id', `${surl}/admisionsBulk`, instance, 'Admisions');
            await uploadUpdatedData('tblOtpAdd', 'otp_id', 'client_otp_id', `${surl}/admisionsBulk`, instance, 'Admisions');

            // Exits Block
            await uploadDataMultiple('tblOtpExit', 'exit_id', 'client_exit_id', 'otp_id', 'client_otp_id', `${surl}/exitsBulk`, instance, 'Admisions');
            await uploadUpdatedDataMultiple('tblOtpExit', 'exit_id', 'client_exit_id', 'otp_id', 'client_otp_id', `${surl}/exitsBulk`, instance, 'Admisions');

            // Sessions Block
            await uploadData('tblSessions', 'session_id', 'client_session_id', `${surl}/sessionsBulk`, instance, 'Sessions');
            await uploadUpdatedData('tblSessions', 'session_id', 'client_session_id', `${surl}/sessionsBulk`, instance, 'Sessions');


            // Stock In Block
            await uploadData('tblStock', 'id', 'client_stockIn_id', `${surl}/stockInBulk`, instance, 'Stock In');
            await uploadUpdatedData('tblStock', 'id', 'client_stockIn_id', `${surl}/stockInBulk`, instance, 'Stock In');

            elProgress.hide();
            elProgress.hide();
            Swal.fire({
                type: 'success',
                title: 'NMIS Syncronization',
                text: 'Successfully uploaded'
            })
            updateBtn.attr('disabled', false)
            uploadBtn.attr('disabled', false)

        } catch (error) {
            console.log(error)
            elProgress.hide();
            Swal.fire({
                type: 'error',
                title: 'NMIS Syncronization',
                text: !_Errors.register ? 'NMIS is not registred' : 'Unable to contact with Server'
            })
            updateBtn.attr('disabled', false)
            uploadBtn.attr('disabled', false)
        }

    })

    updateBtn.on('click', async () => {
        var surl = await knex("tblConfig");
        surl = surl[0].value;
        elProgress.show();
        updateBtn.attr('disabled', true)
        uploadBtn.attr('disabled', true)

        try {
            await getAndUpdateBasicData('tblGeoProvince', 'id', `${surl}/getProvince`, instance, 'Province(s)')
            await getAndUpdateBasicData('tblGeoDistrict', 'id', `${surl}/getDistrict`, instance, 'District(s)')
            await getAndUpdateBasicData('tblGeoTehsil', 'id', `${surl}/getTehsil`, instance, 'Tehsil(s)')
            await getAndUpdateBasicData('tblGeoUC', 'id', `${surl}/getUC`, instance, 'Union Council(s)')
            await getAndUpdateBasicData('tblGeoNutSite', 'id', `${surl}/getSite`, instance, 'Health House(s)')
            await getAndUpdateBasicData('tblCommodity', 'id', `${surl}/getItems`, instance, 'Commodities')
            var _config = await instance.post(`${surl}/getConfig`);
            console.log(_config)
            await knex('tblConfig').update({
                value: _config.data[0].value
            }).whereNot('value', _config.data[0].value)
            elProgress.hide();
            Swal.fire({
                type: 'success',
                title: 'NMIS Syncronization',
                text: 'Successfully downloaded'
            })
            updateBtn.attr('disabled', false)
            uploadBtn.attr('disabled', false)
        } catch (error) {
            console.log(error)
            elProgress.hide();
            Swal.fire({
                type: 'error',
                title: 'NMIS Syncronization error',
                text: !_Errors.register ? 'NMIS is not registred' : 'Unable to contact with Server'
            })
            updateBtn.attr('disabled', false)
            uploadBtn.attr('disabled', false)
        }
    })

    function splitToChunks(array, parts) {
        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(array.splice(0, Math.ceil(array.length / i)));
        }
        return result;
    }

    async function scr30(data, instance, surl) {
        var _data = splitToChunks(data, Math.floor(data.length / 20));


        for (data of _data) {
            // data.client_id = client;
            // data.client_scr_ch_id = data.ch_scr_id;
            // delete data.ch_scr_id;
            console.log(data);
            try {
                var _testData = await instance.post(`${surl}/newChScr`, data)
                console.log(_testData)
            } catch (error) {
                console.log(error)
            }
            // instance.post('/newScrChild1', )
        }
    }


}