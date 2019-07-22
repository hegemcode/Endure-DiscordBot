//Call package and define discord client
const Discord = require("discord.js");
const client = new Discord.Client();
//Call all your personal/secret information
const secretKeys = require('./superSecretKeys.json');

//Moderator role you need to run certain commands. Enter your server's mod role
const modRole = "mod";

//Events when the BOT is ready
client.on("ready", () => {
  console.log(`Bot is ready as: ${client.user.tag}`);
  //Change status of the BOT: iddle, [iddle, invisible, online, dnd]
  client.user.setStatus("online");
  client.user.setActivity("type .help", { type: "LISTENING" });
  //Current BOT status
  console.log(`Status: ${client.user.presence.status.toUpperCase()}`);
});

//Events when a message is received
client.on("message", async message => {
  //Receiveing the message
  console.log(`${message.author.tag}: ${message.content} `);

  //Variables
  let prefix = ".";
  let msg = message.content.slice(prefix.length).split(" "); //Slices off the prefix
  let args = msg.slice(1); //Message after removing the command part
  const globalEmoji = message.guild.emojis.get('602754789910118400'); //Global emoji used to react to the user commands, change its ID to your emoji's one.

  //Commands

  //Funny command
  if (message.content.includes("awo")) {
    const attachment = new Discord.Attachment(
      "https://thumbs.gfycat.com/UnitedWellgroomedKitfox-max-1mb.gif"
    );
    message.channel.send(`Awoooo :3 ${message.author}!`, attachment);
    message.react(globalEmoji); //React to the command message
  }

  //Link to an anime web
  if (message.content === `${prefix}anime`) {
    message.channel.send("https://animeflv.net");
    message.react(globalEmoji);
  }

  //Funny command
  if (message.content === `${prefix}waduhek`) {
    const waduhek = new Discord.Attachment(
      "https://i.gyazo.com/5d6d105839f0285c82cc7ff6d398a6fe.png"
    );
    message.channel.send(waduhek);
    message.delete(); //Remove the command message
  }


  //Display general information about the bot and all the commands
  if (message.content === `${prefix}help`) {
    const embed = new Discord.RichEmbed() //Display a pretty looking message
      .setColor("#00000")
      .setAuthor(
        "Endure",
        "https://i.gyazo.com/355c692ae81c742278cfae8d74989778.png"
      )
      .addField("About Me", "Hi there, I'm  the first bot developed by pedrohegem.")
      .addField("Commands", ".anime, .clear, .clear all,  .help, .waduhek");
    message.channel.send(embed);
    message.delete();
  }

  //Remove the last 'X' messages
   if (message.content.startsWith(`${prefix}clear`)) {
    if (message.member.roles.find("name", modRole)) { //Check if the user has the adminRole
      let splitNumber = message.content.split(" ");
      let x = Number(splitNumber[1]);
      if (!isNaN(x)) { //Check if the argument of clear is a number.
        clear(message, x); //Remove the last 'x' messages
      } else { //Not a proper number
        message.channel.send(`Please enter the amount of messages to delete...${message.author}`);
      }     
    } else { //User has not the modRole
      message.channel.send(`You lack of permissions to execute this command ${message.author}`);
    }
  } 

  //Clear 'all' the messages. Powerfull command
  if (message.content === `${prefix}clear all`){
    if(message.member.roles.find("name", modRole)){
      clear(message);
    }
  }
});


//Deletes the last 'x' messages in the current channel
 async function clear(message, x) {
  const fetched = await message.channel.fetchMessages({ limit: x }); //limit refers to the amount of messages to delete
  message.channel.bulkDelete(fetched);
} 


//BOT logs in. Enter your bot's token here.
client.login(secretKeys.token);
