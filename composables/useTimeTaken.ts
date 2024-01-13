export function useTimeTaken() {
  const calculate = (startedOn: string, finishedOn: string) => {
    const from = new Date(startedOn).getTime();
    const to = new Date(finishedOn).getTime();

    const timeDiff = (to - from) / 1000;

    let hours = Math.floor(timeDiff / 3600).toString();
    let minutes = Math.floor((timeDiff % 3600) / 60).toString();
    let seconds = Math.floor(timeDiff % 60).toString();

    if (+hours < 10) hours = "0" + hours;
    if (+minutes < 10) minutes = "0" + minutes;
    if (+seconds < 10) seconds = "0" + seconds;

    return `${hours}h:${minutes}m:${seconds}s`;
  };

  return { calculate };
}
