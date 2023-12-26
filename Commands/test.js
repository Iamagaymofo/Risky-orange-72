export async function gamble(interaction, db) {
  if (interaction.commandName === "gamble") {
    const userID = interaction.user.id;
    const gambleAmount = 100; // Set the minimum gamble amount here
    const userChosenAmount = interaction.options.getInteger("amount");

    if (userChosenAmount < gambleAmount) {
      await interaction.reply("You must gamble more than 100 money.");
      return;
    }

    // Rest of the gambling logic remains the same
    // ...
  }
}

export const commandInfo = {
  name: "gamble",
  description: "Gamble with a chance to win money. Choose the amount to gamble.",
  options: [
    {
      name: "amount",
      description: "The amount of money to gamble",
      type: "INTEGER",
      required: true,
    },
  ],
};