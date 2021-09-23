import { decryptMedia } from '@open-wa/wa-decrypt'
import fs from 'fs-extra'
import https from 'https'
import axios from 'axios'
import moment from 'moment-timezone'
import { sendAnimatedStickers } from './sendSticker.js'
import get from 'got'
import pkg from 'remove.bg'
const { RemoveBgError, RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = pkg
import { color } from './lib/color.js'
import { liriklagu, quotemaker, wall } from './lib/functions.js'
import { help, newbot, info, nc, nsfwc, } from './lib/help.js'
import { isFiltered,addFilter } from './lib/msgFilter.js'
import akaneko from 'akaneko';
import { exec } from 'child_process'
import fetch from 'node-fetch';
import ocrtess from 'node-tesseract-ocr'
import Nekos from 'nekos.life'
import nekobocc from 'nekobocc'
import canvas from 'canvacord'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import bent from 'bent'
import waifulist from "public-waifulist"
import { pkmzdata } from './lib/poke.js'
const neko = new Nekos()
const ruleArr = JSON.parse(fs.readFileSync('./lib/rule.json'))
const waifuclient = new waifulist()
const pkarrs = JSON.parse(fs.readFileSync('./lib/pokedata/pkmnz.json'))
const wel = JSON.parse(fs.readFileSync('./lib/welcome.json')) 
const noextra = JSON.parse(fs.readFileSync('./lib/noextra.json')) 
const nsfwgrp = JSON.parse(fs.readFileSync('./lib/nsfwg.json')) 
const ban = JSON.parse(fs.readFileSync('./lib/banned.json'))
const cr = JSON.parse(fs.readFileSync('./lib/cr.json'))
const flirty = JSON.parse(fs.readFileSync('./lib/flirty.json'))
const prefix = '!';
const botadmins = '968595268451';
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const ocrconf = {
    lang: 'eng',
    oem: '1',
    psm: '3'
}
import { randomLewd,armpits,feets,thighs,ass,boobs,belly,sideboobs,ahegao } from './lib/nsfw.js'
import { waifu } from './lib/weeaboo.js'
import { doge,wholesome,animestick,truthkinky,truth,dare,pickup } from './lib/fun.js'
import { profile } from './lib/profile.js'
import { uploadImages } from './lib/fetcher.js'
import { stickerHandler } from './lib/sticker.js'
const stickerArr = ['XM1N7CiW1xxkL8Oi6sCD2+xECehai2DI4bE37I7PIhw=', 'toFAeTndmqlzGRdBUY4K2EAnLdwCqgGF7nmMiaAX2Y0=', 'UWK/E5Jf/OLg+zFgICX3bwXc0iXfPEZ+PDDf0C+3Qvw=', 'BfppV7tESHi/QmrxuJG4WdXKYsO3lNTiXf0aBfasJ4E=', 'mHbEuCjA+RVWftr2AFuLieAJcyHYZnibd7waZPqvDNQ=']

import { msg } from './nonPrefix.js'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function msgHandler (client, message){
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, mentionedJidList, author, quotedMsgObj } = message
        let { body } = message
        const { name } = chat
        let { pushname, verifiedName } = sender
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const args = body.slice(prefix.length).trim().split(/ +/).slice(1)
		const ar = args.map((v) => v.toLowerCase())
        const isCmd = body.startsWith(prefix)
	    const isRule = ruleArr.includes(chat.id)
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
		const url = args.length !== 0 ? args[0] : ''
		const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'

	const botNumber = await client.getHostNumber()
	const q = args.join(' ')
	const groupId = isGroupMsg ? chat.groupMetadata.id : ''
	const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
	const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
	const mess = {
      error: {
        St:
          "[❗] Write *!sticker* either in the caption of an image/gif or reply to an image/gif with the command.",
        Qm: "[❗] Some error occured, maybe the theme is not available!",
        Ki: "[❗] Bot can't remove the group admin!",
        Ad: "[❗] Could not add target, may be it is private",
        Iv: "[❗] Link is invalid!",
        Gp: "[❗] This command is only for groups!",
        Ow: "[❗] This command is only for the bot owner!",
        admin: "[❗] This command can be used by group admins only!",
      },
    };
	if (isCmd && ban.includes(sender.id)) return client.reply(from, 'You\'re banned!', id)
	if ((message.type == 'sticker') && (stickerArr.includes(message.filehash))) return await stickerHandler(message, client, isGroupAdmins, isBotGroupAdmins, groupAdmins, color, time)
	if (isGroupMsg && isRule && (type === 'chat' && message.body.includes('chat.whatsapp.com') && isBotGroupAdmins) && !isGroupAdmins) return await client.removeParticipant(chat.id, author)
        if (isCmd && isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isFiltered(from) && isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        if (!isCmd && !isGroupMsg) return msg(message, color, true, time)
        if (!isCmd && isGroupMsg) return msg(message, color, false, time)
        if (isCmd && !isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        // eg [9190xxxxxxxx, 49xxxxxxxx] replace my number also 
		const isgroup3 = (groupId == '918777249271-1607195723@g.us')
        const isowner = botadmins.includes(sender.id);
		const miranda = ['https://media.giphy.com/media/uomDFV7IcK2Vq/giphy.mp4',
		'https://media.giphy.com/media/vlmF0NDM01rlmTTmxf/giphy.mp4',
		'https://media.giphy.com/media/NqB417zzxGArjvRZ48/giphy.mp4',
		'https://media.giphy.com/media/a7MWSPaLGJziroFVWO/giphy.mp4',
		'https://media.giphy.com/media/3PTBGM86pjGDdcZ9pc/giphy.mp4',
		'https://media.giphy.com/media/y5yDGSHC0GQPqqM3QZ/giphy.mp4',
		'https://media.giphy.com/media/jF8xp1wf2IE7BAdCzI/giphy.mp4',
		'https://media.giphy.com/media/aJO5tu3YsfyvXinHQf/giphy.mp4',
		'https://media.giphy.com/media/GyMLaYZ6EJUlU1fvG5/giphy.mp4',
		'https://media.giphy.com/media/Ktb3t5iJAm9eygJBT6/giphy.mp4',
		'https://media.giphy.com/media/MsBYBD74QtXjrxLL5T/giphy.mp4',
		'https://media.giphy.com/media/6aPHIMzTnOsTMiztAp/giphy.mp4',
		'https://media.giphy.com/media/zma7xdVnR6Alx8xVkJ/giphy.mp4',
		'https://media.giphy.com/media/bU6t4GFJlHCAdDdR3z/giphy.mp4',
		'https://media.giphy.com/media/Hb6HitfOILrGJlcfvB/giphy.mp4',
		'https://media.giphy.com/media/C0cxjRmmVx9nCDYEl1/giphy.mp4',
		'https://media.giphy.com/media/ChnLI04IK9t3BwbkcA/giphy.mp4',
		'https://media.giphy.com/media/u51QoyT1SJG81jV4tZ/giphy.mp4',
		'https://media.giphy.com/media/ywRYkMVbpZtB0lx4sn/giphy.mp4',
		'https://media.giphy.com/media/fc5WDmpJs9bLwXbZGY/giphy.mp4',
		'https://media.giphy.com/media/1pTSiTeib5UaBf6WAY/giphy.mp4',
		'https://media.giphy.com/media/wi2lmR3E24ASKP6BnJ/giphy.mp4',
		'https://media.giphy.com/media/7ZKo9VEU6lrbp59NLq/giphy.mp4',
		'https://media.giphy.com/media/310cMYTMlnGKLemhz9/giphy.mp4',
		'https://media.giphy.com/media/wwKTUq4YdoQcR1ed40/giphy.mp4']
		let mirandag = miranda[Math.floor(Math.random() * miranda.length)]

        addFilter(from)

        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        switch (command) {

        case 'sticker':
		case 'st':
		        let metadata = { author: "Akeno", pack: "Stickers" };
				if (args.includes("nocrop")) metadata.keepScale = true;
				if (
					(isMedia && type === "image" && mimetype !== "image/gif") ||
					(quotedMsg && quotedMsg.type == "image" && quotedMsgObj.mimetype !== "image/gif")
					) {
						client.reply(chatId, "Close your dreamy eyes and wait for me", id);
						if (!noextra.includes(chat.id)) {
							client.sendMp4AsSticker(from, mirandag);
						}
						message = isMedia ? message : quotedMsg;
						const mediaData = await decryptMedia(message, uaOverride)
						let imageBase64 = `data:${message.mimetype};base64,${mediaData.toString("base64")}`;		  
						await client.sendImageAsSticker(chatId, imageBase64, metadata);		 
				} else if (
          (isMedia && (mimetype === "video/mp4" || mimetype === "image/gif")) ||
          (quotedMsgObj &&
            quotedMsgObj.isMedia &&
            (quotedMsgObj.mimetype === "video/mp4" ||
              quotedMsgObj.mimetype === "image/gif"))
        ) {
          message = isMedia ? message : quotedMsgObj;
          const mediaData = await decryptMedia(message, uaOverride)
					if (!noextra.includes(chat.id)) {
							client.sendMp4AsSticker(from, mirandag);
						}
          client.reply(chatId, "Close your dreamy eyes and wait for me", id);
		  if (args.includes("nocrop")) {
			try {
				await client.sendMp4AsSticker(
				chatId,
				mediaData,
				{
					crop: false,
					endTime:
					message.duration >= 10
						? "00:00:10.0"
						: `00:00:0${message.duration}.0`,
				}
				);
			} catch (err) {
				await client.reply(
				chatId,
				err.name === "STICKER_TOO_LARGE"
					? "Video too big, try reducing the duration"
					: "Some error occurred, sorry :(",
				id
				);
			}
		  }
		  else {
			  try {
				await client.sendMp4AsSticker(
				chatId,
				mediaData,
				{
					crop: true,
					endTime:
					message.duration >= 10
						? "00:00:10.0"
						: `00:00:0${message.duration}.0`,
				}
				);
			} catch (err) {
				await client.reply(
				chatId,
				err.name === "STICKER_TOO_LARGE"
					? "Video too big, try reducing the duration"
					: "Some error occurred, sorry :(",
				id
				);
			}
		  }
        } else if (args[1] && args[1].match(isUrl)) {
					await client
						.sendStickerfromUrl(chatId, args[1], { method: "get" })
						.catch((err) => console.log("Caught exception: ", err));
				} else {
					client.reply(chatId, mess.error.St, id);
				}
        break
       case 'stickermeme':
	   case 'stcmeme':
		if (!q.includes('|')) return await client.reply(from, 'Incorrect format, Senpai', id)
                if (isMedia && type === "image" || quotedMsg && quotedMsg.type === "image") {
                    await client.reply(from, 'Close your dreamy eyes and wait for me', id);
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const topp = top.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const bottomm = bottom.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    const encryptMedia = quotedMsg && quotedMsg.type === "image" ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${topp}/${bottomm}.png?background=${getUrl}`
                    await client.sendStickerfromUrl(from, create, null, { author: 'Akeno', pack: 'Stickers', keepScale: true });
                } else {
                    await client.reply(from, 'Incorrect format, Senpai', id);
                }
			break
			
		case 'dogesticker': // by CHIKAA CHANTEKKXXZZ
        case 'doge':
                doge()
                    .then(async (body) => {
                        const dogeg = body.split('\n')
                        const dogegx = dogeg[Math.floor(Math.random() * dogeg.length)]
                        await client.sendStickerfromUrl(from, dogegx, null, { author: 'Akeno', pack: 'Stickers' })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    })
            break
		case 'wholesome': // by CHIKAA CHANTEKKXXZZ
        case 'wh':
                wholesome()
                    .then(async (body) => {
                        const wholesomeg = body.split('\n')
                        const wholesomegx = wholesomeg[Math.floor(Math.random() * wholesomeg.length)]
                        await client.sendStickerfromUrl(from, wholesomegx, null, { author: 'Akeno', pack: 'Stickers', keepScale: true })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    })
            break
		case 'animesticker': // by CHIKAA CHANTEKKXXZZ
        case 'astick':
                animestick()
                    .then(async (body) => {
                        const animestickg = body.split('\n')
                        const animestickgx = animestickg[Math.floor(Math.random() * animestickg.length)]
                        await client.sendStickerfromUrl(from, animestickgx, null, { author: 'Akeno', pack: 'Stickers' })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    })
            break
			
		case 'nightcore':
                if (isMedia && type === 'audio' || quotedMsg && quotedMsg.type === 'audio' || type === 'ptt' || quotedMsg && quotedMsg.type === 'ptt') {
                    await client.reply(from, 'Wait for me, Senpai', id)
                    const encryptMedia = quotedMsg && quotedMsg.type === 'audio' || quotedMsg && quotedMsg.type === 'ptt' ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter('asetrate=44100*1.25')
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await client.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await client.reply(from, 'Incorrect format, Senpai', id)
                }
            break

		case 'triggered':
                if (isMedia && type === "image" || quotedMsg && quotedMsg.type === "image") {
                    const encryptMedia = quotedMsg && quotedMsg.type === "image" ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
					let metadata = { author: "Akeno", pack: "Stickers" };
					if (args.includes("nocrop")) metadata.keepScale = true;
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await client.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                } else {
                    await client.reply(from, 'Incorrect format, Senpai', id)
                }
            break
		case 'lol':
//		            client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/uomDFV7IcK2Vq/source.gif', { crop: false});
//		            client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/uomDFV7IcK2Vq/source.gif');
//					client.sendMp4AsSticker(from, 'https://media.giphy.com/media/uomDFV7IcK2Vq/source.gif', {crop: false});
//					client.sendMp4AsSticker(from, 'https://media.giphy.com/media/uomDFV7IcK2Vq/source.gif');
//			await client.sendStickerfromUrl(from, `https://media1.tenor.com/images/28822a055f6995b95d9a4f93b0c0b94d/tenor.gif`, null, { author: 'Akeno', pack: 'Stickers', keepScale: true });
//			await client.sendStickerfromUrl(from, `https://media1.tenor.com/images/c870a5ebc60cedc15f6b41576fd98bf5/tenor.gif`, null, { author: 'Akeno', pack: 'Stickers', keepScale: true });
//			await client.sendStickerfromUrl(from, `https://37.media.tumblr.com/4e3d87e902aa4f1c50c2cc40e3344e08/tumblr_n4bnv8VbPf1r3uw7zo1_400.gif`, null, { author: 'Akeno', pack: 'Stickers', keepScale: true });
//			await client.sendStickerfromUrl(from, `https://media1.tenor.com/images/2deb4d5b5d9072f2c3aacc6cc8c41f5d/tenor.gif`, null, { author: 'Akeno', pack: 'Stickers', keepScale: true });
//			await client.sendStickerfromUrl(from, `http://mrwgifs.com/wp-content/uploads/2013/05/Miranda-Kerrs-Seductive-Wink-Gif.gif`, null, { author: 'Akeno', pack: 'Stickers', keepScale: true });
			break
	   case 'ocr':
		if (isMedia && type === "image" || quotedMsg && quotedMsg.type === "image" || quotedMsg && quotedMsg.type === "sticker") {
                    const encryptMedia = quotedMsg && quotedMsg.type === "image" || quotedMsg && quotedMsg.type === "sticker" ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    fs.writeFileSync(`./temp/${sender.id}.jpg`, mediaData)
                    ocrtess.recognize(`./temp/${sender.id}.jpg`, ocrconf)
                        .then(async (text) => {
                            await client.reply(from, `*...:* *OCR RESULT* *:...*\n\n${text}`, id)
                            fs.unlinkSync(`./temp/${sender.id}.jpg`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                        })
                } else {
                    await client.reply(from, 'Incorrect format, Senpai', id)
                }
            break
		case 'tod':
                await client.reply(from, 'Senpai...promise me that before playing that you will carry out whatever orders are given... I promise too! 😊' , id)
                await client.sendText(from, `Please type *${prefix}truth* or *${prefix}dare*`)
            break
		case 'truth':
				if (flirty.includes(sender.id))
				{
					await client.reply(from, 'Getting a kinky truth for you babe', id)
					truthkinky()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await client.reply(from, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    })
				}
				else {
                truth()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await client.reply(from, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    })
				}
            break
		case 'dare':
                dare()
                    .then(async (body) => {
                        const dare = body.split('\n')
                        const randomDare = dare[Math.floor(Math.random() * dare.length)]
                        await client.reply(from, randomDare, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    })
            break
	   case 'toimage':
	   case 'toimg':
       	if(!quotedMsg) return client.reply(from, '.', id)
		else if (quotedMsg && quotedMsg.type == 'video'){
		return client.reply(from, 'that\'s not a sticker, Baka', id)
		} if(quotedMsg) {
				const mediaData = await decryptMedia(quotedMsg)
				const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
				await client.sendFile(from, imageBase64, 'img.jpg')
		}
		break
	
	case 'ig':
    case 'instagram':
		const uri = body.slice(5)
        if (args.length == 0) return client.reply(from, 'Wrong Format!', id)
//		const isInsta = link.match(/(https:\/\/www.instagram.com)/gi)
//         if (!isInsta) return client.reply(from, 'Invalid Link!', id)
        await client.reply(from, `_Scraping Metadata..._`, id)
        insta(uri).then(async (data) => {
            if (data.type == 'GraphSidecar') {
                if (data.image.length != 0) {
                    data.image.map((x) => client.sendFileFromUrl(from, x, 'photo.jpg', '', null, null, true))
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                }
                if (data.video.length != 0) {
                    data.video.map((x) => client.sendFileFromUrl(from, x.videoUrl, 'video.jpg', '', null, null, true))
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                }
            } else if (data.type == 'GraphImage') {
                client.sendFileFromUrl(from, data.image, 'photo.jpg', '', null, null, true)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                    .catch((err) => console.error(err))
            } else if (data.type == 'GraphVideo') {
                client.sendFileFromUrl(from, data.video.videoUrl, 'video.mp4', '', null, null, true)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                    .catch((err) => console.error(err))
            }
        })
            .catch((err) => {
                console.log(err)
                if (err === 'Not a video') { return client.reply(from, 'Error, tidak ada video di link yang kamu kirim. [Invalid Link]', id) }
                client.reply(from, 'Error, user private atau link salah [Private or Invalid Link]', id)
            })
    break
        
	/*case 'tts':
        if (args.length === 1) return client.reply(from, '  *Usage #tts language text*')
            const dataBhs = body.slice(5, 7)
            const dataText = body.slice(8)

        if (dataText === '') return client.reply(from, '....', id)
        if (dataText.length > 500) return client.reply(from, 'Text?', id)
        
        try {
            import ttsget from 'node-gtts'
			ttsget = (dataBhs.toLowerCase());
            ttsget.save('./media/tts/restts.mp3', dataText, () => 
                            client.sendPtt(from, './media/tts/restts.mp3', id))
        } catch (error) {
            return client.reply(from, 'Failed to get tts, is the given language code valid?', id)
        }

        break
			    
        case 'quotemaker':
            arg = body.trim().split('|')
            if (arg.length >= 3) {
            client.reply(from, 'Processing...', message.id) 
            const quotes = arg[1]
            const author = arg[2]
            const theme = arg[3]
            try {
            const resolt = await quotemaker(quotes, author, theme)
            client.sendFile(from, resolt, 'quotesmaker.jpg','neh...')
            } catch {
            client.reply(from, 'I\'m afraid to tell you that the image failed to process', message.id)
            }
            } else {
            client.reply(from, 'Usage: \n!quotemaker |text|watermark|theme\n\nEx :\n!quotemaker |...|...|random', message.id)
            }
            break*/
			    
	case 'aiquote' :
            const aiquote = await axios.get("http://inspirobot.me/api?generate=true")
            await client.sendFileFromUrl(from, aiquote.data, 'quote.jpg', 'Powered By http://inspirobot.me/ With ❤️' , id )
            break
			    
        case 'groupinfo' :
            if (!isGroupMsg) return client.reply(from, '.', message.id) 
            var totalMem = chat.groupMetadata.participants.length
            var ID = chat.groupMetadata.id
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = wel.includes(chat.id)
            var ngrp = nsfwgrp.includes(chat.id)
            var grouppic = await client.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await client.sendFileFromUrl(from, pfp, 'group.png', `*${groupname}* 

🌐️ *Members: ${totalMem}*

💌️ *Welcome: ${welgrp}*

🔮️ *Rule* : *${isRule}*

🔢 *ID* : *${ID}*

⚜️ *NSFW: ${ngrp}*

📃️ *Group Description* 

${desc}`)
        break
        case 'bc':
            if(!isowner) return client.reply(from, 'Only bot owner!', message.id)
            let msg = body.slice(4)
            const chatz = await client.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await client.getChatById(ids)
                if (!cvk.isReadOnly) client.sendText(ids, `.\n\n${msg}`)
            }
            client.reply(from, 'Broadcast Success!', message.id)
            break
        case 'boycott':
        case 'ban':
            if(!isowner) return client.reply(from, 'Only bot owner can use this CMD!', message.id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                ban.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
                client.reply(from, 'Success ban target!', message.id)
            }
            break  		   
 
		case 'cr':
            if(!isowner) return client.reply(from, 'Only bot owner can use this CMD!', message.id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                cr.push(mentionedJidList[i])
                fs.writeFileSync('./lib/cr.json', JSON.stringify(cr))
                client.reply(from, 'Success CR target!', message.id)
            }
            break

        case 'uncr':
            if(!isowner) return client.reply(from, 'Only bot owner can use this CMD', message.id)
            let incr = cr.indexOf(mentionedJidList[0])
            cr.splice(incr, 1)
            fs.writeFileSync('./lib/cr.json', JSON.stringify(ban))
            client.reply(from, 'Un-CR User!', message.id)
            break

		case 'flirty':
            if(!isowner) return client.reply(from, 'Only bot owner can use this CMD!', message.id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                flirty.push(mentionedJidList[i])
                fs.writeFileSync('./lib/flirty.json', JSON.stringify(flirty))
                client.reply(from, 'Success flirting target!', message.id)
            }
            break

        case 'covid':
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const country = await slicedArgs.join(' ')
            console.log(country)
            const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
            const { cases, todayCases, deaths, todayDeaths, active } = response2.data
                await client.sendText(from, '🌎️Covid Info -' + country + ' 🌍️\n\n✨️Total Cases: ' + `${cases}` + '\n📆️Today\'s Cases: ' + `${todayCases}` + '\n☣️Total Deaths: ' + `${deaths}` + '\n☢️Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️Active Cases: ' + `${active}` + '.')
            break
			    
        case 'everyone':
        case 'ping':
            if (!isGroupMsg) return client.reply(from, 'Sorry, This command can only be used in groups', message.id)
            const groupMem = await client.getGroupMembers(groupId)
            let hehe = `${body.slice(6)} - ${pushname} \n`
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '✨️'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '----------------------'
/*			if (isgroup3)
			{
				if (cr.includes(sender.id)) {
					await client.sendTextWithMentions(from, hehe) }
				else {
					return client.reply(from, 'Well, only CR`s can use this command', message.id) }
			}*/
			if (isGroupAdmins)
				await client.sendTextWithMentions(from, hehe)
			else
				return client.reply(from, 'Well, only admins can use this command', message.id)
            break
			    
        case 'thanos':
        case 'purge':
        case 'kickall':
            if(!isowner) return client.reply(from, 'Sorry, Only bot owner can use this CMD', message.id)
            if (!isGroupMsg) return client.reply(from, 'This command can only be used in groups', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to give me the power to do this before executing', message.id)
            const allMem = await client.getGroupMembers(groupId)
            console.log(isGroupAdmins)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Oops this is Admin group')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            client.reply(from, 'Success removing all members except group admin', id)
            break
			    
        case "husbu":
        const diti = fs.readFileSync("./lib/husbu.json");
        const ditiJsin = JSON.parse(diti);
        const rindIndix = Math.floor(Math.random() * ditiJsin.length);
        const rindKiy = ditiJsin[rindIndix];
        client.sendFileFromUrl(
          chatId,
          rindKiy.image,
          "Husbu.jpg",
          rindKiy.teks,
          id
        )
        break
		
		case 'clearall':
            if (!isowner) return client.reply(from, 'Owner only', message.id)
            const allChatz = await client.getAllChats()
            for (let dchat of allChatz) {
                await client.deleteChat(dchat.id)
            }
            client.reply(from, 'Done', message.id)
            break
			    
        case 'act':
             arg = body.trim().split(' ')
             if (!isGroupAdmins) return client.reply(from, 'Only Admins can use this command, Baka >.<', id)
             		if (arg[1].toLowerCase() == 'welcome') {
						if (wel.includes(chat.id)) {
							client.reply(from, `Welcome is already registered on *${name}*`, message.id)
						} else {
								wel.push(chat.id)
								fs.writeFileSync('./lib/welcome.json', JSON.stringify(wel))
								client.reply(from, `Welcome is now registered on *${name}*`, message.id)
						}
             		} else if (arg[1].toLowerCase() == 'nsfw') {
						if (nsfwgrp.includes(chat.id)) {
							client.reply(from, `NSFW is already registered on *${name}*`, message.id)
						} else {
							nsfwgrp.push(chat.id)
							fs.writeFileSync('./lib/nsfwg.json', JSON.stringify(nsfwgrp))
							client.reply(from, `NSFW is now registered on *${name}*`, message.id)
						}
             		} else if (arg[1].toLowerCase() == 'noextra') {
						if (noextra.includes(chat.id)) {
							client.reply(from, `Extra stickers are already disabled on *${name}*`, message.id)
						} else {
							noextra.push(chat.id)
							fs.writeFileSync('./lib/noextra.json', JSON.stringify(noextra))
							client.reply(from, `Noextra is now registered on *${name}*`, message.id)
						}
					} else if (arg[1].toLowerCase() == 'rule') {
						if (!isBotGroupAdmins) return client.reply(from, 'You need to make me admin to use this CMD', message.id)
						if (ruleArr.includes(chat.id)) {
							client.reply(from, `Rule is already registered on *${name}*`, message.id)
						} else {
									ruleArr.push(chat.id)
									fs.writeFileSync('./lib/rule.json', JSON.stringify(ruleArr))
									client.reply(from, `Rule is now registered on *${name}*`, message.id)
								}
			}
             break
        case 'deact':
             arg = body.trim().split(' ')
             if (!isGroupAdmins) return client.reply(from, 'Only Admins can use this command, Baka >.<', id)
             if (arg[1].toLowerCase() == 'welcome') {
                let inx = ban.indexOf(from)
                wel.splice(inx, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(wel))
                client.reply(from, `Welcome is now unregistered on *${name}*`, message.id)
             } else if (arg[1].toLowerCase() == 'nsfw') {
                let inx = ban.indexOf(from)
                nsfwgrp.splice(inx, 1)
                fs.writeFileSync('./lib/nsfwg.json', JSON.stringify(nsfwgrp))
                client.reply(from, `NSFW is now unregistered on *${name}*`, message.id)
             } else if (arg[1].toLowerCase() == 'noextra') {
                let inx = ban.indexOf(from)
                noextra.splice(inx, 1)
                fs.writeFileSync('./lib/noextra.json', JSON.stringify(noextra))
                client.reply(from, `Noextra is now disabled on *${name}*`, message.id)
             } else if (arg[1].toLowerCase() == 'pokegame') {
                let inx = pokarr.indexOf(from)
                pokarr.splice(inx, 1)
                fs.writeFileSync('./lib/poke.json', JSON.stringify(pokarr))
                client.reply(from, `PokeGame is now unregistered on *${name}*`, message.id)
             } else if (arg[1].toLowerCase() == 'rule') {
                let inx = ruleArr.indexOf(from)
                ruleArr.splice(inx, 1)
                fs.writeFileSync('./lib/rule.json', JSON.stringify(ruleArr))
                client.reply(from, `Rule is now unregistered on *${name}*`, message.id)
             }      
             break
			    
       case 'cgc':
            arg = body.trim().split(' ')
            const gcname = arg[1]
            client.createGroup(gcname, mentionedJidList)
            client.sendText(from, 'Group Created ✨️')
            break
			
		case 'sr':
             arg = body.trim().split(' ')
             const sr = arg[1]
             try {
             const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + sr + '/');
             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = response1.data

                const isnsfw = nsfwgrp.includes(from)
                if (nsfw == true) {
                      if ((isGroupMsg) && (isnsfw)) {
                                await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                      } else if ((isGroupMsg) && (!isnsfw)) {
                                await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
                } else { 
                      await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                }
                } catch(err) {
                    console.log(err)
                    await client.reply(from, 'There is no such subreddit, Baka!', id) 
                }
                break
        case 'unban':
            if(!isowner) return client.reply(from, 'Only bot owner can use this CMD', message.id)
            let inx = ban.indexOf(mentionedJidList[0])
            ban.splice(inx, 1)
            fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
            client.reply(from, 'Unbanned User!', message.id)
            break
        case 'unflirt':
            if(!isowner) return client.reply(from, 'Only bot owner can use this CMD', message.id)
            let unfx = flirty.indexOf(mentionedJidList[0])
            flirty.splice(unfx, 1)
            fs.writeFileSync('./lib/flirty.json', JSON.stringify(flirty))
            client.reply(from, 'User doesnt want my love!', message.id)
            break
        case 'kick':
        case 'snap':
            if(!isGroupMsg) return client.reply(from, '...', message.id)
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin, Sorry', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to make me admin to use this CMD', message.id)
            if(mentionedJidList.length === 0) return client.reply(from, 'Wrong format', message.id)
            await client.sendText(from, `Request Accepted! issued:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await client.reply(from, '....', message.id)
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case 'del':
        case 'delete':
            if (!quotedMsg) return client.reply(from, 'Wrong Format!', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Wrong Format!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
			return await client.reply(from, 'Deleting message...', message.id)
            break
        case 'leave':
            if(!isGroupMsg) return client.reply(from, '...', message.id)
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin', message.id)
            await client.sendText(from,'Sayonara').then(() => client.leaveGroup(groupId))
            break
        case 'promote':
            if(!isGroupMsg) return client.reply(from, '.', message.id)
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to make me admin to use this CMD', message.id)
            if (mentionedJidList.length === 0) return await client.reply(from, 'Wrong format!', message.id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'One user at a time', message.id)
            if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'This user is already admin', message.id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `@${mentionedJidList[0].replace('@c.us', '')} is now an admin`)
            break
        case 'demote':
            if(!isGroupAdmins) return client.reply(from, 'You are not an admin', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'You need to make me admin to use this CMD', message.id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Wrong Format', message.id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'One user at a time', message.id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'The user isn\'t an admin', message.id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Demoted @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'join':
			if(!isowner) return client.reply(from, 'Only bot owner can use this CMD', message.id)
            if (args.length == 0) return client.reply(from, 'Wrong Format', message.id)
            const minMem = 1
			const link = body.slice(6)
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await client.inviteInfo(link)
            if (!isLink) return client.reply(from, 'Where\'s the link?', message.id)
            if (check.size < minMem) return client.reply(from, 'The group does not have 30+ members', message.id)
            await client.joinGroupViaLink(link).then( async () => {
                await client.reply(from, '*Joined* ✨️', message.id)
            }).catch(error => {
                client.reply(from, 'An error occured 💔️', message.id)
            })
            break
		case 'setstatus':
        case 'setstats':
        case 'setstat':
                if (!isowner) return await client.reply(from, 'Sorry Senpai, Only bot owner!', id)
                if (!q) return await client.reply(from, 'You forgot to enter Status, Senpai', id)
                await client.setMyStatus(q)
                await client.reply(from, 'Done, Owner-sama', id)
            break
        case 'sauce':
             if (
          (isMedia && type === "image") ||
          (quotedMsg && quotedMsg.type === "image")
        ) {
          if (isMedia) {
            var mediaData = await decryptMedia(message, uaOverride);
          } else {
            var mediaData = await decryptMedia(quotedMsg, uaOverride);
          }
          const fetch = require("node-fetch");
          const imgBS4 = `data:${mimetype};base64,${mediaData.toString(
            "base64"
          )}`;
          client.reply(chatId, "Searching....", id);
          fetch("https://trace.moe/api/search", {
            method: "POST",
            body: JSON.stringify({ image: imgBS4 }),
            headers: { "Content-Type": "application/json" },
          })
            .then((respon) => respon.json())
            .then((resolt) => {
              if (resolt.docs && resolt.docs.length <= 0) {
                client.reply(
                  chatId,
                  "Sorry, I don't know what anime is this",
                  id
                );
              }
              const {
                is_adult,
                title,
                title_chinese,
                title_romaji,
                title_english,
                episode,
                similarity,
                filename,
                at,
                tokenthumb,
                anilist_id,
              } = resolt.docs[0];
              teks = "";
              if (similarity < 0.92) {
                teks = "*I don't have much confidence with this* :\n\n";
              }
              teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`;
              teks += `➸ *Ecchi* : ${is_adult}\n`;
              teks += `➸ *Eps* : ${episode.toString()}\n`;
              teks += `➸ *Similarity* : ${(similarity * 100).toFixed(1)}%\n`;
              var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(
                filename
              )}?t=${at}&token=${tokenthumb}`;
              client
                .sendFileFromUrl(chatId, video, "nimek.mp4", teks, id)
                .catch(() => {
                  client.reply(chatId, teks, id);
                });
            })
            .catch(() => {
              client.reply(chatId, "Error !", id);
            });
        } else {
          client.sendFile(
            chatId,
            "./media/img/tutod.jpg",
            "Tutor.jpg",
            "Neh contoh mhank!",
            id
          );
        }
        break;
			    
        case 'lyrics':
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            if (args.length == 0) return client.reply(from, 'Wrong Format', message.id)
            const lagu = body.slice(7)
            console.log(lagu)
            const lirik = await liriklagu(lagu)
            client.sendText(from, lirik)
            break
        case 'anime':
            const keyword = message.body.replace('#anime', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Sorry, Couldn\'t find the requested anime', id)
              console.log("Sent!")
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime Found!*
✨️ *Title:* ${title}

🎆️ *Episodes:* ${episodes}

💌️ *Rating:* ${rated}

❤️ *Score:* ${score}

💚️ *Synopsis:* ${synopsis}

🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            client.sendImage(from, base64, title, content)
           } catch (err) {
             console.error(err.message)
             await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Sorry, Couldn\'t find the requested anime')
           }
          break
	case 'manga':
	const keywrd = (args)
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/manga?q=${keywrd}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await client.sendFileFromUrl(from, errorurl2, 'error.png', 'Sorry, Couldn\'t find the requested manga', id)
              console.log("Sent!")
              return null
              }
            const { title, synopsis, chapters, url, volumes, score, image_url } = parsed.results[0]
            const content = `*Manga found*

*Title:* ${title}

*Chapters:* ${chapters}

*Volumes:* ${volumes}

*Score:* ${score}

*Synopsis:* ${synopsis}

*Link*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            client.sendImage(from, base64, title, content)
           } catch (err) {
             console.error(err.message)
             await client.sendFileFromUrl(from, errorurl2, 'error.png', 'Sorry, Couldn\'t find the requested manga')
           }
          break
		  
	case 'chara':
 	    const keywr = (args)
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywr}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await client.sendFileFromUrl(from, errorurl2, 'error.png', 'Sorry, Couldn\'t find the requested character', id)
              console.log("Sent!")
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const content = `*Character found!*

*Name:* ${name}

*Nickname:* ${alternative_names}

*Link*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            client.sendImage(from, base64, name, content)
           } catch (err) {
             console.error(err.message)
             await client.sendFileFromUrl(from, errorurl2, 'error.png', 'Sorry, Couldn\'t find the requested character')
           }
          break
        case 'wallpaper':
            if (args.length == 0) return client.reply(from, 'Wrong Format!', id)
            const query = body.slice(6)
            const walls = await wall(query)
            await client.sendFileFromUrl(from, walls, 'walls.jpg', '', id)
	    break
		
		//neko.life commands
		case 'kemono':
			await client.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'cuddle':
			await client.sendFileFromUrl(from, (await neko.sfw.cuddle()).url, 'cuddle.jpg', '', null, null, true)
                    .then(() => console.log('Success sending cuddle image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'gecg':
			await client.sendFileFromUrl(from, (await neko.sfw.gecg()).url, 'gecg.jpg', '', null, null, true)
                    .then(() => console.log('Success sending gecg image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'smug':
			await client.sendFileFromUrl(from, (await neko.sfw.smug()).url, 'smug.jpg', '', null, null, true)
                    .then(() => console.log('Success sending smug image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'baka':
			await client.sendFileFromUrl(from, (await neko.sfw.baka()).url, 'baka.jpg', '', null, null, true)
                    .then(() => console.log('Success sending baka image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'tickle':
			await client.sendFileFromUrl(from, (await neko.sfw.tickle()).url, 'tickle.jpg', '', null, null, true)
                    .then(() => console.log('Success sending tickle image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'slap':
			client.sendStickerfromUrl(from, (await neko.sfw.slap()).url, null, { author: 'Akeno', pack: 'Stickers', keepScale: false });
			await client.sendFileFromUrl(from, (await neko.sfw.slap()).url, 'slap.jpg', '', null, null, true)
                    .then(() => console.log('Success sending slap image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break 
		case 'poke':
			await client.sendFileFromUrl(from, (await neko.sfw.poke()).url, 'poke.jpg', '', null, null, true)
                    .then(() => console.log('Success sending poke image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'pat':
			await client.sendFileFromUrl(from, (await neko.sfw.pat()).url, 'pat.jpg', '', null, null, true)
                    .then(() => console.log('Success sending pat image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'kiss':
			await client.sendFileFromUrl(from, (await neko.sfw.kiss()).url, 'kiss.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kiss image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'hug':
			await client.sendFileFromUrl(from, (await neko.sfw.hug()).url, 'hug.jpg', '', null, null, true)
                    .then(() => console.log('Success sending hug image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		case 'foxy':
			await client.sendFileFromUrl(from, (await neko.sfw.foxGirl()).url, 'foxy.jpg', '', null, null, true)
                    .then(() => console.log('Success sending foxGirl image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                    })
            break
		//end of neko.life commands	
		
        case 'waifu': 
        	const waifu = await waifuclient.getRandom()
        	await sclient.sendFileFromUrl(message.from, waifu.data.display_picture, 'haugusha.jpg', `❤️ *Name : ${waifu.data.name}*\n\n💎️ Description : ${waifu.data.description}\n\n💚️ Source : ${waifu.data.series.name}\n\n✨️ URL: ${waifu.data.url}`, message.id)
            break
        case 'animeneko':
            client.sendFileFromUrl(from, await akaneko.neko(), 'neko.jpg', 'Neko *Nyaa*~')
            break
        case 'dog':
        case 'doggo':
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Doggo ✨️', id)
            break
        case 'cat':          
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'cat.png','Cat 🌠️', id)
            break
        case 'roll':
            const dice = Math.floor(Math.random() * 6) + 1
            await client.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png')
            break
        case 'flip':
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
               client.sendStickerfromUrl(from, 'https://i.ibb.co/LJjkVK5/heads.png')
            } else {
               client.sendStickerfromUrl(from, 'https://i.ibb.co/wNnZ4QD/tails.png')
            }
            break
        case 'slap':
            arg = body.trim().split(' ')
            const person = author.replace('@c.us', '')
            await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            client.sendTextWithMentions(from, '@' + person + ' *slapped* ' + arg[1])
            break
        case 'pokemon':
            arg = body.trim().split(' ')
            if (arg.length < 2) {
            client.reply(from, 'Give me a pokemon name, Baka!', id)
	    } else {
		if (pkarrs.includes(body.slice(9).toLowerCase())) {
            const pokedta = await pkmzdata(body.slice(9).toLowerCase())
	    await client.sendFileFromUrl(from, pokedta.url, 'pkmn.png',pokedta.data, id)
                } else {
		client.reply(from, `No such pokemon (${body.slice(9).toLowerCase()})`, id)
		}
	    }
	    break
        case 'rpaper' :
            const walnime = ['https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png','https://cdn.nekos.life/neko/neko_359.png','https://cdn.nekos.life/neko/neko_140.png','https://cdn.nekos.life/neko/neko171.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            client.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', message.id)
            break
        case 'meme':
			 let argme = ['memes','dankmemes','memeeconomy','indiandankmemes']
			 let argran = argme[Math.floor(Math.random() * argme.length)]
             const response = await axios.get('https://meme-api.herokuapp.com/gimme/' + argran + '/');
/*             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = response.data
            const response = ['https://meme-api.herokuapp.com/gimme/memes','https://meme-api.herokuapp.com/gimme/dankmemes','https://meme-api.herokuapp.com/gimme/memeeconomy','https://meme-api.herokuapp.com/gimme/memeeconomy'];
			let responseran = response[Math.floor(Math.random() * response.length)]
			await axios.get (responseran);*/
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            await client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            break
		case 'dogf':
			// URL of the image
			const urlg = '(await neko.nsfw.classic()).url'
  
			https.get(urlg,(res) => {
				// Image will be stored at this path
				const path = `./temp/classic.gif`
				const filePath = fs.createWriteStream(path)
				res.pipe(filePath)
				filePath.on('finish',() => {
					filePath.close();
					console.log('Download Completed'); 
				})
			})
		break
		//nsfw neko.life commands
		case 'femdom':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'trap':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.trap()).url, 'trap.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.trap()).url, 'trap.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'kitsune':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.kitsune()).url, 'kitsune.jpg', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.eroKitsune()).url, 'eroKitsune.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.kitsune()).url, 'kitsune.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'kuni':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.kuni()).url, 'kuni.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.kuni()).url, 'kuni.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'neko':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.nekoGif()).url, 'nekoGif.gif', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.neko()).url, 'neko.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.nekoGif()).url, 'nekoGif.gif', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.neko()).url, 'neko.jpg', '', id)
                    await client.sendFileFromUrl(from, await akaneko.lewdNeko(), 'neko.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'cumsluts':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.cumsluts()).url, 'cumsluts.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.cumsluts()).url, 'cumsluts.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'classicg':		//gif cmd
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `Kiss-GIF-source.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    fs.writeFile(fileInputPath, (err) => {
                    if (err) return console.error(err)
					ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await client.sendVideoAsGif(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', loop: 0 })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                            setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
					})
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.classic()).url, 'classic.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'bj':		//gif cmd
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.bJ()).url, 'bJ.jpg', '', id)
					await client.sendFileFromUrl(from, (await neko.nsfw.blowJob()).url, 'blowJob.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.bJ()).url, 'bJ.jpg', '', id)
					await client.sendFileFromUrl(from, (await neko.nsfw.blowJob()).url, 'blowJob.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'classic':		//gif cmd
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.classic()).url, 'classic.gif', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.classic()).url, 'classic.gif', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'classicstick':		//gif cmd
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
						await client.sendStickerfromUrl(from, (await neko.nsfw.classic()).url, null, { author: 'Akeno', pack: 'Stickers', keepScale: true })							
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
						await client.sendStickerfromUrl(from, (await neko.nsfw.classic()).url, null, { author: 'Akeno', pack: 'Stickers' })
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'pussy':		//gif cmd
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.pussyWankGif()).url, 'pussyWankGif.gif', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.pussyArt()).url, 'pussyArt.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.pussyWankGif()).url, 'pussyWankGif.gif', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.pussyArt()).url, 'pussyArt.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'nkemono':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.kemonomimi()).url, 'kemonomimi.jpg', '', id)
					await client.sendFileFromUrl(from, (await neko.nsfw.eroKemonomimi()).url, 'eroKemonomimi.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.kemonomimi()).url, 'kemonomimi.jpg', '', id)
					await client.sendFileFromUrl(from, (await neko.nsfw.eroKemonomimi()).url, 'eroKemonomimi.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'keta':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                     await client.sendFileFromUrl(from, (await neko.nsfw.keta()).url, 'keta.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                     await client.sendFileFromUrl(from, (await neko.nsfw.keta()).url, 'keta.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'holo':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.holo()).url, 'holo.jpg', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.holoEro()).url, 'holoEro.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.holo()).url, 'holo.jpg', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.holoEro()).url, 'holoEro.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'cumarts':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.cumArts()).url, 'cumArts.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.cumArts()).url, 'cumArts.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'spank':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.spank()).url, 'spank.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.spank()).url, 'spank.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'gasm':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.gasm()).url, 'gasm.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.gasm()).url, 'gasm.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'yuri':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                    await client.sendFileFromUrl(from, (await neko.nsfw.yuri()).url, 'yuri.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
		case 'lewdavatar':
                try {
						const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    await client.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      
                } else {
                    await client.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
            break
			
		//end of nsfw neko.life commands
		
		case 'fetish':
			try {
                const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
				 if (ar.length !== 1) return await client.reply(from, 'Incorrect Format, Senpai!', id)
                    try {
                        if (ar[0] === 'armpits') {
                            armpits()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            feets()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            thighs()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            ass()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            boobs()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            belly()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, await url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            sideboobs()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            ahegao()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await client.reply(from, 'Tag not found! Try again, Senpai!', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    }
                } else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
				 else { 
                    try {
                        if (ar[0] === 'armpits') {
                            armpits()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            feets()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            thighs()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            ass()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            boobs()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            belly()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            sideboobs()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            ahegao()
                                .then(async ({ url }) => {
                                    await client.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await client.reply(from, 'Tag not found. Try Again, Senpai!', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    }
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
			break
		case 'waifu18':
			try {
                const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    waifu(true)
                        .then(async ({ url }) => {
                            await client.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                        })
                } else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
				 else { 
                    waifu(true)
                        .then(async ({ url }) => {
                            await client.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                        })
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
				break
		case 'lewds':
        case 'lewd':
			try {
                const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
                    randomLewd()
                        .then(async ({ url }) => {
                            await client.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                        })
                } else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
				 else { 
                    randomLewd()
                        .then(async ({ url }) => {
                            await client.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                        })
                }
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
				break
		case 'porn':
		try {
             const responseporn = await axios.get('https://meme-api.herokuapp.com/gimme/pornpics/');
             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = responseporn.data
			const isnsfw = nsfwgrp.includes(from)
                if (nsfw == true) {
                      if ((isGroupMsg) && (isnsfw)) {
                                await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                      } else if ((isGroupMsg) && (!isnsfw)) {
                                await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
                 else { 
                      await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                }
				}
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
		break
		case 'hentai':
		try {
             const responsehentai = await axios.get('https://meme-api.herokuapp.com/gimme/hentai/');
             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = responsehentai.data			
			const isnsfw = nsfwgrp.includes(from)
                if (nsfw == true) {
                      if ((isGroupMsg) && (isnsfw)) {
                                await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                      } else if ((isGroupMsg) && (!isnsfw)) {
                                await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
                 else { 
                      await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                }
				}
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
		break
		case 'gonewild':
		try {
             const responsegone = await axios.get('https://meme-api.herokuapp.com/gimme/gonewild/');
             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = responsegone.data			
			const isnsfw = nsfwgrp.includes(from)
                if (nsfw == true) {
                      if ((isGroupMsg) && (isnsfw)) {
                                await client.sendFileFromUrl(from, `${url}`, 'gonewild.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                      } else if ((isGroupMsg) && (!isnsfw)) {
                                await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
                 else { 
                      await client.sendFileFromUrl(from, `${url}`, 'gonewild.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                }
				}
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
		break
		case 'femdomanime':
		try {
             const responsefemdomanime = await axios.get('https://meme-api.herokuapp.com/gimme/araara/');
             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = responsefemdomanime.data			
			const isnsfw = nsfwgrp.includes(from)
                if (nsfw == true) {
                      if ((isGroupMsg) && (isnsfw)) {
                                await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink: ' + `${postLink}`)
                      } else if ((isGroupMsg) && (!isnsfw)) {
                                await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
                 else { 
                      await client.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                }
				}
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
        break
		case 'husbando':
		try {
             const responsehusbando = await axios.get('https://meme-api.herokuapp.com/gimme/husbando/');
             const {
                    postLink,
                    title,
                    subreddit,
                    url,
                    nsfw,
                    spoiler
                } = responsehusbando.data
			const isnsfw = nsfwgrp.includes(from)
                if (nsfw == true) {
                      if ((isGroupMsg) && (isnsfw)) {
                                await client.sendFileFromUrl(from, `${url}`, 'Husbando.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                      } else if ((isGroupMsg) && (!isnsfw)) {
                                await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
                 else { 
                      await client.sendFileFromUrl(from, `${url}`, 'Husbando.jpg', `${title}` + '\n\nPostlink:' + `${postLink}`)
                }
				}
			}catch (error) {
            return client.reply(from, 'Failed to get image, Try again later', id)
        }
		break
		case 'kissu':
                try {
                    if (isMedia && type === "image" || quotedMsg && quotedMsg.type === "image") {
                        const encryptMedia = quotedMsg && quotedMsg.type === "image" ? quotedMsg : message
                        const ppRaw = await client.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await client.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await client.reply(from, 'Incorrect Format, Senpai', id)
                    }
                } catch (err) {
                    console.error(err)
                    await client.reply(from, 'Sorry Senpai, something went wrong!', id)
                }
            break
		case 'phcomment':
                if (!q.includes('|')) return await client.reply(from, 'Incorrect Format, Senpai', id)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await client.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                const preprocessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await client.sendFileFromUrl(from, preprocessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
		case 'wasted':
                if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === "image") {
                    const encryptMediaWt = quotedMsg && quotedMsg.type === "image" ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                    await client.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Sticker is coming, Senpai.... just wait a little more', id).then(() => client.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`))
                    console.log('Success sending Wasted image!')
                } else {
                    await client.reply(from, 'Incorrect Format, Senpai', id)
                }
            break
		case 'pickup':
                pickup()
                    .then(async (body) => {
                        const pickupl = body.split('\n')
                        const randomPickup = pickupl[Math.floor(Math.random() * pickupl.length)]
                        await client.reply(from, randomPickup, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Sorry Senpai, something went wrong!!', id)
                    })
            break

        case 'help':
            client.reply(from, help(prefix, pushname), message.id)
            break
        case 'hi':
        case 'on':
        case 'online':
            client.reply(from, "Yes Senpai! I'm Online!☺", message.id)
            break
        case 'nc':
            client.reply(from, nc(), message.id)
            break
        case 'info':
            client.reply(from, info(), message.id)
            break
        case 'new':
            client.reply(from, newbot(), message.id)
            break
/*		case 'new':
			client.reply(from, `Type *${prefix}help* to see details of commands😄 \n\n*STICKER RELATED*\n\n_${prefix}stickermeme_\n_${prefix}triggered_\n_${prefix}wasted_\n_${prefix}dogesticker_\n_${prefix}wholesome_\n_${prefix}animesticker_ \n\n\n*IMAGE RELATED* \n\n_${prefix}foxy_\n_${prefix}kemono_\n_${prefix}cuddle_\n_${prefix}gecg_\n_${prefix}smug_\n_${prefix}baka_\n_${prefix}tickle_\n_${prefix}slap_\n_${prefix}poke_\n_${prefix}pat_\n_${prefix}pat_\n_${prefix}kiss_\n_${prefix}hug_ \n\n\n*MISCELLANEOUS* \n\n_${prefix}ocr_\n_${prefix}tod_\n_${prefix}phcomment_\n_${prefix}nightcore_\n_${prefix}kissu_ \n\n\n*NSFW* \n\nType _${prefix}nsfw_ for NSFW related commands`, message.id)
			break*/
		case 'nsfw':
			try {
                const isnsfw = nsfwgrp.includes(from)
                      if ((isGroupMsg) && (isnsfw)) {
							await client.reply(from, nsfwc(prefix), id)
					} else if ((isGroupMsg) && (!isnsfw)) {
						await client.reply(from, `NSFW is not registered on *${name}*`, id)
                      }
					  else {
							await client.reply(from, nsfwc(prefix), id)
							}
				}catch (error) {
            return client.reply(from, 'Sorry Senpai!, Try again later', id)
        }
            break
        case 'wa.me':
        case 'wame':
            await client.reply(from, `*This Is Your WhatsApp Number Link ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*or*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*`)
            break
        case 'profile':
            if (quotedMsg) return profile(quotedMsgObj.sender.id, message, fs, groupAdmins, client)
	    if (mentionedJidList.length >= 1) return profile(mentionedJidList[0], message, fs, groupAdmins, client)
	    return profile(sender.id, message, fs, groupAdmins, client)
            break
        default:
            console.log(color('[PREFIX-CALL]', 'green'), color(time, 'yellow'), 'Command from', color(pushname))
 	    return client.reply(from, 'No such Command!', id)
            break
        }
	} catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
