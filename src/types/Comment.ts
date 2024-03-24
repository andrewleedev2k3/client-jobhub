import Company from './Company';
import Job from './Job';
import JobSeeker from './JobSeeker';

export default interface Comment {
    id: string;
    job: Job;
    sender: JobSeeker | Company;
    content: string;
}
