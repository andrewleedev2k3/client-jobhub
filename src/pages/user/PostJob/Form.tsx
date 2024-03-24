import * as Yup from 'Yup';

import { useFormik } from 'formik';

import CustomField from './Field';
import SelectSkills from './SelectSkills';
import images from '@/assets/images';
import FieldImages from './FieldImages';
import { useCreateJobMutation } from '@/services/companiesApiSlice';
import { useGetCategoriesQuery } from '@/services/categoriesApiSlice';
import { useEffect, useState } from 'react';
import SelectType from './SelectType';
import { useGetSkillsQuery } from '@/services/utilsApiSlice';
import { formatDateValue } from '@/utils/date';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers';
import Textarea from './Textarea';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '@/store/uiSlice';
import { useNavigate } from 'react-router-dom';

interface Values {
    title: string;
    description: string;
    skillsRequire: string;
    salary: string;
    jobRequire: string;
    type: string;
    photosJob: FileList | null;
    deadline: any;
    numberRecruitment: number;
}
const initialValues: Values = {
    title: '',
    description: '',
    skillsRequire: '',
    salary: '',
    jobRequire: '',
    type: '',
    photosJob: null,
    deadline: '',
    numberRecruitment: 1,
};
const validation = Yup.object().shape({
    title: Yup.string().max(100, 'Không được quá 100 kí tự!').required('Tiêu đề không được bỏ trống!'),
    numberRecruitment: Yup.number().required('Số lượng không được bỏ trống!').min(1, 'Số lượng không được nhỏ hơn 1'),
    description: Yup.string().max(1500, 'Không được quá 1500 kí tự!').required('Mô tả không được bỏ trống!'),
    jobRequire: Yup.string().max(1500, 'Không được quá 1500 kí tự!').required('Yêu cầu không được bỏ trống!'),
    skillsRequire: Yup.string().required('Kỹ năng không được bỏ trống!'),
    type: Yup.string().required('type không được bỏ trống!'),
    salary: Yup.number()
        .typeError('Lương phải là số')
        .min(1, 'Lương phải lớn hơn hoặc bằng 1')
        .max(100000000, 'Lương không được quá 100 triệu!')
        .required('Lương không được bỏ trống!'),
    deadline: Yup.date()
        .min(new Date(), 'Không được chọn ngày hôm nay và ở quá khứ!')
        .required('Thời hạn không được bỏ trống!'),
});
const FormPostJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createJob, { isLoading }] = useCreateJobMutation();
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
    const [category, setCategory] = useState<any[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [skillValue, setSkillValue] = useState<string[]>([]);
    const [cate, setCate] = useState<string>('');
    const { data: categories, isLoading: loadingCate, isError: errorCate } = useGetCategoriesQuery({});

    const { data: skillsData, isLoading: loadingSkills, isError: errorSkills } = useGetSkillsQuery(cate ? cate : '');

    useEffect(() => {
        if (!loadingCate && !errorCate && categories?.data?.data) {
            setCategory(categories?.data?.data);
        }
    }, [loadingCate, errorCate, categories?.data?.data]);

    useEffect(() => {
        if (!loadingSkills && !errorSkills && skillsData?.data?.data) {
            setSkills(skillsData?.data?.data);
        }
    }, [loadingSkills, errorSkills, skillsData?.data?.data, cate]);

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
            if (!values.deadline) {
                const today = new Date();
                today.setDate(today.getDate() + 20);
                const deadlineDate = formatDateValue(today);
                values.deadline = deadlineDate;
            } else {
                values.deadline = `${values.deadline.$y}-${values.deadline.$M + 1}-${values.deadline.$D}`;
            }
            const form = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'photosJob') {
                    if (value) {
                        for (let i = 0; i < value.length; i++) {
                            form.append('photosJob', value[i]);
                        }
                    }
                } else if (key === 'skillsRequire') {
                    form.append('skillsRequire', JSON.stringify(skillValue));
                } else {
                    form.append(key, value);
                }
            });

            try {
                setIsFormSubmitted(true);
                const res = await createJob(form).unwrap();
                setSkillValue([]);
                setIsFormSubmitted(false);
                formik.resetForm();
                if (res.status === 200) {
                    toast.success(res.data.msg);
                    navigate('/profile/company/job-created');
                }
            } catch (error: any) {
                if (error.status === 400) {
                    toast.error(error.data.msg);
                }
                if (error.status === 500) {
                    toast.error('Lỗi server!');
                }
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 w-full gap-6 mb:grid-cols-1  tb:grid-cols-1 ">
                <CustomField
                    title="Tiêu đề"
                    fieldName="title"
                    error={formik.errors.title}
                    touched={formik.touched.title}
                    icon={images.logo.user2}
                    value={formik.values.title}
                    placeholder="Nhập công việc"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <CustomField
                    title="Lương"
                    fieldName="salary"
                    error={formik.errors.salary}
                    touched={formik.touched.salary}
                    icon={images.logo.salary}
                    placeholder="Nhập lương / tháng"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <CustomField
                    title="Số lượng"
                    type="number"
                    fieldName="numberRecruitment"
                    error={formik.errors.numberRecruitment}
                    touched={formik.touched.numberRecruitment}
                    icon={images.logo.user}
                    placeholder="Nhập số lượng nhân viên muốn tuyển"
                    value={formik.values.numberRecruitment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <SelectType
                    title="Danh mục"
                    fieldName="type"
                    icon={images.logo.category}
                    options={category}
                    error={formik.errors.type}
                    touched={formik.touched.type}
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onSetCate={setCate}
                    onSetSkillValue={setSkillValue}
                />
                <div className="flex flex-col gap-2 w-full">
                    <div className="font-medium text-content-text ">
                        Thời hạn
                        <span className="ml-2 font-title text-primary-100">*</span>
                    </div>
                    <DatePicker
                        views={['year', 'month', 'day']}
                        value={formik.values.deadline}
                        onChange={(date: any) => {
                            formik.setFieldValue('deadline', date);
                        }}
                    />
                    {formik.errors.deadline && formik.touched.deadline ? (
                        <div className="text-red-700 text-sm font-semibold">
                            {typeof formik.errors.deadline === 'string'
                                ? formik.errors.deadline
                                : Object.values(formik.errors.deadline).join(', ')}
                        </div>
                    ) : null}
                </div>

                <SelectSkills
                    title="Yêu cầu kỹ năng"
                    fieldName="skillsRequire"
                    icon={images.logo.category}
                    options={skills}
                    error={formik.errors.skillsRequire}
                    touched={formik.touched.skillsRequire}
                    value={formik.values.skillsRequire}
                    onChange={formik.handleChange}
                    data={skillValue}
                    setData={setSkillValue}
                    formik={formik}
                />
            </div>
            <Textarea
                title="Mô tả"
                fieldName="description"
                placeholder="Nhập mô tả công việc"
                error={formik.errors.description}
                touched={formik.touched.description}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <Textarea
                title="Yêu cầu"
                fieldName="jobRequire"
                placeholder="Nhập yêu cầu công việc"
                error={formik.errors.jobRequire}
                touched={formik.touched.jobRequire}
                value={formik.values.jobRequire}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FieldImages formik={formik} isFormSubmitted={isFormSubmitted} />

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-1/2 mt-10 text-sm font-semibold text-white rounded-md uppercase py-3 px-8 bg-primary-100 hover:bg-black duration-300 mb:w-full"
                    disabled={isLoading || isFormSubmitted}
                >
                    {isLoading ? 'Đang đăng ...' : 'Đăng công việc'}
                </button>
            </div>
        </form>
    );
};

export default FormPostJob;
