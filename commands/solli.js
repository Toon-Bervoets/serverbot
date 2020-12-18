const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const bot = new discord.Client();

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_SERVER")) return;

    const categoryID = "774215544215568384";
    
    var userName = message.author.userName
    var userName2 = message.mentions.members.first() || message.author
    var userDiscriminator = message.author.discriminator;

    var Embed = new discord.MessageEmbed()
        .setTitle("Sollicitaties")
        .setDescription("React met 📝 om een sollicitatie te doen!")
        .setColor("#0058ff")
        .setFooter('Custom Discord Bot Service©', 'https://i.ibb.co/bWgmFTG/Ontwerp-zonder-titel-2.png')
    
    var embed2 = await message.channel.send(Embed);
    embed2.react("📝");

    if (message.user === bot) return;

    bot.on("messageReactionAdd", async (reaction, user) => {

        if (reaction.emoji.name === "📝") {

            if (user.bot) return;

            reaction.users.remove(user);

            var ticketExist = false;

            message.guild.channels.cache.forEach(channel => {

                if (channel.name == `〚📝〛${user.username}`){

                ticketExist = true;               
                return;
                }

            });

        if (ticketExist) return;

        message.guild.channels.create("〚📝〛"+ user.username, {type: "text"}).then(
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
                                .setTitle(`Dit is uw sollicitatie`)
                                .setDescription(`U kan hieronder antwoorden op onze automatische vragen!
                                Achteraf kunnen er door onze staff nog extra vragen gesteld worden!`)
                                
                            
                            var vraag1 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 1`)
                                .setDescription(`Wie ben je? *Volledige Naam*`)

                            var vraag2 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 2`)
                                .setDescription(`Hoe oud ben je?`)

                            var vraag3 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 3`)
                                .setDescription(`Voor welke staffrol wil je solliciteren?*`)

                            var vraag4 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 4`)
                                .setDescription(`Wat voor ervaring heb je?`)

                            var vraag5 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 5`)
                                .setDescription(`Wat maakt jou beter dan alle andere sollicitanten?`)

                            var vraag6 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 6`)
                                .setDescription(`Wat zijn je PLUS punten?`)

                            var vraag7 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 7`)
                                .setDescription(`Wat zijn je MIN punten?`)

                            var vraag8 = new discord.MessageEmbed()
                                .setColor("#0058ff")
                                .setTitle(`Vraag 8`)
                                .setDescription(`Extra informatie?`)

            
                            settedParent.send(`<@${user.id}>`, embedParent);    
                            settedParent.send(vraag1);

                            settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                var antwoord1 = antwoord.first();
                                settedParent.send(vraag2);

                                settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                    var antwoord2 = antwoord.first();
                                    settedParent.send(vraag3);

                                    settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                        var antwoord3 = antwoord.first();
                                        settedParent.send(vraag4);

                                        settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                            var antwoord4 = antwoord.first();
                                            settedParent.send(vraag5);

                                            settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                                var antwoord5 = antwoord.first();
                                                settedParent.send(vraag6);

                                                settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                                    var antwoord6 = antwoord.first();
                                                    settedParent.send(vraag7);

                                                    settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                                        var antwoord7 = antwoord.first();
                                                        settedParent.send(vraag8);

                                                        settedParent.awaitMessages(s => s.user.id == message.author.id,{max:1}).then(antwoord=> {
                                                            var antwoord8 = antwoord.first();

                                                            var Solli = new discord.MessageEmbed()
                                                            .setColor("#00e5ff")
                                                            .setTimestamp()
                                                            .setTitle(`Je sollicitatie antwoorden:`)
                                                            .setDescription(`**Vraag 1:** \n${antwoord1}\n\n**Vraag 2:** \n${antwoord2}\n\n**Vraag 3:** \n${antwoord3}\n\n**Vraag 4:** \n${antwoord4}\n\n**Vraag 5:** \n${antwoord5}\n\n**Vraag 6:** \n${antwoord6}\n\n**Vraag 7:** \n${antwoord7}\n\n**Extra:** \n${antwoord8}\n`)
                                                            
                                                            settedParent.bulkDelete(16).then(
                                                                message.channel.setTopic(`Sollicitatie is ingevuld door ${userName}`),
                                                                settedParent.send(Solli)
                                                            )
                                                            

                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                }); 
                            })

                        }
                    )
                }
            )

        }

    });

}

module.exports.help = {
    name: "solli"
}