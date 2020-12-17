const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    var botEmbed = new discord.MessageEmbed()
                .setTitle("Botnaam")
                .setDescription("Custom Bot (!)")
                .setColor("#0058ff")
                .addFields(
                    { name: "Informatie", value: "Deze bot is gemaakt door <@668024098429075459> \nDit is de algemene server bot! \nMoest er iets niet werken maak zeker een ticket \n" }
                )
    
                .setThumbnail('https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png')
                .setTimestamp()
                .setFooter('Custom Discord Bot Service©', 'https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png');
    
            // Terug sturen van het bericht
            return message.channel.send(botEmbed);
}

module.exports.help ={
    name: "bot"
}