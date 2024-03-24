import Job from '@/types/Job';
import { apiSlice } from './apiSlice';

import { ResponseApi } from '@/types/ResponseApi';
import { buildQueryString } from '@/utils/helper';

interface ParamsGetAllJob {
    q?: string;
    page?: number;
    limit?: number;
    ['salary[gte]']?: number;
    ['salary[lte]']?: number;
    ['skillsRequire[in]']?: string[];
    sort?: string;
    type?: string;
    p?: string;
    d?: string;
}

export const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<ResponseApi<Job[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `job?${query && query}`,
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Jobs' as const, id })),
                        { type: 'Jobs' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Jobs' as const, id: 'LIST' }];
            },
        }),

        getAllJobs: builder.query<ResponseApi<Job[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `job/all?${query && query}`,
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Jobs' as const, id })),
                        { type: 'Jobs' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Jobs' as const, id: 'LIST' }];
            },
        }),
        getJobsNotAccept: builder.query<ResponseApi<Job[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `job/notAccept?${query && query}`,
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Jobs' as const, id })),
                        { type: 'Jobs' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Jobs' as const, id: 'LIST' }];
            },
        }),
        getJob: builder.query<ResponseApi<Job>, string>({
            query: (id) => `job/${id}`,
            providesTags: () => [{ type: 'Jobs' as const, id: 'LIST' }],
        }),

        applyJob: builder.mutation<ResponseApi<Job>, string>({
            query(id) {
                return {
                    url: 'job/apply/' + id,
                    method: 'POST',
                };
            },
            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'Jobs', id: 'LIST' }]),
        }),
        deleteJob: builder.mutation<ResponseApi<Job>, string>({
            query(id) {
                try {
                    return {
                        url: `job/${id}`,
                        method: 'DELETE',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'Jobs', id: 'LIST' }]),
        }),
        approveJob: builder.mutation<ResponseApi<Job>, string>({
            query(id) {
                try {
                    return {
                        url: `job/approve/${id}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'Jobs', id: 'LIST' }]),
        }),
        postComment: builder.mutation<ResponseApi<Job>, { content: string; id: string }>({
            query: (body) => {
                return {
                    url: `job/comment/${body.id}`,
                    method: 'POST',
                    body: { content: body.content },
                };
            },
            invalidatesTags: (result, error) => (error ? [] : [{ type: 'Jobs', id: 'LIST' }]),
        }),
    }),
});

export const {
    useGetJobQuery,
    useGetJobsQuery,
    useApplyJobMutation,
    useGetAllJobsQuery,
    useGetJobsNotAcceptQuery,
    useDeleteJobMutation,
    useApproveJobMutation,
    usePostCommentMutation,
} = jobsApiSlice;
