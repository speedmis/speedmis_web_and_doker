<?php

/*
if(requestVB("gubun")=="1028" && requestVB("idx")!="" && requestVB("idx")!="0") {
    $sql_hit = " if not exists(select * from MisReadList where RealPid=N'rbk001009' and widx=N'$idx' and userid=N'$MisSession_UserID') 
    insert into MisReadList (RealPid, widx, userid, 자격, readDate) values (N'rbk001009', N'$idx', N'$MisSession_UserID', '조회', getdate()) 
    else if exists(select * from MisReadList where RealPid=N'rbk001009' and widx=N'$idx' and userid=N'$MisSession_UserID' 
    and readDate is null and 자격 in ('조회','필독'))
    update MisReadList set readDate=getdate() where RealPid=N'rbk001009' and widx=N'$idx' 
    and userid=N'$MisSession_UserID' and 자격 in ('조회','필독')
    ";

	//echo $sql_hit;
	execSql($sql_hit);
} else if(requestVB("gubun")=="1029" && requestVB("idx")!="" && requestVB("idx")!="0") {
    $sql_hit = " if not exists(select * from MisReadList where RealPid=N'rbk001012' and widx=N'$idx' and userid=N'$MisSession_UserID') 
    insert into MisReadList (RealPid, widx, userid, 자격, readDate) values (N'rbk001012', N'$idx', N'$MisSession_UserID', '조회', getdate()) 
    else if exists(select * from MisReadList where RealPid=N'rbk001012' and widx=N'$idx' and userid=N'$MisSession_UserID' 
    and readDate is null and 자격 in ('조회','필독'))
    update MisReadList set readDate=getdate() where RealPid=N'rbk001012' and widx=N'$idx' 
    and userid=N'$MisSession_UserID' and 자격 in ('조회','필독')
    ";

	//echo $sql_hit;
	execSql($sql_hit);
}
*/

?>