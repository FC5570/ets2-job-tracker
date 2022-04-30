export interface ParsedData {
	status: 'TELEMETRY' | 'JOB STARTED' | 'JOB FINISHED' | 'TELEMETRY SHUT DOWN';
	jobData: JobData;
}

export interface JobData extends ParsedData {
	sourceCity: string;
	sourceCompany: string;
	destinationCity: string;
	destinationCompany: string;
	cargo: string;
	truckMake: string;
	truckModel: string;
	realTimeStarted: number;
	realTimeEnded: number;
}
