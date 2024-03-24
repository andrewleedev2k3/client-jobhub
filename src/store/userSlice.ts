import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { authApiSlice } from '@/services/authApiSlice';
import JobSeeker from '@/types/JobSeeker';
import Company from '@/types/Company';
import { usersApiSlice } from '@/services/usersApiSlice';

export interface InitialValue {
    user: JobSeeker | Company | null | undefined;
    accessToken: string | null | undefined;
}
const initialState: InitialValue = {
    user: undefined,
    accessToken: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setcredentialsToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<JobSeeker | Company>) => {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addMatcher(usersApiSlice.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.data;
        });
        builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.data;
            state.accessToken = payload.data.accessToken;
        });
        builder.addMatcher(authApiSlice.endpoints.registerJobseeker.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.data;
            state.accessToken = payload.data.accessToken;
        });
        builder.addMatcher(authApiSlice.endpoints.registerCompany.matchFulfilled, (state, { payload }) => {
            state.user = payload.data.data;
            state.accessToken = payload.data.accessToken;
        });
        builder.addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state, _) => {
            state.user = null;
            state.accessToken = null;
        });
    },
});

export const { setcredentialsToken, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
