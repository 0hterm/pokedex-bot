const { SlashCommandBuilder, EmbedBuilder, channelLink, GuildChannel } = require('discord.js');

// Function for retrieving pokemon json object from api
const get_pokemon_json = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

// Function for creating types list
const create_types_list = (json) => {
    const types = [];
    for (const type of json.types) {
        const name = type.type.name;
        types.push(name);
    }
    return types;
}

/************************************************************
*                                                           *
*   Function to get all stats and their respective          *
*   values, then return a list of objects.                  *
*                                                           *
************************************************************/
const create_stats_list = (json) => {
    const stats = [];
    
    for (const statI of json.stats) {
        const name = statI.stat.name;
        const base = statI.base_stat;
        stats.push({name,base});
    }
    return stats;
}

const add_stats_to_embed = (embed, stats) => {
    for (const stat of stats) {
        embed.addFields(
            { name: `*${stat.name.toUpperCase()}*`, value: `${stat.base}`, inline: true }
        )
    }
}

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

        /************************************************************
        *                                                           *
        *   Since discord expects a reply within 3 seconds of a     *
        *   command, we must refer it here at the start, then edit  *
        *   it once we are ready to send.                           *
        *                                                           *
        ************************************************************/
        await interaction.deferReply();

        // Get user input
        const pokemon = interaction.options.getString('pokemon');
        // Get json for pokemon
        const json = await get_pokemon_json(pokemon);
        

        // If no match is found, return
        if (json.detail === 'Not found.') {
            return interaction.reply('Pokemon not found.');
        }

        // Get name and image of pokemon
        const name = pokemon;
        const image = json.sprites.front_default

        // Put all types in a list
        const types = create_types_list(json);
        
        // Put all stat objects in a list
        const stats = create_stats_list(json);
        
        // Build string for types
        let types_string = ``;
        let i = 0;
        for (const type of types) {
            types_string += `${++i}. *${type.toUpperCase()}*\n`;
        }

        // Capitalize the first letter of pokemon's name for display
        const name_string = name[0].toUpperCase() + name.slice(1);

        // Build Embed
        const embed_message = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`*${name_string}*`)
            .setThumbnail(image)
            .addFields(
                { name: "Types", value: `${types_string}`},
                { name: "**Base Stats**" , value: "------" }
            )

        // Add Stat fields to Embed
        add_stats_to_embed(embed_message, stats);

        // Acknowledge interaction and edit reply to send embed
        await interaction.editReply({ embeds: [embed_message] });

    }
};