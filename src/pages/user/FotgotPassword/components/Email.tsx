import { useFormik } from 'formik';
import * as Yup from 'Yup';
import { toast } from 'react-toastify';
import { EMAILREGEX } from '@/constants/regex';
import { useForgotPasswordMutation } from '@/services/authApiSlice';
import Loader from '@/components/Loader/Loader';

type EmailProps = {
    changePage: (page: 'email' | 'otp' | 'newPassword') => void;
    handleEmail: (email: string) => void;
};
function Email({ changePage, handleEmail }: EmailProps) {
    const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Không được để trống').matches(EMAILREGEX, 'Email phải đúng định dạng'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await ForgotPassword(values).unwrap();
                if (response) {
                    toast.success(response.data.msg);
                    handleEmail(values.email);
                    changePage('otp');
                }
            } catch (error: any) {
                toast.error(error.data.msg);
            }
        },
    });
    return (
        <>
            {isLoading && <Loader />}
            <form onSubmit={formik.handleSubmit} className=" flex flex-col mb-4">
                <label htmlFor="email" className=" text-base font-medium mb-2">
                    Email
                </label>

                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={' text-content-text border border-primary-200 rounded-lg outline-none px-5 py-[10px] '}
                />

                {formik.errors.email && formik.touched.email ? (
                    <p className=" mt-2 p-1 text-red-700 italic select-none">{formik.errors.email}</p>
                ) : null}
                <div className=" text-center">
                    <button
                        type="submit"
                        className=" w-full h-[50px] text-white font-semibold bg-primary-100 rounded-[0.625rem] mt-6 "
                    >
                        Gửi mã OTP
                    </button>
                </div>
            </form>
        </>
    );
}

export default Email;
