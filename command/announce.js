const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Mengirim pengumuman")
    .addStringOption(option =>
      option
        .setName("deskripsi")
        .setDescription("Isi pengumuman")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("gambar")
        .setDescription("URL gambar (opsional)")
        .setRequired(false)
    ),

  async execute(interaction) {
    const deskripsi = interaction.options.getString("deskripsi");
    const gambar = interaction.options.getString("gambar");

    const embed = new EmbedBuilder()
      .setColor("#FFD700")
      .setTitle("📢 AFRO NIGHT • ANNOUNCEMENT")
      .setDescription(deskripsi)
      .setTimestamp();

    if (gambar) {
      embed.setImage(gambar);
    }

    await interaction.reply({
      embeds: [embed]
    });
  },
};
