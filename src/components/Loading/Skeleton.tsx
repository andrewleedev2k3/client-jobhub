import { Box, Skeleton as SkeletonMui } from '@mui/material';
const Skeleton = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <SkeletonMui variant="rectangular" height={150} />
            <Box sx={{ pt: 0.5 }}>
                <SkeletonMui />
                <SkeletonMui width="60%" />
            </Box>
        </div>
    );
};

export default Skeleton;
