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

const allowedRoles = [
  "1488421250958229554",
  "1488421250916159599"
];

client.once("clientReady", async () => {
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
  ].map(command => command.toJSON());

  try {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash Command berhasil didaftarkan!");
  } catch (error) {
    console.error("Gagal daftar slash command:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const member = await interaction.guild.members.fetch(interaction.user.id);

    const hasAllowedRole = allowedRoles.some(roleId =>
      member.roles.cache.has(roleId)
    );

    if (!hasAllowedRole) {
      return interaction.reply({
        content: "❌ Kamu tidak memiliki role untuk menggunakan command ini.",
        ephemeral: true
      });
    }

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

      return interaction.reply({ embeds: [embed] });
    }

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
  content: "@everyone",
  embeds: [embed],
  allowedMentions: {
    parse: ["everyone"]
  }
});
      
  } catch (error) {
    console.error("Interaction error:", error);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "❌ Terjadi error saat menjalankan command.",
        ephemeral: true
      });
    }
  }
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
