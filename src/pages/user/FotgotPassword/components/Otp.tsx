import Loader from "@/components/Loader/Loader";
import { useConfirmOTPMutation } from "@/services/authApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

type OtpProps = {
    changePage: (page: 'email' | 'otp' | 'newPassword') => void
    email: string
    handleOtp: (otp: string) => void
}
function Otp({changePage, email, handleOtp}: OtpProps) {
    const [otp, setOtp] = useState(new Array(6).fill(''))

    const [confirmOTP, {isLoading}] = useConfirmOTPMutation()

    const handleChange = (e: any, index: number) => {
        if(isNaN(e.value)) toast.error('Mã OTP không chứa các kí tự chữ')

        if((typeof Number(e.value)) === 'number') {
            setOtp([...otp.map((d, i) => (i === index) ? e.value : d)])
        }

        if(e.value !== '' && e.nextSibling) {
            e.nextSibling.focus()
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if(otp.join('').length === 6) {
            try {
                const response = await confirmOTP({email, otp: otp.join('')}).unwrap()
                if(response.status === 200) {
                    toast.success(response.data.msg)
                    handleOtp(otp.join(''))
                    changePage('newPassword')
                }
            } catch(err: any) {
                toast.error(err.data.msg)
            }
        } else {
            toast.error('Bạn chưa nhập đủ số của mã OTP')
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <form onSubmit={handleSubmit} >
                <div className=" flex items-center justify-between">
                    {otp?.map((data, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="0"
                                className=" w-16 h-16 text-center text-3xl text-content-title bg-gray-100 border-2 border-gray-500 rounded-lg outline-none"
                                maxLength={1}
                                onChange={e => handleChange(e.target, index)}
                            />
                        )
                    })}
                    
                    
                </div>

                <div className=" text-center">
                    <button
                        type="submit"
                        className=" w-full h-[50px] text-white font-semibold bg-primary-100 rounded-[0.625rem] mt-6 "
                    >
                        Xác nhận mã OTP
                    </button>
                </div>
            </form>
        </>
    );
}

export default Otp;