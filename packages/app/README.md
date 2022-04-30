<center>

# ets2-job-tracker App

</center>

The Cli/App, whatever you want to call it. Used for monitoring the data sent from the ws server run by ETCars plugin and then sending it over to the API for the bot to notify the user.

## Setup

-   Head over to [constants.ts](src/lib/constants.ts) file and fill the necessary details. Read [constants](#constants) for more info.
-   Compile the code into an exe, to do so, run `yarn compile` in the current (packages/app) folder.
-   You will end up with 3 .exe files for Windows, Mac and Linux in the root directory.
-   Send the .exe to the people you want to run the tracker, based on their OS ofcourse, and ask them to run it (preferably from a cli shell such as powershell for windows).
-   You are now done with the setup for the job tracker. Enjoy!

## Constants

-   `WEBSOCKET_HOST` and `WEBSOCKET_PORT` - Do **NOT** change these values. This is the websocket server run by the ETCars plugin.
-   `API_URL` - The URL of the API you setup in the previous setup. This is usually `http://ip:port` where the `ip` is the IP of your server and `port` is the port you set in the `API_PORT` variable in the previous setup.

#### After following all the above steps, you are done with the setup for the tracker. If you encounter any issues, please contact me on Discord (FC#5104) or create an issue here.

## Preview

![](https://i.imgur.com/gHlmFtR.png)
