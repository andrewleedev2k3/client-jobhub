import Notification from './Notification';

interface Location {
    city: string;
    district: string;
    address: string;
}
export default interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: 'male' | 'female' | 'others';
    photo: string;
    location: Location;
    follows: User[];
    followers: User[];
    role: 'user' | 'admin';
    ban: boolean;
    notifications: Notification[];
    type: 'jobseeker' | 'company';
}

export interface UpdateMyPassword {
    currentPassword: string;
    password: string;
    passwordConfirm: string;
}
