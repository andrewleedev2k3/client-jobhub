import { MdOutlineDashboard, MdOutlineDelete, MdWorkOutline, MdOutlineMedicalInformation } from 'react-icons/md';
import { IoBagAddOutline } from 'react-icons/io5';
import { RiLockPasswordLine } from 'react-icons/ri';
import TitleProfile from './TitleProfile';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { isJobSeeker, isCompany } from '@/utils/helper';

const Sidebar = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const company = isCompany(currentUser);
    return (
        <div className="bg-white flex flex-col rounded-md border-[1px] border-primary-40 h-fit w-[304px]  text-lg font-family-title  mb:w-full tb:grid tb:grid-cols-2 tb:w-full tb:gap-6 tb:bg-transparent tb:border-none lg:grid lg:grid-cols-3 lg:w-full lg:gap-6 lg:bg-transparent lg:border-none xl:grid xl:grid-cols-3 xl:w-full xl:gap-6 xl:bg-transparent xl:border-none">
            <TitleProfile
                title="Trang cá nhân"
                path={`/profile/${jobSeeker ? 'jobseeker' : 'company'}`}
                logo={<MdOutlineDashboard />}
            />
            {jobSeeker && <TitleProfile title="Đơn ứng tuyển" path="jobseeker/applied-jobs" logo={<MdWorkOutline />} />}
            {jobSeeker && (
                <TitleProfile title="Hồ sơ (CV)" path="jobseeker/add-cv" logo={<MdOutlineMedicalInformation />} />
            )}
            {company && <TitleProfile title="Thêm công việc" path="company/post-job" logo={<IoBagAddOutline />} />}
            {company && <TitleProfile title="Công việc đã tạo" path="company/job-created" logo={<MdWorkOutline />} />}

            {company && <TitleProfile title="Thùng rác" path="company/job-deleted" logo={<MdOutlineDelete />} />}

            <TitleProfile title="Đổi mật khẩu" path="/profile/updateMyPassword" logo={<RiLockPasswordLine />} />
        </div>
    );
};

export default Sidebar;
