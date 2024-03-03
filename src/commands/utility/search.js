const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Returns important information about a given pokemon.')
        .addStringOption(option => 
            option.setName('pokemon')
                .setDescription('The name of the pokemon you want to search for.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const pokemon = interaction.options.getString('pokemon');
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
        const response = await fetch(url);
        const json = await response.json();

        if (json.detail === 'Not found.') {
            return interaction.reply('Pokemon not found.');
        }

        const name = pokemon;
        const types = json.types;
        const stats = json.stats;

        console.log(`URL: ${url}`);
        console.log()

        await interaction.reply(`Name: ${name}\nTypes: ${types}\nStats: ${stats}`)
    }
};