const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dex')
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

        const types = [];

        for (const type of json.types) {
            const name = type.type.name;
            types.push(name);
        }

        const stats = [];

        for (const statI of json.stats) {
            const name = statI.stat.name;
            const base = statI.base_stat;
            stats.push({name,base});
        }

        let types_string = ``;

        let i = 0;
        for (const type of types) {
            types_string += `${++i}. ${type.toUpperCase()}\n`;
        }

        let stats_string = ``;

        i = 0;
        for (const stat of stats) {
            stats_string += 
            `${++i}. ${stat.name.toUpperCase()}\n\tBase Value: ${stat.base}\n` 
        }

        console.log(`URL: ${url}`);

        const name_string = name[0].toUpperCase() + name.slice(1);
        

        await interaction.reply(
            `-----------------\nNAME: ${name_string}\n\n-----TYPES-----\n${types_string}\n-----STATS-----\n${stats_string}`
            )
    }
};