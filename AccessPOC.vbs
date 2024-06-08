Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c AccessPOC.bat"
oShell.Run strArgs, 0, false