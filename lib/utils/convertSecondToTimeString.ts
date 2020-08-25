function convertSecondToTimeString(seconds: number): string {
  let resultSecond: string | number = 0;
  let resultMinute: string | number = 0;
  let resultHour: string | number = 0;
  // 00:00:00 Format
  if (seconds <= 0) {
    return `00:00:00`;
  } else if (seconds < 60) {
    // less than a minute
    resultSecond = seconds;
    resultSecond = (resultSecond < 10) ? `0${resultSecond}` : resultSecond;
    return `00:00:${resultSecond}`;
  } else if (seconds < 3600) {
    // less than an hour
    resultMinute = parseInt(`${seconds / 60}`);
    resultMinute = (resultMinute < 10) ? `0${resultMinute}` : resultMinute;
    resultSecond = seconds % 60;
    resultSecond = (resultSecond < 10) ? `0${resultSecond}` : resultSecond;
    return `00:${resultMinute}:${resultSecond}`;
  } else {
    // more than an hour
    resultHour = parseInt(`${seconds / 3600}`);
    resultHour = (resultHour < 10) ? `0${resultHour}` : resultHour;
    resultMinute = parseInt(`${(seconds % 3600) / 60}`);
    resultMinute = (resultMinute < 10) ? `0${resultMinute}` : resultMinute;
    resultSecond = parseInt(`${((seconds % 3600) % 60) % 60}`);
    resultSecond = (resultSecond < 10) ? `0${resultSecond}` : resultSecond;
    return `${resultHour}:${resultMinute}:${resultSecond}`;
  }
}

export default convertSecondToTimeString;
