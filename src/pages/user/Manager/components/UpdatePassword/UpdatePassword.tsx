import { useUpdateMyPasswordMutation } from '@/services/usersApiSlice';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'Yup';
import CustomField from '../Field';
import { RiLockPasswordLine } from 'react-icons/ri';
import { UpdateMyPassword } from '@/types/User';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hideLoading, showLoading } from '@/store/uiSlice';
interface Values {
    currentPassword: string;
    password: string;
    passwordConfirm: string;
}
const initialValues: Values = {
    currentPassword: '',
    password: '',
    passwordConfirm: '',
};
const validation = Yup.object().shape({
    currentPassword: Yup.string()
        .min(8, 'Mật khẩu phải trên 8 kí tự!')
        .max(30, 'Mật khẩu không quá 30 kí tự!')
        .required('Mật khẩu không được bỏ trống!'),
    password: Yup.string()
        .notOneOf([Yup.ref('currentPassword')], 'Mật khẩu mới phải khác mật khẩu cũ!')
        .min(8, 'Mật khẩu phải trên 8 kí tự!')
        .max(30, 'Mật khẩu không quá 30 kí tự!')
        .required('Mật khẩu mới không được bỏ trống!'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Mật khẩu xác nhận phải trùng khớp!')
        .min(8, 'Mật khẩu phải trên 8 kí tự!')
        .max(30, 'Mật khẩu không quá 30 kí tự!')
        .required('Xác nhận mật khẩu không được bỏ trống!'),
});
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const [updateMyPassword, { isLoading }] = useUpdateMyPasswordMutation();

    useEffect(() => {
        if (isLoading) {
            dispatch(showLoading());
            return;
        }
        dispatch(hideLoading());
    }, [isLoading]);
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                const data: UpdateMyPassword = {
                    currentPassword: values.currentPassword,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm,
                };

                const res = await updateMyPassword(data).unwrap();

                if (res.status === 200) {
                    toast.success('Đổi mật khẩu thành công!');
                }

                formik.resetForm();
            } catch (error: any) {
                if (error.status === 400) {
                    toast.error(error.data.msg);
                }
                if (error.status === 401) {
                    toast.error(error.data.msg);
                }
                if (error.status === 500) {
                    toast.error('Lỗi server');
                }
            }
        },
    });

    return (
        <div className="bg-white p-6 rounded-md font-family-text">
            <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <CustomField
                    title="Mật khẩu cũ *"
                    fieldName="currentPassword"
                    error={formik.errors.currentPassword}
                    touched={formik.touched.currentPassword}
                    icon={<RiLockPasswordLine />}
                    placeholder="Nhập khẩu cũ của bạn..."
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    showPass={true}
                    type="password"
                />
                <CustomField
                    title="Mật khẩu mới *"
                    fieldName="password"
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    icon={<RiLockPasswordLine />}
                    placeholder="Nhập mật khẩu mới..."
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    showPass={true}
                    type="password"
                />
                <CustomField
                    title="Xác nhận mật khẩu *"
                    fieldName="passwordConfirm"
                    error={formik.errors.passwordConfirm}
                    touched={formik.touched.passwordConfirm}
                    icon={<RiLockPasswordLine />}
                    placeholder="Nhập lại mật khẩu mới..."
                    value={formik.values.passwordConfirm}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    showPass={true}
                    type="password"
                />

                <button
                    className="mt-2 w-1/4 p-3 bg-primary-100 text-white font-medium rounded-lg hover:bg-black duration-300 mb:w-full tb:w-full lg:w-1/2"
                    type="submit"
                >
                    {isLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;
