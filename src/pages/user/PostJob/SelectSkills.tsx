import { Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
interface SelectField {
    title: string;
    fieldName: string;
    options: any[];
    icon?: string;
    error: string | undefined;
    touched: boolean | undefined;
    value?: string;
    onChange: any;
    data: string[];
    setData: React.Dispatch<React.SetStateAction<string[]>>;
    formik: any;
}
const SelectSkills = ({
    title,
    fieldName,
    options,
    icon,
    error,
    touched,
    value,
    onChange,
    data,
    setData,
    formik,
}: SelectField) => {
    const handleValueChange = (event: any) => {
        const selectedValue: string = event.target.value;

        if (selectedValue && selectedValue.trim() !== '' && !data.includes(selectedValue)) {
            setData([...data, selectedValue]);
        }
    };

    const handleRemoveSkill = (index: number): void => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    useEffect(() => {
        if (data.length === 0) {
            formik.setFieldValue('skillsRequire', '');
        }
    }, [data]);

    return (
        <div className="flex flex-col gap-2">
            <h5 className="font-medium text-content-text">
                {title} <span className="ml-2 font-title text-primary-100">*</span>
            </h5>
            <div
                className={`flex items-center  border-2 border-primary-40 pl-3  rounded ${
                    error && touched && 'border-red-800'
                }`}
            >
                <img className="w-4 h-4" src={icon} alt={icon} />
                <span className="w-[1px] h-6 bg-gray-300 mx-2"></span>
                <div className="w-full h-[48px]">
                    <Select
                        value={data.length === 0 ? '' : value}
                        onChange={(event) => {
                            onChange(event);
                            handleValueChange(event);
                        }}
                        name={fieldName}
                        variant="standard"
                        className="select w-full h-[48px]  text-content-s-text items-center"
                    >
                        {options.length === 0 && (
                            <MenuItem value="" disabled>
                                Chọn danh mục trước khi chọn kỹ năng
                            </MenuItem>
                        )}
                        {options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            {error && touched ? <div className="text-red-700 text-sm font-semibold">{error}</div> : null}

            <div className="flex flex-wrap gap-5">
                {data.map((skill, index) => (
                    <div
                        className="flex items-center gap-2 text-content-text font-semibold px-4 py-1 bg-primary-200 border-2 border-primary-100 rounded-3xl"
                        key={index}
                    >
                        {skill}
                        <button
                            type="button"
                            className=" text-red-800 hover:text-red-500 "
                            onClick={() => handleRemoveSkill(index)}
                        >
                            <AiOutlineCloseCircle />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectSkills;
