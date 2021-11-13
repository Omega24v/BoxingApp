
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

export function getMsFromMinAndSec(min, sec) {
    if (!min) {min = 0}
    if (!sec) {sec = 0}
    return min * 60 * 1000 + sec * 1000
}