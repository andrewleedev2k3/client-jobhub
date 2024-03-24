import JobApplication from './JobApplication';
import User from './User';

export interface Education {
    _id: string;
    major: string;
    school: string;
    date: {
        from: Date;
        to?: Date;
    };
    isLearning: boolean;
}
export interface Certification {
    _id: string;

    name: string;
    organization: string;
    date: {
        from: Date;
        to: Date;
    };
}
export interface Experience {
    _id: string;
    position: string;
    company: string;
    date: {
        from: Date;
        to?: Date;
    };
    isWorking: boolean;
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    url: string;
    date: {
        from: Date;
        to?: Date;
    };
    isWorking: boolean;
}
export type Skill = string;
// export type Skill = 'ReactJS' | 'NodeJS' | 'PHP' | 'Java' | 'Javascript' | 'Golang' | 'React-native' | 'Python';

export interface JobApplicate {
    _id: string;
    candicate: string;
    cvImage: string;
    company: {
        _id: string;
        companyName: string;
        description: string;
        location: {
            city: string;
            district: string;
            address: string;
            _id: string;
        };
        photo: string;
    };
    job: {
        _id: string;
        available: boolean;
        description: string;
        title: string;
        salary: number;
        createdAt: string;
    };
    interviewDate?: string;
    status: string;
    updatedAt: string;
    createdAt: string;
}

export default interface JobSeeker extends User {
    introduce: string;
    cvImage: string;
    skills: Skill[];
    educate: Education[];
    certificate: Certification[];
    experiences: Experience[];
    projects: Project[];
    jobHistory: JobApplication[];
}
