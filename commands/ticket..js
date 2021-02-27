const Discord = require('discord.js');

module.exports = {
    name: 'ticket',     
    async execute(message) {

    message.delete() 

    
    const author = message.author
    const ticketstaffID = '' //Ticket staff ID here
    const ticketcatID = '' //Ticket category ID here



    if(!message.member.roles.cache.has(ticketstaffID)) { // if a user does not have the role of {roleid}, the command will not run and message will be deleted
        let msg = await message.channel.send('You do not have a valid ticket staff role!')
        setTimeout(function(){
            msg.delete()    
       }, 5000);
       return
    }

    let name = message.author.username;
    const createdchannel = await message.guild.channels.create( `${name}-ticket`, {
        type: 'text',
        parent: ticketcatID 
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
        createdchannel.updateOverwrite( `{ROLE ID HERE}`, {READ_MESSAGES: true, SEND_MESSAGES: true, VIEW_CHANNEL: true}), 
        )
    // Replace {ROLE ID HERE} with the role ID for the roles you want to give the channel access to. 
    // You can copy and paste this line of code multiple times for multiple roles.
    // The default permissions set by me is that they are able to read and send messages and view the channel.
    // Please refer to the discordjs documentationunder the 'permissions' section to view more addable permissions.   
    
        
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
    
