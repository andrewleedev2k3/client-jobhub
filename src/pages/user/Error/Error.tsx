import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div className=" font-family-text container mt-40 m-auto justify-center text-center">
            <img className="justify-center m-auto mb-7" src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/bg/404.svg" alt="" />
            <h1 className=" font-family-title title font-bold text-4xl mb-5">Có gì đó không ổn... Không tìm thấy trang</h1>
            <p className="description text-xl mb-7">
                Đã xảy ra lỗi, trang web được hiển thị cho người dùng khi
                máy chủ không thể tìm thấy trang được yêu cầu.
            </p>
            <div className="flex items-center justify-center">
                <Link to={'/'} className="bg-teal-500 hover:bg-teal-900 text-white font-bold py-2 px-4 my-6 rounded focus:outline-none focus:shadow-outline" type="button">
                    Trở về trang chủ
                </Link>
            </div>
        </div>
    )

};

export default Error;
