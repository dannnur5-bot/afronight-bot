const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField
} = require("discord.js");

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
  
  if (message.content.startsWith("!mapupdate ")) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ Kamu tidak memiliki izin.");
    }

    const update = message.content.slice(11);

    await message.delete();

    const embed = new EmbedBuilder()
      .setColor("#8A2BE2")
      .setTitle("🗺️ AFRO NIGHT • MAP UPDATE")
      .setDescription(update)
      .setFooter({ text: "Afro Night" })
      .setTimestamp();

    return message.channel.send({
      embeds: [embed]
    });
  }
});

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
