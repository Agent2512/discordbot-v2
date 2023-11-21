import { Guild, GuildChannelTypes } from "discord.js";
import { Database } from "../database";

export const makeChannel = async (guild: Guild, channelName: string, type: GuildChannelTypes, parentCategory?: string) => {
    const channel = await guild.channels.create({
        name: channelName,
        type: type,
        parent: parentCategory,
    })

    if (!channel) return null;

    return channel;
}


export const guildCreate = async (guild: Guild) => {
    const guildId = guild.id;

    await Database.guild.create({
        data: {
            id: guildId,
        }
    })
}

export const guildDelete = async (guild: Guild) => {
    const guildId = guild.id;

}