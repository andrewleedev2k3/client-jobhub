import ItemCol from "./ItemCol/ItemCol";

function TopFooter() {
    return (
        <div className=" flex items-start justify-between mx-auto lg:flex-wrap lg:w-10/12 tb:flex-col tb:items-center mb:flex-col mb:items-center ">
            <ItemCol
                title='Giới thiệu về công ty'
                list={['Liên hệ chúng tôi', 'Điều khoản & Điều kiện', 'Chính sách bảo mật', 'Danh sách ứng viên']}
            />
            <ItemCol
                title="Dành cho ứng viên"
                list={['Tạo sơ yếu lý lịch', 'Duyệt danh mục', 'Lưu danh sách công việc', 'Duyệt công việc', 'Trang tổng quan về ứng viên']}
            />
            <ItemCol
                title="Đối với nhà tuyển dụng"
                list={['Đăng tuyển', 'Duyệt ứng viên', 'Gói công việc', 'Việc làm nổi bật', 'Trang tổng quan']}
            />
            <div className=" w-[250px] flex flex-col items-start tb:items-center mb:items-center">
                <h3 className=" text-xl font-semibold mb-[25px] ">Tải ứng dụng</h3>
                <div className=" border border-gray-800 py-3 px-[14px] mb-[30px] cursor-pointer">
                    <img src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/apple-app.svg" />
                </div>
                <div className=" border border-gray-800 py-3 px-[14px] mb-[30px] cursor-pointer">
                    <img src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/google-play.svg" />
                </div>
            </div>
        </div>
    );
}

export default TopFooter;