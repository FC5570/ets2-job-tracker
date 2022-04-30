<center>

# ets2-job-tracker

A simple, easy to use and host job tracker for Euro Truck Simulator 2.

</center>

## Features

-   Tracks your jobs when they start and end.
-   Has a Discord Bot to notify people when their job has started and ended.
-   CLI can be compiled to .exe for different operating systems.

## How it Works

This mono-repository includes an API and a CLI.

-   The API also includes a bot, built on top of [@sapphire/framework](https://github.com/sapphiredev/framework).
-   The CLI or the app connects to a websocket created by the ETCars plugin, which sends telemetry data every second.
-   The CLI reads the status of the data, and whenever a job is started, it makes a `POST` request to the API, which then validates the data and sends it to the Discord account through the bot (the ID of the account is asked before connecting to the ws.)

## Pre-requisites

-   [ETCars](https://etcars.jammerxd.com) installed.
-   Redis instance (for storing amount of jobs completed.)
-   A normal server to host the bot

## Setup

This is a mono-repository containing the code for both the API/bot and the app.

-   Clone this repository.
-   Run `yarn install` in the root directory.

Then,

-   Head over to the [API's readme](packages/api/README.md) to setup the API. The API also includes the bot. The API is necessary to validate the data sent from the App and to notify the user on Discord when their job has started/ended.
-   After reading the API readme and setting up the API, head over to [the app's readme](packages/app/README.md) to setup the app/cli. After you're done with this, you need to compile the code into an .exe and send it to the people. It is recommened to run this exe with powershell.

## Preview

![](https://i.imgur.com/gHlmFtR.png)
![](https://i.imgur.com/OktS2wy.png)
![](https://i.imgur.com/4HhBnaS.png)
![](https://i.imgur.com/hYAcCpR.png)

#### If you encounter any issues while setting this project up, contact me on Discord (FC#5104) or create an issue here.
