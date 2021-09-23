import { fetchText, fetchJson } from '../lib/fetcher.js'
import fs from 'fs-extra'
const config = JSON.parse(fs.readFileSync('config.json'))

/**
 * Get truth.
 * @returns {string}
 */
export const truth = () => new Promise((resolve, reject) => {
    console.log('Get random truth...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/truth.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get kinky truth.
 * @returns {string}
 */
export const truthkinky = () => new Promise((resolve, reject) => {
    console.log('Get random kinky truth...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/truthkinky.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get pickup lines.
 * @returns {string}
 */
export const pickup = () => new Promise((resolve, reject) => {
    console.log('Get random pickup...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/pickup')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get flirty messages.
 * @returns {string}
 */
export const flirty = () => new Promise((resolve, reject) => {
    console.log('Get random flirt...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/flirtytext.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get dare.
 * @returns {string}
 */
export const dare = () => new Promise((resolve, reject) => {
    console.log('Get random dare...')
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/Whatsapp-bot-resources/main/dare.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random Doge sticker.
 * @returns {string}
 */
export const doge = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/anjing')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random wholesome sticker.
 * @returns {string}
 */
export const wholesome = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/bucin')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random anime sticker.
 * @returns {string}
 */
export const animestick = () => new Promise((resolve, reject) => {
    console.log('Get sticker....')
    fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/animestick')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random miranda gifs to stickers.
 * @returns {string}
 *
export const miranda = () => new Promise((resolve, reject) => {
    fetchText('https://raw.githubusercontent.com/Jazzboy-12/BocchiBot/master/message/miranda')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})*/
