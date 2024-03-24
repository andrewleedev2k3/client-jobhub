import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useGetDetailJobseekerQuery } from '@/services/jobseekerApiSlice';
import { useState, useEffect } from 'react';
import JobSeeker from '@/types/JobSeeker';
import Loader from '@/components/Loader/Loader';
import ContactInfo from './ContactInfo';
import Educate from './Educate';
import Skills from './Skills';
import Experiences from './Experiences';
import Projects from './Projects';
import Certificate from './Certificate';
import Introduce from './Introduce';
import { MdClose } from 'react-icons/md';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const DetailProfileCan = ({ id }: { id: string }) => {
    const [state, setState] = useState({
        right: false,
    });
    const [info, setInfo] = useState<JobSeeker>();
    const { data, isLoading, isError } = useGetDetailJobseekerQuery(id);
    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            setInfo(data?.data?.data);
        }
    }, [data?.data?.data, isError, isLoading]);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <Box
            // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 100 }}
            role="presentation"
            onClick={toggleDrawer(anchor, true)}
            onKeyDown={toggleDrawer(anchor, true)}
            className="flex flex-col gap-1 font-family-text w-[600px] mb:w-full"
        >
            <div className="flex items-center gap-2 justify-between p-3 font-semibold uppercase text-xl font-family-title text-center bg-primary-100 text-white ">
                Thông tin ứng viên
                <button
                    onClick={(event) => {
                        event.stopPropagation(); // Ngăn chặn sự kiện lan truyền đến div cha
                        toggleDrawer(anchor, false)(event);
                    }}
                    className="p-1 bg-red-300 rounded-lg text-red-800 hover:bg-red-400 duration-200 "
                >
                    <MdClose />
                </button>
            </div>

            <div className="flex flex-col p-3 gap-4">
                <ContactInfo info={info} />
                <div className="grid grid-cols-2 gap-6 mb:grid-cols-1">
                    <Introduce info={info} />
                    <Skills info={info} />
                    <Educate info={info} />
                    <Experiences info={info} />
                    <Certificate info={info} />
                    <Projects info={info} />
                </div>
            </div>
        </Box>
    );

    const anchor = 'right';

    return (
        <div>
            {isLoading && <Loader />}
            <button
                className="p-2 text-primary-100 font-semibold border-2 border-primary-100 rounded-md hover:text-blue-800  hover:border-blue-800  duration-300 mb:text-sm mb:p-1"
                onClick={toggleDrawer(anchor, true)}
            >
                Xem thông tin
            </button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
            </Drawer>
        </div>
    );
};
export default DetailProfileCan;
