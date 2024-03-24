interface CustomFieldProps {
    fieldName: string;
    title: string;
    placeholder?: string;
    error: string | undefined;
    touched: boolean | undefined;
    icon: string;
    type?: string;
    value?: string | Date | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomField = ({
    fieldName,
    type,
    title,
    placeholder,
    error,
    touched,
    icon,
    value,
    onChange,
    onBlur,
}: CustomFieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="font-medium text-content-text ">
                {title}
                <span className="ml-2 font-title text-primary-100">*</span>
            </div>
            <div className={`flex items-center  border-2  pl-3  rounded  ${error && touched && 'border-red-800'}`}>
                <img className="w-4 h-4" src={icon} alt={icon} />
                <span className="w-[1px] h-6 bg-gray-300 mx-2"></span>
                <input
                    name={fieldName}
                    className={`text-content-text w-full h-[48px] outline-none ${
                        type === 'date' || (type === 'number' && 'pr-3')
                    }`}
                    type={type ? type : 'text'}
                    placeholder={placeholder}
                    value={value !== undefined && value !== null ? value.toString() : ''}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
            {error && touched ? <div className="text-red-700 text-sm font-semibold">{error}</div> : null}
        </div>
    );
};

export default CustomField;
