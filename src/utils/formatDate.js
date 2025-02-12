export default function formatDate(date) {
  const value = new Date(date);
  let day = value.getDate();
  let month = value.getMonth() + 1;
  if (day < 10){
    day = `0${day}`;
  }
  if (month < 10){
    month = `0${month}`;
  }

  return `${day}.${month}.${value.getFullYear()}`;
}