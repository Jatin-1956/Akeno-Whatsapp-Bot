<div align="center">
<img src="https://steamuserimages-a.akamaihd.net/ugc/164779984963620774/139538449930E8A820EDED2789C326F69A544762/" alt="Akeno" width="500" />

# **Akeno Bot**

> Akeno is a multipurpose WhatsApp bot using wa-automate-nodejs library!
>
>

<p align="center">
  <a href="https://github.com/Jazzboy-12"><img title="Author" src="https://img.shields.io/badge/Author-Jazzboy-purple.svg?style=for-the-badge&logo=github" /></a>
</p>

<p align="center">
  <a href="https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot"><img title="Stars" src="https://img.shields.io/github/stars/Jazzboy-12/Akeno-Whatsapp-Bot?color=red&style=flat-square" /></a>
  <a href="https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Jazzboy-12/Akeno-Whatsapp-Bot?color=red&style=flat-square" /></a>
  <a href="https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/Jazzboy-12/Akeno-Whatsapp-Bot?label=watchers&color=blue&style=flat-square" /></a> <br>
  <a href="https://www.npmjs.com/package/@open-wa/wa-automate"><img src="https://img.shields.io/npm/v/@open-wa/wa-automate.svg?color=green" /></a>
  <img src="https://img.shields.io/node/v/@open-wa/wa-automate" />
  <img src="https://img.shields.io/badge/maintained%3F-yes-green.svg?style=flat" />
  <img src="https://img.shields.io/github/repo-size/Jazzboy-12/Akeno-Whatsapp-Bot" /> <br>
</p>

<p align="center">
  <a href="https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot#requirements">Requirements</a> •
  <a href="https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot#installation">Installation</a> •
  <a href="https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot#features">Features</a> •
  <a href="https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot#original-authors ">Thanks to</a>
</p>

</div>

# Requirements
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://www.gyan.dev/ffmpeg/builds/)
* [Tesseract](https://s.id/vftesseract)
* [ImageMagick](https://imagemagick.org/script/download.php)
* [gif2webp](https://developers.google.com/speed/webp/download)
* Any text editor

# Installation
## 📝 Cloning this repo
```cmd
> git clone https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot.git
> cd Akeno-Whatsapp-Bot
```

## ✍️ Editing the file
Edit `config.json` to customize the bot as needed
```JSON

{
    "botadmins": ["96895268451@c.us"],
    "prefix": "!",
    "uaOverride": "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
    "botname": "Akeno"
}

```

`botadmins`: Put the array of [contactIds](https://docs.openwa.dev/globals.html#contactid) of the people who you want be bot admins <br>
`prefix`: The prefix of the bot <br>
`uaOverride`: Your user Agent<br>
`botname`: The name of your bot<br>

Edit `help.js` for bot name and display messages

## 🧾 Installing the Tesseract
* Download the file [here](https://s.id/vftesseract).
* After that, run downloaded file as Administrator.
* Complete the installation.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
> setx /m PATH "C:\Program Files\Tesseract-OCR;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've Tesseract installed, verify that it's working by running this command to see version number (may need to restart Command Prompt):
```cmd
> tesseract -version
```

## 🛠️ Installing the FFmpeg
* Download one of the available versions of FFmpeg by clicking [this link](https://www.gyan.dev/ffmpeg/builds/).
* Extract the file to `C:\` path.
* Rename the extracted folder to `ffmpeg`.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've FFmpeg installed, verify that it's working by running this command to see version number (may need to restart Command Prompt):
```cmd
> ffmpeg -version
```

## 🕸 Installing the gif2webp
* Download one of the available versions of gif2webp by clicking [this link](https://developers.google.com/speed/webp/download).
* Extract the file to `C:\` path.
* Rename the extracted folder to `libwebp`.
* Run Command Prompt as Administrator.
* Run this command:
```cmd
> setx /m PATH "C:\libwebp\bin;%PATH%"
```
It will give us a callback like `SUCCESS: specified value was saved`.
* Now that you've gif2webp installed, verify that it's working by running this command to see version number (may need to restart Command Prompt):
```cmd
> gif2webp -version
```

## 🔍 Installing the dependencies
```cmd
> npm install
```

## 🆗 Running the bot
Regular node:
```cmd
> npm start
```

PM2:
```cmd
> pm2 start index.js
> pm2 monit
```

PM2 with cron job (restart after 5 hours):
```cmd
> pm2 start index.js --cron "* */5 * * *"
> pm2 monit
```

After that scan the QR code using your WhatsApp in your phone!

# Features

### Prefix = !

| Features                           | Command           | Acces    |
|:----------------------------------:|:-----------------:|:--------:|
| Convert Images/Gifs into stickers  | !sticker          | Everyone |
| Gives Caption to Images and converts them into stickers  | !stickermeme          | Everyone |
| Triggers Images and converts them into stickers  | !triggered          | Everyone |
| Converts stickers to images  | !toimg          | Everyone |
| GTA styled wasted caption to images  | !wasted          | Everyone |
| Display anime info                 | !anime <anime name> | Everyone |
| Display Group info                 | !groupinfo        | Everyone |
| Return anime wallpapers                  | !wallpaper <term>   | Everyone |
| Scrap Subreddits [image based]     | !sr subreddit     | Everyone |
| Display Covid 19 Info              | !covid country    | Everyone | 
| Don't know why I did that              | !kissu    | Everyone | 
| Returns pornhub styled comment              | !phcomment <Name | comment>   | Everyone | 
| Toggle NSFW                        | !act nsfw         | Admins   |
| Greet new members                  | !act welcome      | Admins   |
| Mention all group members          | !ping text        | Admins   |
| Promote members                    | !promote @user    | Admins   |
| Demote admins                      | !demote @user     | Admins   |
| Display User profile               | !profile / !profile @user          | Everyone |
| Kicks the user               | !snap @user          | Admins |
| Bot leaves the group               | !leave          | Admins |
| Bot joins using group invite link               | !join <link>         | Bot Admin |
| Sets status of Akeno              | !setstatus        | Bot Admin |
| Gives english text from image               | !ocr          | Everyone |
| Broadcasts messages to all chats of Akeno            | !bc          | Bot Admin |

### Random results

| Command | Result |
|:-------:|:------:|
|!pokemon <pokemon name> | Displays a random pokemon|
|!rpaper  | Displays a random Wallpaper|
|!waifu   | Displays a random waifu and the info |
|!husbu / !husbando   | Displays a random husbando and info |
|!animeneko | Displays a random animeneko |
|!cat     | Displays a random cat |
|!doggo    | Displays a random dog |
|!dogesticker    | Displays a random doge sticker |
|!wholesome    | Displays a random wholesome sticker |
|!animesticker    | Displays a random anime character sticker |
|!tod            | Truth or dare game |
|!pickup            | Pickup lines |

### NSFW commands

| Command |
|:-------:|
|!porn      |
|!gonewild  |
|!lewds     |
|!waifu18   |
|!fetish    |
|!hentai    |
|!lewdavatar|
|!yuri      |
|femdomanime|
|!kuni      |
|!neko      |
|!cumsluts  |
|!classic   |
|!bj        |
|!pussy     |
|!nkemono   |
|!keta      |
|!holo      |
|!cumarts   |
|!kitsune   |
|!trap      |
|!spank     |

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Jazzboy-12/Akeno-Whatsapp-Bot/issues). 

# 🔮 Kudos to these amazing homo sapiens
* [`AlenSaito1`](https://github.com/AlenSaito1)
* [`samurai3247`](https://www.instagram.com/samurai3247/)
* [`SlavyanDesu`](https://github.com/SlavyanDesu)
* [`uukina`](https://github.com/uukina)
* [`MrPawNO`](https://github.com/MrPawNO)
* [`Pahri123`](https://github.com/Pahri123)
* [`LeviathanH`](https://github.com/LeviathanH)
* [`ferlitopym`](https://github.com/ferlitopym)
* [`AlvioAdjiJanuar`](https://github.com/AlvioAdjiJanuar)
* [`VideFrelan`](https://github.com/VideFrelan)
* [`VirusLauncher`](https://github.com/VirusLauncher)
* [`shansekai`](https://github.com/shansekai)
* [`Baguettou`](https://github.com/Baguettou)
* [`HAFizh-15`](https://github.com/HAFizh-15)
* [`TheSploit`](https://github.com/TheSploit)
* [`rashidsiregar28`](https://github.com/rashidsiregar28)
* [`irham01`](https://github.com/irham01)
* [`hardiantojek93`](https://github.com/hardiantojek93)

  
## 📚 Special Thanks to

* [`Whatsapp-Botto-Re`](https://github.com/SomnathDas/Whatsapp-Botto-Re)
* [`BocchiBot`](https://github.com/SlavyanDesu/BocchiBot)
* [`open-wa/wa-automate-nodejs`](https://github.com/open-wa/wa-automate-nodejs)
* [`YogaSakti/imageToSticker`](https://github.com/YogaSakti/imageToSticker)
