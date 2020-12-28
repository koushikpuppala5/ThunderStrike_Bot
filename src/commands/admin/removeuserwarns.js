const { getUserById, removeUserWarnings } = require("../../utils/functions");

module.exports = {
  name: "removeuserwarns",
  description: "Remove all warns from a user",
  category: "admin",
  requiredArgs: ["member"],
  async execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("You don't have permissions to do that!");
    }

    const guildId = message.guild.id;
    const member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[1]);

    if (!member) {
      return message.channel.send("Please provide a valid user");
    }

    if (member.user.bot) {
      return message.channel.send(
        "Bot data does not save, therefore I cannot fetch its data"
      );
    }

    const { warnings } = await getUserById(member.user.id, guildId);

    if (warnings === null || !warnings[0]) {
      return message.channel.send("There are no warnings");
    }

    await removeUserWarnings(member.user.id, guildId);

    return message.channel.send("Successfully removed all warnings");
  },
};
