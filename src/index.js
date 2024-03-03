const { GatewayIntentBits, Client, Events, Collection} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.login(token);
