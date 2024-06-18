import { Equal, Expect } from "../function";

const getLocationWeather = (locationId: string) => {
	return `Weather at location ${locationId}`;
};
type GetLocationWeatherReturn = ReturnType<typeof getLocationWeather>;
const getDetailedWeather = (
	locationId: string,
	details?: {
		tempUnit?: 'C' | 'F';
		includeForecast?: boolean;
	},
) => {
};
type GetDetailedWeatherParameters = Parameters<typeof getDetailedWeather>;

type tests = [
	Expect<Equal<GetLocationWeatherReturn, string>>,
	Expect<Equal<GetDetailedWeatherParameters, [
		locationId: string,
		details?: {
			tempUnit?: 'C' | 'F';
			includeForecast?: boolean;
		}
	]>>
];
