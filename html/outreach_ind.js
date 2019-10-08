let fs = require('fs')
const knex = require('../mainfunc/db');
module.exports.initGridOutreach_ind = function () {
    const {
        client,
        mac
    } = JSON.parse(
        fs.readFileSync(`${process.env.APPDATA}/ACF MIS Local app/config.json`, "utf8")
    );
    $(() => {
        $('#other_site').select2();
        $('input[type="number"]').attr('min', 0);
    })
    $(function () {
        var datePickerId = document.getElementById('txtScrChildDate');
        datePickerId.max = new Date().toISOString().split("T")[0];
    });
    $(function () {
        ipc.send('getProvince');
        ipc.on('province', function (evt, province) {
            $('#ddProvince').children('option:not(:first)').remove();
            prov(province);
        })
        $('#ddProvince').on('change', function () {
            var prov = $(this).val();
            ipc.send('getDistrict', prov)
            ipc.on('district', function (evt, district) {
                $('#ddDistrict').children('option:not(:first)').remove();
                dist(district);
            })
        })
        $('#ddDistrict').on('change', function () {
            var dist = $(this).val();
            ipc.send('getTehsil', dist)
            ipc.on('tehsil', function (evt, tehsil) {
                $('#ddTehsil').children('option:not(:first)').remove();
                teh(tehsil);
                $('#site_two').children('option:not(:first)').remove();
                ipc.send('getAddSitesByDistrict', dist);
                ipc.on('getAddSitesByDistrict', (e, r) => {

                    for (site of r.r) {
                        $('#site_two').append(`<option value="${site.site_name}">${site.site_name}</option>`);
                    }
                })

            })
        })
        $('#ddTehsil').on('change', function () {
            var tehs = $(this).val();
            ipc.send('getUC', tehs)
            ipc.on('uc', function (evt, uc) {
                $('#ddUC').children('option:not(:first)').remove();

                ucListener(uc);
            })
        })
        var ucForHH;
        $('#ddUC').on('change', function () {
            var ucs = $(this).val();
            ucForHH = ucs
            ipc.send('getHealthHouse', ucs)
            ipc.on('hh', async function (evt, hh) {
                $('#site_one').children('option:not(:first)').remove();

                hhListener_siteOne(hh);

            });
            ipc.send("getStaffuc", ucs);
            ipc.send("getSupsuc", ucs);

            ipc.on("haveStaffuc", function (evt, staffs) {
                $("#ddStaff_code")
                    .children("option:not(:first)")
                    .remove();
                staffListeneruc(staffs);
            });
            ipc.on("haveSupsuc", function (evt, _sups) {
                $("#ddSup_code")
                    .children("option:not(:first)")
                    .remove();
                supListeneruc(_sups);
            });
        })

        $("#ddStaff_code").on("change", function () {
            var staff_code = $(this).val();
            $("#ddStaff_name").val(staff_code);
        });
        $("#ddStaff_name").on("change", function () {
            var staff_code = $(this).val();
            $("#ddStaff_code").val(staff_code);
        });
        $("#ddSup_code").on("change", function () {
            var sup_code = $(this).val();
            $("#ddSup_name").val(sup_code);
        });
        $("#ddSup_name").on("change", function () {
            var sup_code = $(this).val();
            $("#ddSup_code").val(sup_code);
        });

    })
    $('#submitOutReachForm').on('click', (e) => {
        // console.log(data);
        e.preventDefault();

    })
    $('#resetOutReachForm').on('click', () => {
        $('#resetOutReachForm').get(0).reset();
    })


}