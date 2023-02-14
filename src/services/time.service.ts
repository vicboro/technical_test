export const TimeService = {
  difference: (time: number) => {
    const timeBetween = Date.now() - new Date(time * 1000).getTime();
    const convertDouble = (num: number) => (num < 10 ? `0${num}` : num);
    const seconds = convertDouble(Math.floor((timeBetween / 1000) % 60));
    const minutes = convertDouble(Math.floor((timeBetween / 1000 / 60) % 60));
    const hours = convertDouble(Math.floor((timeBetween / (1000 * 60 * 60)) % 24));

    return `${hours}:${minutes}:${seconds}`;
  }
};
