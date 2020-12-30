var knex = require('../db');
var fs = require('fs');
var appConfig = JSON.parse(fs.readFileSync(`${process.env.APPDATA}/acf_mis_local_rspn/config.json`, 'utf8'))
module.exports = function () {
    knex('tblStock').whereNull('org_name')
        .then(result => {
            if (result.length) {
                return knex('tblStock').update({
                    org_name: appConfig.org_name,
                    project_name: appConfig.project_name
                })
            } else {
                console.log('tblStock already updated')
                return 'updated'
            }
        }).then(result => {
            if (result != 'updated') {
                var script = `SAVEPOINT [sqlite_expert_apply_design_transaction];

                DROP VIEW IF EXISTS [main].[vSessionsFullForUpdate];
                
                CREATE VIEW [main].[vSessionsFullForUpdate]
                AS
                SELECT 
                       [main].[v_geo_active].[province], 
                       [main].[v_geo_active].[province_id], 
                       [main].[v_geo_active].[district_id], 
                       [main].[v_geo_active].[district_name], 
                       [main].[v_geo_active].[tehsil_id], 
                       [main].[v_geo_active].[tehsil_name], 
                       [main].[v_geo_active].[uc_name], 
                       [main].[v_geo_active].[site_name] AS [site_name], 
                       [tblSessions].*
                FROM   [main].[tblSessions]
                       INNER JOIN [main].[v_geo_active] ON ([main].[v_geo_active].[site_id] = [main].[tblSessions].[site_id])
                WHERE  [tblsessions].[is_deleted] = 0
                UNION ALL
                SELECT 
                       [main].[v_geo_lhw].[province], 
                       [main].[v_geo_lhw].[province_id], 
                       [main].[v_geo_lhw].[district_id], 
                       [main].[v_geo_lhw].[district_name], 
                       [main].[v_geo_lhw].[tehsil_id], 
                       [main].[v_geo_lhw].[tehsil_name], 
                       [main].[v_geo_lhw].[uc_name], 
                       '' AS [site_name], 
                       [tblSessions].*
                FROM   [main].[tblSessions]
                       INNER JOIN [main].[v_geo_lhw] ON ([main].[v_geo_lhw].[uc_id] = [main].[tblSessions].[uc_id]
                            AND [main].[tblSessions].[CHW_id] = [main].[v_geo_lhw].[staff_code])
                WHERE  [tblsessions].[is_deleted] = 0;
                
                RELEASE [sqlite_expert_apply_design_transaction];
                `
                var qry = script.split(';');
                for (x of qry) {
                    knex.raw(x)
                        .then(console.log)
                        .catch(console.log)
                }
            }
        }).catch(console.log)
}();