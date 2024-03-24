import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '@/layouts/user/DefaultLayout/DefaultLayout.tsx';
import Home from './pages/user/Home/Home';
import ProtectedRoutes from './layouts/auth/ProtectedRoutes/ProtectedRoutes';
import JobListing from './pages/user/JobListing/JobListing';
import Error from './pages/user/Error/Error';
import Login from './pages/user/Login/Login';
import JobDetail from './pages/user/JobDetail/JobDetail';
import CompanyListing from './pages/user/CompanyListing/CompanyListing';
import CompanyDetail from './pages/user/CompanyDetail/CompanyDetail';

import Contact from './pages/user/Contact/Contact';
import PostJob from './pages/user/PostJob/PostJob';
import Manager from './pages/user/Manager/Manager';
import { default as JobseekerProfile } from './pages/user/Manager/JobSeeker/MyProfile/MyProfile';
import AppliedJobs from './pages/user/Manager/JobSeeker/AppliedJobs/AppliedJobs';
import AdminLayout from './layouts/admin/AdminLayout/AdminLayout';

import { default as CompanyProfile } from './pages/user/Manager/Company/MyProfile/MyProfile';
import JobCreated from './pages/user/Manager/Company/JobCreated/JobCreated';
import JobApplication from './pages/user/Manager/Company/JobApplication/JobApplication';
import JobDeleted from './pages/user/Manager/Company/JobDeleted/JobDeleted';

import Statistics from './pages/admin/Statistics/Statistics';
import Jobs from './pages/admin/Jobs/Jobs';
import Users from './pages/admin/Users/Users';
import Categories from './pages/admin/Categories/Categories';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Loader from '@/components/Loader/Loader';
import { useGetCurrentUserQuery } from '@/services/usersApiSlice';
import ProxyManager from '@/pages/user/Manager/ProxyManager';
import JobSeekerManager from './pages/user/Manager/JobSeeker/JobSeekerManager';
import CompanyManager from './pages/user/Manager/Company/CompanyManager';
import RegisterJobseeker from './pages/user/Register/RegisterJobseeker';
import RegisterCompany from './pages/user/Register/RegisterCompany';
import UpdatePassword from './pages/user/Manager/components/UpdatePassword/UpdatePassword';
import ForgotPassword from './pages/user/FotgotPassword/FotgotPassword';
import AddCV from './pages/user/Manager/JobSeeker/AddCV/AddCV';

function App() {
    const uiState = useSelector((state: RootState) => state.ui);
    useGetCurrentUserQuery(undefined);

    return (
        <>
            <Routes>
                {/* Public routes */}
                <Route element={<DefaultLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register/jobseeker" element={<RegisterJobseeker />} />
                    <Route path="register/company" element={<RegisterCompany />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route index element={<Home />} />
                    <Route path="job-listing" element={<JobListing />} />
                    <Route path="job-detail/:id" element={<JobDetail />} />
                    <Route path="company-listing" element={<CompanyListing />} />
                    <Route path="company-detail/:id" element={<CompanyDetail />} />

                    <Route path="error" element={<Error />} />
                    <Route path="unauthorized" element={<>unauthorized</>} />
                    <Route path="contact" element={<Contact />} />

                    <Route element={<ProtectedRoutes />}>
                        <Route path="profile" element={<Manager />}>
                            <Route index element={<ProxyManager />} />

                            <Route path="jobseeker" element={<JobSeekerManager />}>
                                <Route index element={<JobseekerProfile />} />
                                <Route path="applied-jobs" element={<AppliedJobs />} />
                                <Route path="add-cv" element={<AddCV />} />
                            </Route>

                            <Route path="company" element={<CompanyManager />}>
                                <Route index element={<CompanyProfile />} />
                                <Route path="job-created" element={<JobCreated />} />
                                <Route path="jobApplication/:id" element={<JobApplication />} />
                                <Route path="job-deleted" element={<JobDeleted />} />
                                <Route path="post-job" element={<PostJob />} />
                            </Route>
                            <Route path="updateMyPassword" element={<UpdatePassword />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="admin" element={<ProtectedRoutes />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<Statistics />} />
                        <Route path="users" element={<Users />} />
                        <Route path="jobs" element={<Jobs />} />
                        <Route path="categories" element={<Categories />} />
                    </Route>
                </Route>

                <Route path="*" element={<Error />} />
            </Routes>

            {uiState.loading && <Loader />}
        </>
    );
}

export default App;
