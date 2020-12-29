const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "balance",
  description: "balance",
  category: "economy",
  aliases: ["bal"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    const { user } = await getUserById(member.id, message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username} ${lang.ECONOMY.BALANCE}`)
      .addField(lang.ECONOMY.MONEY, user.money, true)
      .addField(lang.ECONOMY.BANK, user.bank, true)
      .addField(lang.COVID.TOTAL, user.bank + user.money, true);

    message.channel.send(embed);
  },
};
