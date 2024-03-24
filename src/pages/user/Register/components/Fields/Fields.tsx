type FieldPropsType = {
    type: string;
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: any;
    onBlur: any;
    error: string | undefined;
    touched: boolean | undefined;
    placeholder: string;
    isRequire: boolean
};
function Fields({ type, label, id, name, value, onChange, onBlur, error, touched, placeholder, isRequire }: FieldPropsType) {
    return (
        <div className="w-1/2 flex flex-col p-2 tb:w-full mb:w-full">
            <label htmlFor={id} className="text-content-title text-base font-medium mb-2">
                {label}
                {isRequire && <span className=" text-red-500"> * </span>}
            </label>

            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={' text-content-text border border-primary-200 rounded-lg outline-none px-5 py-[10px] '}
                
            />

            {(error && touched) || (error && value) ? (
                <p className=" w-full mt-2 text-red-900 italic select-none">{error}</p>
            ) : null}
        </div>
    );
}

export default Fields;
