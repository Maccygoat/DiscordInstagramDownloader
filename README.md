# DiscordInstagramDownloader
Discord bot that uses yt-dlp to download instagram reels and uploads the file to discord as a reply to the slash command. 
This bot supports most proxy URLs like eeinstagram.com

# Installation guide
## Clone the repository
```bash
git clone https://github.com/Maccygoat/DiscordInstagramDownloader.git
cd DiscordInstagramDownloader
```

## Install npm dependencies
Make sure you have Node.js  22+ installed.
```bash
npm install
```

## Install yt-dlp
### Windows
```powershell
winget install yt-dlp
```

### Debian derivates
```bash
sudo apt install yt-dlp
```
or
```bash
pip install yt-dlp -U
```

## Copy config.json from example.config.json
```bash
cp example.config.json config.json
```
fill out the required tokens and IDs

```json
{
	"token": "Discord_Token",
	"clientId": "Application_ID",
	"guildId": "Owner_Server_ID",
    "logChannelId": "Channel_ID",
    "ownerId": "Owner_ID"
}
```

## Register all slash commands
This is not done automatically upon bot startup
```bash
node deploy-global-commands.js
```
or register them just for your testing server for now
```bash
node deploy-commands.js
```

## Start the bot
```bash
node index.js
```
You should see something like:
```bash
Logged in as <botname>
```

# Use the bot
In any server where the bot is installed as well as in the bot DMs:
```bash
/downloadreel url: https://www.instagram.com/reel/<shortcode>
```
The bot will:
- Normalize the URL
- Download the reel via yt‑dlp
- Save it to videoVault/
- Upload the video file as reply in the requested chhannel
- Delete the Videofile from videoVault/

