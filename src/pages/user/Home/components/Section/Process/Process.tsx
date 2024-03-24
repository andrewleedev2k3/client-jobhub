import images from '@/assets/images';
import ProcessItem from './ProcessItem';
const Process = () => {
    return (
        <div className="flex py-10 justify-center items-center gap-16 xl:flex-wrap lg:flex-wrap tb:flex-wrap mb:flex-col mb:gap-4">
            <ProcessItem
                title="Tạo tài khoản"
                paragraph="Đăng ký tài khoản ứng viên trên JobHub."
                image={images.process.accoutCreate}
                path="/register/jobseeker"
                arrow="up"
            />

            <ProcessItem
                title="Tạo sơ yếu lý lịch"
                paragraph="Liệt kê các thông tin cá nhân vào hồ sơ."
                image={images.process.resume}
                path="/profile"
                arrow="down"
            />

            <ProcessItem
                title="Tìm việc"
                paragraph="Tìm kiếm công việc theo tiêu chí của cá nhân."
                image={images.process.findJob}
                arrow="up"
                path="/job-listing"
            />

            <ProcessItem
                title="Nộp đơn xin việc"
                paragraph="Sau khi chọn được việc hãy ứng tuyển vị trí."
                image={images.process.jobApply}
                arrow="down"
                path="/company-listing"
            />
        </div>
    );
};

export default Process;
