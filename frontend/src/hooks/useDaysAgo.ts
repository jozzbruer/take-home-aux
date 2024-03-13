import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';

const useDaysAgo = (dateString: string): number | null => {
	const [daysAgo, setDaysAgo] = useState<number | null>(null);
	const date = new Date(dateString);

	useEffect(() => {
		if (date instanceof Date && !isNaN(date.getTime())) {
			const daysAgoValue = differenceInDays(new Date(), date);
			setDaysAgo(daysAgoValue);
		} else {
			setDaysAgo(null);
		}
	}, [date]);

	return daysAgo;
};

export default useDaysAgo;
