const { addGuild } = require("../utils/functions");
const MessageEmbed = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild, guilds) {
    await addGuild(guild.id);
    console.log(`Thunder Strike Joined the ${guild.name}`);
    const serverLog = bot.channels.cache.get("795290871741546506");
    if (serverLog)serverLog.send(new Discord.MessageEmbed()
        .setTitle(`Thunder Strike Joined the server`)
        .setDescription(guild.name)
        .setThumbnail(guild.iconURL( { dynamic: true } ))
        .setColor("GREEN")
        .addField("Owner", guild.owner.user.tag)
        .addField("Member Count", guild.memberCount)
        .addField("Server ID", guild.id)
        .setFooter(bot.guilds.cache.size)
        .setTimestamp()
        );
  },
};
