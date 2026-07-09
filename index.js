const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`${client.user.tag} Online!`);

  const commands = [
  new SlashCommandBuilder()
    .setName("mapupdate")
    ...
    .toJSON(),

  new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Mengirim pengumuman")
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
    .toJSON()
];
    

  try {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash command berhasil didaftarkan.");
  } catch (err) {
    console.error("Gagal mendaftarkan slash command:", err);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "mapupdate") {

    
const allowedUsers = [
  "781363476316028928", // 
  "941604713080713216"  // 
];

if (!allowedUsers.includes(interaction.user.id)) {
  return interaction.reply({
    content: "❌ Kamu tidak memiliki izin menggunakan command ini.",
    ephemeral: true
  });
}
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

    await interaction.reply({
      embeds: [embed]
    });
  }
});

client.login(process.env.TOKEN);
