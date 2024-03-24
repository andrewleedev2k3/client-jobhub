import Company from './Company';
import Job from './Job';

export default interface Statistic {}

export interface StatisticJobMonthly {
    amountJob: number;
    month: number;
}

export interface StatisticTotal {
    totalUsers: number;
    totalApplications: number;
    totalJobs: number;
    totalCategories: number;
}

export interface StatisticTopJob {
    _id: string;
    amountApplication: number;
    job: Job;
}

export interface StatisticTopCompany {
    _id: string;
    amountJobPosted: number;
    company: Company;
}
