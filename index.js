const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`${client.user.tag} Online!`);
});

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "mapupdate") {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({
        content: "❌ Kamu tidak memiliki izin.",
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
