function convertSecondToTimeString(seconds: number): string {
  let resultSecond = 0, resultMinute = 0, resultHour = 0;
  // 00:00:00 Format
  if (seconds <= 0) {
    return `00:00:00`;
  } else if (seconds < 60) {
    // less than a minute
    return `00:00:${seconds}`;
  } else if (seconds < 3600) {
    // less than an hour
    resultMinute = seconds / 60;
    resultSecond = seconds % 60;
    return `00:${resultMinute}:${resultSecond}`;
  } else {
    // more than an hour
    resultHour = seconds / 3600;
    resultMinute = (seconds % 3600) / 60;
    resultSecond = ((seconds % 3600) % 60) / 60;
    return `${resultHour}:${resultMinute}:${resultSecond}`;
  }
}

export default convertSecondToTimeString;
