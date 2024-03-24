import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import * as Yup from 'Yup';
import { useFormik } from 'formik';

import { AiOutlineUser } from 'react-icons/ai';
import CustomField from '../components/Field';

import BtnBot from '../../../components/BtnBot';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { BiSolidFactory } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { isJobSeeker } from '@/utils/helper';
import { Certification } from '@/types/JobSeeker';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';

import DateField from '../components/DateField';

import dayjs from 'dayjs';
import { toast } from 'react-toastify';
interface EditForm {
    handleOpen: () => void;
    open: boolean;
    certificateToEdit: any;
}
interface Values {
    name: string;
    organization: string;
    dateFrom: any;
    dateTo: any;
}
const initialValues: Values = {
    name: '',
    organization: '',
    dateFrom: '',
    dateTo: '',
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

const EditForm = ({ handleOpen, open, certificateToEdit }: EditForm) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [certification, setCertification] = useState<Certification[]>([]);
    const [changeCer, { isLoading }] = useJobseekerChangeMeMutation();
    useEffect(() => {
        if (jobSeeker) {
            setCertification(currentUser.certificate);
        }
    }, [jobSeeker, currentUser]);

    useEffect(() => {
        if (certificateToEdit) {
            let dateToValue;
            let dateFromValue;
            if (certificateToEdit.date.to) {
                const parts = certificateToEdit.date.to.split('T');
                dateToValue = parts[0];
            }

            if (certificateToEdit.date.from) {
                const parts = certificateToEdit.date.from.split('T');
                dateFromValue = parts[0];
            }
            formik.setValues({
                ...formik.values,
                name: certificateToEdit.name || '',
                organization: certificateToEdit.organization || '',
                dateFrom: dateFromValue || '',
                dateTo: dateToValue || '',
            });
        }
    }, [certificateToEdit]);

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
                const certificate: any = {
                    name: values.name,
                    organization: values.organization,
                    date: {
                        from: dateFromValue,
                        to: dateToValue,
                    },
                };

                const updatedcertificate = certification.filter((item) => item._id !== certificateToEdit._id);

                const data = [...updatedcertificate, certificate];

                const certificationData: any = {
                    certificate: data,
                };

                await changeCer(certificationData);

                const res = await changeCer(certificationData).unwrap();
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
            <DialogHeader className="px-8 bg-primary-200 text-3xl font-family-title mb:text-xl">
                Cập nhật chứng chỉ
            </DialogHeader>
            <form onSubmit={formik.handleSubmit}>
                <DialogBody divider className="flex flex-col items-center justify-center px-8">
                    <div className="flex flex-col gap-6 pb-4 mb:gap-4">
                        <CustomField
                            title="Tên giải thưởng *"
                            fieldName="name"
                            error={formik.errors.name}
                            touched={formik.touched.name}
                            icon={<AiOutlineUser />}
                            placeholder="Nhập tên giải thưởng của bạn"
                            value={formik.values.name}
                            onChange={formik.handleChange}
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
                        />

                        <div className="flex gap-8 justify-between mb:flex-col mb:gap-4">
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
                                title="Ngày kết thúc *"
                                error={formik.errors.dateTo}
                                touched={formik.touched.dateTo}
                                value={dateToValue}
                                onChange={(date: any) => {
                                    formik.setFieldValue('dateTo', date);
                                }}
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
