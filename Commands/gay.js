export async function gayrate(interaction){
  if (interaction.commandName === "gayrate") {
    const gayLevel = Math.floor(Math.random() * 101);
    await interaction.reply(`You are ${gayLevel}% gay.`);
  }
}

export const commandInfo = {
  name: "gayrate",
  description: "Measure how gay you are!",
}