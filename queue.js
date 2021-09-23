import { sendAnimatedStickers } from './sendSticker.js'

export const mp3 = async function (message) {
  for (let i = 0; i < queuemp3.length; i++) {
    if (queuemp3[i].from == message.from) {
      console.log(queuemp3[i].from)
      yt.mp3(queuemp3[i])
      queuemp3.splice(i, 1)
    }
  }
}

export const mp4 = async function (message) {
  for (let i = 0; i < queuemp4.length; i++) {
    if (queuemp4[i].from == message.from) {
      console.log(queuemp4[i].from)
      yt.mp4(queuemp4[i])
      queuemp4.splice(i, 1)
      return
    }
  }
}

export const sendStickers = async function (message) {
  for (let i = 0; i < queueSticker.length; i++) {
    if (queueSticker[i].from == message.from) {
      console.log(queueSticker[i].from)
      sendSticker.sendStickers(queueSticker[i])
      queueSticker.splice(i, 1)
    }
  }
}
export const sendAnimatedSticker = async function (message) {
  for (let i = 0; i < queueAnimatedSticker.length; i++) {
    if (queueAnimatedSticker[i].from == message.from) {
      console.log(queueAnimatedSticker[i].from)
      sendSticker.sendAnimatedSticker(queueAnimatedSticker[i])
      queueAnimatedSticker.splice(i, 1)
    }
  }
}
