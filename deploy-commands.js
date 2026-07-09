const { REST, Routes, SlashCommandBuilder } = require("discord.js");

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
    )
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Deploying slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("Slash command berhasil di-deploy!");
  } catch (error) {
    console.error(error);
  }
})();
