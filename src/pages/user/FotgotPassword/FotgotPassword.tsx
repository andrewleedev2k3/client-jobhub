import { useState } from "react";
import Email from "./components/Email";
import Otp from "./components/Otp";
import NewPassword from "./components/NewPassword";

function ForgotPassword() {
    const [page, setPage] = useState<'email' | 'otp' | 'newPassword'>('email')
    const [email, setEmail] = useState<string>('')
    const [otp, setOtp] = useState<string>('')

    return (
        <div className=" w-full min-h-screen font-family-text bg-gradient-to-r from-[#00032d] to-[#103185] py-20">
            <div className=" flex flex-col w-[550px] mx-auto">
                <h1 className=" text-center font-family-title text-primary-100 font-semibold text-3xl mb-4">
                    {page === 'email' && 'Tài khoản email'}
                    {page === 'otp' && 'Nhập mã OTP'}
                    {page === 'newPassword' && 'Mật khẩu mới'}
                </h1>
                <div className=" w-full h-auto bg-white rounded-xl p-[40px]">
                    {page === 'email' && <Email changePage={setPage} handleEmail={setEmail} />}
                    {page === 'otp' && <Otp changePage={setPage} email={email} handleOtp={setOtp} />}
                    {page === 'newPassword' && <NewPassword email={email} otp={otp} />}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;