
function extractInstagramUrl(text) {
    if (!text) return null;
//  console.log(text)

    // Matches:
    // - instagram.com
    // - www.instagram.com
    // - ANY proxy like kkinstagram.com, eeinstagram.com, ddinstagram.com
    // - reel / p / tv URLs
    const regex = /(https?:\/\/)?([a-zA-Z0-9-]+\.)?instagram\.com\/reel\/([a-zA-Z0-9_-]+)\/?/i;

    const match = text.match(regex); 
    if (!match) return null; 
//  console.log(match)
    
    const shortcode = match[3];  
    console.log(`found URL match https://www.instagram.com/reel/${shortcode}/`)
    return `https://www.instagram.com/reel/${shortcode}/`; }

module.exports = { extractInstagramUrl };
