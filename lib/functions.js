import fetch from 'node-fetch'
import { getBase64 } from "./fetcher.js";
import { fetchJson } from "./fetcherits.js";
import { promisify } from 'util';
//import { instagram } from 'video-url-link';

//const igGetInfo  = promisify(instagram.getInfo)

export const liriklagu = async (lagu) => {
    const response = await fetch('https://scrap.terhambar.com/lirik?word='+lagu)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `Lyrics - ${lagu}\n\n${json.result.lirik}`
}

export const cerpen = async () => {
    const response = await fetch('http://api.fdci.se/cerpen')
    if (!response.ok) throw new Error(`nexpected response ${response.status}`)
    const text = await response.text()
    if (text.status) return text
}

export const wallpaperanime = async () => {
    const response = await fetch('https://nekos.life/api/v2/img/wallpaper');
    if (!response.ok) throw new Error(`unexpected response`);
    const json = await response.json()
    return json.url
}

export const quotemaker = async (quotes, author = 'Zelda', type = 'random') => {
    var q = quotes.replace(/ /g, '%20').replace('\n','%5Cn')
    const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${author}&tipe=${type}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) {
        if (json.result !== '') {
            const base64 = await getBase64(json.result)
            return base64
        }
    }
}

export const wall = async(query) => {
    var q = query.replace(/ /g, '+')
    const response = await fetch(`https://wall.alphacoders.com/api2.0/get.php?auth=3e7756c85df54b78f934a284c11abe4e&method=search&term=${q}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    // console.log(json)
    if (json.success === true) {
        return json.wallpapers[Math.floor(Math.random()*json.wallpapers.length)].url_image
    } else {
        return `https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg`
    }
}

/*const insta = async(uri) => new Promise((resolve, reject) => {
	console.log('Get metadata from =>', uri)
    var q = uri.replace(/\?.*$/g, '')
    instagram.getInfo(q, {})
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const insta = async(args) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', args)
    var uri = args.replace(/\?.*$/g, '')
    promisify(instagram.getInfo)(uri, {})
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})*/