import { buildQueryString } from '@/utils/helper';
import { Location } from '@/types/Location';
import { apiSlice } from './apiSlice';

import { ResponseApi } from '@/types/ResponseApi';
interface ParamsGetLocaiton {
    code?: string;
}
export const utilsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<ResponseApi<string[]>, string>({
            query: (name) => `utils/getSkills?name=${name ? name : ''}`,
            providesTags: () => [{ type: 'Skills' as const, id: 'LIST' }],
        }),

        getProvinces: builder.query<ResponseApi<Location[]>, void>({
            query: () => `utils/getCity`,
            providesTags: () => [{ type: 'Location' as const, id: 'LIST' }],
        }),

        getDistrictByCityCode: builder.query<ResponseApi<Location>, number | undefined>({
            query: (code) => `utils/getCity/${code ? code : ''}`,
            providesTags: () => [{ type: 'Location' as const, id: 'LIST' }],
        }),

        getAllLocation: builder.query<ResponseApi<any[]>, ParamsGetLocaiton>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `utils/getLocation?${query && query}`,
                };
            },
            providesTags: () => [{ type: 'Location' as const, id: 'LIST' }],
        }),
        getDistricts: builder.query<ResponseApi<any[]>, ParamsGetLocaiton>({
            query: (arg) => {
                const query = buildQueryString(arg);
                return {
                    url: `utils/getDistrict?${query && query}`,
                };
            },
            providesTags: () => [{ type: 'Location' as const, id: 'LIST' }],
        }),
        getLocation: builder.query<ResponseApi<Location[]>, void>({
            query() {
                return {
                    url: 'utils/getLocation',
                };
            },
            providesTags: () => [{ type: 'Location' as const, id: 'LIST' }],
        }),
    }),
});

export const {
    useGetSkillsQuery,
    useGetAllLocationQuery,
    useGetProvincesQuery,
    useGetDistrictsQuery,
    useGetLocationQuery,
    useGetDistrictByCityCodeQuery,
} = utilsApiSlice;
