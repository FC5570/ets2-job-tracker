export interface JobData {
	sourceCity: string;
	sourceCompany: string;
	destinationCity: string;
	destinationCompany: string;
	cargo: string;
	truckMake: string;
	truckModel: string;
}

export interface JobDataPostBody extends JobData {
	userId: string;
	action: 'START' | 'END';
}
