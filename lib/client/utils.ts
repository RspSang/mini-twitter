export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function elapsedTime(date: Date) {
  const start = new Date(date);
  const end = new Date(); // 현재 날짜

  const diff = end - start; // 경과 시간

  const times = [
    { time: "Minutes", milliSeconds: 1000 * 60 },
    { time: "Hours", milliSeconds: 1000 * 60 * 60 },
    { time: "Days", milliSeconds: 1000 * 60 * 60 * 24 },
    { time: "Months", milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: "Years", milliSeconds: 1000 * 60 * 60 * 24 * 365 },
  ].reverse();

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.time} ago`;
    }
  }

  // 모든 단위가 맞지 않을 시
  return "Recent";
}
