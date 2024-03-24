interface BtnBot {
    toggleOpen?: () => void;
    isLoading?: boolean;
}

const BtnBot = ({ toggleOpen, isLoading }: BtnBot) => {
    return (
        <div className="w-full flex gap-5 justify-end font-family-text mb:justify-center">
            <button
                type="button"
                onClick={toggleOpen}
                className="hover:bg-blue-gray-100 py-2 px-6 rounded-sm  font-semibold bg-blue-gray-50 text-black"
            >
                Huỷ
            </button>
            <button
                type="submit"
                className="bg-primary-100  py-2 px-6 text-white  font-semibold rounded-sm hover:bg-black duration-300"
                disabled={isLoading}
            >
                {isLoading ? 'Đang lưu...' : 'Lưu'}
            </button>
        </div>
    );
};

export default BtnBot;
