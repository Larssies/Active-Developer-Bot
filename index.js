const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');

config();

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        bot.commands.set(command.data.name, command);
        console.log(`Loaded command: ${command.data.name}`);
    } catch (error) {
        console.error(`Error loading command file '${file}':`);
        console.error(error.stack);
    }
}

bot.once('ready', async () => {
  try {
    console.log(`Logged in as ${bot.user.tag}!`);

    bot.user.setPresence({
        activities: [{
          name: "Made by Larssies",
          type: ActivityType.Custom,
          url: 'https://larssies.com'
        }],
      })   

    bot.commands.forEach(async command => {
      await bot.application.commands.create(command.data);
    });
  } catch (error) {
    console.log(`Error during bot setup: ${error.message}`, 'error');
  }
});

bot.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isCommand() && !interaction.isStringSelectMenu() && !interaction.isButton() && !interaction.isModalSubmit()) {
      return;
    }

    console.log(`Interaction type: ${interaction.type}`);

    if (interaction.isCommand()) {
      const { commandName } = interaction;

      console.log(`Command executed: ${commandName}`);

      if (!bot.commands.has(commandName)) return;

      await bot.commands.get(commandName).execute(interaction);
    }
  } catch (error) {
    console.log(`Error handling interaction: ${error.message}`, 'error');
  }
});

bot.login(process.env.BOT_TOKEN);