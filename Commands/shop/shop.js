import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export async function shop(interaction, db) {
  if (interaction.commandName === "shop") {
    const itemName = interaction.options.getString("item");
    const quantity = interaction.options.getInteger("quantity");

    // key: shop-{itemName}
    /* 
	value: {
		name: str
		description: str
		price: int 
	}
	*/
    // itemName = NULL, quantity = NULL
    // itemName = NULL, quantity = <> -> error
    // itemName = <>, quantity = NULL -> assume quantity 1
    // itemName = <>, quantity = <>

    if (itemName === null && quantity === null) {
      // display all items in shop if the user did  not specify an item or quantity
      const exampleEmbed = new EmbedBuilder()
        .setColor("#2c2f33")
        .setTitle("Shop")
        .setDescription(`View the shop below.`)
        .setFooter({ text: `No stealing!` });

      let matches = await db.list("shop-");

      for (let match of matches) {
        let itemData = await db.get(match);
        exampleEmbed.addFields({
          name: itemData.name,
          value: `Price: $${itemData.price}, ${itemData.description}`,
          inline: false,
        });
      }
      await interaction.reply({ embeds: [exampleEmbed] });
    } else if (itemName === null && quantity != null) {
      await interaction.reply({
        content: "Select an item to purchase!",
        ephemeral: true,
      });
    } else {
      // buy the item
      if (quantity === null) {
        quantity = 1;
      }
      // retrieve data
    }
  }
}

export async function commandInfo(db) {
  let matches = await db.list("shop-");
  let items = [];

  for (let match of matches) {
    let itemData = await db.get(match);
    items.push({
      name: itemData.name,
      value: `Price: $${itemData.price}, ${itemData.description}`,
    });
  }

  return new SlashCommandBuilder()
    .setName("shop")
    .setDescription("View the shop.")
    .addIntegerOption((option) =>
      option
        .setName("quantity")
        .setDescription("Select the quantity of items to purchase")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(100),
    )
    .addStringOption((option) =>
     	option
        .setName("item")
        .setDescription("Select an item to purchase.")
        .setRequired(false)
		.addChoices(...items)
	);
}
