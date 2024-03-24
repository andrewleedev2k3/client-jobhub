import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search({searchChange}: {searchChange: (name: string) => void}) {

    const [name, setName] = useState<string>('')
    const [result, setResult] = useState<string>('')

    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');

    const handleSearch = () => {
        searchChange(name)
        setResult(name)
        setName('')
    }

    const handleUnSearch = () => {
        searchChange('')
        setResult('')
    }

    useEffect(() => {
        if (q !== null) {
            searchChange(q)
            setName(q)
            setResult(q)
        } else {
        }
    }, [q])
    return (
        <div className="flex flex-col bg-white border-[#eee] border rounded-md pt-5 pb-5 pl-6 pr-3 mb-5">
            <h3 className=" font-family-title text-primary-100 font-semibold text-lg mb-2 lg:text-lg">Tìm kiếm tên</h3>
            <div className=" max-w-full flex">
                <input
                    type="text"
                    placeholder="Bạn tìm gì..."
                    className=" w-4/5 text-content-title text-sm border border-primary-100 rounded-l-md py-1 px-3 outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div onClick={handleSearch} className=" w-1/5 flex items-center justify-center text-primary-100 border-r border-t border-b border-primary-100 rounded-r-md py-2.5 cursor-pointer duration-300 hover:text-white hover:bg-primary-100 ">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
            {result === '' ? <></> : (
                <div className=" w-full flex mt-2 ">
                    <div onClick={handleUnSearch} className="group ">
                        <div className="flex items-center text-sm text-content-text border border-gray-400 rounded-md py-[1px] px-2 gap-1 duration-300 cursor-pointer group-hover:border-primary-100 group-hover:text-primary-100">
                            <p>{result}</p>
                            <div className=" text-content-text duration-300 group-hover:border-primary-100 group-hover:text-primary-100">
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;