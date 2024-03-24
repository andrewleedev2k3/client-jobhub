import Job from './Job';
import User from './User';

export default interface Company extends User {
    _id: string;
    companyName: string;
    companySize: any;
    description: string;
    establishDate: Date;
    website: string;
    jobList: Job[];
    coverPhoto: string;
    totalJobCreated: number
}
