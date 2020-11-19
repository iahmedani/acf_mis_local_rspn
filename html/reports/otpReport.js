const knex = require('../../mainfunc/db');

function prepareQry() {
    var qry = {};
    $("#ddProvince").val() ? (qry.province_id = $("#ddProvince").val()) : qry.province_id = "";
    $("#ddDistrict").val() ? (qry.district_id = $("#ddDistrict").val()) : qry.district_id = "";
    $("#ddTehsil").val() ? (qry.tehsil_id = $("#ddTehsil").val()) : qry.tehsil_id = "";
    $("#ddUc").val() ? (qry.uc_id = $("#ddTehsil").val()) : qry.uc_id = "";
    $("#ddHealthHouse").val() ? (qry.site_id = $("#ddHealthHouse").val()) : qry.site_id = "";
    $("#startDate").val() ? (qry.start_date = $("#startDate").val()) : qry.start_date = "";
    $("#endDate").val() ? (qry.end_date = $("#endDate").val()) : qry.end_date = "";
    $('#ddProgramType').val() ? (qry.prog_type = $("#ddProgramType").val()) : qry.prog_type = "";
    return qry;
}

// function qryStringPrepare(filter) {
//     var qry;
//     if (filter.prog_type == 'sc') {
//         qry = `SELECT ads.*, exits.e1, exits.e2, exits.e3, exits.e4, exits.e, exits.f1, exits.f2, exits.f3, exits.f, exits.g  from (select a.*, b.a from (SELECT
//         ( CASE WHEN age BETWEEN 1 AND 5 THEN '0-6 Months' WHEN age BETWEEN 6 AND 23 THEN '6-23 Months' WHEN age BETWEEN 24 AND 59 THEN '24-59 Months' END ) age_group,
//         gender,
//         count( CASE WHEN muac < 11.5 AND ent_reason = 'new_add' AND oedema = 'absent' THEN 1 END ) b1,
//         count( CASE WHEN oedema <> 'absent' AND ent_reason = 'new_add' THEN 1 END ) b2,
//         (
//         count( CASE WHEN muac < 11.5 AND ent_reason = 'new_add' AND oedema = 'absent' THEN 1 END ) + count( CASE WHEN oedema <> 'absent' AND ent_reason = 'new_add' THEN 1 END ) 
//         ) b,
//         count( CASE WHEN ent_reason = 'relapse' THEN 1 END ) c1,
//         count( CASE WHEN ent_reason = 'return_after_lama' THEN 1 END ) c2,
//         count( CASE WHEN ent_reason = 'transfer_from_ward' THEN 1 END ) c3,
//         count( CASE WHEN ent_reason = 'transfer_in_from_otp' THEN 1 END ) c4,
//         count( CASE WHEN ent_reason = 'other' THEN 1 END ) c5,
//         count( CASE WHEN ent_reason <> 'new_add' THEN 1 END ) c 
//     FROM
//         oneTableGeo
//     WHERE
//         prog_type = 'sc'
//         AND (reg_date BETWEEN '${filter.start_date}' AND '${filter.end_date}')
//         AND [province_id:1] LIKE '%${filter.province_id}%' 
//         AND [district_id:1] LIKE '%${filter.district_id}%' 
//         AND [tehsil_id:1] LIKE '%${filter.tehsil_id}%' 
//         AND [uc_id:1] LIKE '%${filter.uc_id}%' 
//         AND [site_id:1] LIKE '%${filter.site_id}%' 
//         GROUP BY
//         age_group,
//         gender ) a
//         LEFT JOIN (
//         SELECT
//             count( * ) AS a,
//         ( CASE WHEN age BETWEEN 1 AND 5 THEN '0-6 Months' WHEN age BETWEEN 6 AND 23 THEN '6-23 Months' WHEN age BETWEEN 24 AND 59 THEN '24-59 Months' END ) age_group,
//         gender 
//     FROM
//         oneTableGeo 
//     WHERE
//         reg_date < '${filter.start_date}' 
//         AND prog_type = 'sc' 
//         AND [province_id:1] LIKE '%${filter.site_id}%' 
//         AND [district_id:1] LIKE '%${filter.site_id}%' 
//         AND [tehsil_id:1] LIKE '%${filter.site_id}%' 
//         AND [uc_id:1] LIKE '%${filter.site_id}%' 
//         AND [site_id:1] LIKE '%${filter.site_id}%' 
//         AND otp_id NOT IN ( SELECT otp_id FROM oneTableGeo WHERE reg_date < '${filter.start_date}' AND [exit_date:1] < '${filter.start_date}' ) 
//     GROUP BY
//         age_group,
//         gender 
//         ) b ON a.gender = b.gender 
//         AND a.age_group = b.age_group ) ads
//         LEFT JOIN (
//         select ( CASE WHEN age BETWEEN 1 AND 5 THEN '0-6 Months' WHEN age BETWEEN 6 AND 23 THEN '6-23 Months' WHEN age BETWEEN 24 AND 59 THEN '24-59 Months' END ) age_group, gender,
//     count(case when [exit_reason:1] = 'cured' then 1 end) as e1,
//     count(case when [exit_reason:1] = 'death' then 1 end) as e2,
//     count(case when [exit_reason:1] = 'lama' then 1 end) as e3,
//     count(case when [exit_reason:1] = 'non_recovered' then 1 end) as e4,
//     (count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'lama' then 1 end) + count(case when [exit_reason:1] = 'non_recovered' then 1 end)) as e,
//     count(case when [exit_reason:1] = 'medical_transfer' then 1 end) as f1,
//     count(case when [exit_reason:1] = 'medical_transfer_otp' then 1 end) as f2,
//     count(case when [exit_reason:1] = 'other' then 1 end) as f3,
//     (count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_otp' then 1 end) + count(case when [exit_reason:1] = 'other' then 1 end)) as f,
//     ((count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'lama' then 1 end) + count(case when [exit_reason:1] = 'non_recovered' then 1 end)) + (count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_otp' then 1 end) + count(case when [exit_reason:1] = 'other' then 1 end))) as g 
//     from oneTableGeo
//     WHERE
//         [exit_date:1] BETWEEN '${filter.start_date}' AND '${filter.end_date}' 
//         AND prog_type = 'sc' 
//         AND [province_id:1] LIKE '%${filter.site_id}%' 
//         AND [district_id:1] LIKE '%${filter.site_id}%' 
//         AND [tehsil_id:1] LIKE '%${filter.site_id}%' 
//         AND [uc_id:1] LIKE '%${filter.site_id}%' 
//         AND [site_id:1] LIKE '%${filter.site_id}%' 
//         GROUP BY
//         age_group,
//         gender 
//         ) exits on ads.age_group = exits.age_group and ads.gender = exits.gender`
//         return qry;
//     } else if (filter.prog_type == 'otp') {
//         qry = `select ads.*, exits.e1,  exits.e2, exits.e3, exits.e4, exits.e, exits.f1, exits.f2, exits.f3, exits.f, exits.g from (select a.*, b.a from (
//             select (case when age BETWEEN 6 and 23 then '6-23 Months' when age BETWEEN 24 and 59 then '24-59 Months' end) as age_group,
//             gender,
//             count(case when muac < 11.5  and ent_reason = 'no_prv_pro' and oedema = 'absent' then 1 end) as b1,  
//             count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end) as b2,
//             ( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' and oedema = 'absent' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) as b,
//             count(case when ent_reason = 'return_def' then 1 end) as c1,
//             count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) as c2,
//             count(case when (ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro') then 1 end) as c3,
//             count(case when ent_reason = 'relapse' then 1 end) as cc,
//             (  count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro' then 1 end) )  as c,
//             (( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' and oedema = 'absent' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) + (count(case when ent_reason = 'relapse' then 1 end)) + (count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro' then 1 end))) as d
//             from oneTableGeo
//             where (reg_date >= '${filter.start_date}' and reg_date <= '${filter.end_date}') and prog_type='otp' and [province_id:1] like '%${filter.province_id}%' and [district_id:1] like '%${filter.district_id}%' and [tehsil_id:1] like '%${filter.tehsil_id}%' and [uc_id:1] like '%${filter.uc_id}%' and [site_id:1] like '%${filter.site_id}%'
//             group by age_group, gender) a 

//             left join (
//                 select count(*) as a, (case when age BETWEEN 6 and 23 then '6-23 Months' when age BETWEEN 24 and 59 then '24-59 Months' end) as age_group, gender from oneTableGeo where reg_date < '${filter.start_date}' and prog_type = 'otp' and [province_id:1] like '%${filter.province_id}%' and [district_id:1] like '%${filter.district_id}%' and [tehsil_id:1] like '%${filter.tehsil_id}%' and [uc_id:1] like '%${filter.uc_id}%' and [site_id:1] like '%${filter.site_id}%' and otp_id not in (select otp_id from oneTableGeo where  reg_date < '${filter.start_date}' and [exit_date:1] < '${filter.start_date}')
//                 group by age_group, gender) b on a.gender = b.gender and a.age_group = b.age_group) ads 
//             left join (
//             select (case when age BETWEEN 6 and 23 then '6-23 Months' when age BETWEEN 24 and 59 then '24-59 Months' end) as age_group,
//             gender,
//             count(case when [exit_reason:1] = 'cured' then 1 end) as e1,
//             count(case when [exit_reason:1] = 'death' then 1 end) as e2,
//             count(case when [exit_reason:1] = 'defaulter' then 1 end) as e3,
//             count(case when [exit_reason:1] = 'non_respondent' then 1 end) as e4,
//             (count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'defaulter' then 1 end) + count(case when [exit_reason:1] = 'non_respondent' then 1 end)) as e,
//             count(case when [exit_reason:1] = 'medical_transfer' then 1 end) as f1,
//             count(case when [exit_reason:1] = 'medical_transfer_sc' then 1 end) as f2,
//             count(case when [exit_reason:1] <> 'cured' and [exit_reason:1] <> 'death' and [exit_reason:1] <> 'defaulter' and [exit_reason:1] <> 'non_respondent' and [exit_reason:1] <> 'medical_transfer' and [exit_reason:1] <> 'medical_transfer_sc' then 1 end) as f3,
//             (count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_sc' then 1 end) + count(case when [exit_reason:1] <> 'cured' and [exit_reason:1] <> 'death' and [exit_reason:1] <> 'defaulter' and [exit_reason:1] <> 'non_respondent' and [exit_reason:1] <> 'medical_transfer' and [exit_reason:1] <> 'medical_transfer_sc' then 1 end)) as f,
//             ((count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_sc' then 1 end) + count(case when [exit_reason:1] <> 'cured' and [exit_reason:1] <> 'death' and [exit_reason:1] <> 'defaulter' and [exit_reason:1] <> 'non_respondent' and [exit_reason:1] <> 'medical_transfer' and [exit_reason:1] <> 'medical_transfer_sc' then 1 end)) +(count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'defaulter' then 1 end) + count(case when [exit_reason:1] = 'non_respondent' then 1 end))) as g 
//             from oneTableGeo
//             where ([exit_date:1] >= '${filter.start_date}' and [exit_date:1] <= '${filter.end_date}') and prog_type = 'otp' and [province_id:1] like '%${filter.province_id}%' and [district_id:1] like '%${filter.district_id}%' and [tehsil_id:1] like '%${filter.tehsil_id}%' and [uc_id:1] like '%${filter.uc_id}%' and [site_id:1] like '%${filter.site_id}%'
//             group by age_group, gender) exits on ads.gender = exits.gender and ads.age_group = exits.age_group `
//         return qry;
//     }

// }

function qryStringPrepare(filter) {
    var qry = {};
    if (filter.prog_type == 'sc') {
        qry.begin = `SELECT
        count( * ) AS a,
    ( CASE WHEN age BETWEEN 1 AND 5 THEN '0-6 Months' WHEN age BETWEEN 6 AND 23 THEN '6-23 Months' WHEN age BETWEEN 24 AND 59 THEN '24-59 Months' END ) age_group,
    gender 
FROM
    oneTableGeo 
WHERE
    reg_date < '${filter.start_date}' 
    AND prog_type = 'sc' 
    AND [province_id:1] LIKE '%${filter.site_id}%' 
    AND [district_id:1] LIKE '%${filter.site_id}%' 
    AND [tehsil_id:1] LIKE '%${filter.site_id}%' 
    AND [uc_id:1] LIKE '%${filter.site_id}%' 
    AND [site_id:1] LIKE '%${filter.site_id}%' 
    AND otp_id NOT IN ( SELECT otp_id FROM oneTableGeo WHERE reg_date < '${filter.start_date}' AND [exit_date:1] < '${filter.start_date}' ) 
GROUP BY
    age_group,
    gender `;
        qry.add = `SELECT
    ( CASE WHEN age BETWEEN 1 AND 5 THEN '0-6 Months' WHEN age BETWEEN 6 AND 23 THEN '6-23 Months' WHEN age BETWEEN 24 AND 59 THEN '24-59 Months' END ) age_group,
    gender,
    count( CASE WHEN muac < 11.5 AND ent_reason = 'new_add' AND oedema = 'absent' THEN 1 END ) b1,
    count( CASE WHEN oedema <> 'absent' AND ent_reason = 'new_add' THEN 1 END ) b2,
    (
    count( CASE WHEN muac < 11.5 AND ent_reason = 'new_add' AND oedema = 'absent' THEN 1 END ) + count( CASE WHEN oedema <> 'absent' AND ent_reason = 'new_add' THEN 1 END ) 
    ) b,
    count( CASE WHEN ent_reason = 'relapse' THEN 1 END ) c1,
    count( CASE WHEN ent_reason = 'return_after_lama' THEN 1 END ) c2,
    count( CASE WHEN ent_reason = 'transfer_from_ward' THEN 1 END ) c3,
    count( CASE WHEN ent_reason = 'transfer_in_from_otp' THEN 1 END ) c4,
    count( CASE WHEN ent_reason = 'other' THEN 1 END ) c5,
    count( CASE WHEN ent_reason <> 'new_add' THEN 1 END ) c 
FROM
    oneTableGeo
WHERE
    prog_type = 'sc'
    AND (reg_date BETWEEN '${filter.start_date}' AND '${filter.end_date}')
    AND [province_id:1] LIKE '%${filter.province_id}%' 
    AND [district_id:1] LIKE '%${filter.district_id}%' 
    AND [tehsil_id:1] LIKE '%${filter.tehsil_id}%' 
    AND [uc_id:1] LIKE '%${filter.uc_id}%' 
    AND [site_id:1] LIKE '%${filter.site_id}%' 
    GROUP BY
    age_group,
    gender`
        qry.exit = `select ( CASE WHEN age BETWEEN 1 AND 5 THEN '0-6 Months' WHEN age BETWEEN 6 AND 23 THEN '6-23 Months' WHEN age BETWEEN 24 AND 59 THEN '24-59 Months' END ) age_group, gender,
    count(case when [exit_reason:1] = 'cured' then 1 end) as e1,
    count(case when [exit_reason:1] = 'death' then 1 end) as e2,
    count(case when [exit_reason:1] = 'lama' then 1 end) as e3,
    count(case when [exit_reason:1] = 'non_recovered' then 1 end) as e4,
    (count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'lama' then 1 end) + count(case when [exit_reason:1] = 'non_recovered' then 1 end)) as e,
    count(case when [exit_reason:1] = 'medical_transfer' then 1 end) as f1,
    count(case when [exit_reason:1] = 'medical_transfer_otp' then 1 end) as f2,
    count(case when [exit_reason:1] = 'other' then 1 end) as f3,
    (count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_otp' then 1 end) + count(case when [exit_reason:1] = 'other' then 1 end)) as f,
    ((count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'lama' then 1 end) + count(case when [exit_reason:1] = 'non_recovered' then 1 end)) + (count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_otp' then 1 end) + count(case when [exit_reason:1] = 'other' then 1 end))) as g 
    from oneTableGeo
    WHERE
        [exit_date:1] BETWEEN '${filter.start_date}' AND '${filter.end_date}' 
        AND prog_type = 'sc' 
        AND [province_id:1] LIKE '%${filter.site_id}%' 
        AND [district_id:1] LIKE '%${filter.site_id}%' 
        AND [tehsil_id:1] LIKE '%${filter.site_id}%' 
        AND [uc_id:1] LIKE '%${filter.site_id}%' 
        AND [site_id:1] LIKE '%${filter.site_id}%' 
        GROUP BY
        age_group,
        gender `
        return qry;
    } else if (filter.prog_type == 'otp') {
        qry.begin = `select count(*) as a, (case when age BETWEEN 6 and 23 then '6-23 Months' when age BETWEEN 24 and 59 then '24-59 Months' end) as age_group, gender from oneTableGeo where reg_date < '${filter.start_date}' and prog_type = 'otp' and [province_id:1] like '%${filter.province_id}%' and [district_id:1] like '%${filter.district_id}%' and [tehsil_id:1] like '%${filter.tehsil_id}%' and [uc_id:1] like '%${filter.uc_id}%' and [site_id:1] like '%${filter.site_id}%' and otp_id not in (select otp_id from oneTableGeo where  reg_date < '${filter.start_date}' and [exit_date:1] < '${filter.start_date}')
        group by age_group, gender`
        qry.add = `select (case when age BETWEEN 6 and 23 then '6-23 Months' when age BETWEEN 24 and 59 then '24-59 Months' end) as age_group,
        gender,
        count(case when muac < 11.5  and ent_reason = 'no_prv_pro' and oedema = 'absent' then 1 end) as b1,  
        count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end) as b2,
        ( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' and oedema = 'absent' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) as b,
        count(case when ent_reason = 'return_def' then 1 end) as c1,
        count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) as c2,
        count(case when (ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro') then 1 end) as c3,
        count(case when ent_reason = 'relapse' then 1 end) as cc,
        (  count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro' then 1 end) )  as c,
        (( count(case when muac < 11.5  and ent_reason = 'no_prv_pro' and oedema = 'absent' then 1 end) + count(case when oedema <> 'absent' and ent_reason = 'no_prv_pro' then 1 end)) + (count(case when ent_reason = 'relapse' then 1 end)) + (count(case when ent_reason = 'return_def' then 1 end) + count(case when ent_reason = 'transfer_in_from_nsc' then 1 end) + count(case when ent_reason <> 'transfer_in_from_nsc' and  ent_reason <> 'return_def' and ent_reason <> 'relapse' and ent_reason <> 'no_prv_pro' then 1 end))) as d
        from oneTableGeo
        where (reg_date >= '${filter.start_date}' and reg_date <= '${filter.end_date}') and prog_type='otp' and [province_id:1] like '%${filter.province_id}%' and [district_id:1] like '%${filter.district_id}%' and [tehsil_id:1] like '%${filter.tehsil_id}%' and [uc_id:1] like '%${filter.uc_id}%' and [site_id:1] like '%${filter.site_id}%'
        group by age_group, gender`;
        qry.exit = `select (case when age BETWEEN 6 and 23 then '6-23 Months' when age BETWEEN 24 and 59 then '24-59 Months' end) as age_group,
        gender,
        count(case when [exit_reason:1] = 'cured' then 1 end) as e1,
        count(case when [exit_reason:1] = 'death' then 1 end) as e2,
        count(case when [exit_reason:1] = 'defaulter' then 1 end) as e3,
        count(case when [exit_reason:1] = 'non_respondent' then 1 end) as e4,
        (count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'defaulter' then 1 end) + count(case when [exit_reason:1] = 'non_respondent' then 1 end)) as e,
        count(case when [exit_reason:1] = 'medical_transfer' then 1 end) as f1,
        count(case when [exit_reason:1] = 'medical_transfer_sc' then 1 end) as f2,
        count(case when [exit_reason:1] <> 'cured' and [exit_reason:1] <> 'death' and [exit_reason:1] <> 'defaulter' and [exit_reason:1] <> 'non_respondent' and [exit_reason:1] <> 'medical_transfer' and [exit_reason:1] <> 'medical_transfer_sc' then 1 end) as f3,
        (count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_sc' then 1 end) + count(case when [exit_reason:1] <> 'cured' and [exit_reason:1] <> 'death' and [exit_reason:1] <> 'defaulter' and [exit_reason:1] <> 'non_respondent' and [exit_reason:1] <> 'medical_transfer' and [exit_reason:1] <> 'medical_transfer_sc' then 1 end)) as f,
        ((count(case when [exit_reason:1] = 'medical_transfer' then 1 end) + count(case when [exit_reason:1] = 'medical_transfer_sc' then 1 end) + count(case when [exit_reason:1] <> 'cured' and [exit_reason:1] <> 'death' and [exit_reason:1] <> 'defaulter' and [exit_reason:1] <> 'non_respondent' and [exit_reason:1] <> 'medical_transfer' and [exit_reason:1] <> 'medical_transfer_sc' then 1 end)) +(count(case when [exit_reason:1] = 'cured' then 1 end)+ count(case when [exit_reason:1] = 'death' then 1 end) + count(case when [exit_reason:1] = 'defaulter' then 1 end) + count(case when [exit_reason:1] = 'non_respondent' then 1 end))) as g 
        from oneTableGeo
        where ([exit_date:1] >= '${filter.start_date}' and [exit_date:1] <= '${filter.end_date}') and prog_type = 'otp' and [province_id:1] like '%${filter.province_id}%' and [district_id:1] like '%${filter.district_id}%' and [tehsil_id:1] like '%${filter.tehsil_id}%' and [uc_id:1] like '%${filter.uc_id}%' and [site_id:1] like '%${filter.site_id}%'
        group by age_group, gender`
        return qry;
    }

}


var otpColsSummary = [{
        title: 'Age Group',
        data: '_age'
    },
    {
        title: 'Gender',
        data: null,
        render: function (data, type, row) {
            return data._gender.toUpperCase();
        }
    },
    {
        title: `Total in OTP beginning of the month (A)`,
        data: 'begin.a'
    },
    {
        title: `MUAC < 11.5 cm (B1)`,
        data: 'add.b1'
    },
    {
        title: `ODEMA(B2)`,
        data: 'add.b2'
    },
    {
        title: 'Total New Admission (B=B1+B2)',
        data: 'add.b'
    },
    {
        title: 'Return After Default(C1)',
        data: 'add.c1'
    },
    {
        title: 'Transfer from SC (C2)',
        data: 'add.c2'
    },
    {
        title: 'Other (C3)',
        data: 'add.c3'
    },
    {
        title: 'Relapse After Cure (CC)',
        data: 'add.cc'
    },
    {
        title: 'Total Moved In \n(C=C2+C2+C3)',
        data: 'add.c'
    },
    {
        title: 'Total In (D=A+B+C+CC)',
        data: null,
        render: function (data, type, row) {
            return (data.begin.a + data.add.cc + data.add.c + data.add.b)
        }
    },
    {
        title: 'Cured (E1)',
        data: 'exit.e1'
    },
    {
        title: 'Death (E2)',
        data: 'exit.e2'
    },
    {
        title: 'Defaulter (E3)',
        data: 'exit.e3'
    },
    {
        title: 'No Recovered (E4)',
        data: 'exit.e4'
    },
    {
        title: 'Total Discharged (E=E1+E2+E3+E4)',
        data: 'exit.e'
    },
    {
        title: 'Medical Transfer (F1)',
        data: 'exit.f1'
    },
    {
        title: 'Transfer to In patient (F2)',
        data: 'exit.f2'
    },
    {
        title: 'Other (F3)',
        data: 'exit.f3'
    },
    {
        title: 'Total Moved Out (F=F1+F2+F3)',
        data: 'exit.f'
    },
    {
        title: 'Total Exit (G=E+F)',
        data: 'exit.g'
    },
    {
        title: 'Total In OTP end of the month (H=D-G)',
        data: null,
        render: function (data, type, row) {
            // console.log(data);
            return ((data.begin.a + data.add.cc + data.add.c + data.add.b) - data.exit.g)
        }
    }
]

var scColsSummary = [{
        title: 'Age Group',
        data: 'age_group'
    },
    {
        title: 'Gender',
        data: null,
        render: function (data, type, row) {
            return data.gender.toUpperCase();
        }
    },
    {
        title: `Total in NSC beginning of the month (A)`,
        data: 'a'
    },
    {
        title: `MUAC < 11.5 cm (B1)`,
        data: 'b1'
    },
    {
        title: `ODEMA(B2)`,
        data: 'b2'
    },
    {
        title: 'Total New Admission (B=B1+B2)',
        data: 'b'
    },
    {
        title: 'Relapse After Cure(C1)',
        data: 'c1'
    },
    {
        title: 'Return after LAMA (C2)',
        data: 'c2'
    },
    {
        title: 'Transfer From Ward (C3)',
        data: 'c3'
    },
    {
        title: 'Transfer from OTP (CC)',
        data: 'c4'
    },
    {
        title: 'Other',
        data: 'c5'
    },
    {
        title: 'Total Moved In \n(C=C2+C2+C3+C4+C5)',
        data: 'c'
    },
    {
        title: 'Total In (D=A+B+C)',
        data: null,
        render: function (data, type, row) {
            return (data.a + data.c + data.b)
        }
    },
    {
        title: 'Cured (E1)',
        data: 'e1'
    },
    {
        title: 'Death (E2)',
        data: 'e2'
    },
    {
        title: 'LAMA (E3)',
        data: 'e3'
    },
    {
        title: 'No Recovered (E4)',
        data: 'e4'
    },
    {
        title: 'Total Discharged (E=E1+E2+E3+E4)',
        data: 'e'
    },
    {
        title: 'Medical Transfer (F1)',
        data: 'f1'
    },
    {
        title: 'Transfer to OTP (F2)',
        data: 'f2'
    },
    {
        title: 'Other (F3)',
        data: 'f3'
    },
    {
        title: 'Total Moved Out (F=F1+F2+F3)',
        data: 'f'
    },
    {
        title: 'Total Exit (G=E+F)',
        data: 'g'
    },
    {
        title: 'Total In OTP end of the month (H=D-G)',
        data: null,
        render: function (data, type, row) {
            return ((data.a + data.c + data.b) - data.g)
        }
    }
]

function otpSummaryDataTable(table_id, data, filter, cols) {
    if ($.fn.DataTable.isDataTable('#' + table_id)) {
        $('#' + table_id).DataTable().destroy();
    }
    $('#' + table_id).empty();
    $('#' + table_id).DataTable({
        order: [
            [0, 'desc'],
            [1, 'asc']
        ],
        data,
        dom: 'Bfrtip',
        buttons: [
            'copy', {
                extend: 'csv',
                title: `${filter.prog_type.toUpperCase()} Admission and Exit Report_${Date.now()}`
            }, {
                extend: 'excel',
                title: `${filter.prog_type.toUpperCase()} Admission and Exit Report_${Date.now()}`
            }
        ],
        "scrollX": true,
        columns: cols
    });
}

const singleTables = (addTableEl, exitTableEl, add, exit) => {
    if ($.fn.DataTable.isDataTable('#' + addTableEl)) {
        $('#' + addTableEl).DataTable().destroy();
    }
    $('#' + addTableEl + 'tbody').empty();
    $('#' + addTableEl).DataTable({
        data: add,
        "paging": false,
        "scrollY": 380,
        "scrollX": true,
        columns: [{
                title: 'Province',
                data: 'province'
            },
            {
                title: 'District',
                data: 'district_name'
            },
            {
                title: 'Tehsil',
                data: 'tehsil_name'
            },
            {
                title: 'UC',
                data: 'uc_name'
            },
            {
                title: 'Site Name',
                data: 'site_name'
            },
            {
                title: 'Registration Date',
                data: 'reg_date'
            },
            {
                title: 'Registration ID',
                data: null,
                render: function (data, type, row) {
                    return data.reg_id.toString();
                }
            },
            {
                title: 'Name',
                data: 'p_name'
            },
            {
                title: 'Age',
                data: 'age'
            },
            {
                title: 'Gender',
                data: 'gender'
            },
            {
                title: 'Father/Husband Name',
                data: 'f_or_h_name'
            },
            {
                title: 'CNIC',
                data: 'cnic'
            },
            {
                title: 'Contact Number',
                data: 'cnt_number'
            },
            {
                title: 'Address',
                data: 'address'
            },
            {
                title: 'Entry Reason',
                // data: '',
                data: null,
                render: function (data, type, row) {
                    if (data.ent_reason == 'no_prv_pro') {
                        return 'new'
                    } else {
                        return data.ent_reason
                    }
                }
            },
            {
                title: 'Referral Type',
                data: 'ref_type'
            },
            {
                title: 'Oedema',
                data: 'oedema'
            },
            {
                title: 'MUAC',
                data: 'muac'
            },
            {
                title: 'Weight',
                data: 'weight'
            },
            {
                title: 'Height',
                data: 'height'
            },
            {
                title: 'Z Score',
                data: 'z_score'
            },
            {
                title: 'Diarrhoea',
                data: 'diarrhoea'
            },
            {
                title: 'vomiting',
                data: 'vomiting'
            },
            {
                title: 'cough',
                data: 'cough'
            },
            {
                title: 'Appetite',
                data: 'appetite'
            },
            {
                title: 'Daily Stool',
                data: 'daily_stool'
            },
            {
                title: 'Urine',
                data: 'pass_urine'
            },
            {
                title: 'Breast Fed',
                data: 'b_Feeding'
            }
        ]
    })

    if ($.fn.DataTable.isDataTable('#' + exitTableEl)) {
        $('#' + exitTableEl).DataTable().destroy();
    }
    $('#' + exitTableEl + 'tbody').empty();
    $('#' + exitTableEl).DataTable({
        data: exit,
        "paging": false,
        "scrollY": 380,
        "scrollX": true,
        columns: [{
                title: 'Province',
                data: 'province'
            },
            {
                title: 'District',
                data: 'district_name'
            },
            {
                title: 'Tehsil',
                data: 'tehsil_name'
            },
            {
                title: 'UC',
                data: 'uc_name'
            },
            {
                title: 'Site Name',
                data: 'site_name'
            },
            {
                title: 'Village',
                data: 'site_village'
            },
            {
                title: 'Registration Date',
                data: 'reg_date'
            },
            {
                title: 'Exit Date',
                data: 'exit_date:1'
            },
            {
                title: 'Registration ID',
                data: 'reg_id'
            },
            {
                title: 'Name',
                data: 'p_name'
            },
            {
                title: 'Age',
                data: 'age'
            },
            {
                title: 'Gender',
                data: 'gender'
            },
            {
                title: 'Father/Husband Name',
                data: 'f_or_h_name'
            },
            {
                title: 'Address',
                data: 'address'
            },
            {
                title: 'Exit MUAC',
                data: 'exit_muac:1'
            },
            {
                title: 'Exit Weight',
                data: 'exit_weight:1'
            },
            {
                title: 'Exit Reason',
                data: 'exit_reason:1'
            },
            {
                title: 'Total Followups',
                data: 'total_followups'
            },
            {
                title: 'Total Days',
                data: 'days_in_program'
            }
        ]
    })
}

module.exports.OTPReport = async function () {
    // drop down selections
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
            var province = $('#ddProvince option:selected').text();
            $('#adrProvince').val(province);
        })
        $('#ddDistrict').on('change', function () {
            var dist = $(this).val();
            ipc.send('getTehsil', dist)
            ipc.on('tehsil', function (evt, tehsil) {
                $('#ddTehsil').children('option:not(:first)').remove();
                teh(tehsil);
            })
            var district = $('#ddDistrict option:selected').text();
            $('#adrDistrict').val(district);
        })
        $('#ddTehsil').on('change', async function () {
            var tehs = $(this).val();
            ipc.send('getUC', tehs)
            ipc.on('uc', function (evt, uc) {
                $('#ddUC').children('option:not(:first)').remove();
                ucListener(uc);
            })
            if ($('#ddProgramType').val() == 'sc') {
                try {
                    var _listNsc = await knex('v_geo_active').where({
                        tehsil_id: tehs,
                        SC: 1
                    })
                    $('#nsc_old_otp_id').attr('data-inputmask', "'mask':'NSC-999999'")
                    nscList(_listNsc, 'ddHealthHouse');
                } catch (error) {
                    console.log(error)
                }
            }
        })
        var ucForHH;
        $('#ddUC').on('change', function () {
            var ucs = $(this).val();
            ucForHH = ucs
            ipc.send('getHealthHouse', ucs)
            ipc.on('hh', function (evt, hh) {
                $('#ddHealthHouse').children('option:not(:first)').remove();
                hhListener(hh);
            })
        })
        $('#ddHealthHouse').on('change', function () {

            var h_id = $(this).val();
            ipc.send("getVillage", h_id);
            ipc.on("haveVillage", (evt, _villages) => {
                $("#ddVillageName")
                    .children("option:not(:first)")
                    .remove();
                villListener(_villages);

            });
            ipc.send('getHealthHouseType', h_id)
            ipc.on('hhType', function (evt, hh) {
                hhTypeListener(h_id, hh);

            })
        })
    });

    // Triggers elements
    var showData = $('#showData')
    var exportData = $('#exportData')
    // my filters
    $('#otpReportFilerForm').on('submit', function (e) {
        e.preventDefault();
    })

    showData.on('click', async function () {
        var filter = prepareQry();
        var _qry = qryStringPrepare(filter);
        try {
            var add = await knex.raw(_qry.add)
            var begin = await knex.raw(_qry.begin)
            var exit = await knex.raw(_qry.exit)
            var _newData = [{
                add,
                begin,
                exit
            }]

        } catch (error) {
            console.log(error)
        }
        var d1 = new Date(filter.start_date);
        var d2 = new Date(filter.end_date);
        if (!filter.prog_type || !filter.start_date || !filter.end_date) {
            if (!filter.prog_type) {
                alert('Please select Program Type')
            } else if (!filter.start_date) {
                alert('Please select Start Date')
            } else if (!filter.end_date) {
                alert('Please select End Date')
            }
        } else if (d2 < d1) {
            alert('End date must by greater than Start date')
        } else {
            // console.log(knex.raw(_qry).toString())

            try {
                Swal.fire({
                    title: 'Please wait',
                    html: `<div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>`,
                    showCloseButton: false
                })
                var summary = await SummaryArray(_newData[0])
                var Add = await knex('oneTableGeo')
                    .whereBetween("reg_date", [filter.start_date, filter.end_date])
                    .where('site_id:1', 'like', `%${filter.site_id}%`)
                    .where('province_id:1', 'like', `%${filter.province_id}%`)
                    .where('district_id:1', 'like', `%${filter.district_id}%`)
                    .where('tehsil_id:1', 'like', `%${filter.tehsil_id}%`)
                    .where('uc_id:1', 'like', `%${filter.uc_id}%`)
                    .where({
                        prog_type: filter.prog_type
                    })
                var Exit = await knex('oneTableGeo')
                    .whereBetween("exit_date:1", [filter.start_date, filter.end_date])
                    .where('site_id:1', 'like', `%${filter.site_id}%`)
                    .where('province_id:1', 'like', `%${filter.province_id}%`)
                    .where('district_id:1', 'like', `%${filter.district_id}%`)
                    .where('tehsil_id:1', 'like', `%${filter.tehsil_id}%`)
                    .where('uc_id:1', 'like', `%${filter.uc_id}%`)
                    .where({
                        prog_type: filter.prog_type
                    })
                var _cols = filter.prog_type == 'sc' ? scColsSummary : otpColsSummary;
                // otpSummaryDataTable('otpSumamry', summary, filter, _cols);
                singleTables('addTableReport', 'exitTableReport', Add, Exit)
                Swal.close();

            } catch (error) {
                console.log(error);
                alert('Report fetching error, please contact administrator with error code: Report-DB000')
            }
        }
    });


    var XLSX = require("xlsx");
    var electron = require("electron").remote;

    var export_xlsx = (function () {
        // var HTMLOUT = document.getElementById('htmlout');
        var XTENSION = "xls|xlsx|xlsm|xlsb|xml|csv|txt|dif|sylk|slk|prn|ods|fods|htm|html".split(
            "|"
        );
        return function () {
            var addExitReport = XLSX.utils.book_new();
            var summaryReport = XLSX.utils.table_to_sheet(document.getElementById('otpSumamry'));
            XLSX.utils.book_append_sheet(addExitReport, summaryReport, "Summary")
            /* convert table 'table2' to worksheet named "Sheet2" */
            var Admissions = XLSX.utils.table_to_sheet(document.getElementById("addTableReport"));
            XLSX.utils.book_append_sheet(addExitReport, Admissions, "Admissions");
            var Exits = XLSX.utils.table_to_sheet(document.getElementById("exitTableReport"));
            XLSX.utils.book_append_sheet(addExitReport, Exits, "Exits");
            // var wb = XLSX.utils.table_to_book(HTMLOUT);
            // console.log(addExitReport.Workbook.Names)
            var o = electron.dialog.showSaveDialog({
                title: "Save file as",
                filters: [{
                    name: "Spreadsheets",
                    extensions: XTENSION
                }]
            });
            // console.log(o);
            XLSX.writeFile(addExitReport, o);
            electron.dialog.showMessageBox({
                message: "Exported data to " + o,
                buttons: ["OK"]
            });
        };
    })();
    void export_xlsx;


    exportData.on('click', function () {
        export_xlsx();
    });


}

const SummaryArray = async function (data) {
    let _data = [{
            name: "cat_623_m",
            _gender: `male`,
            _age: '6-23 Months'
        },
        {
            name: "cat_623_f",
            _gender: `female`,
            _age: '6-23 Months'
        },
        {
            name: "cat_2459_m",
            _gender: `male`,
            _age: '24-59 Months'
        },
        {
            name: "cat_2459_f",
            _gender: `female`,
            _age: '24-59 Months'
        }
    ]

    for (_x in _data) {

        //Pushing add;
        if (!data.add.filter(function (el) {
                // console.log(el)
                if (el.age_group == _data[_x]._age && el.gender == _data[_x]._gender) {
                    _data[_x].add = el;
                    return true
                } else {
                    return false
                }
            })) {
            var add = {
                b: 0,
                b1: 0,
                b2: 0,
                c: 0,
                c1: 0,
                c2: 0,
                c3: 0,
                cc: 0,
                d: 0,

            }
            _data[_x].add = add;
        }
        // Pushing begin;
        if (!data.begin.filter(function (el) {
                if (el.age_group == _data[_x]._age && el.gender == _data[_x]._gender) {
                    _data[_x].begin = el;
                    return true
                } else {
                    return false
                }
            })) {
            var begin = {
                b: 0
            }
            _data[_x].begin = begin;
        }
        //Pushing exit;
        if (!data.exit.filter(function (el) {
                if (el.age_group == _data[_x]._age && el.gender == _data[_x]._gender) {
                    _data[_x].exit = el;
                    return true
                } else {
                    return false
                }
            })) {
            var exit = {
                b: 0,
                e: 0,
                e1: 0,
                e2: 0,
                e3: 0,
                e4: 0,
                f: 0,
                f1: 0,
                f2: 0,
                f3: 0,
                g: 0
            }
            _data[_x].exit = exit

        }
    }

    console.log(_data)
    return _data

}

const otpFooterCallback = function (row, data, start, end, display) {
    var api = this.api();

    api.columns('.sum', {
        page: 'current'
    }).every(function () {
        console.log(this.data())
        var sum = this
            .data()
            .reduce(function (a, b) {
                var x = parseFloat(a) || 0;
                var y = parseFloat(b) || 0;
                return x + y;
            }, 0);
        console.log(sum); //alert(sum);
        $(this.footer()).html(sum);
    });
}