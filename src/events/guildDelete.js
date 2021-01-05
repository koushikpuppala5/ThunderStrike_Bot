const {
  removeGuild,
  removeUser,
  removeUserWarnings,
} = require("../utils/functions");
const MessageEmbed = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "guildDelete",
  async execute(bot, guild) {
    await removeGuild(guild.id);
    console.log(`Thunder Strike Left the ${guild.name}`);
    const serverLog = bot.channels.cache.get("795290917086298142");
    if (serverLog)serverLog.send(new Discord.MessageEmbed()
        .setTitle(`Thunder Strike Left the server`)
        .setDescription(guild.name)
        .setThumbnail(guild.iconURL( { dynamic: true } ))
        .setColor("RED")
        .addField("Owner", guild.owner.user.tag)
        .addField("Member Count", guild.memberCount)
        .addField("Server ID", guild.id)
        .setFooter(bot.guilds.cache.size)
        .setTimestamp()
        );

    guild.members.cache.forEach(async (member) => {
      await removeUser(member.id, guild.id);
      await removeUserWarnings(member.id, guild.id);
    });
  },
};
