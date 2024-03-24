import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormikTouched } from 'formik';

type SelectFieldPropsType = {
    label: string;
    id: string;
    value: string | Date;
    onChange: any;
    error: any;
    touched: boolean | undefined | FormikTouched<Date>;
    isRequire: boolean
};
function SelectDate({ label, id, value = new Date(Date.now()), onChange, error, touched, isRequire }: SelectFieldPropsType) {
    return (
        <div className="w-1/2 flex flex-col p-2 tb:w-full mb:w-full">
            <label htmlFor={id} className=" text-content-title text-base font-semibold">
                {label}
                {isRequire && <span className=" text-red-500"> * </span>}
            </label>

            <div className='max-h-[45.6px] mt-[6px]'>
                <DatePicker
                    disableFuture
                    value={dayjs(value)}
                    onChange={(sth: any) => onChange('establishDate', dayjs(sth).toISOString())}
                    className=" w-full h-full bg-white rounded-lg border-none outline-none px-10"
                    sx={{borderColor: '#00A7AC', color: '#595959'}}
                />
            </div>

            {error && touched ? <p className=" mt-2 text-red-900 italic select-none">{error}</p> : null}
        </div>
    );
}
//
export default SelectDate;
