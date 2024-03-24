import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import * as Yup from 'Yup';
import { useFormik } from 'formik';

import { LuFactory } from 'react-icons/lu';
import { BiLink } from 'react-icons/bi';

import CustomField from './Field';
import BtnBot from '../../../components/BtnBot';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useChangeMeMutation } from '@/services/companiesApiSlice';
import { isCompany } from '@/utils/helper';
import Company from '@/types/Company';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Loader from '@/components/Loader/Loader';
import { toast } from 'react-toastify';
import CoverPhoto from './CoverPhoto';
import Textarea from './Textarea';
interface FormInfo {
    handleOpen: () => void;
    open: boolean;
}

interface Values {
    companyName: string;
    description: string;
    establishDate: any;
    website: string;
    companySizeFrom: string;
    companySizeTo: string;
    photo: string;
}
const initialValues: Values = {
    companyName: '',
    description: '',
    establishDate: '',
    website: 'Cập nhật sau',
    companySizeFrom: '1',
    companySizeTo: '1',
    photo: '',
};
const validation = Yup.object().shape({
    companyName: Yup.string().max(100, 'Không được quá 100 kí tự!').required('Họ không được bỏ trống!'),
    companySizeFrom: Yup.number().required('Quy mô không được bỏ trống!').min(1, 'Số lượng không được nhỏ hơn 1'),
    companySizeTo: Yup.number().required('Quy mô không được bỏ trống!').min(1, 'Số lượng không được nhỏ hơn 1'),
    description: Yup.string().max(1500, 'Không được quá 1500 kí tự!').required('Tên không được bỏ trống!'),
    establishDate: Yup.date()
        .required('Ngày thành lập không được bỏ trống!')
        .test('date-range', 'Không được chọn ngày ở tương lai!', function (value) {
            const { establishDate } = this.parent;
            if (!establishDate) {
                return true;
            }
            const dataNow = new Date();
            const date = new Date(value);

            return date <= dataNow;
        }),
});
const FormInfo = ({ handleOpen, open }: FormInfo) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        if (isCompany(currentUser)) {
            setCompany(currentUser);
        }
    }, [currentUser]);
    const [changeInfoCompany, { isLoading }] = useChangeMeMutation();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: async (values) => {
            try {
                let dateValue;

                if (values.establishDate.$y && values.establishDate.$M && values.establishDate.$D) {
                    dateValue = `${values.establishDate.$y}-${values.establishDate.$M + 1}-${values.establishDate.$D}`;
                } else {
                    dateValue = values.establishDate;
                }
                const form = new FormData();
                form.append('companyName', values.companyName);
                form.append('description', values.description);
                form.append('establishDate', dateValue);
                form.append('website', values.website);
                form.append('companySize[from]', values.companySizeFrom);
                form.append('companySize[to]', values.companySizeTo);
                form.append('coverPhoto', values.photo);

                const res = await changeInfoCompany(form).unwrap();
                if (res.status === 200) {
                    toast.success('Cập nhật thông tin thành công!');
                }
                formik.resetForm();
                handleOpen();
            } catch (error: any) {
                if (error.status === 400) {
                    toast.error('Lỗi!');
                }
                if (error.status === 500) {
                    toast.error('Lỗi server!');
                }
            }
        },
    });
    useEffect(() => {
        if (company) {
            let date;
            if (company?.establishDate) {
                const parts = company?.establishDate.toString().split('T');
                date = parts[0];
            }
            formik.setValues({
                ...formik.values,
                companyName: company?.companyName || '',
                description: company?.description || '',
                establishDate: date || '',
                website: company?.website || '',
                companySizeFrom: company?.companySize.from || 1,
                companySizeTo: company?.companySize.to || 1,
            });
        }
    }, [company]);

    const establishDateValue: any = dayjs(formik.values.establishDate);
    return (
        <Dialog size="lg" open={open} handler={handleOpen} className="overflow-y-auto max-h-screen">
            {isLoading && <Loader />}
            <DialogHeader className="px-8 bg-primary-200 text-3xl font-family-title mb:text-xl">
                Thông tin công ty
            </DialogHeader>
            <form onSubmit={formik.handleSubmit}>
                <DialogBody divider className="flex flex-col items-center justify-center gap-2 px-8">
                    <CoverPhoto formik={formik} />
                    <div className="grid grid-cols-2 w-full gap-6 mb:grid-cols-1 tb:grid-cols-1 font-medium text-content-title">
                        <CustomField
                            title="Tên công ty *"
                            fieldName="companyName"
                            error={formik.errors.companyName}
                            touched={formik.touched.companyName}
                            icon={<LuFactory />}
                            placeholder="Nhập tên công ty của bạn"
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                        />

                        <CustomField
                            title="Website"
                            fieldName="website"
                            error={formik.errors.website}
                            touched={formik.touched.website}
                            icon={<BiLink />}
                            placeholder="Nhập link website"
                            value={formik.values.website}
                            onChange={formik.handleChange}
                        />

                        <div className="flex flex-col gap-1 w-full ">
                            <h5 className="font-bold text-primary-100">Ngày thành lập *</h5>
                            <DatePicker
                                views={['year', 'month', 'day']}
                                value={establishDateValue}
                                onChange={(date: any) => {
                                    formik.setFieldValue('establishDate', date);
                                }}
                            />
                            {formik.errors.establishDate && formik.touched.establishDate ? (
                                <div className="text-red-700 text-sm font-semibold">
                                    {typeof formik.errors.establishDate === 'string'
                                        ? formik.errors.establishDate
                                        : Object.values(formik.errors.establishDate).join(', ')}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex gap-6 mb:flex-col tb:flex-col">
                            <CustomField
                                title="Quy mô (Từ) *"
                                fieldName="companySizeFrom"
                                error={formik.errors.companySizeFrom}
                                touched={formik.touched.companySizeFrom}
                                icon={<LuFactory />}
                                placeholder="Nhập tên công ty của bạn"
                                value={formik.values.companySizeFrom}
                                onChange={formik.handleChange}
                                type="number"
                            />
                            <CustomField
                                title="Quy mô (Đến) *"
                                fieldName="companySizeTo"
                                type="number"
                                error={formik.errors.companySizeTo}
                                touched={formik.touched.companySizeTo}
                                icon={<LuFactory />}
                                placeholder="Nhập tên công ty của bạn"
                                value={formik.values.companySizeTo}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>
                    <Textarea
                        title="Mô tả *"
                        fieldName="description"
                        placeholder="Nhập mô tả công việc"
                        error={formik.errors.description}
                        touched={formik.touched.description}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </DialogBody>
                <DialogFooter className="px-8">
                    <BtnBot isLoading={isLoading} toggleOpen={handleOpen} />
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default FormInfo;
