import { StatisticJobMonthly, StatisticTotal, StatisticTopJob, StatisticTopCompany } from '@/types/Statistic';
import { apiSlice } from './apiSlice';

import { ResponseApi } from '@/types/ResponseApi';

export const statisticApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobMonthly: builder.query<ResponseApi<StatisticJobMonthly[]>, void>({
            query: () => 'statistic/jobMonthly',
            providesTags: () => [{ type: 'Statistic' as const, id: 'LIST' }],
        }),
        getStatisticTotal: builder.query<ResponseApi<StatisticTotal>, void>({
            query: () => 'statistic/statisticTotal',
            providesTags: () => [{ type: 'Statistic' as const, id: 'TOTAL' }],
        }),
        getTopJob: builder.query<ResponseApi<StatisticTopJob[]>, void>({
            query: () => 'statistic/topJob',
            providesTags: () => [{ type: 'Statistic' as const, id: 'TOP-JOB' }],
        }),
        getTopCompany: builder.query<ResponseApi<StatisticTopCompany[]>, void>({
            query: () => 'statistic/topCompany',
            providesTags: () => [{ type: 'Statistic' as const, id: 'TOP-COMPANY' }],
        }),
    }),
});

export const { useGetJobMonthlyQuery, useGetStatisticTotalQuery, useGetTopJobQuery, useGetTopCompanyQuery } =
    statisticApiSlice;
