import error from "./../assets/error.jpg";

const Error = () => {
    return (
        <>
            <img src={error} alt="An Error Occured Image" className="rounded-2xl mt-9 mx-auto w-[90%]"/>
            <h1 className="text-4xl font-bold text-center mt-9">An error occured:{'('}</h1>
        </>
    );
};
export default Error;
