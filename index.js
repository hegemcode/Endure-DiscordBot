//Call package and define discord client
const Discord = require("discord.js");
const client = new Discord.Client();

//Moderator role you need to run certain commands. Enter your server's mod role
const adminRole = "🇦🇩🇲🇮🇳";

//Events when the BOT is ready
client.on("ready", () => {
  console.log(`Bot is ready as: ${client.user.tag}`);
  //Change status of the BOT: iddle, [iddle, invisible, online, dnd]
  client.user.setStatus("online");
  client.user.setActivity("help.", { type: "LISTENING" });
  //Current BOT status
  console.log(client.user.presence.status.toUpperCase());
});

//Events when a message is received
client.on("message", async message => {
  //Receiveing the message
  console.log(`${message.author.tag}: ${message.content} `);

  //Variables
  let prefix = ".";
  let msg = message.content.slice(prefix.length).split(" "); //Slices off the prefix
  let args = msg.slice(1); //Message after removing the command part
  let globalEmoji = message.guild.emojis.get(emoji); //Global emoji used to react to the user commands, change its ID to your emoji's one.

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
      "https://thumbs.gfycat.com/UnitedWellgroomedKitfox-max-1mb.gif"
    );
    message.channel.send(waduhek);
    message.delete(); //Remove the command message
  }


  //Display general information about the bot and all the commands
  if (message.content === `${prefix}help`) {
    const embed = new Discord.RichEmbed() //Display a pretty looking message
      .setColor("#00000")
      .setAuthor(
        "STKPolice",
        "https://www.freepngimg.com/thumb/anime/12-2-anime-download-png-thumb.png"
      )
      .addField("About Me", "I'm a cute bot developed by pedrohegem.")
      .addField("Commands", ".anime, .clear, .help, .owner ");
    message.channel.send(embed);
    message.delete();
  }

  //Remove the last 'X' messages
  if (message.content.startsWith(`${prefix}clear`)) {
    if (message.member.roles.find("name", adminRole)) { //Check if the user has the adminRole
      let splitNumber = message.content.split(" ");
      let x = splitNumber[1];
      if (x != undefined || x != null) { //Check if the number is defined/entered
        clear(message, x); //Remove the last 'x' messages
      } else { //Not a proper number
        message.channel.send(
          `Please enter a number of messages to delete...${message.author}`
        );
      }
    } else { //User has not the adminRole
      message.channel.send(
        `You lack of permissions to execute this command ${message.author}`
      );
    }
  }
});

//Deletes the last 'number' messages in the current channel
async function clear(message, x) {
  const fetched = await message.channel.fetchMessages({ limit: x }); //limit refers to the amount of messages to delete
  message.channel.bulkDelete(fetched);
}

//BOT logs in. Enter your bot's token here.
client.login("test");
