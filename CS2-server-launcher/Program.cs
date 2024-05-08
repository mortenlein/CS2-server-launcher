using System;
using System.Diagnostics;
using System.IO;

namespace StringManipulation
{
    class Program
    {
        static void Main(string[] args)
        {
            bool showMenu = true;
            while (showMenu)
            {
                showMenu = MainMenu();
            }
        }

        public static bool MainMenu()
        {


            string selectedgameName;
            string selectedgame_type;
            string selectedgame_mode;

            Console.WriteLine(@"    __     __  __  _  _      _____                                       _____   _____  ___  ");
            Console.WriteLine(@"   / /    / / /_ || || |    / ____|                                     / ____| / ____||__ \ ");
            Console.WriteLine(@"  / /_   / /_  | || || |_  | |  __   __ _  _ __ ___    ___  _ __  ___  | |     | (___     ) |");
            Console.WriteLine(@" | '_ \ | '_ \ | ||__   _| | | |_ | / _` || '_ ` _ \  / _ \| '__|/ __| | |      \___ \   / / ");
            Console.WriteLine(@" | (_) || (_) || |   | |   | |__| || (_| || | | | | ||  __/| |   \__ \ | |____  ____) | / /_ ");
            Console.WriteLine(@"  \___/  \___/ |_|   |_|    \_____| \__,_||_| |_| |_| \___||_|   |___/  \_____||_____/ |____|");
            Console.WriteLine(@"                                                                                             ");
            Console.WriteLine(@" This is a simple console application to launch a dedicated CS2 server in Windows for the non-tech savvy");
            Console.WriteLine(@" Its a temporary solution until Valve releases a proper way to do it with server installs etc.");
            Console.WriteLine(@" This application _needs_ to be run as administrator the first time, as we need to add a firewall exception for 27015 so");
            Console.WriteLine(@" that the CS2 server can communicate with clients");
            Console.WriteLine(@"                                                                                             ");
            Console.WriteLine(@" Created by Morten Lein. Please use with care, I do not accept any responsibility for use or maintenance.");
            Console.WriteLine(@"                                                                                             ");
            Console.WriteLine("Which game mode do you want?");
            Console.WriteLine("1) Competitive");
            Console.WriteLine("2) Wingman");
            Console.WriteLine("3) Casual");
            Console.WriteLine("4) Deathmatch");
            Console.WriteLine("5) Exit");
            Console.Write("\r\nSelect an option: ");

            switch (Console.ReadLine())
            {
                case "1":
                    selectedgameName = "Competitive";
                    selectedgame_mode = "1";
                    selectedgame_type = "0";
                    SelectMap(selectedgameName, selectedgame_type, selectedgame_mode);
                    return true;
                case "2":
                    selectedgameName = "Wingman";
                    selectedgame_mode = "2";
                    selectedgame_type = "0";
                    SelectMap(selectedgameName, selectedgame_type, selectedgame_mode);
                    return true;
                case "3":
                    selectedgameName = "Casual";
                    selectedgame_mode = "0";
                    selectedgame_type = "0";
                    SelectMap(selectedgameName, selectedgame_type, selectedgame_mode);
                    return true;
                case "4":
                    selectedgameName = "Deathmatch";
                    selectedgame_mode = "2";
                    selectedgame_type = "1";
                    SelectMap(selectedgameName, selectedgame_type, selectedgame_mode);
                    return true;
                default:
                    return true;
            }
        }

        public static bool SelectMap(string selectedgameName, string selectedgame_type, string selectedgame_mode)
        {
            string selectedMap;
            
            Console.Clear();
            Console.WriteLine("Which map do you want to start with?");
            Console.WriteLine("1) Anubis");
            Console.WriteLine("2) Ancient");
            Console.WriteLine("3) Inferno");
            Console.WriteLine("4) Mirage");
            Console.WriteLine("5) Nuke");
            Console.WriteLine("6) Overpass");
            Console.WriteLine("7) Vertigo");
            Console.WriteLine("8) Custom map");
            Console.WriteLine("9) Exit");
            Console.Write("\r\nSelect an option: ");

            switch (Console.ReadLine())
            {
                case "1":
                    selectedMap = "de_anubis";
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                case "2":
                    selectedMap = "de_ancient";
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                case "3":
                    selectedMap = "de_inferno";
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                case "4":
                    selectedMap = "de_mirage";
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                case "5":
                    selectedMap = "de_nuke";
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                case "6":
                    selectedMap = "de_overpass";
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                case "7":
                    selectedMap = "de_Vertigo";
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                case "8":
                    Console.WriteLine("Please type in custom map (Name without file extension, ie. de_anubis, de_vertigo etc.");
                    selectedMap = Console.ReadLine();
                    if (string.IsNullOrEmpty(selectedMap))
                    {
                        Console.WriteLine("no map selected, exiting app");
                        Environment.Exit(0);
                    }
                    PreviewLaunch(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode);
                    return true;
                default:
                    return true;
            }
        }

        private static bool PreviewLaunch(string selectedgameName, string selectedMap, string selectedgame_type, string selectedgame_mode)
        {
            string launchit;
            Console.Clear();
            Console.WriteLine("You have selected " + selectedMap + " and your game mode is " + selectedgameName);
            Console.WriteLine("");
            Console.WriteLine("Do you want to launch the server?");
            Console.WriteLine("1) Yes");
            Console.WriteLine("2) NO");
            Console.Write("\r\nSelect an option: ");

            switch (Console.ReadLine())
            {
                case "1":
                    launchit = "1";
                    LaunchServer(selectedgameName, selectedMap, selectedgame_type, selectedgame_mode, launchit);
                    return false;
                default:
                    return false;
            }
        }


        private static string GetCs2ExePath()
        {
            string configPath = "config.ini";
            if (File.Exists(configPath))
            {
                return File.ReadAllText(configPath).Trim();
            }
            else
            {
                Console.WriteLine("Enter the full path to cs2.exe:");
                string path = Console.ReadLine();
                File.WriteAllText(configPath, path);
                return path;
            }
        }

        private static void LaunchServer(string selectedGamemode, string selectedMap, string selectedgame_type, string selectedgame_mode, string launchit)
        {
            Console.Clear();

            string cs2ExePath = GetCs2ExePath();
            Process.Start(@"netsh", "advfirewall firewall add rule name=\"CS2 Server port\" dir=in action=allow protocol=UDP localport=27015");
            Process.Start(@"C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\bin\win64\cs2.exe", "-dedicated -usercon +game_type "+selectedgame_type+" +game_mode "+selectedgame_mode+" +map " +selectedMap);
            Environment.Exit(0);
        }
    }
}