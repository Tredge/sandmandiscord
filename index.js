const Discord = require('discord.js');
const bot = new Discord.Client();

const ytdl = require("ytdl-core");

const token = 'ODYxMDAyNDg0OTk4NjAyNzg0.YODdDQ.1NcqldqP6zLTxbrPoEZpCYx9Jq8';

const prefix = '!';

var servers = {};


bot.on('ready', () =>{
    console.log('The SandMan is online!');
})

//Below are some random basic IF statements derived from CodeLyon's vids 

bot.on('message', msg=>{
    if (msg.content === "wagwan"){
        msg.reply('oi wagwan g still fam');
    }
})

bot.on('message', msg=>{
    if (msg.content === "yo Adam is joe a retard?"){
        msg.reply('why yes, Joe is in fact retarded');
    }
})

bot.on('message', msg=>{
    if (msg.content === "Adam tell Aidan to shut up"){
        msg.channel.send('Aidan just shut up retard');
    }
})

bot.on('message', msg=>{
    if (msg.content === "bruh"){
        msg.channel.send('https://i.pinimg.com/originals/03/19/aa/0319aa2512d7c7508702512fe642c09d.gif');
    }
})

bot.on('message', msg=>{
    if (msg.content === "George Floyd"){
        msg.channel.send('https://usareally.com/uploads/2021/02/15/orig-photo20210215123823-1613394880.jpg');
    }
})

bot.on('message', msg=>{
    if (msg.content === "pog"){
        msg.channel.send('https://www.meme-arsenal.com/memes/28576beb596a5a49207912a086f1ff34.jpg');
    }
})

//switches are essentially IF statements and cases are the equivalent of == 

// Breaks: When JavaScript reaches a break keyword, it breaks out of the switch block.
// This will stop the execution inside the switch block. It is not necessary to break the last case in a switch block. The block breaks (ends) there anyway.

bot.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");

    switch(args[0]){
        case 'ping':
            msg.channel.send('pong')
            break;
        case 'website':
            msg.channel.send('www.tredgegfx.com')
            break;
        case 'info':
            if(args[1] === 'version'){
                msg.channel.send('The Current Version Is SandMan V1.0');
            }else{
                msg.channel.send('Invalid Args Dumbass')
            }
        break;

//This case below is the clear command, where you can clear bulk lines of messages at once (not given to certain roles yet)

        case 'clear':
            if(!args[1]) return msg.reply('bit of an issue mate, u gotta define a second Arg')
            msg.channel.bulkDelete(args[1]);
            break;

    }
})

//below are all the commands to do with the music portion of the bot

bot.on('message', msg=>{
    
    let args = msg.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        case 'play':
            function play(connection, msg){
                var server =  servers[msg.guild.id];
                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("finish", function(){ //
                    if(server.queue[0]){
                        play(connection, msg);
                    }else {
                        connection.disconnect();
                    }
                });

            }

            if(!args[1]){
            msg.channel.send('you need to provide a link dumbass')
        return;
    }

    if(!msg.member.voice.channel){
        msg.channel.send('you have to be in a voice channel retard');
        return;
    }

    if(!servers[msg.guild.id]) servers[msg.guild.id] = {
        queue: []
    }

    var server = servers[msg.guild.id];

    server.queue.push(args[1]);

    if(!msg.member.voice.connection) msg.member.voice.channel.join().then(function(connection){ 
        play(connection, msg);
    })

//below is the skip command which allows you to skip through songs in the queue 

        break;

        case 'skip':
            var server = servers[msg.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            msg.channel.send("Skipping the current song")

        break;

//below is the stop command

        case 'stop':
            var server = servers[msg.guild.id];
            if(msg.guild.voice.connection){
                for(var i = server.queue.length -1; i >=0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                msg.channel.send("Ending the queue, leaving the voice channel lads")
                console.log('stopped the queue')
            }

            server.dispatcher.on("end", () =>{
                if(server.queue[0]){
                    play(voice.connection, message);
                }else{
                    voice.connection.disconnect();
                }
                });


        break;
            
    }
});




bot.login(token);

