import * as moment from 'moment';

export const formatDateToYYYYMMDD = (date: moment.MomentInput) =>
  moment(date).format('YYYY-MM-DD');

export const formatDateToYYYYMMDDHHMMSS = (date: moment.MomentInput) =>
  moment(date).format('YYYY-MM-DD HH:mm:ss');
