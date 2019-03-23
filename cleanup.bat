@echo off
del /f  "%APPDATA%\ACF MIS Local app\acf_mis_local.sqlite3"
del /f  "%APPDATA%\ACF MIS Local app\config.json"
echo  "%APPDATA%\ACF MIS Local app\acf_mis_local.sqlite3" file deleted
pause