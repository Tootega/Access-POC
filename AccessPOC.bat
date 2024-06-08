set RelativePath=%~dp0%
set BinPath=%RelativePath%\..\..\DASE4VSBin\
set home=C:\Users\hxpel\AppData\Local\Microsoft\VisualStudio\17.0_a02ecc5bPOC\Extensions\jqavwlii.4lg
set work=C:\Users\hxpel\AppData\Local\Microsoft\VisualStudio\17.0_f0f82a98POC\Extensions\gzgpikp4.ubb
if exist %work% set VSIX=%work%
if exist %home% set VSIX=%home%

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

:NOCOPY
cd %RelativePath%
if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe"  "%ProgramFiles%\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe" /rootSuffix APOC AccessPOC.sln
if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Preview\Common7\IDE\devenv.exe"     "%ProgramFiles%\Microsoft Visual Studio\2022\Preview\Common7\IDE\devenv.exe"  /rootSuffix APOC AccessPOC.sln

goto fim

:ERRO
pause
:fim

