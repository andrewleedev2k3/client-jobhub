function Loader() {
    return (
        <div className=" flex items-center justify-center animate-spin my-10">
            <svg className=" animate-spin" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none"  >
                <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M4 24c0 11.046 8.954 20 20 20s20-8.954 20-20S35.046 4 24 4"/>
            </svg>
        </div>
    );
}

export default Loader;