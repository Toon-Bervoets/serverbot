const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try{
        var botEmbed = new discord.MessageEmbed()
                .setTitle("Custom Discord Bot Service©")
                .setDescription("⬇**Commands**⬇")
                .setColor("#0091ff")
                .addFields(
                    { name: "ℹ Informatie", value: "```!help - geeft alle commands weer \n!bot - geeft alle bot info weer \n!serverinfo - geeft de server info weer```" },
                    { name: "🔒 STAFF", value: "```!ban {user} - Ban een persoon \n!kick {user} - Kick een persoon \n!mute {user} {time} - Mute een persoon voor een bepaalde duur```"},
                    { name: "🎫 Ticket", value: "```!add {user} - Voeg een persoon toe aan een ticket \n!remove {user} - Verwijder een persoon uit een ticket \n!rename {nieuwe naam} - Verander de naam van een ticket ```"},
                    { name: "🎈 Andere", value: "```!giveaway - Maken van een giveaway \n!review {sterren (1 tot 5)} {uitleg} - Als klant kan je een review achterlaten```"}
                )
    
                .setThumbnail('https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png')
                .setTimestamp()
                .setFooter('Custom Discord Bot Service©', 'https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png');
    
            // Terug sturen van het bericht
            message.author.send(botEmbed);
            message.reply("Alle commands zijn verzonden naar je dm");

    }catch(error){
        message.reply("Er is iets fout gelopen.")
    }
}
module.exports.help ={
    name: "help"
}