# Dedicated CS2-server-launcher
Another update:

Support for setting your own path to CS2.exe is now availible, find the new release in the Releases section
or clone the new code. The path will be stored in the config.ini file alongside the .exe file provided in the release. Thank you! 

Shoutout to u/herbie710/ for reminding me of the need for this.

---------------

Update: This got abit more attention than I anticipated, which is always nice!
One caveat from this is that this application assumes that Steam is installed in the default directory,
"C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\bin\win64\cs2.exe",
so if you dont have it installed here, it will not find it for you, yet. Will look into making a check for this
at the start of the application. Thank you.

----------------

This is an simple Console Application for launching a dedicated CS2 server on Windows.
This is for the non-tech savvy who does not want to be doing this the hard way.

This application needs to be run as administrator, this is because we need to add a firewall exception to port 27015,
so that clients can communicate with the server locally. For anything internet releated, you are on your own.

1. Select game mode
2. Select map
3. Select launch server
4. On the first run, the application will ask for your CS2.exe file path, normally this will be "C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\bin\win64\cs2.exe" but if you have it somewhere else or another drive, please enter this into the path and the application will store it.
5. Enjoy.

This is a simple solution before Valve makes a proper solution, use it at your own risk.
If you have anything you want to add, please make a PR or fork this progress, its no problem.

![bilde](https://github.com/mortenlein/CS2-server-launcher/assets/3304457/2e506b8a-c22d-4550-8651-23ea11551642)

![bilde](https://github.com/mortenlein/CS2-server-launcher/assets/3304457/ecb26521-f3fc-405d-8621-7f2a9759354d)

![bilde](https://github.com/mortenlein/CS2-server-launcher/assets/3304457/19cec711-d684-4a11-9c73-1308c55f30fb)
