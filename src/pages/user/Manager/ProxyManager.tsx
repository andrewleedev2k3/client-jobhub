import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '@/store/uiSlice';
import { useGetCurrentUserQuery } from '@/services/usersApiSlice';
import { isJobSeeker as checkJobSeeker } from '@/utils/helper';

import { Outlet } from 'react-router-dom';

const ProxyManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: currentUserResponse, isLoading } = useGetCurrentUserQuery();

    useEffect(() => {
        if (isLoading) {
            dispatch(showLoading());
            return;
        }

        const currentUser = currentUserResponse?.data.data;
        const isJobSeeker = checkJobSeeker(currentUser);
        if (isJobSeeker) {
            navigate('/profile/jobseeker');
            dispatch(hideLoading());
            return;
        }
        navigate('/profile/company');
        dispatch(hideLoading());
    }, [currentUserResponse, isLoading, dispatch, navigate]);
    return <Outlet />;
};

export default ProxyManager;
