import { useEffect, useLayoutEffect, useState } from "react";
import { useGetCompanyQuery } from "@/services/companiesApiSlice";
import { useParams } from "react-router-dom";
import Job from "./components/Job/Job";
import Company from "@/types/Company";
import CompanyInfo from "./components/CompanyInfo/CompanyInfo";
import CompanyOverview from "./components/CompanyOverview/CompanyOverview";
import AboutCompany from "./components/AboutCompany/AboutCompany";
import Loader from "@/components/Loader/Loader";

function CompanyDetail() {
    const [company, setCompany] = useState<Company>()

    const { id } = useParams<string>()

    const {data, isLoading, isError} = useGetCompanyQuery(id!)

    useEffect(() => {
        if(!isLoading && !isError && data?.data?.data) {
            setCompany(data?.data?.data)
        } 
    }, [data?.data?.data, isLoading, isError])

    useLayoutEffect(() => {
        scrollTo(0,0)
    }, [])
    
    return (
        <>
            {isLoading && <Loader />}
            <div className=" font-family-text selection:bg-primary-100 selection:text-white">
                {/* <Banner page="Company Detail" /> */}

                <div className=" w-10/12 mt-[50px] mb-28 text-content-text mr-auto ml-auto">
                    {!isLoading && !isError && company && <CompanyInfo data={company}/>}

                    <div className=" flex lg:flex-col tb:flex-col mb:flex-col ">
                        {!isLoading && !isError && company && <AboutCompany data={company}/>}
                        {!isLoading && !isError && company && <CompanyOverview data={company}/>}
                    </div>

                    {!isLoading && !isError && company && <Job data={company}/>}
                </div>
            </div>
        </>
    );
}

export default CompanyDetail;