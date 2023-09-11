
const ErrorPage = () => {
  return (
    <div className=" grid place-items-center text-center text-xl gap-10 pt-[14vh]">
      <img
        src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
        alt=""
      />
      <div className="grid">
        <span>This page isn't available. Sorry about that.</span>
        <span>Try searching for something else.</span>
      </div>
    </div>
  );
};

export default ErrorPage;
