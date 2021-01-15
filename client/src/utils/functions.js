import moment from 'moment';

export const formattedDate = (format, date) => {
  return moment(date).format(format);
}