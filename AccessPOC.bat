set RelativePath=%~dp0%
set BinPath=D:\Tootega\DASE4VSBin
set home=C:\Users\hxpel\AppData\Local\Microsoft\VisualStudio\17.0_a02ecc5bPOC\Extensions\jqavwlii.4lg
set work=C:\Users\Hermes\AppData\Local\Microsoft\VisualStudio\17.0_a6cd2588SITTAX\Extensions\zjwpbken.z00
set work2=C:\Users\pcsit\AppData\Local\Microsoft\VisualStudio\17.0_d6c329b1\Extensions\aeej5onu.ums
if exist %work% set VSIX=%work%
if exist %home% set VSIX=%home%
if exist %work2% set VSIX=%work2%

if [%BinPath%] == [] goto ERRO
if [%VSIX%] == [] goto NOCOPY

set DeployType=None

cd %BinPath%\


copy TFX.DASE*.* %VSIX%\
IF ERRORLEVEL 1 GOTO ERRO 

copy DASE.VSIX.Core.* %VSIX%\
IF ERRORLEVEL 1 GOTO ERRO

copy DASE4VS.dll %VSIX%\
IF ERRORLEVEL 1 GOTO ERRO
copy DASE4VS.pkgdef %VSIX%\
IF ERRORLEVEL 1 GOTO ERRO

copy *.pak %VSIX%\
IF ERRORLEVEL 1 GOTO ERRO
set SQL_SERVER_CONEXAO=Server=localhost;Initial Catalog=SITTAX-POC;Persist Security Info=False;Integrated Security=true;MultipleActiveResultSets=true;Encrypt=false;TrustServerCertificate=true;Connection Timeout=300;
:NOCOPY
cd %RelativePath%
if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe"  "%ProgramFiles%\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe" /rootSuffix SITTAX AccessPOC.sln
if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Preview\Common7\IDE\devenv.exe" "%ProgramFiles%\Microsoft Visual Studio\2022\Preview\Common7\IDE\devenv.exe" /rootSuffix SITTAX AccessPOC.sln
if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Professional\Common7\IDE\devenv.exe" "%ProgramFiles%\Microsoft Visual Studio\2022\Professional\Common7\IDE\devenv.exe" /rootSuffix SITTAX AccessPOC.sln

goto fim

:ERRO
pause
:fim

