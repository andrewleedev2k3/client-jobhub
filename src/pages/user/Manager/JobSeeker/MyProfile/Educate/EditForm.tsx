import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import * as Yup from 'Yup';
import { useFormik } from 'formik';
import Checkbox from '@mui/material/Checkbox';

import CustomField from '../components/Field';

import BtnBot from '../../../components/BtnBot';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { BiSolidFactory } from 'react-icons/bi';
import { FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { isJobSeeker } from '@/utils/helper';
import { Education } from '@/types/JobSeeker';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import { FaSchool } from 'react-icons/fa';
import DateField from '../components/DateField';

import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';

interface EditForm {
    handleOpen: () => void;
    open: boolean;
    educateToEdit: any;
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
const EditForm = ({ handleOpen, open, educateToEdit }: EditForm) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [education, setExp] = useState<Education[]>([]);
    const [changeEdu, { isLoading }] = useJobseekerChangeMeMutation();
    useEffect(() => {
        if (jobSeeker) {
            setExp(currentUser.educate);
        }
    }, [jobSeeker, currentUser]);

    useEffect(() => {
        if (educateToEdit) {
            let dateToValue;
            let dateFromValue;
            if (educateToEdit.date.to) {
                const parts = educateToEdit.date.to.split('T');
                dateToValue = parts[0];
            }

            if (educateToEdit.date.from) {
                const parts = educateToEdit.date.from.split('T');
                dateFromValue = parts[0];
            }

            formik.setValues({
                ...formik.values,
                major: educateToEdit.major || '',
                school: educateToEdit.school || '',
                dateFrom: dateFromValue || '',
                dateTo: dateToValue || '',
                isLearning: educateToEdit.isLearning,
            });
        }
    }, [educateToEdit]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                let dateFromValue;

                if (values.dateFrom.$y && values.dateFrom.$M) {
                    dateFromValue = `${values.dateFrom.$y}-${values.dateFrom.$M + 1}`;
                } else {
                    dateFromValue = values.dateFrom;
                }

                let dateToValue;

                if (values.dateTo.$y && values.dateTo.$M) {
                    dateToValue = `${values.dateTo.$y}-${values.dateTo.$M + 1}`;
                } else {
                    dateToValue = values.dateTo;
                }
                const edu: any = {
                    major: values.major,
                    school: values.school,
                    isWorking: values.isLearning,
                };

                if (values.isLearning) {
                    edu.date = {
                        from: dateFromValue,
                    };
                } else {
                    edu.date = {
                        from: dateFromValue,
                        to: dateToValue,
                    };
                }

                const updatedEdu = education.filter((edu) => edu._id !== educateToEdit._id);

                const data = [...updatedEdu, edu];

                const eduData: any = {
                    educate: data,
                };

                const res = await changeEdu(eduData).unwrap();
                if (res.status === 200) {
                    toast.success(res.data.msg);
                }
                formik.resetForm();
                handleOpen();
            } catch (error: any) {
                if (error.status === 400) {
                    toast.error(error.data.msg);
                }
            }
        },
    });

    const dateFromValue: any = dayjs(formik.values.dateFrom);
    const dateToValue: any = dayjs(formik.values.dateTo);

    return (
        <Dialog size="lg" open={open} handler={handleOpen} className="overflow-y-auto max-h-screen">
            {isLoading && <Loader />}
            <DialogHeader className="px-8 bg-primary-200 text-3xl font-family-title mb:text-xl">
                Cập nhật học vấn
            </DialogHeader>
            <form onSubmit={formik.handleSubmit}>
                <DialogBody divider className="flex flex-col items-center justify-center gap-4 px-8">
                    <div className="flex flex-col gap-6 pb-4 mb:gap-4">
                        <CustomField
                            title="Trường *"
                            fieldName="school"
                            error={formik.errors.school}
                            touched={formik.touched.school}
                            icon={<FaSchool />}
                            placeholder="Nhập trường của bạn"
                            value={formik.values.school}
                            onChange={formik.handleChange}
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
                        />

                        <FormControlLabel
                            control={<Checkbox checked={formik.values.isLearning} />}
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

                        <div className="flex gap-8 justify-between mb:flex-col tb:flex-col mb:gap-4">
                            <DateField
                                title="Ngày bắt đầu *"
                                error={formik.errors.dateFrom}
                                touched={formik.touched.dateFrom}
                                value={dateFromValue}
                                onChange={(date: any) => {
                                    formik.setFieldValue('dateFrom', date);
                                }}
                            />

                            <DateField
                                title="Ngày kết thúc"
                                error={formik.errors.dateTo}
                                touched={formik.touched.dateTo}
                                value={dateToValue}
                                onChange={(date: any) => {
                                    formik.setFieldValue('dateTo', date);
                                }}
                                disabled={formik.values.isLearning}
                            />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="px-8">
                    <BtnBot isLoading={isLoading} toggleOpen={handleOpen} />
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default EditForm;
