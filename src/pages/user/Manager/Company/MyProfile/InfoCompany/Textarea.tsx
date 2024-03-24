interface TextareaProps {
    fieldName: string;
    title: string;
    error: string | undefined;
    touched: boolean | undefined;
    type?: string;
    value?: string | Date | number;
    onChange: any;
    onBlur: any;
    placeholder: string;
}

const Textarea = ({ fieldName, title, error, touched, value, onChange, onBlur, placeholder }: TextareaProps) => {
    return (
        <div className="mt-2 flex flex-col gap-1 w-full">
            <label className="font-bold text-primary-100" htmlFor={fieldName}>
                {title}
            </label>

            <textarea
                name={fieldName}
                className={`font-family-text font-medium text-content-title  border-2 outline-none w-full p-3 rounded-md ${
                    error && touched && 'border-red-800'
                }`}
                id="introduce"
                value={value !== undefined && value !== null ? value.toString() : ''}
                onChange={onChange}
                placeholder={placeholder}
                onBlur={onBlur}
                cols={30}
                rows={3}
            ></textarea>
            {error && touched ? <div className="text-red-700 text-sm font-semibold">{error}</div> : null}
        </div>
    );
};

export default Textarea;
