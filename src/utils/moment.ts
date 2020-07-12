import * as moment from 'moment';

export const formatDateToYYYYMMDD = (date: moment.MomentInput) =>
  moment(date).format('YYYY-MM-DD');

export const formatDateToYYYYMMDDHHMMSS = (date: moment.MomentInput) =>
  moment(date).format('YYYY-MM-DD HH:mm:ss');

/**
 * 两者日期差距几天
 * @param start 开始日期
 * @param end 结束日期
 */
export const dateDiff = (
  start: moment.MomentInput,
  end: moment.MomentInput
) => {
  var a = moment(end);
  var b = moment(start);

  return a.diff(b, 'days');
};
