
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // const args = message.content.slice(prefix.length).split(/ +/);

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

    // if (!args[1]) return message.reply("Geen gebruiker opgegeven.");
    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    // if (!args[2]) return message.reply("Gelieve een redenen op te geven.");
    if (!args[1]) return message.reply("Gelieve een redenen op te geven.");

    // var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    // var reason = args.slice(2).join(" ");
    var reason = args.slice(1).join(" ");

    if (!kickUser) return message.reply("Kan de gebruiker niet vinden.");

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Kick")
        .setThumbnail(kickUser.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
            **Gekickt door:** ${message.author}
            **Redenen: ** ${reason}`);

    kickUser.kick(reason).catch(err => {
    if (err) return message.channel.send(`Er is iets foutgegaan.`);
    })

    message.channel.send(`${kickUser} is gekickt`);

    var kicklog = message.member.guild.channels.cache.find(channel => channel.name === "〚📁〛logs");

        kicklog.send(embed);
        kickUser.send(embed)
}

module.exports.help = {
    name: "kick"
}