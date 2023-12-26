import {EmbedBuilder} from "discord.js";

export async function money(interaction, db){
  if (interaction.commandName === "money") {
    const userID = interaction.user.id;
    const userDisplay = interaction.user.displayName;

    db.get(`money-${userID}`).then((money) => {
      money += 100

      db.set(`money-${userID}`, money).then(async () => {
        const exampleEmbed = new EmbedBuilder()
          .setColor("#2c2f33")
          .setTitle("My first money command!")
          .setDescription(
            `You have been awarded $100 for dispensing of the gay isaac!`,
          )
          .setFooter({ text: `${userDisplay} is running a command!` });
        await interaction.reply({ embeds: [exampleEmbed] });
      });
    });
  }
}

export const commandInfo = {
  name: "money",
    description: "My first command",
}
