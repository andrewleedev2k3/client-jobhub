import Company from '@/types/Company';
import JobSeeker from '@/types/JobSeeker';

export const isJobSeeker = (user: any): user is JobSeeker => {
    return (
        user !== null &&
        user?.__t === 'JobSeeker' &&
        !!user?.projects &&
        !!user?.experiences &&
        !!user?.certificate &&
        !!user?.educate &&
        !!user?.skills
    );
};

export const isCompany = (user: any): user is Company => {
    return user !== null && user?.__t === 'Company' && !!user?.companyName && !!user?.establishDate;
};

export const buildQueryString = (queryStringObj: any) => {
    return Object.entries(queryStringObj)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return `${key}=${JSON.stringify(value)}`;
            }
            return `${key}=${value}`;
        })
        .join('&');
};
