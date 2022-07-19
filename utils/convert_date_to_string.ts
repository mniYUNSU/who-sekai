import moment from 'moment';

function convertDateToString(dateString: string): string {
  const dateTime = moment(dateString, moment.ISO_8601).milliseconds(0);
  const now = moment();

  const diff = now.diff(dateTime);
  const calDuration = moment.duration(diff);
  const years = calDuration.years();
  const months = calDuration.months();
  const days = calDuration.days();
  const hours = calDuration.hours();
  const minutes = calDuration.minutes();
  const seconds = calDuration.seconds();

  if (
    years === 0 &&
    months === 0 &&
    days === 0 &&
    hours === 0 &&
    minutes === 0 &&
    seconds !== undefined &&
    (seconds === 0 || seconds < 1)
  ) {
    return '방금 전';
  }

  if (years === 0 && months === 0 && days === 0 && hours === 0 && minutes === 0 && seconds) {
    return `${Math.floor(seconds)}초 전`;
  }

  if (years === 0 && months === 0 && days === 0 && hours === 0) {
    return `${minutes}분 전`;
  }

  if (years === 0 && months === 0 && days === 0) {
    return `${hours}시간 전`;
  }
  if (years === 0 && months === 0) {
    return `${days}일 전`;
  }

  if (years === 0) {
    return `${months}개월 전`;
  }
  return `${years}년 전`;
}

export default convertDateToString;
