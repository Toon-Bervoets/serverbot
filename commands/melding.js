const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    //!melding titel | bericht | kleur | kanaal

    if(!message.member.hasPermission("MANAGE_SERVER")) return; 
    
    var seperator = "|";

    if(args[0] == null){
        var Embed = new discord.MessageEmbed()
            .setTitle("Gebruikswijze")
            .setDescription("!melding **titel | bericht | kleur | kanaal**")
            .setColor("#0058ff")

            .setThumbnail('https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png')
            .setTimestamp()
            .setFooter('Custom Discord Bot Service©', 'https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png');
    
            // Terug sturen van het bericht
            return message.channel.send(Embed);
    }

    var argsList = args.join(" ").split(seperator);
    
    if(argsList[2] === undefined) argsList[2] = "#0058ff";
    if(argsList[3] === undefined) argsList[3] = "〚🔔〛meldingen";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "geen inhoud",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim(),


    };

    var meldingEmbed = new discord.MessageEmbed()
        .setTitle(options.titel)
        .setDescription(`${options.bericht} \n\n*Bericht van ${message.author}*`)
        .setColor(options.kleur)

        .setTimestamp()
        .setFooter('Custom Discord Bot Service©','https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png');
    
    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);

    if(!channel) return message.reply("Dit kanaal bestaat niet!")

    channel.send(meldingEmbed)
};


module.exports.help ={
    name: "melding"
}