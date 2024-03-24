import Company from './Company';
import Job from './Job';
import JobSeeker from './JobSeeker';

export default interface JobApplication {
    id: string;
    company: Company;
    candicate: JobSeeker;
    job: Job;
    status: 'pending' | 'accepted' | 'canceled';
    interviewDate: Date;
}
