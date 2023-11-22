import { Client, Events, GatewayIntentBits, OAuth2Scopes } from "discord.js";
import { loadCommands } from "./loadCommands";
import { guildCreate, guildDelete } from "./utilities";
import { voiceHandler } from "./voiceState/voiceHandler";

const TOKEN = process.env.TOKEN;

const commands = await loadCommands();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,

        GatewayIntentBits.MessageContent
    ],
});

client.login(TOKEN);

client.on(Events.GuildCreate, guildCreate)
client.on(Events.GuildDelete, guildDelete)
client.on(Events.VoiceStateUpdate, voiceHandler);

client.once(Events.ClientReady, c => {
    const inv = c.generateInvite({
        scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
        permissions: ["Administrator"],
    })

    console.log(`Ready! Logged in as ${c.user.tag}`);
    console.log(`Invite: ${inv}`);
});

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply('There was an error while executing this command!');
    }
});


client.on(Events.MessageCreate, message => {
    if (message.author.bot) return;
    console.log("message");

})