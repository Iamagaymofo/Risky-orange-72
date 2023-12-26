import { SlashCommandBuilder } from "@discordjs/builders";
export async function ping(interaction) {
  if (interaction.commandName === "ping") {
    await interaction.reply("Isaac is gay imo!");
  }
}

export const commandInfo = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings your desired user!")
  .addUserOption((option) =>
    option.setName("user").setDescription("The user to boop").setRequired(true),
  );
