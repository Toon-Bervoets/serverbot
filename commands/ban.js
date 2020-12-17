
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //const args = message.content.slice(prefix.length).split(/ +/);

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("sorry jij kan dit niet");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Geen perms");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    if (!args[1]) return message.reply("Gelieve een redenen op te geven.");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));


    var reason = args.slice(1).join(" ");
    if (!banUser) return message.reply("Kan de gebruiker niet vinden.");

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Ban")
        .setThumbnail(banUser.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`** Geband:** ${banUser} (${banUser.id})
            **Geband door:** ${message.author}
            **Redenen: ** ${reason}`);

    banUser.ban().catch(err => {
    if (err) return message.channel.send(`Er is iets foutgegaan.`);
    });

    message.channel.send(`${banUser} is verbannen`).then(msg => msg.delete({timeout: 5000}));

    var banlog = message.member.guild.channels.cache.find(channel => channel.name === "〚📁〛logs");

        banlog.send(embed);
        banUser.send(embed)
}

module.exports.help = {
    name: "ban"
}