import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CatCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cat",
      description: "Shows a picture of a cat",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await fetch("https://nekos.life/api/v2/img/meow").then((res) => res.json());
  
      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(data.url);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
