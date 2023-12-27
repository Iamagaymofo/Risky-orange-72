import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export async function gamble(interaction, db) {
  if (interaction.commandName === "gamble") {
    const userDisplay = interaction.user.displayName;
    const userID = interaction.user.id;
    const chance = Math.random() * 1000;

    const userChosenAmount = interaction.options.getInteger("amount");

   
    let winnings;

    if (chance <= 75) {
      winnings = 0;
    }
    else if (chance > 75 && chance <= 175) {
      winnings = 0.3;
    }
    else if (chance > 175 && chance <= 285) {
      winnings = 0.5;
    }
    else if (chance > 285 && chance <= 445) {
      winnings = 0.75;
    }
    else if (chance > 445 && chance <= 550) {
      winnings = 0.9;
    }
    else if (chance > 550 && chance <= 670) {
      winnings = 1.35;
    }
    else if (chance > 670 && chance <= 800) {
      winnings = 1.5;
    }
    else if (chance > 800 && chance <= 920) {
      winnings = 1.8;
    } else {
      winnings = 2;
    }

    db.get(`money-${userID}`).then(async (money) => {
      if (userChosenAmount > money) {
		  // send something to the user
		  const exampleEmbed = new EmbedBuilder()
			.setColor("#2c2f33")
			.setTitle("You don't have enough money!")
			.setDescription("Get richer!")
			.setFooter({ text: `${userDisplay} is running an error.` });
		// -_-
		  await interaction.reply({ embeds: [exampleEmbed] });
		  return;
	  }

      let change = -userChosenAmount + (userChosenAmount * winnings);

      db.set(`money-${userID}`, money + change).then(async () => {
        const exampleEmbed = new EmbedBuilder()
          .setColor("#2c2f33")
          .setTitle("My first gamble command!")
          .setDescription(
            winnings > 1 ? `You won ${change}!` : `You lost ${change}.`,
          )
          .setFooter({ text: `${userDisplay} is running a command!` });
        await interaction.reply({ embeds: [exampleEmbed] });
      });

    
      });
  }
}

export const commandInfo = new SlashCommandBuilder()
  .setName("gamble")
  .setDescription("Gamble life savings away!")
  .addIntegerOption((option) => {
    return option
      .setName("amount")
      .setDescription("How much money do you want to gamble?")
      .setRequired(true)
      .setMinValue(250)
      .setMaxValue(10000000);
  });
