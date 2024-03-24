import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    title: string
    list: string[]
}
function ItemCol({title, list}: Props) {
    return (
        <div className=" flex flex-col mx-3 mb-8 tb:items-center mb:items-center ">
            <h3 className=" text-xl font-semibold font-family-title mb-[25px] xl:text-lg">{title}</h3>
            <ul className=" flex flex-col text-[#b3b3b3] font-medium tracking-wide tb:items-center mb:items-center">
                {list?.map(item => (
                    <li key={item} className=" group flex items-center mb-3 cursor-pointer ">
                        <p className=" duration-300 group-hover:text-primary-100 xl:text-[15px] ">{item}</p>
                        <div className=" w-0 h-5 opacity-0 rotate-45 overflow-hidden ml-2 duration-300 text-primary-100 group-hover:w-3 group-hover:opacity-100">
                            <FontAwesomeIcon icon={faArrowUp} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemCol;