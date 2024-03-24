import { ResponseApi } from '@/types/ResponseApi';
import { apiSlice } from './apiSlice';

import JobSeeker from '@/types/JobSeeker';
import Company from '@/types/Company';

interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterJobseekerRequest {
    type: 'jobseeker';
    firstName: string;
    lastName: string;
    email: string;
    location: {
        city: string;
        address: string;
        district: string
    }
    phoneNumber: string;
    introduce: string;
    password: string;
    passwordConfirm: string;
}
export interface RegisterCompanyRequest {
    type: 'company';
    firstName: string;
    lastName: string;
    email: string;
    location: {
        city: string;
        address: string;
        district: string
    }
    phoneNumber: string;
    password: string;
    passwordConfirm: string;
    companyName: string;
    description: string;
    establishDate: Date;
    photo: string;
    coverPhoto: string;
    companySize: {
        from: number | any;
        to: number | any;
    }
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // -------------------Định nghĩa response trả về -- Định nghĩa Payload truyền đi
        login: builder.mutation<ResponseApi<JobSeeker | Company>, LoginRequest>({
            query(body) {
                try {
                    return {
                        url: 'auth/login',
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => {
                if (!error) {
                    return [{ type: 'Users', id: 'CURRENT' }];
                }
                return [];
            },
        }),
        loginGoogle: builder.mutation<ResponseApi<JobSeeker | Company>, void>({
            query() {
                try {
                    return {
                        url: 'auth/loginGoogle',
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => {
                if (!error) {
                    return [{ type: 'Users', id: 'CURRENT' }];
                }
                return [];
            },
        }),
        registerJobseeker: builder.mutation<ResponseApi<JobSeeker>, RegisterJobseekerRequest>({
            query(body) {
                try {
                    return {
                        url: 'auth/signup',
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
        registerCompany: builder.mutation<ResponseApi<Company>, RegisterCompanyRequest>({
            query(body) {
                try {
                    return {
                        url: 'auth/signup',
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
        logout: builder.mutation<ResponseApi, void>({
            query() {
                try {
                    return {
                        url: 'auth/logout',
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
        forgotPassword: builder.mutation<ResponseApi, {email: string}>({
            query(body) {
                try {
                    return {
                        url: 'auth/forgotPassword',
                        method: 'POST',
                        body
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
        confirmOTP: builder.mutation<ResponseApi, {email: string, otp: string}>({
            query(body) {
                try {
                    return {
                        url: 'auth/confirmOtp',
                        method: 'POST',
                        body
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
        resetPassword: builder.mutation<ResponseApi, {email: string, otp: string, password: string}>({
            query(body) {
                try {
                    return {
                        url: 'auth/resetPassword',
                        method: 'POST',
                        body
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useLoginGoogleMutation,
    useRegisterCompanyMutation,
    useRegisterJobseekerMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useConfirmOTPMutation,
    useResetPasswordMutation,
} = authApiSlice;
