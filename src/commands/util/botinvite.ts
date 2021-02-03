import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BotInviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "botinvite",
      description: "Returns the bot invite",
      category: "util",
      aliases: ["botinv"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const botInvite = `https://discord.com/oauth2/authorize?client_id=740489089005912146&permissions=2146958711&redirect_uri=https%3A%2F%2Fdiscord.gg%2FSgCABjZ3cy&response_type=code&scope=identify%20connections%20guilds.join%20bot`;

    return message.channel.send(botInvite);
  }
}