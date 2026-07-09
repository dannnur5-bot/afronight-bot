const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const allowedUsers = [
  "781363476316028928",
  "941604713080713216"
];

client.once("ready", async () => {
  console.log(`${client.user.tag} Online!`);

  const commands = [
    new SlashCommandBuilder()
      .setName("mapupdate")
      .setDescription("Kirim update map")
      .addStringOption(option =>
        option
          .setName("pesan")
          .setDescription("Isi update map")
          .setRequired(true)
      )
      .addAttachmentOption(option =>
        option
          .setName("gambar")
          .setDescription("Upload gambar")
          .setRequired(false)
      ),

    new SlashCommandBuilder()
      .setName("announce")
      .setDescription("Kirim pengumuman")
      .addStringOption(option =>
        option
          .setName("pesan")
          .setDescription("Isi pengumuman")
          .setRequired(true)
      )
      .addAttachmentOption(option =>
        option
          .setName("gambar")
          .setDescription("Upload gambar")
          .setRequired(false)
      )
  ].map(cmd => cmd.toJSON());

  try {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash Command berhasil didaftarkan!");
  } catch (err) {
    console.error(err);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (!allowedUsers.includes(interaction.user.id)) {
    return interaction.reply({
      content: "❌ Kamu tidak memiliki izin menggunakan command ini.",
      ephemeral: true
    });
  }

  // ==========================
  // /mapupdate
  // ==========================
  if (interaction.commandName === "mapupdate") {
    const pesan = interaction.options.getString("pesan");
    const gambar = interaction.options.getAttachment("gambar");

    const embed = new EmbedBuilder()
      .setColor("#8A2BE2")
      .setTitle("🗺️ AFRO NIGHT • MAP UPDATE")
      .setDescription(pesan)
      .setFooter({ text: "Afro Night" })
      .setTimestamp();

    if (gambar) {
      embed.setImage(gambar.url);
    }

    return interaction.reply({
      embeds: [embed]
    });
  }

  // ==========================
  // /announce
  // ==========================
  if (interaction.commandName === "announce") {
    const pesan = interaction.options.getString("pesan");
    const gambar = interaction.options.getAttachment("gambar");

    const embed = new EmbedBuilder()
      .setColor("#FFD700")
      .setTitle("📢 AFRO NIGHT • ANNOUNCEMENT")
      .setDescription(pesan)
      .setFooter({ text: "Afro Night" })
      .setTimestamp();

    if (gambar) {
      embed.setImage(gambar.url);
    }

    return interaction.reply({
      embeds: [embed]
    });
  }
});

// ==========================
// Command koyap
// ==========================
client.on("messageCreate", async message => {
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
