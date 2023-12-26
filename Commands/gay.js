export async function gayrate(interaction){
  if (interaction.commandName === "measureGayness") {
    const gayLevel = Math.floor(Math.random() * 101);
    await interaction.reply(`Isaac is ${gayLevel}% gay.`);
  }
}

export const commandInfo = {
  name: "gayrate",
  description: "Measure how gay Isaac is",
}