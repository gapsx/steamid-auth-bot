# steamid-auth-bot
basic Discord BOT for authenticate Steam ID's with your gamesense lua

to make the bot work you will need:

- [node.js](https://nodejs.org/en/).
- [mysql for node.js](https://www.npmjs.com/package/mysql).
- [discord.js library](https://discord.js.org/#/).
- discord bot token (can be generated at [discord developer page](https://discord.com/developers/applications/))

OBS: the file "auth.php" is used to read the id's in sequence on your lua script (you can use the [HTTP Library](https://gamesense.pub/forums/viewtopic.php?id=19253) for this)

# setuping the bot

- put your token on config.json

(auth.php file is for

example:

"token": "yourtokenhere"

# creating a database

- create a new database on your server and run the code:

CREATE TABLE `idsbot` (
  `discordid` varchar(255) DEFAULT NULL,
  `steamid` varchar(255) DEFAULT NULL,
  `authenticated` varchar(255) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

the bot will save the steamid the user entered and the discordid of the user who executed the command in the tables above

now you can start the bot without errors.
