# Discord Pokedex-Bot

## Description

This is my first discord.js project. It is a discord bot that contains a single slash command, `/dex`.
<br><br>
The `/dex` command takes one string parameter, a pokemon. It makes calls to PokeAPI and returns information
about the pokemon.
<br><br>
The bot will return the following information:
<ul>
  <li>Types</li>
  <li>Base Stats</li>
  <li>Image</li>
</ul>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Installation

1. Clone this repository: `git clone https://github.com/0hterm/pokedex-bot.git`
2. Navigate to the bot directory: `cd pokedex-bot`
3. Install dependencies: `npm ci`
4. Fill in the necessary details in `config.json`.

## Usage

After you've done the installation steps above, continue here:

```bash

nodemon

--- new terminal ---

node src/deploy-commands.js
