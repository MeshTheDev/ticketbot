const Discord = require('discord.js');

module.exports = {
    name: 'training',     
    async execute(message) {

    message.delete() 

    
    const author = message.author

    if(!message.member.roles.cache.has('')) { // if a user does not have the role of {roleid}, the command will not run and message will be deleted
        let msg = await message.channel.send('')
        setTimeout(function(){
            msg.delete()    
       }, 5000);
       return
    }



    let name = message.author.username;
    const createdchannel = await message.guild.channels.create( `${name}-ticket`, {
        type: 'text',
        parent: '' //category ID here!
    })
    const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`TIcket`)
    .setDescription('Contact staff here!')
    .setTimestamp();
    const toreact = await createdchannel.send(embed)
    toreact.react('🗑️')

    .then( 
        createdchannel.updateOverwrite( `${author.id}`, {READ_MESSAGES: true, SEND_MESSAGES: true, VIEW_CHANNEL: true}),  
        createdchannel.updateOverwrite( ``, {READ_MESSAGES: true, SEND_MESSAGES: true, VIEW_CHANNEL: true}), //ADD ROLE ID TO ACCESS CHANNEL HERE (add multiple if necessary)
        )

    
        
    const filter = (reaction, user) => {
        return ['🗑️'].includes(reaction.emoji.name) && !user.bot ;
    };

    toreact.awaitReactions(filter, { max: 1})
        .then(collected => {
            const reaction = collected.first();

            if(reaction.emoji.name === '🗑️') {
                toreact.channel.send('This channel will be deleted in 5 seconds...')
                setTimeout(function(){
                    toreact.channel.delete()
               }, 5000);
            } 


        })
}
}  
    
