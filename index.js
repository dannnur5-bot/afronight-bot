const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`${client.user.tag} Online!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.toLowerCase().startsWith("koyap")) return;

  const user = message.mentions.users.first() || message.author;

  await message.reply({
    content: `📸 Here is ${user.username}'s avatar!`,
    files: [
      user.displayAvatarURL({
        extension: "png",
        size: 4096
      })
    ]
  });
});

client.login(process.env.TOKEN);
