import React, { useState } from "react";

type AddFormProps = {
    onAddForm: (categoryName: string) => void
}
const AddForm = React.forwardRef(({onAddForm}: AddFormProps) => {

    const [categoryName, setCategoryName] = useState<string>('')

    return (
        <div className=" w-[500px] h-auto bg-white rounded-lg mx-auto mt-[200px] p-[20px]">
            <h1 className=" text-center text-2xl font-family-title font-semibold mb-5">Thêm danh mục</h1>

            <div className=" flex flex-col mb-4 ">
                <label 
                    htmlFor='categoryName'
                    className=" text-base font-medium font-family-title mb-2"
                >
                    Tên danh mục
                </label>
                
                <input
                    type='text'
                    id='categoryName'
                    value={categoryName}
                    onChange={(e: any) => setCategoryName(e.target.value)}
                    className={" border border-primary-200 rounded-lg outline-none px-5 py-[10px] "}
                />
            </div>

            <div className=" flex items-center justify-center mt-5" onClick={() => onAddForm(categoryName)}>
                <button className=" w-[300px] bg-primary-100 text-white rounded text-lg py-2.5 mx-auto duration-300 hover:w-full">Xác Nhận Thêm Danh Mục</button>
            </div>
        </div>
    );
})

export default AddForm ;