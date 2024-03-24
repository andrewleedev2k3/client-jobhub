import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "@/types/Category";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";

type ChangeFormProps = {
    category: any, 
    onChangeForm: (category: Category) => void
}
const ChangeForm = React.forwardRef(({category, onChangeForm}: ChangeFormProps) => {

    const [categoryChange, setCategoryChange] = useState<any>(category)

    return (
        <div className=" w-[500px] h-auto bg-white rounded-lg mx-auto mt-[200px] p-[20px]">
            <h1 className=" text-center text-2xl font-family-title font-semibold mb-5">Chỉnh sửa danh mục</h1>

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
                    value={categoryChange?.categoryName}
                    onChange={(e: any) => setCategoryChange((prev: Category) => {
                        return {
                            ...prev,
                            categoryName: e.target.value
                        }
                    })}
                    className={" border border-primary-200 rounded-lg outline-none px-5 py-[10px] "}
                />
            </div>
            <div className=" flex flex-col mb-4 ">
                <label 
                    htmlFor='isHotCategory'
                    className=" text-base font-medium font-family-title mb-2"
                >
                    Độ hot
                </label>
                
                <div className={" flex items-center border border-primary-200 rounded-lg outline-none px-5 py-[10px] "}>
                    <input
                        type='text'
                        id='isHotCategory'
                        value={categoryChange?.isHotCategory === true ? 'Đang hot' : 'Không hot'}
                        className={" w-full outline-none "}
                        onChange={() => setCategoryChange((prev: Category) => {
                            return {
                                ...prev,
                                isHotCategory: !prev?.isHotCategory
                            }
                        })}
                    />
                    <IconButton title="Đổi trạng thái" onClick={() => setCategoryChange((prev: Category) => {
                        return {
                            ...prev,
                            isHotCategory: !prev?.isHotCategory
                        }
                    })}>
                        <FontAwesomeIcon icon={faRepeat}/>
                    </IconButton>
                </div>
            </div>

            <div className=" flex items-center justify-center mt-5" onClick={() => onChangeForm(categoryChange)}>
                <button className=" w-[300px] bg-primary-100 text-white rounded text-lg py-2.5 mx-auto duration-300 hover:w-full">Xác Nhận Thay Đổi</button>
            </div>
        </div>
    );
})

export default ChangeForm;