import images from '@/assets/images';
import { useGetCategoriesQuery } from '@/services/categoriesApiSlice';
import Category from '@/types/Category';
import { Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import * as Yup from 'Yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
interface Values {
    title: string;

    category: string;
}
const initialValues: Values = {
    title: '',
    category: '',
};

const validation = Yup.object()
    .shape({
        title: Yup.string().max(100, 'Không được quá 100 kí tự!'),
        category: Yup.string(),
    })
    .test('hasTitleOrCategory', 'Chọn 1 trong 2 để tìm kiếm', function (value) {
        if (!value.title && !value.category) {
            return this.createError({ path: 'title', message: 'Chọn 1 trong 2 để tìm kiếm' });
        }

        return true;
    });
const Search = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category[]>([]);

    const { data: categories, isLoading: loadingCate, isError: errorCate } = useGetCategoriesQuery({});

    useEffect(() => {
        if (!loadingCate && !errorCate && categories?.data?.data) {
            setCategory(categories?.data?.data);
        }
    }, [loadingCate, errorCate, categories?.data?.data]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                let queryData;
                if (values.category && values.title) {
                    queryData = `?q=${values.title}&type=${values.category}`;
                } else if (values.title) {
                    queryData = `?q=${values.title}`;
                } else {
                    queryData = `?type=${values.category}`;
                }

                navigate(`/job-listing${queryData}`);
            } catch (error: any) {
                toast.error('Lỗi khi gửi form:', error);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex w-[65%] justify-between bg-white mt-10 items-center p-4 gap-5 rounded xl:w-[80%] lg:w-full tb:w-full mb:flex-col mb:w-full"
        >
            <div
                className={`mb:w-full lg:w-full w-[50%] flex p-4 border border-[#e9e9e9] bg-[#eff3f2] rounded ${
                    formik.errors.title && formik.touched.title && 'border-red-800 border-2'
                }`}
            >
                <img src={images.logo.jobMini} alt={images.logo.jobMini} />
                <span className="w-[2px] h-5 bg-gray-300 mx-2"></span>
                <input
                    name="title"
                    className="w-full outline-none text-black bg-[#eff3f2]"
                    type="text"
                    placeholder="Nhập tên công việc"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div
                className={`mb:w-full tb:w-[40%] lg:w-full w-[30%]  p-[1px] flex items-center justify-center  border border-[#e9e9e9] bg-[#eff3f2] rounded ${
                    formik.errors.title && formik.touched.title && 'border-red-800 border-2'
                }`}
            >
                <img className="py-5 pl-5" src={images.logo.category} alt={images.logo.category} />
                <span className="w-[2px] h-5 bg-gray-300 mx-2"></span>
                <div className="w-full ">
                    <Select
                        name="category"
                        variant="standard"
                        className="select w-full h-[48px]  text-content-s-text items-center"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {category.map((cate, index) => (
                            <MenuItem key={index} value={cate.id}>
                                {cate.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            <button
                type="submit"
                className="group relative rounded   py-4 px-7 text-lg font-medium  bg-primary-100 hover:bg-black duration-300 mb:py-3"
            >
                <div className="absolute rounded inset-0 w-0 bg-black transition-all duration-300 ease-out group-hover:w-full"></div>

                <div className="relative flex justify-between items-center">
                    <img className="mr-2" src={images.logo.search} alt={images.logo.search} /> Tìm
                </div>
            </button>
        </form>
    );
};

export default Search;
