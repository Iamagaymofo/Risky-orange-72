import Database from "@replit/database";
import {
  REST,
  Routes,
  Client,
  GatewayIntentBits,
} from "discord.js";
import { commandInfo as pingInfo, ping } from "./Commands/ping.js";
import { commandInfo as moneyInfo, money } from "./Commands/money.js";
import { commandInfo as gayInfo, gayrate} from "./Commands/gay.js";
import { commandInfo as gambleInfo, gamble } from "./Commands/gamble.js";
import { commandInfo as bankInfo, bank } from "./Commands/bank.js";
import { commandInfo as shopInfo, shop } from "./Commands/shop/shop.js";

const db = new Database();
const commands = [pingInfo, moneyInfo, gayInfo, gambleInfo, bankInfo, await shopInfo(db)];

// TOKEN and CLIENT_ID
const TOKEN = process.env["Bot token"];
const GAYCLIENTID = process.env["rathergayclientid"];

// Slash Commands
const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Started refreshing application (/) commands.");
  await rest.put(Routes.applicationCommands(GAYCLIENTID), { body: commands });
  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

// Starting up the bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  ping(interaction);
  money(interaction, db);
  gayrate(interaction);
  gamble(interaction, db);
  bank(interaction,db)
  shop(interaction, db)
});
client.login(TOKEN);
