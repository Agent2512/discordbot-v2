import { Collection, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { glob } from "glob";
import path from "path";

type module = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>
}

export const loadCommands = async () => {
    const commands = new Collection<string, module>();

    const dirsAndFiles = await getDirectories('./src/commands');
    const commandFiles = dirsAndFiles.filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(process.cwd(), file);

        const command = require(filePath);

        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    return commands;
}

const getDirectories = async function (src: string) {
    return await glob(src + '/**/*');
}; 