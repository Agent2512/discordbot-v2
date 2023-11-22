import { VoiceState } from "discord.js";

export const voiceHandler = async (oldState: VoiceState, newState: VoiceState) => {
    // find the action: joins/leaves/moves
    const action = oldState.channelId ? newState.channelId ? "moves" : "leaves" : "joins";

    // console.log("voice state update");
    // console.log("action:", action);
    // console.log("user:", username);

    if (action === "joins") {

    }
    else if (action === "leaves") {

    }
    else if (action === "moves") {

    }


    // console.log("no function called");
}