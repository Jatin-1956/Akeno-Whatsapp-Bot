const { fetchJson, fetchText } = require('../lib/fetcher')

/**
 * Get random waifu image.
 * @param {boolean} [nsfw=false]
 * @returns {Promise<object>}
 */
const waifu = (nsfw) => new Promise((resolve, reject) => {
    if (nsfw === true) {
        console.log('Get NSFW waifu image...')
        fetchJson('https://waifu.pics/api/nsfw/waifu')
            .then((result) => resolve(result))
            .catch((err) => reject(err))
    } else {
        console.log('Get SFW waifu image...')
        fetchJson('https://waifu.pics/api/sfw/waifu')
            .then((result) => resolve(result))
            .catch((err) => reject(err))
    }
})

module.exports = {
    waifu
}
