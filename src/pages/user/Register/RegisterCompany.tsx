import { Link, useNavigate } from 'react-router-dom';
import { RegisterCompanyRequest, useRegisterCompanyMutation } from '@/services/authApiSlice';
import { useFormik } from 'formik';
import * as Yup from 'Yup';
import { EMAILREGEX, PHONEREGEX } from '@/constants/regex';
import { setCurrentUser, setcredentialsToken } from '@/store/userSlice';
import { setToken } from '@/utils/storage';
import Loader from '@/components/Loader/Loader';
import Fields from './components/Fields/Fields';
import SelectCity from './components/SelectCity/SelectCity';
import SelectDate from './components/SelectDate/SelectDate';
import SelectDistrict from './components/SelectDistrict/SelectDistrict';
import { toast } from 'react-toastify';
import { useLayoutEffect, useState } from 'react';
import { District } from '@/types/Location';
import TextArea from './components/Textarea/Textarea';

const initialValues = {
    type: 'company',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    district: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
    companyName: '',
    description: '',
    establishDate: new Date(),
    companySizeFrom: '',
    companySizeTo: '',
};
function RegisterCompany() {
    const [RegisterCompany, { isLoading: isLoadingRegister }] = useRegisterCompanyMutation();

    const [district, setDistrict] = useState<District[]>([])

    const navigate = useNavigate();

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
            companyName: Yup.string().required('Tên công ty không được để trống').min(2, 'Tên công ty phải tối thiểu 2 kí tự').max(100, 'Tên công ty chỉ tối đa 100 kí tự'),
            description: Yup.string().max(1500, 'Mô tả chỉ tối đa 1500 kí tự'),
            EstablishDate: Yup.date().typeError('Hãy chọn ngày thành lập'),
            companySizeFrom: Yup.number().typeError('Chỉ được nhập số').required('companysizefrom không được để trống').min(1, 'Số lượng bắt đầu quy mô công ty phải có ít nhất 1 người'),
            companySizeTo: Yup.number().typeError('Chỉ được nhập số').required('companysizeto không được để trống').moreThan(Yup.ref('companySizeFrom'), 'Phải ít hơn số lượng trước'),
            password: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
            passwordConfirm: Yup.string().required('Nhập lại mật khẩu không được để trống').oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
        }),
        onSubmit: async (values) => {
            try {
                const myValues = {
                    type: values.type,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    location: {
                        address: values.address,
                        city: values.city,
                        district: values.district,
                    },
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm,
                    companyName: values.companyName,
                    description: values.description,
                    establishDate: values.establishDate,
                    companySize: {
                        from: values.companySizeFrom,
                        to: values.companySizeTo,
                    },
                } as RegisterCompanyRequest;
                const response = await RegisterCompany(myValues).unwrap();
                if(response) {
                    toast.success(response.data.msg)
                    const user = response.data.data;
                    const accessToken = response.data.accessToken;
                    if (user && accessToken) {
                        setToken(accessToken);
                        setcredentialsToken(accessToken)
                        setCurrentUser(user)
                        navigate('/profile')
                    }
                }
            } catch (error:any) {
                if(error?.status === 400) {
                    toast.error('Email này đã được sử dụng. Vui lòng sử dụng email khác!')
                } else {
                    toast.error('Lỗi đăng ký.')
                }
            }
        },
    });

    useLayoutEffect(() => {
        scrollTo(0, 0)
    }, [])

    return (
        <>
            {isLoadingRegister && <Loader />}
            <div className=' w-full font-family-text bg-gradient-to-r from-[#00032d] to-[#103185] py-20'>
                <div className=' flex flex-col w-[900px] mx-auto duration-300 xl:w-[700px] lg:w-[550px] tb:w-[450px] mb:w-[350px]'>
                    <h1 className=' text-center font-family-title text-primary-100 font-semibold text-3xl mb-4'>Đăng ký (Công ty)</h1>
                    <div className=' w-full h-auto bg-white rounded-xl p-[40px]'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-wrap mt-4 tb:flex-col mb:flex-col ">
                                <Fields
                                    isRequire={true}
                                    type="text"
                                    label="Họ"
                                    id="firstName"
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.firstName}
                                    touched={formik.touched.firstName}
                                    placeholder="Nhập họ"
                                />
                                <Fields
                                    isRequire={true}
                                    type="text"
                                    label="Tên"
                                    id="lastName"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.lastName}
                                    touched={formik.touched.lastName}
                                    placeholder="Nhập tên"
                                />
                                <Fields
                                    isRequire={true}
                                    type="text"
                                    label="Email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.email}
                                    touched={formik.touched.email}
                                    placeholder="Nhập email"
                                />
                                <Fields
                                    isRequire={true}
                                    type="text"
                                    label="Số điện thoại"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.phoneNumber}
                                    touched={formik.touched.phoneNumber}
                                    placeholder="Nhập số điện thoại"
                                />
                                <Fields
                                    isRequire={true}
                                    type="text"
                                    label="Tên công ty"
                                    id="companyName"
                                    name="companyName"
                                    value={formik.values.companyName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.companyName}
                                    touched={formik.touched.companyName}
                                    placeholder="Nhập tên công ty"
                                />
                                <Fields
                                    isRequire={true}
                                    type="number"
                                    label="Quy mô (từ)"
                                    id="companySizeFrom"
                                    name="companySizeFrom"
                                    value={formik.values.companySizeFrom}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.companySizeFrom}
                                    touched={formik.touched.companySizeFrom}
                                    placeholder="Nhập số lượng thành viên ít nhất"
                                />
                                <Fields
                                    isRequire={true}
                                    type="number"
                                    label="Quy mô (đến)"
                                    id="companySizeTo"
                                    name="companySizeTo"
                                    value={formik.values.companySizeTo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.companySizeTo}
                                    touched={formik.touched.companySizeTo}
                                    placeholder="Nhập số lượng thành viên nhiều nhất"
                                />
                                <SelectCity
                                    isRequire={true}
                                    label="Chọn tỉnh, thành"
                                    id="city"
                                    name="city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.city}
                                    touched={formik.touched.city}
                                    districtByCity={setDistrict}
                                />
                                <SelectDistrict
                                    isRequire={true}
                                    label="Chọn quận, huyện"
                                    id="district"
                                    name="district"
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.district}
                                    touched={formik.touched.district}
                                    districtList={district}
                                />
                                <Fields
                                    isRequire={true}
                                    type="text"
                                    label="Địa chỉ"
                                    id="address"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.address}
                                    touched={formik.touched.address}
                                    placeholder="Nhập địa chỉ"
                                />
                                <SelectDate
                                    isRequire={true}
                                    label="Ngày thành lập"
                                    id="establishDate"
                                    value={formik.values.establishDate}
                                    onChange={formik.setFieldValue}
                                    error={formik.errors.establishDate}
                                    touched={formik.touched.establishDate}
                                />
                                <Fields
                                    isRequire={true}
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
                                <Fields
                                    isRequire={true}
                                    type="password"
                                    label="Xác nhận mật khẩu"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={formik.values.passwordConfirm}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.passwordConfirm}
                                    touched={formik.touched.passwordConfirm}
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <TextArea
                                    isRequire={false}
                                    label="Mô tả công ty"
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.description}
                                    touched={formik.touched.description}
                                    placeholder="Nhập mô tả công ty"
                                />
                            </div>
                            <div className=" flex flex-col p-2 ">
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

export default RegisterCompany;