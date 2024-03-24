import { useFormik } from "formik";
import * as Yup from 'Yup';
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/services/authApiSlice";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";

function NewPassword({email, otp}: {email: string, otp: string}) {

    const [resetPassword, {isLoading}] = useResetPasswordMutation()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
            confirmNewPassword: Yup.string().required('Nhập lại mật khẩu không được để trống').oneOf([Yup.ref('newPassword')], 'Mật khẩu không trùng khớp'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await resetPassword({email, otp, password: values.newPassword}).unwrap()
                if(response.status === 200) {
                    toast.success(response.data.msg)
                    navigate('/login')
                }
            } catch (error: any) {
                toast.error(error.data.msg);
            }
        },
    });
    return (
        <>
            {isLoading && <Loader />}
            <form onSubmit={formik.handleSubmit}>
                <div className=" flex flex-col mb-4">
                    <label 
                        htmlFor='newPassword'
                        className=" text-base font-medium mb-2"
                    >
                        Mật khẩu mới
                    </label>
                    
                    <input
                        type='password'
                        id='newPassword'
                        name='newPassword'
                        placeholder='Nhập mật khẩu mới'
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={" text-content-text border border-primary-200 rounded-lg outline-none px-5 py-[10px] "}
                    />

                    {(formik.errors.newPassword && formik.touched.newPassword) ? <p className=" mt-2 p-1 text-red-700 italic select-none">{formik.errors.newPassword}</p> : null }
                </div>
                <div className=" flex flex-col">
                    <label 
                        htmlFor='newPassword'
                        className=" text-base font-medium mb-2"
                    >
                        Xác nhận mật khẩu mới
                    </label>

                    <input
                        type='password'
                        id='confirmNewPassword'
                        name='confirmNewPassword'
                        placeholder='Nhập mật khẩu mới'
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={" text-content-text border border-primary-200 rounded-lg outline-none px-5 py-[10px] "}
                    />

                    {(formik.errors.confirmNewPassword && formik.touched.confirmNewPassword) ? <p className=" mt-2 p-1 text-red-700 italic select-none">{formik.errors.confirmNewPassword}</p> : null }
                </div>

                <div className=" text-center">
                    <button
                        type="submit"
                        className=" w-full h-[50px] text-white font-semibold bg-primary-100 rounded-[0.625rem] mt-6 "
                    >
                        Đổi mật khẩu
                    </button>
                </div>
            </form>
        </>
    );
}

export default NewPassword;