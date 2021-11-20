export function msToHMS(ms) {
    let seconds = ms / 1000;
    const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    seconds = seconds % 60; // 4- Keep only seconds not extracted to minutes:
    return `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function msToMAS(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function getMinAndSecFromMs(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return {
        min: +minutes,
        sec: +seconds
    };
}

export function getMsFromMinAndSec(min = 0, sec = 0) {
    return min * 60 * 1000 + sec * 1000
}