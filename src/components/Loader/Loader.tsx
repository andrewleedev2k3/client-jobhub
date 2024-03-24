import { useEffect } from 'react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

function Loader() {
    // Prevent scroll when loading
    useEffect(() => {
        const bodyTag = document.querySelector('body') as HTMLBodyElement;
        bodyTag.style.overflow = 'hidden';
        return () => {
            bodyTag.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="z-[10000000000000000] w-full h-[100%] flex items-center justify-center bg-[rgba(0,0,0,.5)]  top-0 left-0 fixed">
            <ClimbingBoxLoader color={'#00A7AC'} loading size={15} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );
}

export default Loader;
