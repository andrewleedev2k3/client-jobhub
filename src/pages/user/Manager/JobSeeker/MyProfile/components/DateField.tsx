import { DatePicker } from '@mui/x-date-pickers';
import { FormikErrors } from 'formik';
interface DateFieldProps {
    title: string;

    error: string | undefined | FormikErrors<Date>;
    touched: boolean | undefined | FormikErrors<Date>;

    value?: string | Date | null | boolean;
    onChange: any;
    disabled?: boolean;
}

const DateField = ({ title, error, touched, value, onChange, disabled }: DateFieldProps) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <h5 className="font-bold text-primary-100">{title}</h5>
            <div className="flex gap-6 justify-between">
                <DatePicker
                    disabled={disabled}
                    className="w-full"
                    label={'Tháng'}
                    views={['month']}
                    value={value}
                    onChange={onChange}
                />

                <DatePicker
                    disabled={disabled}
                    className="w-full"
                    label={'Năm'}
                    views={['year']}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {error && touched ? (
                <div className="text-red-700 text-sm font-semibold">
                    {typeof error === 'string' ? error : Object.values(error).join(', ')}
                </div>
            ) : null}
        </div>
    );
};

export default DateField;
