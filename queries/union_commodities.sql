select ration1 as ration, quantity1 as quantity from tblOtpAdd WHERE ration1 <> ''
UNION ALL
select ration2 as ration, quantity2 as quantity from tblOtpAdd WHERE ration2
<> ''
UNION ALL 
select ration3 as ration, quantity3 as quantity from tblOtpAdd WHERE ration3
<> ''
UNION ALL
select ration1 as ration, quantity1 as quantity from tblOtpFollowup WHERE ration1
<> ''
UNION ALL
select ration2 as ration, quantity2 as quantity from tblOtpFollowup WHERE ration2
<> ''
UNION ALL 
select ration3 as ration, quantity3 as quantity from tblOtpFollowup WHERE ration3
<> '';

select ration , sum(quantity) as tQuantity
from (            select ration1 as ration, quantity1 as quantity
    from tblOtpAdd
    WHERE ration1 <> ''
  UNION ALL
    select ration2 as ration, quantity2 as quantity
    from tblOtpAdd
    WHERE ration2
<> ''
  UNION ALL
    select ration3 as ration, quantity3 as quantity
    from tblOtpAdd
    WHERE ration3
<> ''
  UNION ALL
    select ration1 as ration, quantity1 as quantity
    from tblOtpFollowup
    WHERE ration1
<> ''
  UNION ALL
    select ration2 as ration, quantity2 as quantity
    from tblOtpFollowup
    WHERE ration2
<> ''
  UNION ALL
    select ration3 as ration, quantity3 as quantity
    from tblOtpFollowup
    WHERE ration3
<> ''
)
WHERE ration is not null and quantity > 0
group by ration;
