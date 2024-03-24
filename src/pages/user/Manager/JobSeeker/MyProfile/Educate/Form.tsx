import * as Yup from 'Yup';

import { useFormik } from 'formik';
import CustomField from '../components/Field';
import { FaSchool } from 'react-icons/fa';
import { BiSolidFactory } from 'react-icons/bi';
import BtnBot from '../../../components/BtnBot';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import { isJobSeeker } from '@/utils/helper';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Education } from '@/types/JobSeeker';
import DateField from '../components/DateField';
import TipForm from '../components/TipForm';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';
interface FormEducation {
    toggleOpen: () => void;
}

interface Values {
    school: string;
    major: string;
    dateFrom: any;
    dateTo: any;

    isLearning: boolean;
}
const initialValues: Values = {
    school: '',
    major: '',
    dateFrom: '',
    dateTo: '',
    isLearning: false,
};
const validation = Yup.object().shape({
    school: Yup.string().required('Trường học không được bỏ trống!'),
    major: Yup.string().required('Ngành học không được bỏ trống!'),
    dateFrom: Yup.date()
        .required('Ngày không được bỏ trống!')
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
const FormEducation = ({ toggleOpen }: FormEducation) => {
    const currentUser = useSelector((state: RootState) => state?.user?.user);
    const [education, setEducation] = useState<Education[]>([]);
    useEffect(() => {
        if (isJobSeeker(currentUser)) {
            setEducation(currentUser.educate);
        }
    }, [currentUser]);

    const [changeEducation, { isLoading }] = useJobseekerChangeMeMutation();

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

                const educate: any = {
                    date: {
                        from: dateFrom,
                        to: dateTo,
                    },
                    major: values.major,
                    school: values.school,
                    isLearning: values.isLearning,
                };

                if (values.isLearning) {
                    educate.date = {
                        from: dateFrom,
                    };
                } else {
                    educate.date = {
                        from: dateFrom,
                        to: dateTo,
                    };
                }

                const data = [...education, educate];

                const eduData: any = {
                    educate: data,
                };

                const res = await changeEducation(eduData).unwrap();
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
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 border-t-2 pt-5">
            {isLoading && <Loader />}
            <TipForm title="Cập nhật thông tin của bạn một cách chính xác!" />

            <div className="flex flex-col gap-6 border-b-2 pb-5 mb:gap-4">
                <CustomField
                    title="Trường *"
                    fieldName="school"
                    error={formik.errors.school}
                    touched={formik.touched.school}
                    icon={<FaSchool />}
                    placeholder="Nhập trường của bạn"
                    value={formik.values.school}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <CustomField
                    title="Ngành học *"
                    fieldName="major"
                    error={formik.errors.major}
                    touched={formik.touched.major}
                    icon={<BiSolidFactory />}
                    placeholder="Nhập ngành học của bạn"
                    value={formik.values.major}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    name="isLearning"
                    label="Tôi đang học tập tại đây"
                    value={formik.values.isLearning}
                    onChange={(e: any) => {
                        const isLearning = e.target.checked;
                        if (isLearning) {
                            formik.setFieldValue('dateTo', '');
                        }
                        formik.setFieldValue('isLearning', isLearning);
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
                        disabled={formik.values.isLearning}
                    />
                </div>
            </div>

            <BtnBot toggleOpen={toggleOpen} isLoading={isLoading} />
        </form>
    );
};

export default FormEducation;
