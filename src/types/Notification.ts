import Company from './Company';
import JobSeeker from './JobSeeker';

export default interface Notification {
    id: string;
    sender: Company | JobSeeker;
    receiver: Company | JobSeeker;
    type: 'job' | 'user';
    entityId: string;
    isSeen: boolean;
    content?: string;
    createdAt: string;
    updatedAt: string;
}
