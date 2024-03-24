import { Link } from "react-router-dom";
type Props = {
    page: string
}
const Banner = (props: Props) => {
    return (
        <div className=' font-family-text pt-16 pb-16 m-auto text-center relative ' style={{background: `url('https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/bg/breadcrumb-bg.png')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} >
            <h1 className=' font-family-title text-content-title text-2xl font-bold'>{props.page}</h1>
            <span className='h-2 w-2 bg-primary-100 rounded-full m-auto mt-1 mb-3 block relative'>
                <div className='w-16 h-px right-4 top-1/3 bg-primary-100 translate-y-2/4 absolute'></div>
                <div className='w-16 h-px left-4 top-1/3 bg-primary-100 translate-y-2/4 absolute'></div>
            </span>
            <div className='font-medium flex justify-center'>
                <Link to={'/'} className='text-content-title text-center font-medium transition ease-in-out delay-0 duration-300 hover:text-primary-100'>Trang chủ </Link>
                
                <p className='text-primary-100 font-semibold flex'>
                    <img className=" mr-2 ml-2" src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/company-2.svg" />
                    {props.page}
                </p>
            </div>
        </div>
    );
};

export default Banner;
