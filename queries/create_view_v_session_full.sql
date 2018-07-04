create view v_session_full as
SELECT 
       [v_geo].*, 
       [tblSessions].*
FROM   [main].[v_geo]
       INNER JOIN [main].[tblSessions] ON [main].[tblSessions].[site_id] = [main].[v_geo].[site_id];

