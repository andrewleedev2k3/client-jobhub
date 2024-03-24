import { useEffect, useState } from "react";
import Slider from 'rc-slider';
import useDebounce from "@/hooks/useDebounce";

type Props = {
    salaryChange: ({min, max}: {min: number, max: number}) => void
}
function SalaryRange({salaryChange}: Props) {
    
    const [rangeMin, setRangeMin] = useState<number>(1000000)
    const [rangeMax, setRangeMax] = useState<number>(100000000)

    const deBounceValueMin = useDebounce(rangeMin, 500)
    const deBounceValueMax = useDebounce(rangeMax, 500)

    const handleChange = (value: any) => {
        setRangeMin(value[0])
        setRangeMax(value[1])
    };

    useEffect(() => {
        salaryChange({min: deBounceValueMin, max: deBounceValueMax})
    }, [deBounceValueMin, deBounceValueMax])

    return (
        <div className=" bg-white border-[#eee] border rounded-md pt-5 pb-5 pl-6 pr-3 mb-5">
            <h3 className=" font-family-title text-primary-100 font-semibold text-lg mb-2 lg:text-lg">Mức lương</h3>
            <p>
                {rangeMin.toLocaleString('IT')} - {rangeMax.toLocaleString('IT')} đ
            </p>
            <Slider step={1000000} range min={1000000} max={100000000} onChange={handleChange} />
            <div className=" max-h-64 overflow-scroll"></div>
        </div>
    );
}

export default SalaryRange;