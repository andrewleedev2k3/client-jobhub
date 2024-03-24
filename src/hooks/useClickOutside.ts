import { useEffect, useRef } from 'react';

// Bao gom phan outside cua ca parent element ref va children cua no
const useClickOutside = <Element extends HTMLElement>(callback: () => void) => {
    const domNode = useRef<Element>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;
            // Check vị trí click chuột có phải là popup hay không
            if (domNode.current && !domNode.current?.contains(target)) {
                callback();
                return;
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [domNode, callback]);

    return domNode;
};
export default useClickOutside;
