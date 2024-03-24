import Company from '@/types/Company';
import { apiSlice } from './apiSlice';

import { ResponseApi } from '@/types/ResponseApi';
import { buildQueryString } from '@/utils/helper';
import Job from '@/types/Job';

interface ParamsGetAllJob {
    q?: string;
    page?: number;
    limit?: number;
    ['salary[gte]']?: number;
    ['salary[lte]']?: number;
    ['skillsRequire[in]']?: string[];
    sort?: string;
    p?: string;
    d?: string;
}

export const companyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanies: builder.query<ResponseApi<Company[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `company?${query && query}`,
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Companies' as const, id })),
                        { type: 'Companies' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Companies' as const, id: 'LIST' }];
            },
        }),
        getCompany: builder.query<ResponseApi<Company>, string>({
            query: (id) => `company/${id}`,
            providesTags: () => [{ type: 'Companies' as const, id: '' }],
        }),
        getJobApplication: builder.query<ResponseApi<any>, { id?: string; query: ParamsGetAllJob }>({
            query: ({ id, query }) => {
                const queryParams = buildQueryString(query);
                return {
                    url: `job/application/${id}?${queryParams && queryParams}`,
                };
            },
            providesTags: () => [{ type: 'Companies' as const, id: 'LIST-JOB-APPLICATION' }],
        }),
        changeMe: builder.mutation<ResponseApi<Company>, Company | FormData>({
            query(body) {
                try {
                    return {
                        url: 'company/changeMe',
                        method: 'PATCH',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'Users' as const, id: 'CURRENT' }]),
        }),

        acceptJob: builder.mutation<ResponseApi<Company>, { id: string; body: any }>({
            query({ id, body }) {
                try {
                    return {
                        url: `job/accept/${id}`,
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) =>
                error ? [] : [{ type: 'Companies' as const, id: 'LIST-JOB-APPLICATION' }],
        }),
        getMyJobCreated: builder.query<ResponseApi<any[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `company/myJobCreated?${query && query}`,
                };
            },

            providesTags: () => [{ type: 'Companies' as const, id: 'LIST-JOB-CREATED' }],
        }),
        createJob: builder.mutation<ResponseApi<Job>, FormData>({
            query(body) {
                try {
                    return {
                        url: 'job',
                        method: 'POST',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) =>
                error ? [] : [{ type: 'Companies' as const, id: 'LIST-JOB-CREATED' }],
        }),
        getJobDeleted: builder.query<ResponseApi<any[]>, ParamsGetAllJob>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `job/deleted?${query && query}`,
                };
            },
            providesTags: () => [{ type: 'Companies' as const, id: 'LIST-JOB-DELETED' }],
        }),

        removeJobCreated: builder.mutation<ResponseApi<any>, string>({
            query(id) {
                try {
                    return {
                        url: `job/remove/${id}`,
                        method: 'DELETE',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) =>
                error
                    ? []
                    : [
                          { type: 'Companies' as const, id: 'LIST-JOB-CREATED' },
                          { type: 'Companies' as const, id: 'LIST-JOB-DELETED' },
                      ],
        }),

        restoreJob: builder.mutation<ResponseApi<any>, string>({
            query(id) {
                try {
                    return {
                        url: `job/restore/${id}`,
                        method: 'PATCH',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) =>
                error
                    ? []
                    : [
                          { type: 'Companies' as const, id: 'LIST-JOB-CREATED' },
                          { type: 'Companies' as const, id: 'LIST-JOB-DELETED' },
                      ],
        }),
        deleteJobCreated: builder.mutation<ResponseApi<any>, string>({
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
            invalidatesTags: (_result, error, _body) =>
                error
                    ? []
                    : [
                          { type: 'Companies' as const, id: 'LIST-JOB-CREATED' },
                          { type: 'Companies' as const, id: 'LIST-JOB-DELETED' },
                      ],
        }),
        cancelJob: builder.mutation<ResponseApi<any>, string>({
            query(id) {
                try {
                    return {
                        url: `job/cancel/${id}`,
                        method: 'POST',
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) =>
                error
                    ? []
                    : [
                          { type: 'Companies' as const, id: 'LIST-JOB-CREATED' },
                          { type: 'Companies' as const, id: 'LIST-JOB-APPLICATION' },
                          { type: 'Companies' as const, id: 'LIST-JOB-DELETED' },
                      ],
        }),
    }),
});

export const {
    useGetCompaniesQuery,
    useGetCompanyQuery,
    useChangeMeMutation,
    useGetMyJobCreatedQuery,
    useRemoveJobCreatedMutation,
    useDeleteJobCreatedMutation,
    useGetJobApplicationQuery,
    useGetJobDeletedQuery,
    useRestoreJobMutation,
    useAcceptJobMutation,
    useCancelJobMutation,
    useCreateJobMutation,
} = companyApiSlice;
