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

// Command: !mapupdate
if (message.content.startsWith("!mapupdate ")) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return message.reply("❌ Kamu tidak memiliki izin.");
  }

  const update = message.content.slice("!mapupdate ".length).trim();

  if (!update) {
    return message.reply("❌ Masukkan isi update.");
  }

  // Ambil lampiran DULU sebelum pesan dihapus
  const attachment = message.attachments.find(att =>
    att.contentType?.startsWith("image/")
);

if (attachment) {
    embed.setImage(attachment.proxyURL);
}

  const embed = new EmbedBuilder()
    .setColor("#8A2BE2")
    .setTitle("🗺️ AFRO NIGHT • MAP UPDATE")
    .setDescription(update)
    .setFooter({ text: "Afro Night" })
    .setTimestamp();

  if (attachment) {
    embed.setImage(attachment.url);
  }

  await message.delete();

  return message.channel.send({
    embeds: [embed],
  });
}

  // Command: koyap / koyap @user
  if (message.content.toLowerCase().startsWith("koyap")) {
    const user = message.mentions.users.first() || message.author;

    return message.reply({
      content: `📸 Here is ${user.username}'s avatar!`,
      files: [
        user.displayAvatarURL({
          extension: "png",
          size: 4096
        })
      ]
    });
  }
});

// Ganti dengan Bot Token kamu
client.login(process.env.TOKEN);
