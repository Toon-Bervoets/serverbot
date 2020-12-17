const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    var ledenTotal = message.guild.memberCount;
    var bots = message.guild.members.cache.filter(m => m.user.bot).size + 1;
    var people = ledenTotal - bots;
    var online = message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size;



    var botEmbed = new discord.MessageEmbed()
                .setTitle("Servernaam")
                .setDescription("Custom Discord Bot Service©")
                .setColor("#0058ff")
                
                .addField("Informatie", "Alle informatie vind je terug in het info-kanaal \nVoor een andere vraag maak een ticket")
                .addField("Leden", ledenTotal, true)
                .addField("Bots", bots, true)
                .addField("Mensen", people, true)
                .addField("Online", online, true)
                
    
                .setThumbnail('https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png')
                .setTimestamp()
                .setFooter('Custom Discord Bot Service©', 'https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png');
    
            // Terug sturen van het bericht
            return message.channel.send(botEmbed);

}
module.exports.help = {
    name: "serverinfo"
}