const { version } = require("discord.js");
const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "util",
  aliases: ["bot"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const uptime = moment
      .duration(bot.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    const nodev = process.version;
    const createdAt = moment(bot.user.createdAt).format("MM/DD/YYYY");

    const embed = BaseEmbed(message)
      .setTitle(`${lang.BOT.INFO_2}`)
      .addField(`${lang.MEMBER.ID}:`, bot.user.id)
      .addField(`${lang.MEMBER.USERNAME}:`, bot.user.username)
      .addField(
        `__**${lang.BOT.INFO}:**__`,
        `
**${lang.MEMBER.STATUS}:** ${bot.user.presence.status}
**${lang.BOT.USERS}:** ${bot.users.cache.size}
**${lang.BOT.GUILDS}:** ${bot.guilds.cache.size}
**${lang.BOT.CHANNELS}:** ${bot.channels.cache.size}
**${lang.MEMBER.CREATED_ON}:** ${createdAt}
**${lang.BOT.COMMAND_COUNT}:** ${bot.commands.size}
**${lang.BOT.VC_CONNS}:** ${bot.voice.connections.size}
            `
      )
      .addField(
        `__**${lang.BOT.SYSTEM_INFO}**__`,
        `**${lang.BOT.RAM_USAGE}:**  ${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)}MB
**${lang.BOT.UPTIME}:** ${uptime}
**${lang.BOT.NODE_V}:** ${nodev}
**${lang.BOT.DJS_V}:** ${version}`
      )
      .addField(
        `${lang.BOT.REPO}`,
        "[Click Here](https://github.com/koushikpuppala5/ThunderStrike_Bot)",
        true
      )
      .addField(
        `${lang.UTIL.SUPPORT_SERVER}`,
        "[Click Here](https://discord.gg/SgCABjZ3cy)",
        true
      )
      .addField(
        `${lang.BOT.DASHBOARD}`,
        "[Click Here](https://sites.google.com/view/discord-server2/discord)",
        true
      )
      .setImage(
        "https://raw.githubusercontent.com/koushikpuppala5/Powerstar_Bot/master/.github/Thunder.png"
      );

    message.channel.send(embed);
  },
};
