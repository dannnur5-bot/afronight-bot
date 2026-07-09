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
    .toJSON(),

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
    .toJSON()
];
