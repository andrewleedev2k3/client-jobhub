import { useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/services/authApiSlice';
import { setToken } from '@/utils/storage';
import { setCurrentUser, setcredentialsToken } from '@/store/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'Yup';
import Fields from './Fields/Fields';
import Loader from '@/components/Loader/Loader';
import { EMAILREGEX } from '@/constants/regex';
import { toast } from 'react-toastify';

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email không được để trống').matches(EMAILREGEX, 'Email phải đúng định dạng'),
            password: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await login(values).unwrap();
                if (response?.status === 200) {
                    toast.success(response.data.msg);
                    const user = response.data.data;
                    const accessToken = response.data.accessToken;
                    if (user && accessToken) {
                        dispatch(setCurrentUser(user));
                        dispatch(setcredentialsToken(accessToken));
                        setToken(accessToken);
                        if(user.role === 'admin') {
                            navigate('/admin')
                        } else {
                            navigate(-1);
                        }
                    }
                }
            } catch (error: any) {
                toast.error(error.data.msg);
            }
        },
    });

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            <div className=" w-full min-h-screen font-family-text bg-gradient-to-r from-[#00032d] to-[#103185] py-20 tb:text-sm mb:text-sm">
                <div className=" flex flex-col w-[550px] mx-auto duration-300 xl:w-[500px] lg:w-[450px] tb:w-[400px] mb:w-[350px]">
                    <h1 className=" text-center font-family-title text-primary-100 font-semibold text-3xl mb-4">
                        Đăng nhập
                    </h1>
                    <div className=" w-full h-auto bg-white rounded-xl p-[40px]">
                        <form onSubmit={formik.handleSubmit}>
                            <Fields
                                type="text"
                                label="Email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.email}
                                touched={formik.touched.email}
                                placeholder="info@example.com"
                            />
                            <Fields
                                type="password"
                                label="Mật khẩu"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.password}
                                touched={formik.touched.password}
                                placeholder="Nhập mật khẩu"
                            />
                            <div className=" flex flex-col ">
                                <div className=" flex items-center justify-end mt-2">
                                    <Link to={'/forgot-password'} className=" font-medium duration-300 cursor-pointer hover:text-primary-100">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <div className=" text-center">
                                    <button
                                        type="submit"
                                        className=" w-full h-[50px] text-white font-semibold bg-primary-100 rounded-[0.625rem] mt-6 mb-4"
                                    >
                                        Đăng Nhập
                                    </button>
                                </div>
                                <div className=" flex items-center justify-start mb-4 tb:text-sm mb:text-sm">
                                    <p>Bạn chưa có tài khoản?</p>
                                    <Link
                                        to="/register/jobseeker"
                                        className=" font-medium ml-1.5 duration-300 cursor-pointer hover:text-primary-100"
                                    >
                                        Đăng ký ngay
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
