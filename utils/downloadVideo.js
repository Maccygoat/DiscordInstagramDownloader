const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function downloadVideo(url) {
    return new Promise((resolve, reject) => {
        const outputDir = path.join(__dirname, '..', 'videoVault');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputTemplate = path.join(
            outputDir,
            '%(epoch>%Y%m%d)s-%(epoch>%H%M%S)s-%(uploader)s-%(id)s.%(ext)s'
        );

//      const cookieFile = path.join(__dirname, '..', 'cookies.txt');
//      const command = `yt-dlp -N 12 --cookies "${cookieFile}" -S "proto,ext:mp4:m4a,res,br" -o "${outputTemplate}" "${url}"`;
        const command = `yt-dlp -N 12 -S "proto,ext:mp4:m4a,res,br" -o "${outputTemplate}" "${url}"`;
//      console.log(command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(new Error(stderr || stdout || error.message));
            }

            const combined = stdout + '\n' + stderr;

            // Match all possible yt-dlp filename outputs
            const patterns = [
                /Merging formats into\s+"(.+?)"/i,      // FINAL MERGED FILE (most important)
                /Destination:\s*(.*)/i,
                /Saving to:\s*'(.*)'/i,
                /Saving to:\s*"(.*)"/i,
                /Writing video to:\s*(.*)/i,
                /Output file:\s*(.*)/i,
                /\[download\]\s*(.*\.mp4)/i
            ];

            let filePath = null;

            for (const pattern of patterns) {
                const match = combined.match(pattern);
                if (match) {
                    filePath = match[1].trim();
                    break;
                }
            }

            if (!filePath) {
                console.log('DEBUG: yt-dlp output:\n', combined);
                return reject(new Error('Could not determine output file path'));
            }

            if (!fs.existsSync(filePath)) {
                console.log('DEBUG: Expected file path:', filePath);
                return reject(new Error('Downloaded file not found'));
            }

            resolve(filePath);
        });
    });
}

module.exports = { downloadVideo };


