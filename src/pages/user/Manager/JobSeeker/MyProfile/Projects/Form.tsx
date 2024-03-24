import * as Yup from 'Yup';
import { useFormik } from 'formik';
import CustomField from '../components/Field';
import { AiOutlineUser } from 'react-icons/ai';
import { PiBracketsCurlyBold } from 'react-icons/pi';
import { FaAudioDescription } from 'react-icons/fa';

import BtnBot from '../../../components/BtnBot';
import { RootState } from '@/store/store';
import { Project } from '@/types/JobSeeker';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import { isJobSeeker } from '@/utils/helper';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel } from '@mui/material';
import DateField from '../components/DateField';
import TipForm from '../components/TipForm';
import { toast } from 'react-toastify';
interface FormProject {
    toggleOpen: () => void;
}

interface Values {
    name: string;
    url: string;
    description: string;
    dateFrom: any;
    dateTo: any;
    isWorking: boolean;
}
const initialValues: Values = {
    name: '',
    url: '',
    description: '',
    dateFrom: '',
    dateTo: '',
    isWorking: false,
};
const validation = Yup.object().shape({
    name: Yup.string().required('Tên không được bỏ trống!'),
    description: Yup.string().required('Mô tả không được bỏ trống!'),
    url: Yup.string().required('URL không được bỏ trống!'),
    dateFrom: Yup.date()
        .required('Ngày bắt đầu không được bỏ trống!')
        .test('date-range', 'Không được chọn ngày ở tương lai!', function (value) {
            const { dateFrom } = this.parent;
            if (!dateFrom) {
                return true;
            }
            const dataNow = new Date();
            const date = new Date(value);

            return date <= dataNow;
        })
        .test('date-range', 'Ngày phải nhỏ hơn ngày kết thúc', function (value) {
            const { dateTo } = this.parent;
            if (!dateTo) {
                return true;
            }
            const date = new Date(value);

            return date <= new Date(dateTo);
        }),
    dateTo: Yup.date().test('date-range', 'Không được chọn ngày ở tương lai!', function (value) {
        const { dateTo } = this.parent;
        let date;
        if (!dateTo) {
            return true;
        }
        const dataNow = new Date();
        if (value) {
            date = new Date(value);
        }
        if (date) {
            return date <= dataNow;
        }
        return;
    }),
});
const FormProject = ({ toggleOpen }: FormProject) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        if (isJobSeeker(currentUser)) {
            setProjects(currentUser.projects);
        }
    }, [currentUser]);

    const [changeProjects, { isLoading }] = useJobseekerChangeMeMutation();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                const dateFrom = `${values.dateFrom.$y}-${values.dateFrom.$M + 1}`;

                let dateTo;

                if (values.dateTo) {
                    dateTo = `${values.dateTo.$y}-${values.dateTo.$M + 1}`;
                }
                const project: any = {
                    name: values.name,
                    description: values.description,
                    url: values.url,
                    isWorking: values.isWorking,
                };

                if (values.isWorking) {
                    project.date = {
                        from: dateFrom,
                    };
                } else {
                    project.date = {
                        from: dateFrom,
                        to: dateTo,
                    };
                }

                const data = [...projects, project];

                const projectData: any = {
                    projects: data,
                };

                const res = await changeProjects(projectData).unwrap();
                if (res.status === 200) {
                    toast.success(res.data.msg);
                }
                formik.resetForm();
                toggleOpen();
            } catch (error: any) {
                if (error.status === 400) {
                    toast.error(error.data.msg);
                }
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 border-t-[1px] border-gray-600 pt-5">
            <TipForm title="Mô tả công việc cụ thể, những kết quả và thành tựu đạt được có số liệu dẫn chứng" />

            <div className="flex flex-col gap-6 border-b-2 pb-5 mb:gap-4">
                <CustomField
                    title="Tên dự án *"
                    fieldName="name"
                    error={formik.errors.name}
                    touched={formik.touched.name}
                    icon={<AiOutlineUser />}
                    placeholder="Nhập họ của bạn"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    name="isWorking"
                    label="Tôi đang làm dự án này"
                    value={formik.values.isWorking}
                    onChange={(e: any) => {
                        const isWorking = e.target.checked;
                        if (isWorking) {
                            formik.setFieldValue('dateTo', '');
                        }
                        formik.setFieldValue('isWorking', isWorking);
                    }}
                />
                <div className="flex gap-8 justify-between mb:gap-4 mb:flex-col">
                    <DateField
                        title="Ngày bắt đầu *"
                        error={formik.errors.dateFrom}
                        touched={formik.touched.dateFrom}
                        value={formik.values.dateFrom}
                        onChange={(date: any) => {
                            formik.setFieldValue('dateFrom', date);
                        }}
                    />

                    <DateField
                        title="Ngày kết thúc"
                        error={formik.errors.dateTo}
                        touched={formik.touched.dateTo}
                        value={formik.values.dateTo}
                        onChange={(date: any) => {
                            formik.setFieldValue('dateTo', date);
                        }}
                        disabled={formik.values.isWorking}
                    />
                </div>
                <CustomField
                    title="Mô tả *"
                    fieldName="description"
                    error={formik.errors.description}
                    touched={formik.touched.description}
                    icon={<FaAudioDescription />}
                    placeholder="Nhập chi tiết dự án của bạn"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <CustomField
                    title="Link dự án *"
                    fieldName="url"
                    error={formik.errors.url}
                    touched={formik.touched.url}
                    icon={<PiBracketsCurlyBold />}
                    placeholder="Nhập url website của bạn"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>

            <BtnBot toggleOpen={toggleOpen} isLoading={isLoading} />
        </form>
    );
};

export default FormProject;
