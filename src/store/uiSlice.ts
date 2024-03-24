import { createSlice } from '@reduxjs/toolkit';

interface IUiState {
    loading: boolean;
}

const initialState: IUiState = {
    loading: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { showLoading, hideLoading } = uiSlice.actions;
export default uiSlice.reducer;
