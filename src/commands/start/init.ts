import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Database } from "../../database";
import { afkChannel, checkAfkChannel } from "../../utilities";

export const data = new SlashCommandBuilder()
    .setName('init')
    .setDescription('initializes the bot')
    .setDefaultMemberPermissions(8)


export const execute = async (interaction: CommandInteraction) => {
    const guild = interaction.guild;
    if (!guild) return;

    // check if there is an afk channel
    const afk = checkAfkChannel(guild)

    if (!afk.channel) {
        await interaction.reply(`no afk channel found you need to create one first with a minimum of 30 minutes`);
        return;
    }
    else if (!afk.timeout) {
        await interaction.reply(`afk channel timeout needs to 30 minutes as a minimum`);
        return;
    }

    const afkC = afkChannel(guild);
    if (!afkC) return;

    await Database.guild.update({
        where: {
            id: guild.id,
        },
        data: {
            afkChannelId: afkC.channel.id,
        }
    })


    await interaction.reply(`init is done`);
}