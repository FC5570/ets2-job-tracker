<center>

# ets2-job-tracker API

</center>

This is the API for communicating with the app and responsible for notifying the user on Discord when their job has started/ended.

The app makes a POST request to this API with the data related to the job, the API then validates it and the bot sends the DM to the user notifying of their job.

## Setup

Please know that you will require a running Redis instance and a server to host the bot on.

-   Setup redis.
-   Head over to [the .env file](src/.env.example) and rename it to `.env` from `.env.example`.
-   Fill in the details (see [environment variables](#env-variables)) for more info.
-   After you're done with the above steps, build the code, run `yarn build` in the root directory, which should build both the API and the App.
-   Then run the bot, type `yarn start` in the current (packages/api) directory and the bot should start.

## Env Variables

-   `DISCORD_TOKEN` - The token of your discord bot, which you want to send notifications to people.
-   `API_PORT` - An open, unoccupied port on your server for the API to run on.
-   `REDIS_URL` - The URL of your redis instance, usually `redis://username:password@host:port`. I would recommened using [railway](https://railway.app) if you do not have a server.

#### After you're done with everythin above, head over to the [app's readme](../app/README.md) and set it up. If you encounter any issues, please contact me on Discord (FC#5104) or make an issue here.

## Preview

![](https://i.imgur.com/OktS2wy.png)
![](https://i.imgur.com/4HhBnaS.png)
![](https://i.imgur.com/hYAcCpR.png)
