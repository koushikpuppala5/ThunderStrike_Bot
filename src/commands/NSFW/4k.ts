import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class _4KCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "4k",
      description: "None",
      category: "nsfw",
      nsfwOnly: true,
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await fetch("https://nekobot.xyz/api/image?type=4k").then((res) => res.json());
  
      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
        .setImage(data.message);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
