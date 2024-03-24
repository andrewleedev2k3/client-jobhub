import { Link, useNavigate } from 'react-router-dom';
import { RegisterJobseekerRequest, useRegisterJobseekerMutation } from '@/services/authApiSlice';
import { useFormik } from 'formik';
import * as Yup from 'Yup';
import { EMAILREGEX, PHONEREGEX } from '@/constants/regex';
import { useDispatch } from 'react-redux';
import Fields from './components/Fields/Fields';
import Loader from '@/components/Loader/Loader';
import { toast } from 'react-toastify';
import { setCurrentUser, setcredentialsToken } from '@/store/userSlice';
import { setToken } from '@/utils/storage';
import { useLayoutEffect, useState } from "react";
import { District } from "@/types/Location";
import SelectDistrict from "./components/SelectDistrict/SelectDistrict";
import SelectCity from "./components/SelectCity/SelectCity";
import TextArea from './components/Textarea/Textarea';

const initialValues = {
    type: 'jobseeker',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    district: '',
    phoneNumber: '',
    introduce: '',
    password: '',
    passwordConfirm: ''
}

function RegisterJobseeker() {

    const [registerJobseeker, {isLoading: isLoadingSignup}] = useRegisterJobseekerMutation();

    const [district, setDistrict] = useState<District[]>([])
    
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            firstName: Yup.string().required('Họ không được để trống').min(2, 'Họ phải tối thiểu 2 kí tự').max(30, 'Họ chỉ tối đa 30 kí tự'),
            lastName: Yup.string().required('Tên không được để trống').min(2, 'Tên phải tối thiểu 2 kí tự').max(30, 'Tên chỉ tối đa 30 kí tự'),
            email: Yup.string().required('Email không được để trống').matches(EMAILREGEX, 'Email phải đúng định dạng'),
            address: Yup.string().required('Địa chỉ không được để trống'),
            city: Yup.string().required('Tỉnh, thành không được để trống'),
            district: Yup.string().required('Quận, huyện không được để trống'),
            phoneNumber: Yup.string().required('Số điện thoại không được để trống').matches(PHONEREGEX, 'Số điện thoại phải đúng định dạng'),
            introduce: Yup.string().max(1500, 'Giới thiệu chỉ tối đa 1500 kí tự'),
            password: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
            passwordConfirm: Yup.string().required('Nhập lại mật khẩu không được để trống').oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
        }),
        onSubmit: async (values) => {
            const myValue = {
                type: values.type,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                location: {
                    city: values.city,
                    district: values.district,
                    address: values.address,
                },
                phoneNumber: values.phoneNumber,
                introduce: values.introduce,
                password: values.password,
                passwordConfirm: values.passwordConfirm
            } as RegisterJobseekerRequest
            try {
                const response = await registerJobseeker(myValue).unwrap();
                if(response.status === 201) {
                    toast.success(response.data.msg)
                    const user = response.data.data;
                    const accessToken = response.data.accessToken;
                    if(user && accessToken) {
                        dispatch(setCurrentUser(user));
                        dispatch(setcredentialsToken(accessToken));
                        setToken(accessToken);
                    }
                    navigate('/job-listing')
                }
            } catch (error:any) {
                if(error?.status === 400) {
                    toast.error('Email này đã được sử dụng. Vui lòng sử dụng email khác!')
                } else {
                    toast.error('Lỗi đăng ký.')
                }
            }
        },
    })

    useLayoutEffect(() => {
        scrollTo(0, 0)
    }, [])

    return (
        <>
            {isLoadingSignup && <Loader />}
            <div className=' w-full font-family-text bg-gradient-to-r from-[#00032d] to-[#103185] py-20'>
                <div className=' flex flex-col w-[900px] mx-auto duration-300 xl:w-[700px] lg:w-[550px] tb:w-[450px] mb:w-[350px]'>
                    <h1 className=' text-center font-family-title text-primary-100 font-semibold text-3xl mb-4'>Đăng ký (Người tìm việc)</h1>
                    <div className=' w-full h-auto bg-white rounded-xl p-[40px]'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className=" flex flex-wrap">
                                <Fields
                                    isRequire={true}
                                    type='text'
                                    label='Họ'
                                    id='firstName'
                                    name='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.firstName}
                                    touched={formik.touched.firstName}
                                    placeholder="Nhập họ"
                                />
                                <Fields
                                    isRequire={true}
                                    type='text'
                                    label='Tên'
                                    id='lastName'
                                    name='lastName'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.lastName}
                                    touched={formik.touched.lastName}
                                    placeholder="Nhập tên"
                                />
                                <Fields
                                    isRequire={true}
                                    type='text'
                                    label='Email'
                                    id='email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.email}
                                    touched={formik.touched.email}
                                    placeholder="Nhập email"
                                />
                                <Fields
                                    isRequire={true}
                                    type='text'
                                    label='Số điện thoại'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.phoneNumber}
                                    touched={formik.touched.phoneNumber}
                                    placeholder="Nhập số điện thoại"
                                />
                                <SelectCity
                                    isRequire={true}
                                    label='Chọn tỉnh, thành'
                                    id='city'
                                    name='city'
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.city}
                                    touched={formik.touched.city}
                                    districtByCity={setDistrict}
                                />
                                <SelectDistrict
                                    isRequire={true}
                                    label='Chọn quận, huyện'
                                    id='district'
                                    name='district'
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.district}
                                    touched={formik.touched.district}
                                    districtList={district}
                                />
                                <Fields
                                    isRequire={true}
                                    type='text'
                                    label='Địa chỉ'
                                    id='address'
                                    name='address'
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.address}
                                    touched={formik.touched.address}
                                    placeholder="Nhập phần địa chỉ"
                                />
                                <Fields
                                    isRequire={true}
                                    type='password'
                                    label='Mật khẩu'
                                    id='password'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.password}
                                    touched={formik.touched.password}
                                    placeholder="Nhập mật khẩu"
                                />
                                <Fields
                                    isRequire={true}
                                    type='password'
                                    label='Nhập lại mật khẩu'
                                    id='passwordConfirm'
                                    name='passwordConfirm'
                                    value={formik.values.passwordConfirm}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.passwordConfirm}
                                    touched={formik.touched.passwordConfirm}
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <TextArea
                                    isRequire={false}
                                    label='Giới thiệu'
                                    id='introduce'
                                    name='introduce'
                                    value={formik.values.introduce}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.introduce}
                                    touched={formik.touched.introduce}
                                    placeholder="Nhập phần giới thiệu"
                                />
                            </div>
                            <div className=" flex flex-col p-2 tb:flex-col mb:flex-col ">
                                <div className=" text-center">
                                    <button
                                        type="submit"
                                        className=" w-full h-[50px] text-white text-lg font-semibold bg-primary-100 rounded-[0.625rem] mt-6 mb-4"
                                    >
                                        Đăng Ký
                                    </button>
                                </div>
                                <div className=" flex items-center justify-start mb-4">
                                    <p>Bạn đã có tài khoản?</p>
                                    <Link to="/login" className=" font-medium ml-1.5 duration-300 cursor-pointer hover:text-primary-100">
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterJobseeker;