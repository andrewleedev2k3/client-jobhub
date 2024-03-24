import * as Yup from 'Yup';

import { useFormik } from 'formik';
import CustomField from '../components/Field';
import { AiOutlineUser } from 'react-icons/ai';
import { BiSolidFactory } from 'react-icons/bi';
import BtnBot from '../../../components/BtnBot';
import { RootState } from '@/store/store';
import { Certification } from '@/types/JobSeeker';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import { isJobSeeker } from '@/utils/helper';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TipForm from '../components/TipForm';
import DateField from '../components/DateField';
import { toast } from 'react-toastify';

interface FormCer {
    toggleOpen: () => void;
}

interface Values {
    name: string;
    organization: string;
    dateFrom: any;
    dateTo: any;
    isWorking: boolean;
}
const initialValues: Values = {
    name: '',
    organization: '',
    dateFrom: '',
    dateTo: '',
    isWorking: false,
};
const validation = Yup.object().shape({
    name: Yup.string().required('Tên giải thưởng không được bỏ trống!'),
    organization: Yup.string().required('Tổ chức không được bỏ trống!'),
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
    dateTo: Yup.date()
        .required('Ngày không được bỏ trống!')
        .test('date-range', 'Không được chọn ngày ở tương lai!', function (value) {
            const { dateTo } = this.parent;
            if (!dateTo) {
                return true;
            }
            const dataNow = new Date();
            const date = new Date(value);

            return date <= dataNow;
        })
        .test('date-range', 'Ngày phải lớn hơn ngày bắt đầu', function (value) {
            const { dateFrom } = this.parent;
            if (!dateFrom) {
                return true;
            }
            return new Date(value) >= new Date(dateFrom);
        }),
});
const FormCer = ({ toggleOpen }: FormCer) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [certification, setCertification] = useState<Certification[]>([]);
    useEffect(() => {
        if (isJobSeeker(currentUser)) {
            setCertification(currentUser.certificate);
        }
    }, [currentUser]);

    const [changeCertification, { isLoading }] = useJobseekerChangeMeMutation();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                const dateFrom = `${values.dateFrom.$y}-${values.dateFrom.$M + 1}`;

                const dateTo = `${values.dateTo.$y}-${values.dateTo.$M + 1}`;
                const certificate: any = {
                    date: {
                        from: dateFrom,
                        to: dateTo,
                    },
                    name: values.name,
                    organization: values.organization,
                };

                const data = [...certification, certificate];

                const certificationData: any = {
                    certificate: data,
                };

                const res = await changeCertification(certificationData).unwrap();
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
            <TipForm title="Mô tả thành tựu cụ thể, những kết quả và thành tựu đạt được có số liệu dẫn chứng" />

            <div className="flex flex-col gap-6 border-b-2 pb-5 mb:gap-4 ">
                <CustomField
                    title="Tên giải thưởng *"
                    fieldName="name"
                    error={formik.errors.name}
                    touched={formik.touched.name}
                    icon={<AiOutlineUser />}
                    placeholder="Nhập tên giải thưởng của bạn"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <CustomField
                    title="Tổ chức *"
                    fieldName="organization"
                    error={formik.errors.organization}
                    touched={formik.touched.organization}
                    icon={<BiSolidFactory />}
                    placeholder="Nhập tổ chức của bạn"
                    value={formik.values.organization}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                        title="Ngày kết thúc *"
                        error={formik.errors.dateTo}
                        touched={formik.touched.dateTo}
                        value={formik.values.dateTo}
                        onChange={(date: any) => {
                            formik.setFieldValue('dateTo', date);
                        }}
                    />
                </div>
            </div>

            <BtnBot toggleOpen={toggleOpen} isLoading={isLoading} />
        </form>
    );
};

export default FormCer;
