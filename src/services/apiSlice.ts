import { RootState } from '@/store/store';
import { getToken, removeToken, setToken } from '@/utils/storage';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ResponseApi } from '@/types/ResponseApi';
import { Mutex } from 'async-mutex';

// Because using Vite => import.meta.env instead of process.env like normal react app
// const URL = import.meta.env.PROD ? import.meta.env.VITE_URL_PRODUCTION : import.meta.env.VITE_URL_DEVELOPMENT;
const URL = import.meta.env.VITE_URL_PRODUCTION;

// Using for fix mutiple call refresh token
const mutex = new Mutex();
// maxRetries: 5 is the default, and can be omitted. Shown for documentation purposes.

const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).user.accessToken || getToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403 || result?.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery('auth/refreshToken', api, extraOptions);
                if (refreshResult?.data) {
                    const response = refreshResult.data as ResponseApi;

                    // store the new token
                    // api.dispatch(setcredentialsToken(response.data.accessToken as string));
                    // Dùng trực tiếp action cho dispatch thay vì action được tạo ra từ slice để tránh lỗi import vòng tròn của redux, dẫn đến access slice khi chưa khởi tạo
                    api.dispatch({
                        type: 'user/setcredentialsToken',
                        payload: response.data.accessToken as string,
                    });
                    setToken(response.data.accessToken as string);
                    // // retry the original query with new access token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    await baseQuery('auth/logout', api, extraOptions);
                    api.dispatch({ type: 'user/logout' });
                    removeToken();
                    // alert('Token không hợp lệ, có thể người dùng đã được đăng nhập từ một thiết bị khác');
                    // window.location.href = '/auth';
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};
// Chặn duplicate refresh từ mutex phải thêm cái này để retry lại request khi nó error, không thì cache {data} của rtk query sẽ không được update, số lần retry tối đa tự custom
const staggeredBaseQuery = retry(baseQueryWithReauth, {
    maxRetries: 1,
});

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: [
        'Jobs',
        'Companies',
        'JobSeeker',
        'Users',
        'JobApplications',
        'Comments',
        'Notifications',
        'Location',
        'Category',
        'Skills',
        'Location',
        'Statistic',
    ],
    baseQuery: staggeredBaseQuery,

    endpoints: (_builder) => ({}),
});
