const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //!review aantalSterren Tekst test test

    if(!message.member.roles.cache.some(role => role.name === '✦🛒✦KLANT'||'✦👑✦EIGENAAR'||'✦🛒✦VASTE KLANT'))return;
    
    const amountStars = args[0];

    if (!amountStars || amountStars < 1 || amountStars > 5) return message.reply("Geef een aantal op tussen 1 en 5 sterren");

    var text = args.splice(1, args.length).join(" ") || '**Geen tekst opgegeven**';

    var channel = message.member.guild.channels.cache.get("788779472937680956");

    if (!channel) return message.channel.send("Kanaal bestaat niet");

    var stars = "";
    for (let i = 0; i < amountStars; i++) {

        stars += ":star: ";

    }

    message.delete();

    const embed = new discord.MessageEmbed()
        .setTitle(`${message.author.username} heeft en review geschreven`)
        .setColor("#FFD700")
        .addField("Sterren: ", stars)
        .addField("Review: ", text);

    message.channel.send("✅ Je hebt een review succesvol geschreven");

    return channel.send(embed);

}

module.exports.help = {
    name: "review",
    
}