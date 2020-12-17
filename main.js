const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelFile = require("./data/levels.json");

const fs = require("fs");
const { join } = require("path");
const { stringify } = require("querystring");

const client = new discord.Client();
client.commands = new discord.Collection();

//lezen uit andere .js files (command handler part 1)
fs.readdir("./commands/" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);

    })
});

client.login(botConfig.token);


client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("Visual Studio Code", { type: "PLAYING" });

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('772553646449754184');

    if (!role) return;

    member.roles.add(role);


    var channel = member.guild.channels.cache.get('772524850572820534');

    if (!channel) return;

    // channel.send(`Welkom bij de server ${member}`);

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**`)
        .setColor("#14e0bb")
        .setFooter("Gebruiker gejoined")
        .setTimestamp();

    channel.send(joinEmbed);

});

client.on("message", async message => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    //leveling systeem(part 1)
    Randomxp(message)


    //command handler (part 2)
    var args = messageArray.slice(1)

    if (!message.content.startsWith(prefix))return;

    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client, message, args);

});

//leveling systeem (part 2)
function Randomxp(message){

    var randomNumber = Math.floor(Math.random() * 12) + 1;

    var idUser = message.author.id;

    if(!levelFile[idUser]){
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }

    levelFile[idUser].xp += randomNumber;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;

    var NextLevelXp = levelUser * 350;

    if(NextLevelXp == 0) NextLevelXp = 200;

    if(xpUser >= NextLevelXp){

        levelFile[idUser].level += 1;

        fs.writeFile("./data/levels.json",JSON.stringify(levelFile), err => {
            if(err) console.log(err);
        })

        var lvlUpUser = message.author

        var embed = new discord.MessageEmbed()
            .setDescription(`**Level up**`)
            .setColor("#0058ff")
            .setThumbnail(lvlUpUser.displayAvatarURL)
            .setTimestamp()
            .addField(`Proficiat, je bereikte level \n`,levelFile[idUser].level,);
        
        var levelChannel = message.member.guild.channels.cache.find(channel => channel.name === "〚💯〛levels");

            levelChannel.send(`<@${lvlUpUser.id}>`);
            levelChannel.send(embed)

    }


}