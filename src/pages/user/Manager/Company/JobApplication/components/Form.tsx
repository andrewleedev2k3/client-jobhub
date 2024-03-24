import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import * as Yup from 'Yup';
import { useFormik } from 'formik';
import BtnBot from '../../../components/BtnBot';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useAcceptJobMutation } from '@/services/companiesApiSlice';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';

interface FormAcceptJob {
    handleOpen: () => void;
    open: boolean;
    id: string;
}

interface Values {
    interviewDate: any;
    interviewTime: any;
}
const initialValues: Values = {
    interviewDate: '',
    interviewTime: '',
};
const validation = Yup.object().shape({
    interviewDate: Yup.date()
        .min(new Date(), 'Không được chọn ngày hôm nay và ở quá khứ!')
        .required('Ngày không được bỏ trống'),
    interviewTime: Yup.string().required('Ngày không được bỏ trống!'),
});
const FormAcceptJob = ({ handleOpen, open, id }: FormAcceptJob) => {
    const [acceptJob, { isLoading }] = useAcceptJobMutation();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                let dateValue;
                if (values.interviewDate) {
                    dateValue = `${values.interviewDate.$y}-${values.interviewDate.$M + 1}-${values.interviewDate.$D}`;
                }

                let timeValue;
                if (values.interviewTime) {
                    timeValue = `${values.interviewTime.$H}:${values.interviewTime.$m}`;
                }

                const data: string = `${dateValue}T${timeValue}`;

                const formattedDate = dayjs(data).format('YYYY-MM-DDTHH:mm:ssZ');

                const body: any = {
                    interviewDate: formattedDate,
                };

                const res = await acceptJob({ id, body }).unwrap();
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

    return (
        <Dialog className="font-family-title" size="lg" open={open} handler={handleOpen}>
            {isLoading && <Loader />}
            <DialogHeader>Thông tin phỏng vấn</DialogHeader>
            <form onSubmit={formik.handleSubmit}>
                <DialogBody divider className="grid grid-cols-2 items-center justify-between gap-8 mb:grid-cols-1">
                    <div className="flex flex-col gap-1 w-full">
                        <h5 className="font-bold text-primary-100">Ngày phỏng vấn *</h5>
                        <DatePicker
                            views={['year', 'month', 'day']}
                            value={formik.values.interviewDate}
                            onChange={(date: any) => {
                                formik.setFieldValue('interviewDate', date);
                            }}
                        />
                        {formik.errors.interviewDate && formik.touched.interviewDate ? (
                            <div className="text-red-700 text-sm font-semibold">
                                {typeof formik.errors.interviewDate === 'string'
                                    ? formik.errors.interviewDate
                                    : Object.values(formik.errors.interviewDate).join(', ')}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <h5 className="font-bold text-primary-100">Thời gian *</h5>
                        <TimePicker
                            label="Chọn thời gian phỏng vấn"
                            value={formik.values.interviewTime}
                            onChange={(date: any) => {
                                formik.setFieldValue('interviewTime', date);
                            }}
                        />
                        {formik.errors.interviewTime && formik.touched.interviewTime ? (
                            <div className="text-red-700 text-sm font-semibold">
                                {typeof formik.errors.interviewTime === 'string'
                                    ? formik.errors.interviewTime
                                    : Object.values(formik.errors.interviewTime).join(', ')}
                            </div>
                        ) : null}
                    </div>
                </DialogBody>
                <DialogFooter className="px-8">
                    <BtnBot isLoading={isLoading} toggleOpen={handleOpen} />
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default FormAcceptJob;
