const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json"); 
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: "********",
  user: "********",
  password: "********",
  database: "********"
})

client.on("ready", () => {
  console.log(`iniciando o bot....`);
  client.user.setActivity(`d!about`, {
    type: "STREAMING",
    url: "*******"
  });
});

client.on("error", () => {
  client.login(config.token);
});

connection.connect(function(err) {
  if (err) {
    console.error('erro ao conectar a database: ' + err.stack);
    return;
  }

  console.log('conectado a database');
});

function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
 }

client.on("message", async message => {

  const localusers = message.mentions.users.first() || message.author;

  const nma = message.content.split("").slice(1)

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  if(comando === "auth") {
    const embed = {
      color: '#00ff00',
      author: {
        name: "DogãoBOT",
        icon_url: "https://cdn.discordapp.com/attachments/766344451965976598/781243853852114974/dogaoaa.png",
      },
      description: `Your ID has been authenticated `+message.member.user.tag+`\n**Steam ID:** U:1:`+args+`\n**Discord ID:** `+message.author+``,
      timestamp: new Date(),
      footer: {
        icon_url: message.author.avatarURL(),
        text: `requested by ${message.author.username}`
      }
    };
    if (!Number(args)) return message.channel.send(`${message.member.user}, you didn't provide a valid ID`);
    connection.query(`SELECT * FROM idsbot WHERE discordid = '`+message.author+`'`, function(err, rows){
      if(err)
          return console.log(err);
      if (!rows.length)
      {
            connection.query(`INSERT INTO idsbot (discordid, steamid, authenticated) VALUES('`+message.author+`', '`+args+`', '1')`, function(err, result){
              return console.log(`[Dogão] SteamID `+args+` foi registrado com sucesso por `+message.author.tag+` | Discord ID: `+message.author+``);
              }); 
      }
      else
      {
            var update = `UPDATE idsbot SET steamid = `+args+` WHERE discordid = `+message.author+`;`
            connection.query(update, function(err, result){
              console.log(`[Dogão] SteamID `+args+` foi atualizado com sucesso por `+message.author.tag+` | Discord ID: `+message.author+``);
            });
      }
    });
    message.channel.send({embed: embed });
  }
  if(comando === "about") {
    const embed = {
      color: '#00ff00',
      author: {
        name: "About DogãoBOT",
        icon_url: "https://cdn.discordapp.com/attachments/766344451965976598/781243853852114974/dogaoaa.png",
      },
      description: `developed by gaps#1000`,
      thumbnail: {
        url: `https://cdn.discordapp.com/attachments/766344451965976598/781243853852114974/dogaoaa.png`,
      },
      timestamp: new Date(),
      footer: {
        icon_url: message.author.avatarURL(),
        text: `requested by ${message.author.username} - Dogão® all rights reserved.`
      }
    };
    message.channel.send({embed: embed });
  }
});

client.login(config.token);