import Comment from './Comment';
import Company from './Company';
import JobApplication from './JobApplication';

export default interface Job {
    id: string;
    _id: string;

    postedBy: Company;
    title: string;
    description: string;
    photosJob: string[];
    skillsRequire: string[];
    jobRequire: string[];
    salary: number;
    deadline: string;
    type: {
        categoryName: string;
        isHotCategory: boolean;
        id: string;
    };
    available: boolean;
    isDelete: boolean;
    isAccepted: boolean;
    applications?: JobApplication[];
    countApplication: number;
    comments: Comment[];
    createdAt: Date;
    numberRecruitment: number;
}
