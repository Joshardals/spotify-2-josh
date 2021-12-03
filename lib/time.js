export function msToTime(s) {
  const minutes = Math.floor(s / 60000);
  const seconds = ((s % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
