import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetCurrentUserQuery } from '@/services/usersApiSlice';
import { removeToken } from '@/utils/storage';
import { hideLoading, showLoading } from '@/store/uiSlice';

const ProtectedRoutes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading, isFetching, isError, error } = useGetCurrentUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (isLoading) {
            dispatch(showLoading());
            return;
        }
        const timer = setTimeout(() => {
            if (isError && !isLoading) {
                alert((error as any)?.data?.msg);
                removeToken();
                dispatch(hideLoading());
                navigate('/login');
                return;
            }
        }, 500);
        dispatch(hideLoading());
        return () => clearTimeout(timer);
    }, [isLoading, isFetching, isError, error]);

    return data && !isFetching && !isLoading && <Outlet />;
};

export default ProtectedRoutes;
