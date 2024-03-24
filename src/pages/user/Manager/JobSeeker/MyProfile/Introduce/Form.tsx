import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import BtnBot from '../../../components/BtnBot';
import { useState } from 'react';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import { MdTipsAndUpdates } from 'react-icons/md';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';
import * as Yup from 'Yup';

import { useFormik } from 'formik';
interface FormIntro {
    handleOpen: () => void;
    open: boolean;
}
interface Values {
    introduce: string;
}
const initialValues: Values = {
    introduce: '',
};
const validation = Yup.object().shape({
    introduce: Yup.string().max(1500, 'Không được quá 1500 kí tự!').required('Giới thiệu không được bỏ trống!'),
});
const Form = ({ handleOpen, open }: FormIntro) => {
    const [changeIntroduce, { isLoading }] = useJobseekerChangeMeMutation();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                if (values.introduce) {
                    const data: any = {
                        introduce: values.introduce.trim(),
                    };

                    const res = await changeIntroduce(data).unwrap();
                    if (res.status === 200) {
                        toast.success(res.data.msg);
                    }
                    handleOpen();
                    formik.resetForm();
                }
            } catch (error: any) {
                if (error.status === 400) {
                    toast.error(error.data.msg);
                }
                if (error.status === 500) {
                    toast.error('Lỗi server');
                }
            }
        },
    });
    return (
        <>
            <Dialog className="rounded-sm" size="lg" open={open} handler={handleOpen}>
                {isLoading && <Loader />}
                <DialogHeader className="px-8 bg-primary-200 text-3xl font-family-title mb:text-xl mb:px-3">
                    Giới thiệu bản thân
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <DialogBody divider className="p-8 mb:p-3">
                        <div className="flex gap-2 mb-5 text-lg mb:flex-col">
                            <div className="flex items-center gap-2 text-primary-100 font-title font-family-text tb:items-start lg:items-start mb:text-base">
                                <div className="text-2xl mb:text-xl">
                                    <MdTipsAndUpdates />
                                </div>
                                Mẹo:
                            </div>
                            <p className="text-content-text font-normal font-family-text mb:text-sm">
                                Tóm tắt kinh nghiệm chuyên môn, chú ý làm nổi bật các kỹ năng và điểm mạnh.
                            </p>
                        </div>
                        <textarea
                            disabled={isLoading}
                            className="font-family-text font-medium border-primary-100 border-2 outline-none w-full p-3 rounded-md mb:text-sm"
                            name="introduce"
                            value={formik.values.introduce}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            cols={30}
                            rows={5}
                        ></textarea>

                        <div className="mt-1 text-content-text font-semibold font-family-text mb:text-sm">
                            {formik.touched.introduce && formik.errors.introduce ? (
                                <div className="text-red-500 text-sm font-family-text mb:text-sm">
                                    {formik.errors.introduce}
                                </div>
                            ) : null}
                        </div>
                    </DialogBody>
                    <DialogFooter className="px-8">
                        <BtnBot isLoading={isLoading} toggleOpen={handleOpen} />
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
};

export default Form;
