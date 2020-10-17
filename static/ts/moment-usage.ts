import moment from 'moment';
const dateToNumber = new Date().getTime();

/**
 * usage는 딱 format하나인듯.
 */
const FORMAT = 'YYYY.MM.DD';
const FORMAT2 = 'YYYY년 MM월 DD일';
console.log(moment(dateToNumber).format(FORMAT));
console.log(moment().valueOf(), dateToNumber);
