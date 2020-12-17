const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_ROLES")) return;

    const ticketID = "772535212952911873";
    const solliID = "774215544215568384";

    if (message.channel.parentID == ticketID) {

        var argsList = args.join(" ").split("|")

        var reden = argsList[0] || "*geen reden opgegeven*"

        // Create embed.
        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription(`${reden} \n\n*gesloten door ${message.author}*`)
            .setFooter("status: gesloten")
            .setTimestamp()
            .setColor("#0058ff");

        message.channel.delete();

        // Channel voor logging
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "〚📁〛logs");

        ticketChannel.send(embedCreateTicket);
    }

    if (message.channel.parentID == solliID) {

        var argsList = args.join(" ").split("|")

        var reden = argsList[0] || "*geen reden opgegeven*"

        // Create embed.
        var embedCreateSolli = new discord.MessageEmbed()
            .setTitle("Sollicitatie, " + message.channel.name)
            .setDescription(`${reden} \n\n*gesloten door ${message.author}*`)
            .setFooter("status: gesloten")
            .setTimestamp()
            .setColor("#0058ff");

        message.channel.delete();

        // Channel voor logging
        var solliChannel = message.member.guild.channels.cache.find(channel => channel.name === "〚📁〛logs");

        solliChannel.send(embedCreateSolli);
    }
    else if(console.log("error bij close"));

}
module.exports.help ={
    name: "close"
}