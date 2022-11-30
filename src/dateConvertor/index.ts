import moment from 'moment';

export function dateConvertor(data: string) {
	const dateArray = data.slice(0, -3).split(', ');
	const newDateFormat = dateArray[0].split('.').reverse().join('-');
	const newTimeFormat = dateArray[1];

	const now = moment(`${newDateFormat} ${newTimeFormat}`);
	const end = moment();
	const duration = moment.duration(end.diff(now));

	const days = Math.floor(duration.asDays());
	duration.subtract(moment.duration(days, 'days'));

	const hours = duration.hours();
	duration.subtract(moment.duration(hours, 'hours'));

	const minutes = duration.minutes();
	duration.subtract(moment.duration(minutes, 'minutes'));

	return [days, hours, minutes];
}
