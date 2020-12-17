const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const bot = new discord.Client();
module.exports.run = async (bot, message, args) => {

    
    if(!message.member.hasPermission("MANAGE_SERVER")) return;

    const categoryID = "772535212952911873";


    var Embed = new discord.MessageEmbed()
        .setTitle("Ticketsysteem")
        .setDescription("React om een ticket te openen!")
        .setColor("#0058ff")
        .setFooter('Custom Discord Bot Service©', 'https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png')
        .addFields(
            {name: "*Onderwerpen*", value:"🔧 Technische hulp \n❓ Vraag \n🛒 Aankoop doen \n 💡 Ideeën \n 🤝 Partner \n\nNa reactie is er een kanaal aangemaakt met jou naam."
        });

    var embed2 = await message.channel.send(Embed);
    embed2.react("🔧")
    .then(embed2.react("❓"))
    .then(embed2.react("🛒"))
    .then(embed2.react("💡"))
    .then(embed2.react("🤝"))

    if (message.user === bot) return;

    bot.on("messageReactionAdd", async (reaction, user) => {

        if (reaction.emoji.name === "🔧") {
            var ticketName = `〚🔧〛${user.username}`                 
        }

        if (reaction.emoji.name === "❓") {
            var ticketName = `〚❓〛${user.username}`                  
        }

        if (reaction.emoji.name === "🛒") {
            var ticketName = `〚🛒〛${user.username}`       
        }

        if (reaction.emoji.name === "💡") {
            var ticketName = `〚💡〛${user.username}`       
        }

        if (reaction.emoji.name === "🤝") {
            var ticketName = `〚🤝〛${user.username}`       
        }

            
        if (user.bot) return;

        reaction.users.remove(user);

        var ticketExist = false

        message.guild.channels.cache.forEach(channel => {

                //ticketExist = false;
                if (channel.name == `〚🔧〛${user.username}`) {
                    ticketExist = true;               
                    return;
                }
                if (channel.name == `〚❓〛${user.username}`) {
                    ticketExist = true;               
                    return;
                }
                if (channel.name == `〚🛒〛${user.username}`) {
                    ticketExist = true;               
                    return;
                }
                if (channel.name == `〚💡〛${user.username}`) {
                    ticketExist = true;               
                    return;
                }
                if (channel.name == `〚🤝〛${user.username}`) {
                    ticketExist = true;               
                    return;
                }

        });

            if (ticketExist) return;
                message.guild.channels.create(ticketName, {type: "text"}).then(
                    (createdChannel) => {
                        createdChannel.setParent(categoryID).then(
                            (settedParent) => {

                                settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === "@everyone"), {
                                    SEND_MESSAGES: false,
                                    VIEW_CHANNEL: false
                                });
                
                                settedParent.updateOverwrite(user.id, {
                                    CREATE_INVITE: false,
                                    VIEW_CHANNEL: true,
                                    READ_MESSAGES: true,
                                    SEND_MESSAGES: true,
                                    EMBED_LINKS: true,
                                    ATTACH_FILES: true,
                                    READ_MESSAGE_HISTORY: true
                                });                  
                
                                var embedParent = new discord.MessageEmbed()
                                    .setColor("#0058ff")
                                    .setTitle(`Dit is uw persoonlijk ticket`)
                                    .setDescription(`U kan hieronder uw vragen stelen!`)                    
                
                                settedParent.send(`<@${user.id}>`, embedParent);    
                                        
                            }
                        )
                    }
                )
            
        

    });

}

module.exports.help = {
    name: "ticket"
}