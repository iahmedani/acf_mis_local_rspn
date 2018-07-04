create view v_otpExit_full as
SELECT 
       [v_geo].*, 
       [v_OtpExit].*
FROM   [main].[v_geo]
       INNER JOIN [main].[v_OtpExit] ON [main].[v_OtpExit].[site_id] = [main].[v_geo].[site_id];

