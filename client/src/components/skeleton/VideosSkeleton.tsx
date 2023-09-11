const VideoSkeleton = () => {
  return (
    <div className=" max-w-[500px] grid gap-4   w-full ">
      <div className="w-full  h-[200px] relative loading bg-shadow-light dark:bg-shadow-dark object-cover rounded-md bg-shadow"></div>
      <div className="flex gap-2 items-center ">
        <div className="bg-shadow-light relative loading image dark:bg-shadow-dark flex-[.3] h-20 rounded-full"></div>
        <div className="grid flex-1 gap-2">
          <h2 className="bg-shadow-light relative loading dark:bg-shadow-dark h-4"></h2>
          <h2 className="bg-shadow-light relative loading dark:bg-shadow-dark w-40 h-4"></h2>
        </div>
      </div>
    </div>
  );
};


 const VideosSkeleton = () => {
  let array = [...Array(10).keys()];

  return (
    <div className=" overflow-hidden h-[88vh] grid sm:grid-cols-2 md:grid-cols-3 place-items-center  gap-4 rounded-md relative ">
    {array.map((a: any, i: number) => {
      return <VideoSkeleton key={a} />;
    })}
  </div>
  );
};

export default VideosSkeleton;