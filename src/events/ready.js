const Logger = require("../modules/Logger");
const Discord = require("discord.js");
const MessageEmbed = require("discord.js");

module.exports = {
  name: "ready",
  execute(bot) {
    const serverCount = bot.formatNumber(bot.guilds.cache.size);
    const channelCount = bot.formatNumber(bot.channels.cache.size);
    const userCount = bot.formatNumber(bot.users.cache.size);
    const statuses = [
      ` ${serverCount} servers.`,
      `.help || ${channelCount} channels`,
      `${userCount} users`
    ];

    const serverLog = bot.channels.cache.get("795947312777789460");
    if (serverLog) serverLog.send(new Discord.MessageEmbed()
      .setAuthor('Thunder Strike', 'https://cdn.discordapp.com/avatars/740489089005912146/e4c3845fd7a68a2cebb632d51bb08e70.webp?size=512')
      .setTitle(`Thunder Strike is Ready`)
      .setColor("GREEN")
      .addField("Server Count", `${serverCount}`, true)
      .addField("Users Count", `${userCount}`, true)
      .setTimestamp()
    );

    require("../helpers/unmuteHelper")(bot);
    require("../helpers/reminderHelper")(bot);
    require("../modules/features")(bot);


    Logger.log(
      "bot",
      `Bot is running with ${channelCount} channels, ${userCount} users and ${serverCount} servers`
    );
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: "WATCHING" });
    }, 60000);
  },
};
