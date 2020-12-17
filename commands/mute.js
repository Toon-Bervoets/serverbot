const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

    // !tempmute persoon tijd (h,m,s).

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.reply("Kan de gebruiker niet vinden.");

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry je kunt deze gebruiker niet muten");

    var muteRole = message.guild.roles.cache.get('774655496102871080');
    var klantRole = message.guild.roles.cache.get('772553646449754184');
    if (!muteRole) return message.channel.send("De rol muted bestaat niet.");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("Geen tijd opgegeven");

    await (mutePerson.roles.add(muteRole.id));
    mutePerson.roles.remove(klantRole.id);
    message.channel.send(`${mutePerson} is gemuted voor ${muteTime}`);

    var mutelog = message.member.guild.channels.cache.find(channel => channel.name === "〚📁〛logs");

    var muteEmbed = new discord.MessageEmbed()
    .setColor("#ffa808")
    .setTitle("Mute")
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`${mutePerson} is gemuted voor ${muteTime}
        **Gemuted door:** ${message.author}`)
    mutelog.send(muteEmbed);
    mutePerson.sen(muteEmbed);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);

        mutePerson.roles.add(klantRole.id)

        var unmutelog = message.member.guild.channels.cache.find(channel => channel.name === "〚📁〛logs");

        var unmuteEmbed = new discord.MessageEmbed()
        .setColor("#ffa808")
        .setTitle("Unmute")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`${mutePerson} is geunmute`)

        unmutelog.send(unmuteEmbed);

    }, ms(muteTime));
}

module.exports.help = {
    name: "mute"
}