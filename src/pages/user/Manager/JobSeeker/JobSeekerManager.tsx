import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '@/store/uiSlice';
import { useGetCurrentUserQuery } from '@/services/usersApiSlice';
import { isJobSeeker as checkJobSeeker } from '@/utils/helper';

const JobSeekerManager = () => {
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
        if (!isJobSeeker) {
            navigate('/profile/company');
            dispatch(hideLoading());
            return;
        }
        dispatch(hideLoading());
    }, [currentUserResponse, isLoading, dispatch, navigate]);
    return <Outlet />;
};

export default JobSeekerManager;
