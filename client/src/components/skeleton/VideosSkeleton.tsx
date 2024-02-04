export const VideoSkeleton = () => {
  return (
    <div className=" max-w-[500px] grid gap-4   w-full ">
      <div className="  h-[220px] relative loading bg-shadow-light dark:bg-shadow-dark object-cover rounded-sm bg-shadow"></div>
      <div className="flex gap-2 items-center ">
        <div className="bg-shadow-light relative loading image dark:bg-shadow-dark  h-20 w-20 rounded-[50%]"></div>
        <div className="grid flex-1 gap-2">
          <h2 className="bg-shadow-light relative loading dark:bg-shadow-dark h-4"></h2>
          <h2 className="bg-shadow-light relative loading dark:bg-shadow-dark max-w-[200px] h-4"></h2>
        </div>
      </div>
    </div>
  );
};


 const VideosSkeleton = () => {
  let array = [...Array(10).keys()];

  return (
    <div className=" overflow-hidden h-[88vh] grid sm:grid-cols-2 md:grid-cols-3 place-items-center  gap-4 rounded-sm relative ">
    {array.map((a: any, i: number) => {
      return <VideoSkeleton key={a} />;
    })}
  </div>
  );
};

export default VideosSkeleton;