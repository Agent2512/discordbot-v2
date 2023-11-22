import { Guild } from "discord.js";
import { Database } from "../database";

export const guildCreate = async (guild: Guild) => {
    const guildId = guild.id;

    await Database.guild.create({
        data: {
            id: guildId,
        }
    })

    console.log(`Joined guild ${guild.name} (${guildId})`);

}

export const guildDelete = async (guild: Guild) => {
    const guildId = guild.id;

    await Database.guild.delete({
        where: {
            id: guildId,
        }
    })
}

const textToXp = (text: string) => {
    const value = text
        .replaceAll(" ", "")
        .replaceAll("\n", "")

    const length = value.length;
    const xp = Math.ceil(length / 4 * 2);

    return xp;
}


export const afkChannel = (guild: Guild) => {
    const afkChannel = guild.afkChannel;
    const afkTimeout = guild.afkTimeout;
    if (!afkChannel) return false;

    return {
        channel: afkChannel,
        timeout: afkTimeout,
    }
}

export const checkAfkChannel = (guild: Guild) => {
    const afk = afkChannel(guild)
    if (!afk) return {
        channel: false,
        timeout: false,

    };

    return {
        channel: afk.channel !== null,
        timeout: afk.timeout >= 1800,
    };
}