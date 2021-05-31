const { fetchText, fetchJson } = require('../lib/fetcher')
const config = require('../config.json')

/**
 * Get truth.
 * @returns {string}
 */
const truth = () => new Promise((resolve, reject) => {
    console.log('Get random truth...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/truth.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get kinky truth.
 * @returns {string}
 */
const truthkinky = () => new Promise((resolve, reject) => {
    console.log('Get random kinky truth...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/truthkinky.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get pickup lines.
 * @returns {string}
 */
const pickup = () => new Promise((resolve, reject) => {
    console.log('Get random pickup...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/pickup')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get flirty messages.
 * @returns {string}
 */
const flirty = () => new Promise((resolve, reject) => {
    console.log('Get random flirt...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/flirtytext.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get dare.
 * @returns {string}
 */
const dare = () => new Promise((resolve, reject) => {
    console.log('Get random dare...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/dare.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random Doge sticker.
 * @returns {string}
 */
const doge = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/anjing')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random wholesome sticker.
 * @returns {string}
 */
const wholesome = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/bucin')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random anime sticker.
 * @returns {string}
 */
const animestick = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/animestick')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random miranda gifs to stickers.
 * @returns {string}
 *
const miranda = () => new Promise((resolve, reject) => {
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/BocchiBot/master/message/miranda')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})*/

module.exports = {
    truth,
	truthkinky,
	pickup,
	flirty,
    dare,
    doge,
	wholesome,
	animestick,
}
