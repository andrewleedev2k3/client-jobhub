import { ReactNode } from 'react';
const Title: React.FC<{ title: ReactNode; subTitle: string; children: ReactNode }> = ({
    title,
    subTitle,
    children,
}) => {
    return (
        <div className="flex justify-between gap-6 items-center lg:items-start mb-[50px] mb:flex-col tb:px-3 mb:px-3">
            <div className="">
                <h2 className="font-family-title text-[2.5rem]  font-bold mb-3 lg:text-3xl mb:text-2xl mb:text-center">
                    {title}
                </h2>
                <p className="font-family-text text-lg text-content-text lg:text-base mb:text-base">{subTitle}</p>
            </div>
            {children}
        </div>
    );
};

export default Title;
