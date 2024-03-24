const Title = ({ title }: { title: string }) => {
    return (
        <h6 className="text-base uppercase text-primary-100 font-semibold border-b-2 border-primary-100 mb-2">
            {title}
        </h6>
    );
};

export default Title;
