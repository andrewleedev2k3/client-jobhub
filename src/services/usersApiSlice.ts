import JobSeeker from '@/types/JobSeeker';
import { apiSlice } from './apiSlice';
import Company from '@/types/Company';
import { ResponseApi } from '@/types/ResponseApi';
import { buildQueryString } from '@/utils/helper';
import { UpdateMyPassword } from '@/types/User';

type MixinUser = JobSeeker | Company;

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<ResponseApi<MixinUser[]>, { q?: string; page?: number; limit?: number }>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `user?${query && query}`,
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Users' as const, id })),
                        { type: 'Users' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Users' as const, id: 'LIST' }];
            },
        }),
        getBannedUsers: builder.query<ResponseApi<MixinUser[]>, { q?: string; page?: number; limit?: number }>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `user/banned?${query && query}`,
                };
            },
            providesTags(result) {
                if (result?.data?.data) {
                    const final = [
                        ...result.data.data.map(({ id }) => ({ type: 'Users' as const, id })),
                        { type: 'Users' as const, id: 'LIST' },
                    ];
                    return final;
                }
                return [{ type: 'Users' as const, id: 'LIST' }];
            },
        }),
        getCurrentUser: builder.query<ResponseApi<MixinUser>, void>({
            query: () => 'user/getMe/',
            providesTags: () => [{ type: 'Users' as const, id: 'CURRENT' }],
        }),
        changeMeUser: builder.mutation<ResponseApi<MixinUser>, FormData>({
            query(body) {
                try {
                    return {
                        url: `user/changeMe`,
                        method: 'PATCH',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'Users' as const, id: 'CURRENT' }]),
        }),
        banUser: builder.mutation<ResponseApi<MixinUser>, string>({
            query: (id) => {
                return {
                    url: `user/ban/${id}`,
                    method: 'PATCH',
                };
            },
            invalidatesTags: (_result, error) => {
                if (!error) {
                    return [
                        { type: 'Users', id: 'LIST' },
                        { type: 'Companies', id: 'LIST' },
                        { type: 'JobSeeker', id: 'LIST' },
                    ];
                }
                return [];
            },
        }),
        unbanUser: builder.mutation<ResponseApi<MixinUser>, string>({
            query: (id) => {
                return {
                    url: `user/unban/${id}`,
                    method: 'PATCH',
                };
            },
            invalidatesTags: (_result, error) => {
                if (!error) {
                    return [
                        { type: 'Users', id: 'LIST' },
                        { type: 'Companies', id: 'LIST' },
                        { type: 'JobSeeker', id: 'LIST' },
                    ];
                }
                return [];
            },
        }),
        updateMyPassword: builder.mutation<ResponseApi<MixinUser>, UpdateMyPassword>({
            query(body) {
                try {
                    return {
                        url: `user/updateMyPassword`,
                        method: 'PATCH',
                        body,
                    };
                } catch (error: any) {
                    throw error.message;
                }
            },
            invalidatesTags: (_result, error, _body) => (error ? [] : [{ type: 'Users' as const, id: 'CURRENT' }]),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetBannedUsersQuery,
    useGetCurrentUserQuery,
    useChangeMeUserMutation,
    useBanUserMutation,
    useUnbanUserMutation,
    useUpdateMyPasswordMutation,
} = usersApiSlice;
