import { Client } from "discord.js";
import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from 'node:process';
import env from "dotenv"
env.config();
const client = new Client({ intents: 32767 });
client.login(process.env.token).then(() => console.log("Signed In"))
const rl = readline.createInterface({ input, output });
client.on("ready", async () => {
    const gid = await rl.question("guild id?");
    const cid = await rl.question("channel id?");
    const guild = await client.guilds.fetch(gid);
    const channel = await guild.channels.fetch(cid);
    sendMessage(channel)
})
async function sendMessage(channel) {
    const message = await rl.question("msg?");
    channel.send(message).then(() => sendMessage(channel)).catch((err) => { console.error(err); rl.close(); process.exit(); });
}
