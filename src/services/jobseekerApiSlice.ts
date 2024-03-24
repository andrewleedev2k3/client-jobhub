import { apiSlice } from './apiSlice';

import { ResponseApi } from '@/types/ResponseApi';
import JobSeeker, { JobApplicate } from '@/types/JobSeeker';
import { buildQueryString } from '@/utils/helper';

interface ParamsGetAllJob {
    q?: string;
    page?: number;
    limit?: number;
    ['salary[gte]']?: number;
    ['salary[lte]']?: number;
    ['skillsRequire[in]']?: string[];
    sort?: string;
}

export const jobseekerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobseekers: builder.query<ResponseApi<JobSeeker[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `jobseeker?${query && query}`,
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'JobSeeker' as const, id })),
                        { type: 'JobSeeker' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'JobSeeker' as const, id: 'LIST' }];
            },
        }),
        getDetailJobseeker: builder.query<ResponseApi<JobSeeker>, string>({
            query(id) {
                return {
                    url: `jobseeker/${id}`,
                };
            },
            providesTags: () => [{ type: 'JobSeeker' as const, id: 'LIST' }],
        }),
        JobseekerChangeMe: builder.mutation<ResponseApi<JobSeeker>, JobSeeker | FormData>({
            query(body) {
                try {
                    return {
                        url: 'jobseeker/changeMe',
                        method: 'PATCH',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) =>
                error
                    ? []
                    : [
                          { type: 'JobSeeker', id: 'JobSeeker' },
                          { type: 'Users' as const, id: 'CURRENT' },
                      ],
        }),
        getMyApplication: builder.query<ResponseApi<JobApplicate[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `jobseeker/myApplication?${query && query}`,
                };
            },
            providesTags: () => [{ type: 'JobSeeker' as const, id: 'LIST' }],
        }),

        removeJobApply: builder.mutation<ResponseApi<JobApplicate>, string>({
            query(id) {
                try {
                    return {
                        url: `job/remove/${id}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'JobSeeker' as const, id: 'LIST' }]),
        }),
    }),
});

export const {
    useGetJobseekersQuery,
    useJobseekerChangeMeMutation,
    useGetMyApplicationQuery,
    useRemoveJobApplyMutation,
    useGetDetailJobseekerQuery,
} = jobseekerApiSlice;
