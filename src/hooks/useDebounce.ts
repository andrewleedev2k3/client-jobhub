import { useState, useEffect } from 'react';

function useDebounce(value: any, delay: number) {
    // Lan` dau` component mount se truyen` state la` '', nhung lan` re-render sau useState se khong nhan init state nua ma
    // se van la` '', vi` ham` useDebounce duoc viet ngoai` pham vi cua component va` chi import vao su dung nen se~ khong bi tao lai
    // moi khi component re-render, do do' se giu~ duoc state cu~
    const [debouncedValue, setDebouncedValue] = useState<any>(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [delay, value]);
    return debouncedValue;
}
export default useDebounce;
