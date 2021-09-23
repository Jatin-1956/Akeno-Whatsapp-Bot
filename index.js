import { create } from '@open-wa/wa-automate'
import { decryptMedia } from '@open-wa/wa-decrypt'
import msgHandler from './msgHandler.js'
import fs from 'fs-extra'
const config = JSON.parse(fs.readFileSync('config.json'))
/*const grpdollar = client.chat.groupMetadata.id = '96895268451-1621274058@g.us'
if(grpdollar)
{
	const config = JSON.parse(fs.readFileSync('./configdol.json'))
} else {
		const config = JSON.parse(fs.readFileSync('./config.json'))
}*/
const serverOption = {
    headless: true,
    cacheEnabled: false,
    useChrome: true,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ]
}

const opsys = process.platform
if (opsys === 'win32' || opsys === 'win64') {
    serverOption.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
} else if (opsys === 'linux') {
    serverOption.browserRevision = '737027'
} else if (opsys === 'darwin') {
    serverOption.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const startServer = async (client) => {
        global.sclient = client
	    const sendingSticker = []
        const queueSticker = []
        var botadmins = config.botadmins
        var botname = config.botname
		var prefix = config.prefix
    	global.sendingAnimatedSticker = []
    	global.queueAnimatedSticker = []
    	global.amdownloaden = []
    	global.queuemp3 = []
    	global.queuemp4 = []
    	const spamarr = []
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        client.onStateChanged((state) => {
                console.log('[Client State]', state)
                if (state === 'CONFLICT') client.forceRefocus()
        })
        // listening on message
        client.onMessage((message) => {
            msgHandler(client, message)
        })

       
        
        client.onAddedToGroup((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < 2) { 
            	client.sendText(chat.id, `This group only has ${totalMem} members, Its needs atleast 30 members to activate the services`).then(() => client.leaveGroup(chat.id))
            	client.deleteChat(chat.id)
            } else {
                client.sendText(chat.groupMetadata.id, `Thanks for adding me, Senpai. Use !help to see the usable commands`)
            }
        })

        // listening on Incoming Call
        client.onIncomingCall((call) => {
            client.sendText(call.peerJid, '...')
            client.contactBlock(call.peerJid)
            ban.push(call.peerJid)
            fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
        })
    }

create({"headless": true,
        "cacheEnabled": false,
        "useChrome": true,
        "chromiumArgs": [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--aggressive-cache-discard",
            "--disable-cache",
            "--disable-application-cache",
            "--disable-offline-load-stale-cache",
            "--disk-cache-size=0"
        ]
    })
    .then(async (client) => startServer(client))
    .catch((error) => console.log(error))
