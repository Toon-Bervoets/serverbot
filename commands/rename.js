const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_ROLES")) return;

    var ticketID = "772535212952911873"

    if (message.channel.parentID != ticketID) return;
    if (!args[0]) return message.reply("Geen naam opgegeven").then(msg => msg.delete({timeout: 3000}))

    var channel = message.channel.name
    var rename = args.slice().join(" ");
    
    var embedRenameTicket = new discord.MessageEmbed()
            .setTitle("Ticketnaam veranderen")
            .setDescription(`Wil je ${channel} veranderen naar ${rename}?`)
            .setTimestamp()
            .setColor("#ff0000");

    var embed = new discord.MessageEmbed()
            .setTitle(`Ticketnaam veranderd`)
            .setDescription(`${rename} is de nieuwe kanaalnaam van #${rename} \n\n *toegevoegd door ${message.author}*`)
            .setTimestamp()
            .setColor("#0058ff");

    message.channel.send(embedRenameTicket).then(async msg =>{

        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["✅","❌"]);

        if (emoji == "✅") {

            msg.delete();
            message.channel.setName(`${rename}`)

            message.channel.send(embed).then(msg=> msg.delete({timeout: 10000}));
            // Channel voor logging
            var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "〚📁〛logs");
            if (!ticketChannel) return message.reply("Kanaal bestaat niet");

    ticketChannel.send(embed);

        } else if(emoji== "❌"){

            msg.delete();

            message.reply(`Rename geannuleerd!`).then(msg=> msg.delete({timeout: 10000}));
        }

    });
}
// Emojis aan teksten kopellen.
async function promptMessage(message, author, time, reactions) {
    // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
    time *= 1000;

    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
    for (const reaction of reactions) {
        await message.react(reaction);
    }

    // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
    // dan kunnen we een bericht terug sturen.
    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
    // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
};


module.exports.help ={
    name: "rename"
}