type FieldPropsType = {
    type: string
    label: string
    id: string
    name: string
    value: string
    onChange: any   
    onBlur: any
    error: string | undefined
    touched: boolean | undefined
    placeholder: string
}
function Fields ({type, label, id, name, value, onChange, onBlur, error, touched, placeholder}: FieldPropsType) {
    return (
        <div className=" flex flex-col mb-4">
            <label 
                htmlFor={id}
                className="text-content-title text-base font-medium mb-2"
            >
                {label}
            </label>
            
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={" text-content-text border border-primary-200 rounded-lg outline-none px-5 py-[10px] "}
            />

            {(error && touched) ? <p className=" mt-2 p-1 text-red-700 italic select-none">{error}</p> : null }
        </div>
    );
}

export default Fields
;