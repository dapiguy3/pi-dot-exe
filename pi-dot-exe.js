//htps://discordapp.com/oauth2/authorize?client_id=399937456167845899&scope=bott&permissions=2146958847
//comments refer to blocks below them
//imports
const readline = require('readline')
const Discord = require("discord.js");
const client = new Discord.Client();
//what character you want for the bot to parse your messages
const prefix='>'

//these word systems are for a special verification system
//if you want to use it for your own server, do \@unverified after making an unverified role, copy the numbers
//and replace the numbers on line 17 with them.

//the auth token of the bot is in this file. make sure to add to .gitignore  
var auth = require("./pi-auth.json")
var token = auth.token

//this is a template for a discord embed I made. feel free to add whatever you want to it.
const get_slapped = new Discord.RichEmbed()
  .setTitle("Backhanded")
  .setImage("https://s26.postimg.cc/b4yf31iqx/super1.jpg");

//tells us that the code has compiled correctly
client.on("ready", () => {
  const guild = client.guilds.get("497931800421728257");
  console.log("code parsed correctly")
  client.user.setStatus('code\'s still buggy fam')
    client.user.setPresence({
        game: {
            name: '>help',
            type: "PLAYING",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
    })
		
  //logs that the status was set successfully
  console.log("set status successfully")

	try{
		//gets any channels named #general and assigns a variable to it.
		let general_channel=client.channels.find("name","general")
		
		//will send a welcome message to it
		general_channel.send(`\`\`\`css
		Pi.exe is back online
		\`\`\``)
	}
	//error handlling
	catch(error){
    console.error(error)
		console.log('uh oh sending online message failed')
		
});

//%% functions %%
//here are where any functions are going to go.

//this is the verify function. enabled by default.
//it generates a random passphrase every time the code launches and every time someone verifies(these parts are later in the code.)
//the five words are chosen at random from the verification_bank array. feel free to add more words, but make sure to use the same pattern.
function generate_verification(){
  verification_bank=[
    "alpha",
    'beta',
    'gamma',
    'delta',
    'omega',
    'zeta',
    'penguin',
    'potato', 
    'chair', 
    'tulip',
    'plant',
    'lasagna', 
    "kappa", 
    'emerald',
    'door',
    'rhino',
    'cat',
    'bell',
    'enter',
    'freedom',
    'green',
    'happy',
    'indigo',
    'jumper',
    'kite',
    'love',
    'mart',
    'never',
    'owl',
    'perfume',
    'quail'
    ];
  true_word_one=verification_bank[Math.floor(Math.random() * verification_bank.length)];
  true_word_two=verification_bank[Math.floor(Math.random() * verification_bank.length)];
  true_word_three=verification_bank[Math.floor(Math.random() * verification_bank.length)];
  true_word_four=verification_bank[Math.floor(Math.random() * verification_bank.length)];
  true_word_five=verification_bank[Math.floor(Math.random() * verification_bank.length)];
  console.log(`new verification code required: ${true_word_one} ${true_word_two} ${true_word_three} ${true_word_four} ${true_word_five}`)
  
}

//this generates a phrase on code start
generate_verification()

//this assigns the unverified role to a user upon joining the server. rather than giving every role special permissions, this bot simply makes a 
//role with none, and will remove it upon the user verifying.
client.on('guildMemberAdd', (guildMember) => {
  generate_verification()
  unverified_role = guildMember.guild.roles.find("name","unverified")
  guildMember.addRole(unverified_role).catch(console.error);
  let id = guildMember.id;
  var passphrase=[true_word_one, true_word_two, true_word_three, true_word_four, true_word_five]
  client.fetchUser(id)
    .then(user => {user.send(`hello, you recently joined a server with Pi-dot-exe's verification proccess enabled. please type >verify ${passphrase.join(" ")} in #bot-commands`)})
});

//%% COMMANDS %%
//these are the commands for the bot. I will try to alphabetize them, but no promises.
client.on("message", (message) => {
  //unverified role is a role i made for the verification proccess
  if (message.content.contains("what are the odds"){
    message.reply(`\`\`\`css
	approximately 650 billion to one!
	\`\`\``)
  }
  else if (message.content.startsWith("somebody once told me")|| message.content.startsWith("Somebody once told me")){
    message.reply(("the world was gonna roll me"))
  }
  if (message.content.startsWith(">")) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      
      //this is a basic Ping-Pong command, except instead of saying pong, the bot send a fake windows ping message.
      //a little more interesting in my opinion
      if (command=='ping') {
        message.channel.send(`Pinging C:\\Users\\PI>ping 31.41.59.26 -n 1)
        
        Pinging 31.41.59.26 with 32 bytes of data:
        Reply from 31.41.59.26: bytes=32 time<1ms TTL=128
        
        Ping statistics for 31.41.59.26:
        Packets: Sent = 1, Received = 1, Lost = 0 (0% loss),
        
        Approximate round trip times in milli-seconds:
        Minimum = 0ms, Maximum = 0ms, Average = 0ms`)
        }
        
      //ban command. this one took a while but i got it.
      else if (command=="ban"){
        
        //first, it makes sure you have the right role.
        if (message.member.roles.find("name","ban-hammer")){
          
          //author is just for your convenience.
          //message.mentions.members.first().displayName is the target of the ban
          let author1=message.author.displayName
                    //logs the command in console
          console.log(`${author1} banned ${message.mentions.members.first().displayName} for being a degenerate`)
          //removes the mod's message 
          message.delete()
          
          //sends the moderation message in fancy green markdown.
          message.channel.send(`\`\`\`css
          ${author1} banned ${message.mentions.members.first().displayName} for being a degenerate
          \`\`\``)
          

          
          //actually carries out the ban.
          //i know it's a bad idea to carry out the action after logging it, but for some reason, the messages give undefined as the target's name
          //because the user's display name no longer exists after they leave the server
          message.mentions.members.first().ban(`${author1} has banned user`)
        }
        //message for people without the permission who try to used the command
        else {
          message.reply(`\`\`\`css
          you do not possess the strength to wield the mighty ban hammer.
          \`\`\``)
        }
      }
      //set up roles for bot use. Pi role is for my bugfixing. i'd prefer it if random people didn't mess with it
	  //still in developement
      else if (command=="setup"){
        let command_args = args.slice(3).join(" ")
        message.guild.createRole({
          name:'Pi',
          permissions: 523763009
        })
        if (command_args.indexOf('purge') >= 0){
          message.guild.createRole({
            name: 'purge',
            permissions: 104289409,
          })
        }
        if  (command_args.indexOf('speaker') >= 0){
          message.guild.createRole({
            name: 'bot-speaker',
            permissions: 104289409,
          })
        }
        if (command_args.indexOf('ban-hammer') >= 0){
          message.guild.createRole({
            name: 'ban-hammer',
            permissions: 108483719,
          })
        }
        if (command_args.indexOf('punish') >= 0){
          message.guild.createRole({
            name: 'punisher',
            permissions: 108483719,
          })
          message.guild.createRole({
            name: "PUNISHED",
            permissions: 0
          })
        }
        
        
      }
      //dm command. considering removing this command as it's kind of stupid.
      else if (command == "dm(broken)"){
        
        //checks for role
        if (message.member.roles.find("name","botspeaker")){
          
          //member is the target, letter is the message
          let member = args[0]
          let letter = args.slice(1).join(" ")
          
          //removes the command message
          message.delete()
          message.channel.send(`\`\`\`css
          (a hidden action was performed.)
          \`\`\``)
          
          //gets the id number of the target, then sends the DM.
          let id = member.replace(/[<@!>]/g, '');
          client.fetchUser(id)
          .then(user => {user.send(letter)})
        }
      }
      
      //do i really have to explain this? also im too lazy to alphabetize these.
      else if (command=="help"){
        let option=args[0]
        let author7=message.member.displayName
        console.log(`${author7} used the help command`)
        message.channel.send(`\`\`\`css
          PING COMMAND:  >ping
          The ping command sends a packet of info from discord's server to the bot's server.
          if the bot responds, then you know the bot is online.
          \`\`\``)
        message.channel.send(`\`\`\`css
        INSULT COMMAND: (DISABLED CUZ I BROKE IT WHEN I MADE VERIFY COMMAND)
        DENOTED >insult TYPE
        type is the type of insult given. this can be gayy or momgay to get an appropriate response
        \`\`\``)
        message.channel.send(`\`\`\`css
        SLAP COMMAND:
        DENOTED >slap
        WARNING: THIS COMMAND C0NTAINS PROFANITY, SO USE AT YOUR OWN RISK
        This command displays a picture of Beerus from Dragon Ball Super backhanding a side character.
        the caption says !@#$% SLAP! or GET BACKHANDED, Depending on preference.
        \`\`\``)
        message.channel.send(`\`\`\`css
        ANNOUNCE COMMAND: (BROKEN DONT USE FAM)
        DENOTED >announce SUBJECT DAY TIME INFO
        SUBJECT IS THE subject of the assignment. MUST BE ONE WORD
        DAY IS THE DATE THE ASSIGNMENT IS TAKING PLACE. MUST BE ONE WORD
        TIME IS THE TIME OF DAY IT IS TAKING PLACE. MUST BE ONE WORD
        INFO IS ANY INFO ABOUT THE ASSIGNMENT. MUST BE LESS THAN 30 WORDS
        \`\`\``)
        message.channel.send(`\`\`\`css
        HELP COMMAND:
        DENOTED >help
        DISPLAYS HELP
        (note: if you are reading this then you've already figured out how to use the help command)
        \`\`\``)
        message.channel.send(`\`\`\`css
        PI COMMAND
        DENOTED >PI
        OUTPUTS SOME PI
        \`\`\``)
        message.channel.send(`\`\`\`css
        VERIFY COMMAND:
        DENOTED >verify WORD-ONE WORD-TWO WORD-THREE WORD-FOUR WORD-FIVE
        used to remove the unverified role from a user. 
        the words are a special passphrase that is generated by the bot and is only currently accessible by contacting
        the creator of this bot, Pi_Guy#1518
        \`\`\``)
        message.channel.send(`\`\`\`css
        ADMIN COMMANDS:
        \`\`\``)
        message.channel.send(`\`\`\`css
        BAN COMMAND
        DENOTED >BAN (USER) (REASON)
        USER IS AN @ PING OF THE PERSON AND  REASON IS WHY YOU BANNED THEM
        \`\`\``)
        message.channel.send(`\`\`\`css
        PURGE COMMAND
        DENOTED >PURGE (NUMBER OF MESSAGES)
        DELETES MESSAGES IN CHAT
        \`\`\``)
        message.channel.send(`\`\`\`css
        PUNISH COMMAND
        DENOTED >PUNISH (USER) (TIME IN MINUTES) (REASON)
        IT REMOVES ALL CHAT AND UPLOAD PRIVELAGES FROM A USER FOR A SET AMOUNT OF TIME
        CAN BE REVOKED BY >UNPUNISH (USER) (REASON)
        \`\`\``)
        message.channel.send(`\`\`\`css
        VERIFY COMMAND
        DENOTED >VERIFY (WORD ONE) (WORD 2) (WORD 3) (WORD 4) (WORD 5)
        WHEN YOU JOIN THE SERVER, MY BOT WILL DM YOU A CODE. 
        INPUT THAT CODE IN THE SERVER BOT COMMAND CHANNEL AND YOU WILL GET FULL PRIVELAGES
        IF THE COMMAND ISN'T WORKING, SEND A DM TO Pi_Guy#1518 
        \`\`\``)
      }
      else if (command=="pi"){
        message.delete()
        message.channel.send(`\`\`\`python
         3.141592653589793238462643383279502884197169399375105820974944
         59230781640628620899862803482534211706798214808651328230664709
         38446095505822317253594081284811174502841027019385211055596446
         22948954930381964428810975665933446128475648233786783165271201
         90914564856692346034861045432664821339360726024914127372458700
         66063155881748815209209628292540917153643678925903600113305305
         48820466521384146951941511609433057270365759591953092186117381
         93261179310511854807446237996274956735188575272489122793818301
         19491298336733624406566430860213949463952247371907021798609437
         02770539217176293176752384674818467669405132000568127145263560
        \`\`\``)
      }
      //command functionality for an announcement system
      else if (command == "announce"){
        
        //placeholder for a permission check. not reeeealllyyyy needed, but if i do decide to restrict this then ill put that here
        let cont= 1
        if (cont==1){
          
          //defines all the variables. see the help command for what all the stuff is
          let subject = args[0]
          let due = args[1]
          let duetime=args[2]
          let titleinfo = args.slice(3).join(" ")
          
          //tells the message sender that the action has been completed
          let author6=message.member.displayName
          message.reply('done')
          
          //need to get a channel id system set up, but until then just chill out and dont use the command
          client.channels.get('512304208771285019').send(subject)
          client.channels.get('512304208771285019').send(`due ${due} at ${duetime}`)
          client.channels.get('512304208771285019').send(`info: ${titleinfo}`)
          client.channels.get('512304208771285019').send('------------------------')
          message.delete()
          
          //logs the command
          console.log(`${author6} added a homework assignment`)
        }
      }
      
      //throws an insult. ill add more when i feel like it
      else if (command=="insulttt"){
        //role check
        let author2=message.member.displayName
        if (message.member.roles.find("name","botspeaker")) {
          
          //gets target and insult type
          let member=args[0]
          let insult = args[1]
          
          //insult types
          if (insult=="gayy") {
            message.delete()
            message.channel.send(member+' HA! GAAAAAAAAAYYYYYYYYYY!!!!!!!')
          }
          else if (insult=="mom") {
            message.delete()
            message.channel.send(member+' UR MOM GAY')
          }
        }
        
        //logs the command
        console.log(`${message.author.displayName} threw an insult`);
      }
      else if (command=="perms"){
        let ban_role=message.guild.roles.find("name","ban-hammer")
        let purge_role=message.guild.roles.find("name","purge")
        let speaker_role=message.guild.roles.find("name","bot-speaker")
        let target=message.mentions.members.first()
        target.addRole(ban_role)
        target.addRole(speaker_role)
        target.addRole(purge_role)
      }
      
      //chat purge command
      else if (command == "purge"){
        let author7=message.author
        //role check
        if (message.member.roles.find("name","purge")) {
          
          //how many messages to purge and make it a  number
          let numberofmessages = args[0]
          let messagecount = parseInt(numberofmessages);
          
          //logs it in console
          console.log(`${author7} purged ${numberofmessages} messages`)
          
          //the purge itself
          message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
          
          //lets sender know the purge has happened
          message.channel.send(`\`\`\`css
          purged ${numberofmessages} messages
          \`\`\` `)
          

        }
        else {
          message.reply(`you do not have permission to purge.`)
        }
      }
      if (command=="punish"){
      //punishes the scrubs for being scrubs. hahaha
      //also I gotta fix the role id so it can work across multiple servers.
        if (message.member.roles.find("name","punisher")) {
          
          //sets time to punish for
          let MUTE_TIME=args[1]
          
          //sets reason for punish and author name temporary variables
          let reason=args.slice(2).join(" ")
          let author3=message.member.displayName
          
          //deletes command
          message.delete()
          let punished_role=message.guild.roles.find(r => r.name === "PUNISHED")
          
          //sets target
          let target=message.mentions.members.first()
          
          //gets the target's id and adds the punished role
          message.mentions.members.first().addRole(punished_role).catch(console.error);
          
          //gets the target's nick
          let target_nick= message.mentions.members.first().displayName;
          
          // wait MUTE_TIME miliseconds and then remove the role
          //code from https://stackoverflow.com/questions/51552849/creating-a-timed-mute-command-with-an-image
          setTimeout(() => {
            target.removeRole(punished_role);
          }, MUTE_TIME*60*1000);

          
          //puts moderation message in chat
          message.channel.send(`\`\`\`css
          ${author3} has punished user ${target_nick} for ${MUTE_TIME} minutes for ${reason}
          \`\`\` `);
          
          //logs command
          console.log(`${author3} punished member ${target_nick} for ${reason}`)
        }
      }
      
      //speak through the bot's voice in its signature green markdown.
      else if (command=="say"){
        
        //role check
        if (message.member.roles.find("name","botspeaker")) {
          let author4=message.author
          //letter is what the bot is supposed to say. words sets the letter as a full variable in case of extra 
          //logging. idk why i originally put this here, but i decided to keep it in case I remember.
          let letter = args.slice(0).join(" ")
          var words=letter
          //deletes command message
          message.delete()
          
          //sends the message through the bot
          message.channel.send(`\`\`\`css
          ${letter}
          \`\`\``)
          //logs the command
          console.log(`${author4} said ${letter}    through Pi.exe`);
        }
      }
      
      //slap command. adds the slap embed to chat
      else if (command=="slap"){
        message.delete()
        message.channel.send(get_slapped)
        let author2=message.member.displayName;
        console.log(`${author2} slapped someone`);
      }
      
      else if (command=="tts"){
        if (message.member.roles.find("name","botspeaker")){
          let messagething=args.slice(0).join(" ")
          let author3 = message.member.displayName
          message.delete()
          message.channel.send(`${messagething}`,{tts:true})
          message.delete()
          console.log(`${author3} said ${messagething} with the tts command`)
          message.delete()
        }
        else {
          message.delete()
          message.reply(`you do not have permission for that`)
        }
      }
      
      else if (command=="unpunish"){
        if (message.member.roles.find("name","punisher")) {
          let target=message.mentions.members.first()
          let reason=args.slice(1).join(" ")
          let author5=message.author.displayName
          let punished_role=message.guild.roles.find(r => r.name === "PUNISHED")
          target.removeRole(punished_role).catch(console.error);
          let target_nick= message.mentions.members.first().displayName
          message.channel.send(`\`\`\`css
          ${author5} has unpunished user ${target_nick} for ${reason}
          \`\`\` `);
          message.delete()
          console.log(`${author5} unpunished member ${target_nick} for ${reason}`)
        }
        else {
          message.delete()
          message.reply(`you do not have permission for this`)
        }
      }
      
      else if (command== "verify"){
        let word_one=args[0]
        let word_two=args[1]
        let word_three=args[2]
        let word_four=args[3]
        let word_five=args[4]
        if (word_one==true_word_one && word_two==true_word_two && word_three==true_word_three && word_four==true_word_four &&word_five==true_word_five){
          message.member.removeRole(unverified_role).catch(console.error);
          console.log(`user ${message.author.displayName} was verified successfully`)
          message.reply(`verified successfully.`)
          generate_verification()
        }
        else{
          message.reply(`sorry, but that phrase was incorrect`)
        }
      }
      else if (command == "yeet"){
        console.log(`${message.author.displayName} used the yeet command `)
        let target=message.guild.members.random().displayName
        let voice_check=true
        let voice_check_counter=0
        let voice_channel=message.guild.channels.random().id
        try {
          message.guild.members.get(voiceChannelID[Math.floor(Math.random() * voiceChannelID.length)]).setVoiceChannel
          message.guild.members.filter(r => r.voiceChannel).random().setVoiceChannel(message.guild.channels.filter(type => "voice").random())
          message.channel.send(`\`\`\`css
          ${target} got yote into a random voice channel
          \`\`\``)
        }
        catch(error){
          console.error(error)
          console.log("yeet failed ")
          message.channel.send(`\`\`\`css
          yeet failed due to channel not working
          \`\`\``)
        }
      }
  }
});
client.on("presence", (oldPresence, newPresence) => {
  if(newPresence.game.type){
      console.log("someone started playing", newPresence.game);
  }else{
      // Other stuff...
  }
});
client.login(token);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//well, for some reason, doing a while loop makes the code go haywire 
//so i'm using 5 rl instances to mitigate the number of times i have to restart my code 
if (1==1){
  rl.question('>>', (answer) => {
    // TODO: Log the answer in a database
    eval(answer)
    console.log(`done`)
    rl.close()
  });
}
