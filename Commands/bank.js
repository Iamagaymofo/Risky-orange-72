import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export async function bank(interaction, db) {
  if (interaction.commandName === "balance") {
    const userDisplay = interaction.user.displayName;
    const userID = interaction.user.id;

    const money = await db.get(`money-${userID}`);

    const exampleEmbed = new EmbedBuilder()
      .setColor("#2c2f33")
      .setTitle("Your balance")
      .setDescription(`You currently have $${money}.`)
      .setFooter({ text: `${userDisplay} is checking their bank account!` });

    await interaction.reply({ embeds: [exampleEmbed] });
  }
}

export const commandInfo = new SlashCommandBuilder()
  .setName("balance")
  .setDescription("Check your money balance.");
